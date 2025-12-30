import 'server-only';
import Redis from 'ioredis';

export type RedisLike = Pick<
  Redis,
  'get' | 'set' | 'del' | 'sadd' | 'smembers' | 'unlink'
>;

let client: RedisLike | null = null;
let clientPromise: Promise<RedisLike | null> | null = null;

const logPrefix = '[cache][redis]';

const createClient = async (): Promise<RedisLike | null> => {
  const url = process.env.REDIS_URL;
  if (!url) return null;

  try {
    const redis = new Redis(url, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
    });
    redis.on('error', (err) => {
      console.warn(`${logPrefix} connection error`, err);
    });
    await redis.connect();
    return redis;
  } catch (err) {
    console.warn(`${logPrefix} failed to connect, fail-open`, err);
    return null;
  }
};

export const getRedisClient = async (): Promise<RedisLike | null> => {
  if (client) return client;
  if (clientPromise) return clientPromise;
  clientPromise = createClient();
  client = await clientPromise;
  clientPromise = null;
  return client;
};

export const setRedisClientForTests = (mock: RedisLike | null) => {
  client = mock;
  clientPromise = null;
};
