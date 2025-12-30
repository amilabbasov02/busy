import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchWithCache, setCacheLogger } from '../lib/cache/cachedResponse';
import { setRedisClientForTests } from '../lib/cache/redis';

class MockRedis {
  store = new Map<string, string>();
  sets = new Map<string, Set<string>>();

  async get(key: string) {
    return this.store.get(key) ?? null;
  }

  async set(key: string, value: string) {
    this.store.set(key, value);
    return 'OK';
  }

  async del(...keys: string[]) {
    keys.forEach((k) => this.store.delete(k));
    return keys.length;
  }

  async unlink(...keys: string[]) {
    return this.del(...keys);
  }

  async sadd(key: string, ...members: string[]) {
    const current = this.sets.get(key) ?? new Set<string>();
    members.forEach((m) => current.add(m));
    this.sets.set(key, current);
    return current.size;
  }

  async smembers(key: string) {
    return Array.from(this.sets.get(key) ?? []);
  }
}

class LockingRedis extends MockRedis {
  lockDenied = false;
  async set(key: string, value: string) {
    if (key.startsWith('lock:') && !this.lockDenied) {
      this.lockDenied = true;
      return null as any;
    }
    return super.set(key, value);
  }
}

const originalFetch = global.fetch;

test('MISS then HIT uses Redis cache', async () => {
  const redis = new MockRedis();
  setRedisClientForTests(redis as any);
  const bodies: string[] = [];
  global.fetch = async () => {
    const body = `body-${bodies.length + 1}`;
    bodies.push(body);
    return new Response(body, { status: 200, headers: { 'content-type': 'text/plain' } });
  };

  const markers: string[] = [];
  setCacheLogger((marker) => markers.push(marker));

  const url = 'https://api.busy.az/api/vacancies?page=1';
  const first = await fetchWithCache(url);
  assert.equal(first.headers.get('X-Cache'), 'MISS');
  assert.equal(await first.text(), 'body-1');

  const second = await fetchWithCache(url);
  assert.equal(second.headers.get('X-Cache'), 'HIT');
  assert.equal(await second.text(), 'body-1');
  assert.deepEqual(markers.includes('MISS') && markers.includes('HIT'), true);

  setCacheLogger(null);
  global.fetch = originalFetch;
  setRedisClientForTests(null);
});

test('bypass when Cache-Control no-cache is present', async () => {
  const redis = new MockRedis();
  setRedisClientForTests(redis as any);
  let calls = 0;
  global.fetch = async () => {
    calls += 1;
    return new Response(`live-${calls}`, { status: 200 });
  };

  const res = await fetchWithCache('https://api.busy.az/api/vacancies?page=2', {
    headers: { 'cache-control': 'no-cache' },
  });
  assert.equal(res.headers.get('X-Cache'), 'BYPASS');
  assert.equal(await res.text(), 'live-1');

  global.fetch = originalFetch;
  setRedisClientForTests(null);
});

test('lock contention falls back to live bypass', async () => {
  const redis = new LockingRedis();
  setRedisClientForTests(redis as any);
  let calls = 0;
  global.fetch = async () => {
    calls += 1;
    return new Response(`live-${calls}`, { status: 200 });
  };

  const res = await fetchWithCache('https://api.busy.az/api/vacancies?page=3');
  assert.equal(res.headers.get('X-Cache'), 'BYPASS');
  assert.equal(await res.text(), 'live-1');

  global.fetch = originalFetch;
  setRedisClientForTests(null);
});

test('fail-open when Redis unavailable', async () => {
  setRedisClientForTests(null);
  let calls = 0;
  global.fetch = async () => {
    calls += 1;
    return new Response('fallback', { status: 200 });
  };

  const res = await fetchWithCache('https://api.busy.az/api/jobseekers?page=1');
  assert.equal(res.headers.get('X-Cache'), 'BYPASS');
  assert.equal(await res.text(), 'fallback');
  assert.equal(calls, 1);

  global.fetch = originalFetch;
  setRedisClientForTests(null);
});
