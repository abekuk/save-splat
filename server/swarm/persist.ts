/* Optional run log.
 *
 * When a Supabase project is attached (SUPABASE_URL plus a service-role key), every swarm
 * run is appended to `swarm_runs` so an incident review can see what the agents proposed,
 * what the verifiers said and how long it took. It is append-only and the app never reads
 * it back — the ranking still lives entirely in the operator's session.
 *
 * It must never affect a run: a write failure is a warning, not an error, and it is not
 * awaited on the request path. The service-role key stays in the server process; the
 * table has RLS enabled with no policies, so nothing else can read or write it.
 */
import type { SwarmRunResult } from '../../src/core/swarm/proposal';

const TIMEOUT_MS = 5000;

function config(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  return url && key ? { url: url.replace(/\/+$/, ''), key } : null;
}

export function persistEnabled(): boolean {
  return config() !== null;
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

/** Fire-and-forget. Resolves either way; logs a warning on failure. */
export async function recordRun(run: SwarmRunResult): Promise<boolean> {
  const cfg = config();
  if (!cfg) return false;
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${cfg.url}/rest/v1/swarm_runs`, {
      method: 'POST',
      headers: {
        apikey: cfg.key,
        authorization: `Bearer ${cfg.key}`,
        'content-type': 'application/json',
        prefer: 'return=minimal',
      },
      body: JSON.stringify(rowFor(run)),
      signal: ctl.signal,
    });
    if (!res.ok) {
      console.warn(`swarm: run log write failed (${res.status}) ${await res.text()}`);
      return false;
    }
    return true;
  } catch (err) {
    console.warn(`swarm: run log unreachable — ${err instanceof Error ? err.message : err}`);
    return false;
  } finally {
    clearTimeout(timer);
  }
}
