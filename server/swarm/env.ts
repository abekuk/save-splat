/* The server-side environment, named in one place.
 *
 * Nothing here has a VITE_ prefix on purpose: anything so prefixed is inlined into the
 * client bundle and shipped to every visitor. These names are what `stripe projects env
 * --pull` writes and what Vercel's project settings carry; the Vite plugin copies them
 * from .env.local into process.env so local dev and deployment read the same names.
 */
export const SERVER_ENV_KEYS = [
  // reasoner keys — any one is enough; OpenRouter is what Stripe Projects provisions
  'OPENROUTER_API_KEY',
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  // reasoner tuning
  'SWARM_PROVIDER',
  'SWARM_MODEL',
  'SWARM_EFFORT',
  'SWARM_APP_URL',
  // optional run log (Supabase, service role — server only, never the anon key's job)
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_SECRET_KEY',
] as const;

export type ServerEnvKey = (typeof SERVER_ENV_KEYS)[number];

/** Copy known keys from a loaded .env map into process.env without overriding anything
 *  the shell already set. */
export function hydrateEnv(env: Record<string, string | undefined>): void {
  for (const k of SERVER_ENV_KEYS) {
    if (env[k] && !process.env[k]) process.env[k] = env[k];
  }
}
