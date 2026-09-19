/* Apply supabase/migrations/*.sql in order against the run-log database.
 * Idempotent: every statement in the migrations is `if not exists`.
 *   npx tsx scripts/migrate.ts            (reads .env / .env.local like the server does)
 */
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import postgres from 'postgres';
import { loadEnv } from 'vite';
import { hydrateEnv, runLogUrl } from '../server/swarm/env';

hydrateEnv(loadEnv('development', process.cwd(), ''));
const url = runLogUrl();
if (!url) {
  console.error('no SUPABASE_POOLER_URL / SUPABASE_DB_URL / DATABASE_URL in the environment');
  process.exit(2);
}
const dir = resolve('supabase/migrations');
const files = readdirSync(dir)
  .filter((f) => f.endsWith('.sql'))
  .sort();
const sql = postgres(url, { max: 1, prepare: false });
try {
  for (const f of files) {
    await sql.unsafe(readFileSync(resolve(dir, f), 'utf8'));
    console.warn(`applied ${f}`);
  }
  const [{ count }] = await sql`select count(*)::int as count from public.swarm_runs`;
  console.warn(`swarm_runs ready, ${count} row(s)`);
} finally {
  await sql.end();
}
