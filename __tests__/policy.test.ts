import assert from 'node:assert/strict';
import test from 'node:test';
import { matchPolicy } from '../lib/cache/policy';

test('distinguishes search vs non-search policy', () => {
  const noSearch = matchPolicy('GET', new URL('https://api.busy.az/api/filter/cities'));
  const withSearch = matchPolicy('GET', new URL('https://api.busy.az/api/filter/cities?search=baku'));

  assert.ok(noSearch);
  assert.ok(withSearch);
  assert.notEqual(noSearch?.ttlSeconds, withSearch?.ttlSeconds);
});

test('posts list is marked non-cacheable', () => {
  const rule = matchPolicy('GET', new URL('https://api.busy.az/api/posts?per_page=20&page=1'));
  assert.ok(rule);
  assert.equal(rule?.cacheable, false);
});

test('jobseeker detail uses 15m ttl', () => {
  const rule = matchPolicy('GET', new URL('https://api.busy.az/api/jobseeker/123'));
  assert.ok(rule);
  assert.equal(rule?.ttlSeconds, 900);
});

test('company detail is cacheable', () => {
  const rule = matchPolicy('GET', new URL('https://api.busy.az/api/companies/acme/detail'));
  assert.ok(rule);
  assert.equal(rule?.cacheable, true);
});
