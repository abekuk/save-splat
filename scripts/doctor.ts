/* Is everything Stripe Projects provisioned actually reachable from this checkout?
 *
 *   npm run doctor
 *
 * Reads the same env the server does (.env / .env.local via loadEnv, hydrated by
 * server/swarm/env.ts) and makes one cheap, read-only call per provider. Prints one line
 * each and exits non-zero if anything required is down. Never prints a secret.
 */
import postgres from 'postgres';
import { loadEnv } from 'vite';
import { athenaConfig, hydrateEnv, runLogUrl } from '../server/swarm/env';
import { detectProvider, KEY_ENV } from '../server/swarm/providers';

const fileEnv = loadEnv('development', process.cwd(), '');
hydrateEnv(fileEnv);

type Check = { name: string; required: boolean; run: () => Promise<string> };
const checks: Check[] = [];
const timeout = (ms: number) => {
  const ctl = new AbortController();
  setTimeout(() => ctl.abort(), ms).unref();
  return ctl.signal;
};

checks.push({
  name: 'reasoner   ',
  required: true,
  run: async () => {
    const which = detectProvider();
    if (!which) throw new Error(`no reasoner key (${Object.values(KEY_ENV).join(' | ')})`);
    if (which === 'athena')
      return 'athena (Stripe-provisioned agent) · the reviewer check below covers it';
    if (which !== 'openrouter')
      return `${which} via ${KEY_ENV[which]} (not the Stripe-provisioned one)`;
    const res = await fetch('https://openrouter.ai/api/v1/auth/key', {
      headers: { authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
      signal: timeout(10_000),
    });
    if (!res.ok) throw new Error(`openrouter /auth/key ${res.status}`);
    const d = ((await res.json()) as { data: Record<string, unknown> }).data;
    const q = d.free_model_daily_requests as { used: number; limit: number } | undefined;
    return `openrouter ok · ${d.is_free_tier ? 'free tier' : 'credits'}${q ? ` · ${q.used}/${q.limit} free requests used today` : ''}`;
  },
});

checks.push({
  name: 'run log    ',
  required: false,
  run: async () => {
    const url = runLogUrl();
    if (!url) return 'not configured (SUPABASE_POOLER_URL + SUPABASE_DB_PASS)';
    const sql = postgres(url, { max: 1, prepare: false, connect_timeout: 10 });
    try {
      const [{ n }] = await sql`select count(*)::int as n from public.swarm_runs`;
      return `supabase ok · swarm_runs has ${n} row(s)`;
    } finally {
      await sql.end({ timeout: 1 });
    }
  },
});

checks.push({
  name: 'reviewer   ',
  required: false,
  run: async () => {
    const a = athenaConfig();
    if (!a) return 'not configured (ATHENA_ATHENA_AGENT_API_KEY + _MCP_URL)';
    const res = await fetch(a.mcpUrl, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${a.apiKey}`,
        'content-type': 'application/json',
        accept: 'application/json, text/event-stream',
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }),
      signal: timeout(15_000),
    });
    if (!res.ok) throw new Error(`athena mcp ${res.status}`);
    const d = (await res.json()) as { result?: { tools?: { name: string }[] } };
    const tool = d.result?.tools?.find((t) => t.name.endsWith('__get_response'));
    if (!tool) throw new Error('athena agent exposes no get_response tool');
    return `athena ok · ${tool.name}${a.publicUrl ? ` · ${a.publicUrl}` : ''}`;
  },
});

checks.push({
  name: 'hosting    ',
  required: false,
  run: async () => {
    const VERCEL_TOKEN = process.env.VERCEL_TOKEN ?? fileEnv.VERCEL_TOKEN;
    const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID ?? fileEnv.VERCEL_PROJECT_ID;
    const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID ?? fileEnv.VERCEL_TEAM_ID;
    if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID)
      return 'not configured (VERCEL_TOKEN + VERCEL_PROJECT_ID)';
    const q = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : '';
    const res = await fetch(`https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}${q}`, {
      headers: { authorization: `Bearer ${VERCEL_TOKEN}` },
      signal: timeout(10_000),
    });
    if (!res.ok) throw new Error(`vercel api ${res.status}`);
    const p = (await res.json()) as {
      name: string;
      targets?: { production?: { url?: string; readyState?: string } };
    };
    const prod = p.targets?.production;
    return `vercel ok · project ${p.name}${prod?.url ? ` · production ${prod.readyState ?? ''} https://${prod.url}` : ' · no production deployment yet'}`;
  },
});

let failed = false;
for (const c of checks) {
  try {
    console.warn(`✓ ${c.name} ${await c.run()}`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`${c.required ? '✗' : '!'} ${c.name} ${msg}`);
    if (c.required) failed = true;
  }
}
process.exit(failed ? 1 : 0);
