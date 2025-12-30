import assert from 'node:assert/strict';
import test from 'node:test';
import { buildCacheKey } from '../lib/cache/cacheKey';

test('normalizes query params including arrays', () => {
  const a = buildCacheKey({
    method: 'GET',
    url: new URL('https://api.busy.az/api/vacancies?b=2&a=1&a=3'),
  });
  const b = buildCacheKey({
    method: 'get',
    url: new URL('https://api.busy.az/api/vacancies?a=3&b=2&a=1'),
  });
  assert.equal(a, b);
});

test('separates scope per user', () => {
  const base = new URL('https://api.busy.az/api/jobseekers?page=1');
  const user1 = buildCacheKey({ method: 'GET', url: base, scope: 'perUser', userId: 'u1' });
  const user2 = buildCacheKey({ method: 'GET', url: base, scope: 'perUser', userId: 'u2' });
  assert.notEqual(user1, user2);
});

test('includes accept-language when varied', () => {
  const key = buildCacheKey({
    method: 'GET',
    url: new URL('https://api.busy.az/api/filter/cities'),
    varyHeaders: ['accept-language'],
    headers: { 'accept-language': 'az' },
  });
  assert.match(key, /h:accept-language=az/);
});
