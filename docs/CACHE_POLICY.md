# Cache Policy

This repo caches outbound GET calls to `https://api.busy.az` via a server-only Redis layer and BFF proxy. Auth/session endpoints are never cached. Responses with `Set-Cookie` are never cached. Non-GET requests are bypassed by default.

## How it works
- Client components call the internal proxy: `/api/bff/...` (GET-only). The proxy validates against `cache/policy.json`, applies Redis caching, and forwards to `https://api.busy.az`.
- Server components can call `lib/http/cachedFetchUpstream` to hit the upstream directly with the same cache policy.
- Bypass caching with `?nocache=1` or `Cache-Control: no-cache`. If Redis is unavailable, all requests fail-open (no caching, normal fetch).
- Stampede protection: a short lock (3s) is set per cache key. Contenders re-check once; if still locked they fetch without caching.
- `X-Cache` header: `HIT`, `MISS`, or `BYPASS`.

## Key design
- Method + normalized path + sorted query params (arrays normalized), plus scope info (public/perUser/perTenant) and vary headers (e.g., `accept-language`).
- `nocache` query parameter is stripped from the cache key.
- `Accept-Language` is included when the policy lists it in `varyHeaders`.

## Policy file
- `cache/policy.json` is the single source of truth. Fields per rule:
  - `method`, `pattern` (supports `:param` segments), `cacheable`, `ttlSeconds`, `scope` (`public|perUser|perTenant`), `varyHeaders`, `tags`, optional `query.hasSearch` to distinguish search vs non-search calls.
- Only whitelisted rules are proxied by `/api/bff`.

## TTLs (per requirements)
- `/api/faq`: 24h
- `/api/filter/main-categories`, `/api/filter/categories`, `/api/filter/cities` (no search), `/api/filter/employment-types` (no search), `/api/filter/experiences` (no search): 12h
- `/api/filter/professions` (no search), `/api/filter/skills` (no search): 6h
- Any `/api/filter/*` with `search=`: 60s
- `/api/vacancies` lists: 60s
- `/api/vacancy/:id/:slug`: 15m
- `/api/jobseekers` list: 60s
- `/api/jobseeker/:id`: 15m
- `/api/posts` list: **not cacheable** (page sets `cache: 'no-store'`)
- `/api/posts/:slug`: 30m
- `/api/posts/tag/:slug`: 5m
- `/api/companies` list: 10m
- `/api/companies/search`: 60s
- `/api/companies/:slug/detail`: 30m
- `/api/companies/:slug/vacancies`: 120s
- `/api/professions` list (no search): 10m
- `/api/professions/search`: 60s
- `/api/professions/:slug/vacancies`: 120s

## Invalidation
- Tag sets are recorded in Redis per response based on `tags` in the policy. `lib/cache/invalidate.ts` supports tag-based invalidation (primary) and per-key deletion fallback.

## Environment
- `REDIS_URL` must point to a Redis instance (Node runtime only; Edge is bypassed).
- Safe failure: if Redis is down, the code fetches upstream and returns live responses without caching.***
