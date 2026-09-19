/* Browser side of the seam. Talks to the local dev endpoint, never to Anthropic directly —
 * the key lives in the Vite dev server's Node process and must stay there. */
import type { AgentKey } from './agents';
import type { SwarmRunResult } from './proposal';

export interface SwarmStatus {
  configured: boolean;
  model: string;
  effort: string;
}

/** Whether a reasoner is actually reachable, so the UI can say so before the operator clicks. */
export async function swarmStatus(): Promise<SwarmStatus> {
  try {
    const res = await fetch('/api/swarm/status');
    if (!res.ok) return { configured: false, model: '', effort: '' };
    return (await res.json()) as SwarmStatus;
  } catch {
    return { configured: false, model: '', effort: '' };
  }
}

export interface RunSwarmArgs {
  context: unknown;
  operatorNotes?: string | null;
  siteId?: number | null;
  only?: AgentKey[];
}

export async function runSwarmRemote(args: RunSwarmArgs): Promise<SwarmRunResult> {
  const res = await fetch('/api/swarm/run', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(args),
  });
  const text = await res.text();
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`swarm endpoint returned non-JSON (${res.status}): ${text.slice(0, 200)}`);
  }
  if (!res.ok) {
    const msg = (body as { error?: string }).error ?? `swarm request failed (${res.status})`;
    throw new Error(msg);
  }
  return body as SwarmRunResult;
}
