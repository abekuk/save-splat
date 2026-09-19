/* Browser side of the seam. Talks to the local dev endpoint, never to Anthropic directly —
 * the key lives in the Vite dev server's Node process and must stay there. */
import type { AgentKey } from './agents';
import type { SwarmRunResult } from './proposal';

export interface SwarmStatus {
  configured: boolean;
  provider?: string | null;
  model: string;
  effort: string;
  /** set when a key is present but the model could not be resolved for it */
  error?: string;
}

/** Whether a reasoner is actually reachable, so the UI can say so before the operator clicks. */
export async function swarmStatus(): Promise<SwarmStatus> {
  try {
    const res = await fetch('/api/swarm/status');
    if (!res.ok) return { configured: false, provider: null, model: '', effort: '' };
    return (await res.json()) as SwarmStatus;
  } catch {
    return { configured: false, provider: null, model: '', effort: '' };
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

export interface VisionRunResult {
  generated: string;
  model: string;
  views: number;
  report: {
    abstain: boolean;
    scene_type: string;
    objects: string[];
    occupancy_indicators: string[];
    hazard_indicators: string[];
    damage_read: string;
    notes: string;
    views_used: number[];
    self_confidence: string;
  } | null;
  verdicts: { check: string; status: 'pass' | 'fail' | 'unverified'; detail: string }[];
  verified: boolean;
  error?: string;
  usage?: { input: number; output: number };
  ms: number;
}

/** Hands rendered views to the vision agent. The images never leave this machine except to
 *  the model provider, and the key that reaches it stays in the dev server. */
export async function runVisionRemote(args: {
  images: string[];
  geometryLevel?: string;
  sceneNote?: string | null;
}): Promise<VisionRunResult> {
  const res = await fetch('/api/swarm/vision', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(args),
  });
  const text = await res.text();
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`vision endpoint returned non-JSON (${res.status}): ${text.slice(0, 200)}`);
  }
  if (!res.ok)
    throw new Error((body as { error?: string }).error ?? `vision failed (${res.status})`);
  return body as VisionRunResult;
}
