/* Browser side of the seam. Talks to /api/swarm on whatever is serving the page — the Vite
 * dev or preview server locally, a Vercel function deployed — never to a model vendor
 * directly. The key lives in that server process and must stay there. */
import type { AgentKey } from './agents';
import type { SwarmRunResult } from './proposal';

export interface SwarmStatus {
  configured: boolean;
  provider?: string | null;
  model: string;
  effort: string;
  /** whether runs are being appended to the Supabase log */
  persist?: boolean;
  /** the Athena incident reviewer, if provisioned */
  review?: { configured: boolean; publicUrl: string | null };
  /** set when a key is present but the model could not be resolved for it */
  error?: string;
}

/** Whether a reasoner is actually reachable, so the UI can say so before the operator clicks. */
export async function swarmStatus(): Promise<SwarmStatus> {
  try {
    const res = await fetch('/api/swarm/status');
    if (!res.ok)
      return { configured: false, provider: null, model: '', effort: '', persist: false };
    return (await res.json()) as SwarmStatus;
  } catch {
    return { configured: false, provider: null, model: '', effort: '', persist: false };
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

export interface RoomRunResult {
  generated: string;
  model: string;
  views: number;
  report: import('./defects').DefectReport | null;
  verdicts: { check: string; status: 'pass' | 'fail' | 'unverified'; detail: string }[];
  verified: boolean;
  error?: string;
  usage?: { input: number; output: number };
  ms: number;
}

/** Hands rendered views to the defect agent. The key that reaches the model stays in Node. */
export async function runRoomRemote(args: {
  images: string[];
  geometryNote?: string | null;
  operatorNote?: string | null;
}): Promise<RoomRunResult> {
  const res = await fetch('/api/swarm/room', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(args),
  });
  const text = await res.text();
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`room endpoint returned non-JSON (${res.status}): ${text.slice(0, 200)}`);
  }
  if (!res.ok)
    throw new Error((body as { error?: string }).error ?? `assessment failed (${res.status})`);
  return body as RoomRunResult;
}

export interface ReviewResult {
  text: string;
  agent: string;
  publicUrl: string | null;
  ms: number;
}

/** Athena's pass over a finished run. Advisory prose only; it proposes nothing. */
export async function requestReview(args: {
  run: SwarmRunResult;
  context: unknown;
  operatorNotes?: string | null;
}): Promise<ReviewResult> {
  const res = await fetch('/api/swarm/review', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(args),
  });
  const body = (await res.json().catch(() => ({}))) as Partial<ReviewResult> & { error?: string };
  if (!res.ok) throw new Error(body.error ?? `review request failed (${res.status})`);
  return body as ReviewResult;
}
