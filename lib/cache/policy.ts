import 'server-only';
import policy from '../../cache/policy.json';

export interface CachePolicyRule {
  method: string;
  pattern: string;
  cacheable: boolean;
  ttlSeconds: number;
  scope: 'public' | 'perUser' | 'perTenant';
  varyHeaders?: string[];
  tags?: string[];
  query?: {
    hasSearch?: boolean;
  };
}

type CompiledRule = CachePolicyRule & { regex: RegExp };

const compile = (pattern: string) => {
  const escaped = pattern.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&');
  const withParams = escaped
    .replace(/\\:([a-zA-Z0-9_]+)/g, '[^/]+')
    .replace(/:([a-zA-Z0-9_]+)/g, '[^/]+');
  return new RegExp(`^${withParams}$`);
};

const compiledRules: CompiledRule[] = (policy as CachePolicyRule[]).map((r) => ({
  ...r,
  regex: compile(r.pattern),
  varyHeaders: r.varyHeaders?.map((h) => h.toLowerCase()) ?? [],
  tags: r.tags ?? [],
}));

const matchesQueryRule = (rule: CachePolicyRule, url: URL) => {
  const searchValue = url.searchParams.get('search');
  if (rule.query?.hasSearch === undefined) return true;
  const hasSearch = !!(searchValue && searchValue.trim().length > 0);
  return rule.query.hasSearch === hasSearch;
};

export const matchPolicy = (method: string, url: URL): CompiledRule | null => {
  const upper = method.toUpperCase();
  for (const rule of compiledRules) {
    if (rule.method.toUpperCase() !== upper) continue;
    if (!rule.regex.test(url.pathname)) continue;
    if (!matchesQueryRule(rule, url)) continue;
    return rule;
  }
  return null;
};

export const getAllRules = () => compiledRules;
