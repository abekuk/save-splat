/* Optional run log.
 *
 * When a Postgres connection string is present (Stripe Projects emits SUPABASE_POOLER_URL
 * for the Supabase project it provisions), every swarm run is appended to `swarm_runs` so
 * an incident review can see what the agents proposed, what the verifiers said and how
 * long it took. It is append-only and the app never reads it back — the ranking still
 * lives entirely in the operator's session.
 *
 * It must never affect a run: a write failure is a warning, not an error. The connection
 * string stays in the server process; the table has RLS enabled with no policies, so the
 * publishable key cannot reach it through the API either.
 */
import postgres from 'postgres';
import type { SwarmRunResult } from '../../src/core/swarm/proposal';
import { runLogUrl } from './env';

const TIMEOUT_S = 5;

let client: ReturnType<typeof postgres> | null = null;
let clientUrl: string | null = null;

function sql(): ReturnType<typeof postgres> | null {
  const url = runLogUrl();
  if (!url) return null;
  if (!client || clientUrl !== url) {
    // one connection is plenty for an append-only log; prepare=false is required by the
    // Supabase transaction pooler
    client = postgres(url, {
      max: 1,
      prepare: false,
      connect_timeout: TIMEOUT_S,
      idle_timeout: 20,
    });
    clientUrl = url;
  }
  return client;
}

export function persistEnabled(): boolean {
  return runLogUrl() !== null;
}

export interface RunRow {
  generated: string;
  model: string;
  site_id: number | null;
  total_ms: number;
  agents: number;
  verified: number;
  abstained: number;
  errored: number;
  results: SwarmRunResult['results'];
}

export function rowFor(run: SwarmRunResult): RunRow {
  return {
    generated: run.generated,
    model: run.model,
    site_id: run.siteId,
    total_ms: Math.round(run.totalMs),
    agents: run.results.length,
    verified: run.results.filter((r) => r.verified && !r.error).length,
    abstained: run.results.filter((r) => r.abstained).length,
    errored: run.results.filter((r) => r.error).length,
    results: run.results,
  };
}

/** Resolves either way; logs a warning on failure. */
export async function recordRun(run: SwarmRunResult): Promise<boolean> {
  const db = sql();
  if (!db) return false;
  const r = rowFor(run);
  try {
    await db`
      insert into public.swarm_runs
        (generated, model, site_id, total_ms, agents, verified, abstained, errored, results)
      values
        (${r.generated}, ${r.model}, ${r.site_id}, ${r.total_ms}, ${r.agents}, ${r.verified},
         ${r.abstained}, ${r.errored}, ${db.json(r.results as never)})
    `;
    return true;
  } catch (err) {
    console.warn(`swarm: run log write failed — ${err instanceof Error ? err.message : err}`);
    return false;
  }
}
