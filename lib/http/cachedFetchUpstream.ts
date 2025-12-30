import 'server-only';
import { fetchWithCache } from '../cache/cachedResponse';

interface FetchContext {
  userId?: string;
  tenantId?: string;
  bypass?: boolean;
}

export const cachedFetchUpstream = async (
  url: string,
  init: RequestInit = {},
  context: FetchContext = {}
) => {
  return fetchWithCache(url, init, { userId: context.userId, tenantId: context.tenantId, bypass: context.bypass });
};
