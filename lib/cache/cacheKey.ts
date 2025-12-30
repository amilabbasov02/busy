import 'server-only';

export type CacheScope = 'public' | 'perUser' | 'perTenant';

export interface CacheKeyInput {
  method: string;
  url: URL;
  scope?: CacheScope;
  userId?: string;
  tenantId?: string;
  varyHeaders?: string[];
  headers?: Headers | Record<string, string | undefined>;
}

const getHeader = (headers: CacheKeyInput['headers'], name: string) => {
  if (!headers) return undefined;
  if (headers instanceof Headers) return headers.get(name);
  const lower = name.toLowerCase();
  return headers[name] ?? headers[lower];
};

const normalizeQuery = (params: URLSearchParams) => {
  const entries = Array.from(params.entries()).sort(([aKey, aVal], [bKey, bVal]) => {
    if (aKey === bKey) return aVal.localeCompare(bVal);
    return aKey.localeCompare(bKey);
  });
  return entries.map(([k, v]) => `${k}=${v}`).join('&');
};

export const buildCacheKey = ({
  method,
  url,
  scope = 'public',
  userId,
  tenantId,
  varyHeaders = [],
  headers,
}: CacheKeyInput) => {
  const safeMethod = method.toUpperCase();
  const params = new URLSearchParams(url.search);
  params.delete('nocache');

  const query = normalizeQuery(params);
  const parts = [`m=${safeMethod}`, `u=${url.origin}${url.pathname}`, `q=${query}`];

  if (scope === 'perUser' && userId) parts.push(`user=${userId}`);
  if (scope === 'perTenant' && tenantId) parts.push(`tenant=${tenantId}`);

  varyHeaders.forEach((h) => {
    const val = getHeader(headers, h);
    if (val) parts.push(`h:${h.toLowerCase()}=${val}`);
  });

  return `cache:${parts.join('|')}`;
};
