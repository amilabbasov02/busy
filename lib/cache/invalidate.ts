import 'server-only';
import { getRedisClient, RedisLike } from './redis';

const tagKey = (tag: string) => `tag:${tag}`;

export const invalidateTags = async (tags: string[], redisOverride?: RedisLike | null) => {
  if (!tags.length) return;
  const redis = redisOverride ?? (await getRedisClient());
  if (!redis) return;

  try {
    const keysToDelete = new Set<string>();
    for (const tag of tags) {
      const members = await redis.smembers(tagKey(tag));
      members.forEach((m) => keysToDelete.add(m));
    }

    if (keysToDelete.size) {
      const keyArray = Array.from(keysToDelete);
      if (redis.unlink) {
        await redis.unlink(...keyArray);
      } else {
        await redis.del(...keyArray);
      }
    }

    await Promise.all(tags.map((t) => redis.del(tagKey(t))));
  } catch (err) {
    console.warn('[cache] failed to invalidate tags', err);
  }
};

export const invalidateKeys = async (keys: string[], redisOverride?: RedisLike | null) => {
  if (!keys.length) return;
  const redis = redisOverride ?? (await getRedisClient());
  if (!redis) return;
  try {
    if (redis.unlink) {
      await redis.unlink(...keys);
    } else {
      await redis.del(...keys);
    }
  } catch (err) {
    console.warn('[cache] failed to invalidate keys', err);
  }
};
