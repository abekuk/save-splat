/* The server-side environment, named in one place.
 *
 * Nothing here has a VITE_ prefix on purpose: anything so prefixed is inlined into the
 * client bundle and shipped to every visitor. These names are what `stripe projects env
 * --pull` writes and what Vercel's project settings carry; the Vite plugin copies them
 * from .env.local into process.env so local dev and deployment read the same names.
 */
export const SERVER_ENV_KEYS = [
  // reasoner keys — any one is enough; OpenRouter is what Stripe Projects provisions.
  // OPENROUTER_API_API_KEY is the name `stripe projects env --pull` writes (resource
  // "openrouter-api" + field "API_KEY"); the plain name is accepted for hand-made envs.
  'OPENROUTER_API_API_KEY',
  'OPENROUTER_API_KEY',
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  // reasoner tuning
  'SWARM_PROVIDER',
  'SWARM_MODEL',
  'SWARM_EFFORT',
  'SWARM_APP_URL',
  // optional run log — a Postgres connection string, server only. Stripe Projects emits
  // SUPABASE_POOLER_URL (transaction pooler, right for serverless) and SUPABASE_DB_URL.
  'SUPABASE_POOLER_URL',
  'SUPABASE_DB_URL',
  'SUPABASE_DB_PASS',
  'DATABASE_URL',
  // optional incident reviewer — the Athena agent Stripe Projects provisioned (athena/agents).
  // The agent is a headless MCP server; the key and URL are all the integration needs.
  'ATHENA_ATHENA_AGENT_API_KEY',
  'ATHENA_ATHENA_AGENT_MCP_URL',
  'ATHENA_ATHENA_AGENT_PUBLIC_URL',
  'ATHENA_ATHENA_AGENT_ID',
  'ATHENA_ATHENA_API_BASE_URL',
] as const;

export type ServerEnvKey = (typeof SERVER_ENV_KEYS)[number];

/** Copy known keys from a loaded .env map into process.env without overriding anything
 *  the shell already set, then fold provider-specific names onto the plain ones the code
 *  reads, so a Stripe-written .env and a hand-written one behave identically. */
export function hydrateEnv(env: Record<string, string | undefined>): void {
  for (const k of SERVER_ENV_KEYS) {
    if (env[k] && !process.env[k]) process.env[k] = env[k];
  }
  normalizeEnv();
}

export function normalizeEnv(): void {
  if (!process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_API_KEY) {
    process.env.OPENROUTER_API_KEY = process.env.OPENROUTER_API_API_KEY;
  }
}

/** The connection string for the run log, if any. Pooler first: it is the one that
 *  tolerates many short-lived serverless connections.
 *
 *  Stripe Projects emits Supabase's template URLs verbatim, with the literal placeholder
 *  `[YOUR-PASSWORD]`, and the real password separately as SUPABASE_DB_PASS. Splice it in
 *  here so nobody has to hand-edit a generated .env. */
export function runLogUrl(): string | null {
  const raw =
    process.env.SUPABASE_POOLER_URL ?? process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;
  if (!raw) return null;
  if (!raw.includes('[YOUR-PASSWORD]')) return raw;
  const pass = process.env.SUPABASE_DB_PASS;
  if (!pass) return null; // a placeholder with nothing to fill it is not a usable URL
  return raw.replace('[YOUR-PASSWORD]', encodeURIComponent(pass));
}

export interface AthenaConfig {
  apiKey: string;
  mcpUrl: string;
  publicUrl: string | null;
}

/** The Athena reviewer, if provisioned. Null means the review panel simply does not appear. */
export function athenaConfig(): AthenaConfig | null {
  const apiKey = process.env.ATHENA_ATHENA_AGENT_API_KEY;
  const mcpUrl = process.env.ATHENA_ATHENA_AGENT_MCP_URL;
  if (!apiKey || !mcpUrl) return null;
  return { apiKey, mcpUrl, publicUrl: process.env.ATHENA_ATHENA_AGENT_PUBLIC_URL ?? null };
}
