import 'server-only';
import { buildCacheKey } from './cacheKey';
import { getRedisClient, RedisLike } from './redis';
import { matchPolicy, CachePolicyRule } from './policy';

type CacheMarker = 'HIT' | 'MISS' | 'BYPASS';

type CacheLogger = (marker: CacheMarker, info: { key: string; pattern?: string }) => void;

let cacheLogger: CacheLogger | null = null;

export const setCacheLogger = (logger: CacheLogger | null) => {
  cacheLogger = logger;
};

interface FetchContext {
  userId?: string;
  tenantId?: string;
  redis?: RedisLike | null;
  policyOverride?: CachePolicyRule | null;
  bypass?: boolean;
}

const lockMs = 3000;
const retryDelayMs = 150;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const shouldBypass = (url: URL, headers?: Headers | Record<string, string | undefined>) => {
  const params = new URLSearchParams(url.search);
  if (params.get('nocache') === '1' || params.has('nocache')) return true;

  if (!headers) return false;
  const value =
    headers instanceof Headers
      ? headers.get('cache-control')
      : headers['cache-control'] || headers['Cache-Control'];
  if (!value) return false;
  return value.toLowerCase().includes('no-cache') || value.toLowerCase().includes('no-store');
};

const cloneMinimalHeaders = (res: Response) => {
  const headers = new Headers();
  const contentType = res.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);
  const contentLanguage = res.headers.get('content-language');
  if (contentLanguage) headers.set('content-language', contentLanguage);
  return headers;
};

const shouldSkipCachingResponse = (res: Response) => {
  if (res.headers.has('set-cookie')) return true;
  return false;
};

const attachCacheHeader = (res: Response, marker: CacheMarker) => {
  res.headers.set('X-Cache', marker);
  return res;
};

const serializeResponse = async (res: Response) => {
  const body = Buffer.from(await res.arrayBuffer()).toString('base64');
  return {
    status: res.status,
    headers: Object.fromEntries(cloneMinimalHeaders(res).entries()),
    body,
  };
};

const deserializeResponse = (payload: { status: number; headers: Record<string, string>; body: string }) => {
  return new Response(Buffer.from(payload.body, 'base64'), {
    status: payload.status,
    headers: payload.headers,
  });
};

const fetchUpstream = async (url: string, init?: RequestInit) => {
  const merged: RequestInit = { ...init, cache: 'no-store' };
  return fetch(url, merged);
};

const logCacheEvent = (marker: CacheMarker, key: string, pattern?: string) => {
  if (cacheLogger) {
    cacheLogger(marker, { key, pattern });
    return;
  }
  if (process.env.NODE_ENV !== 'test') {
    console.debug(`[cache] ${marker} ${pattern ?? ''} ${key}`);
  }
};

export const fetchWithCache = async (
  url: string,
  init: RequestInit = {},
  context: FetchContext = {}
): Promise<Response> => {
  const method = (init.method || 'GET').toUpperCase();
  const urlObj = new URL(url);
  const policy = context.policyOverride ?? matchPolicy(method, urlObj);

  // `RequestInit.headers` can also be `HeadersInit` (tuple array). Normalize for shouldBypass.
  const normalizedHeaders = (() => {
    const h = init.headers;
    if (!h) return undefined;
    try {
      return h instanceof Headers ? h : new Headers(h as HeadersInit);
    } catch {
      return undefined;
    }
  })();

  const bypass = context.bypass || shouldBypass(urlObj, normalizedHeaders);
  if (!policy || !policy.cacheable || method !== 'GET' || bypass) {
    logCacheEvent('BYPASS', `${urlObj.origin}${urlObj.pathname}`, policy?.pattern);
    const live = await fetchUpstream(url, init);
    return attachCacheHeader(live, 'BYPASS');
  }

  const redis = context.redis ?? (await getRedisClient());
  if (!redis) {
    logCacheEvent('BYPASS', `${urlObj.origin}${urlObj.pathname}`, policy.pattern);
    const live = await fetchUpstream(url, init);
    return attachCacheHeader(live, 'BYPASS');
  }

  const cacheKey = buildCacheKey({
    method,
    url: urlObj,
    scope: policy.scope,
    userId: context.userId,
    tenantId: context.tenantId,
    varyHeaders: policy.varyHeaders,
    headers: normalizedHeaders,
  });

  const cachedRaw = await redis.get(cacheKey);
  if (cachedRaw) {
    try {
      const parsed = JSON.parse(cachedRaw);
      logCacheEvent('HIT', cacheKey, policy.pattern);
      return attachCacheHeader(deserializeResponse(parsed), 'HIT');
    } catch (err) {
      console.warn('[cache] failed to parse cached payload', err);
    }
  }

  const lockKey = `lock:${cacheKey}`;
  const lock = await redis.set(lockKey, '1', 'PX', lockMs, 'NX');
  if (!lock) {
    await sleep(retryDelayMs);
    const retryRaw = await redis.get(cacheKey);
    if (retryRaw) {
      try {
        const parsed = JSON.parse(retryRaw);
        logCacheEvent('HIT', cacheKey, policy.pattern);
        return attachCacheHeader(deserializeResponse(parsed), 'HIT');
      } catch (err) {
        console.warn('[cache] failed to parse cached payload after retry', err);
      }
    }
    const live = await fetchUpstream(url, init);
    logCacheEvent('BYPASS', cacheKey, policy.pattern);
    return attachCacheHeader(live, 'BYPASS');
  }

  const live = await fetchUpstream(url, init);
  try {
    if (!shouldSkipCachingResponse(live)) {
      const payload = await serializeResponse(live.clone());
      await redis.set(cacheKey, JSON.stringify(payload), 'PX', policy.ttlSeconds * 1000);
      if (policy.tags?.length) {
        await Promise.all(
          policy.tags.map((tag) => redis.sadd(`tag:${tag}`, cacheKey))
        );
      }
    }
  } catch (err) {
    console.warn('[cache] failed to store response', err);
  } finally {
    await redis.del(lockKey);
  }

  logCacheEvent('MISS', cacheKey, policy.pattern);
  return attachCacheHeader(live, 'MISS');
};
