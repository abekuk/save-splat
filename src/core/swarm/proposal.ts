/* What an agent is allowed to hand back.
 *
 * Everything below this line crosses a trust boundary: it is JSON produced by a model.
 * The schemas here are the only way in, and they are deliberately strict — an out-of-range
 * value is a reasoning failure, not something to clamp quietly into the slider range.
 *
 * Ranges come from PARAM_SCHEMAS, which mirrors the sliders — one source of truth for the
 * UI, the queue import and what an agent is allowed to propose.
 */
import { z } from 'zod';
import { PARAM_SCHEMAS } from './schema';
import type { AgentKey, AgentParam } from './agents';

export type AgentValue<P extends AgentParam = AgentParam> = z.infer<(typeof PARAM_SCHEMAS)[P]>;

/** Self-reported certainty. Distinct from the `conf` parameter, which is a site-level
 *  operator flag — this one is about the agent's own read of its evidence. */
export const SelfConfidence = z.enum(['low', 'med', 'high']);

/**
 * Every agent answers in this shape.
 *
 * `abstain` is load-bearing. An agent with no evidence for its parameter must say so rather
 * than produce a plausible number — a fabricated occupancy is worse than a blank one,
 * because it enters rho linearly and looks considered.
 *
 * `evidence_used` is what makes the rationale checkable. Each entry is a dot/bracket path
 * into the context payload the agent was given; the verifier resolves every one of them and
 * fails the proposal if any path does not exist. An agent cannot cite geometry it was
 * never shown.
 */
export function proposalSchemaFor(param: AgentParam) {
  return z.object({
    abstain: z.boolean(),
    value: z.union([PARAM_SCHEMAS[param], z.null()]),
    self_confidence: SelfConfidence,
    rationale: z.string().min(1).max(RATIONALE_MAX),
    evidence_used: z.array(z.string().min(1).max(200)).max(CITATIONS_MAX),
  });
}

/* What goes on the wire to the model, as distinct from what we accept back.
 *
 * OpenAI's strict structured-output subset rejects numeric minimum/maximum, so the wire
 * schema carries shape and enums only. That is the right split regardless of provider: the
 * model is told the ranges in its prompt, and the hard check happens here on the way back,
 * where an out-of-range value is a reasoning failure to surface rather than a number to clamp.
 */
const WIRE_VALUES = {
  n: z.number().int(),
  r: z.number(),
  tau: z.number(),
  type: z.enum(['pancake', 'mixed', 'lean']),
  conf: z.enum(['low', 'med', 'high']),
} as const satisfies Record<AgentParam, z.ZodTypeAny>;

export function wireSchemaFor(param: AgentParam) {
  return z.object({
    abstain: z.boolean(),
    value: z.union([WIRE_VALUES[param], z.null()]),
    self_confidence: SelfConfidence,
    rationale: z.string(),
    evidence_used: z.array(z.string()),
  });
}

export const RATIONALE_MAX = 2000;
export const CITATIONS_MAX = 16;

/* Strictness has to match what the field is for.
 *
 * A value out of range is a reasoning failure and is rejected — n=500 must never reach the
 * ranking. But `rationale` is display prose and `evidence_used` is a citation list, and
 * throwing away an otherwise sound proposal because the prose ran long is a category error.
 * It also punishes the agent for explaining itself, which is the opposite of the incentive
 * this design wants. Those two are trimmed; everything that bears on the decision stays strict.
 */
function sanitize(raw: unknown): unknown {
  if (raw === null || typeof raw !== 'object') return raw;
  const o = { ...(raw as Record<string, unknown>) };
  if (typeof o.rationale === 'string' && o.rationale.length > RATIONALE_MAX) {
    o.rationale = `${o.rationale.slice(0, RATIONALE_MAX - 1)}…`;
  }
  if (Array.isArray(o.evidence_used)) {
    o.evidence_used = o.evidence_used
      .filter((e): e is string => typeof e === 'string')
      .slice(0, CITATIONS_MAX)
      .map((e) => (e.length > 200 ? e.slice(0, 200) : e));
  }
  return o;
}

/** The gate. Anything a model hands back passes through here before it is a proposal. */
export function parseRawProposal(
  param: AgentParam,
  raw: unknown,
): { ok: true; value: RawProposal } | { ok: false; error: string } {
  const res = proposalSchemaFor(param).safeParse(sanitize(raw));
  if (res.success) return { ok: true, value: res.data as RawProposal };
  const issue = res.error.issues[0];
  const where = issue?.path.join('.') || '(root)';
  return { ok: false, error: `${where}: ${issue?.message ?? 'invalid'}` };
}

export type RawProposal = {
  abstain: boolean;
  value: AgentValue | null;
  self_confidence: 'low' | 'med' | 'high';
  rationale: string;
  evidence_used: string[];
};

export type VerdictStatus = 'pass' | 'fail' | 'unverified';

export interface Verdict {
  check: string;
  status: VerdictStatus;
  detail: string;
}

export interface AgentResult {
  key: AgentKey;
  param: AgentParam;
  /** null when the agent abstained or the call failed */
  value: AgentValue | null;
  abstained: boolean;
  rationale: string;
  selfConfidence: 'low' | 'med' | 'high';
  evidenceUsed: string[];
  verdicts: Verdict[];
  /** false if any verdict failed — the UI must not present this as ready to apply */
  verified: boolean;
  error?: string;
  usage?: { input: number; output: number };
  ms: number;
}

export interface SwarmRunResult {
  generated: string;
  model: string;
  siteId: number | null;
  results: AgentResult[];
  totalMs: number;
  note: string;
  /** true when the server appended this run to the Supabase log */
  logged?: boolean;
}

/** Resolve a dotted/bracketed path such as `geometry.planes[2].drift_ratio`. */
export function resolvePath(root: unknown, path: string): { found: boolean; value: unknown } {
  const parts = path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);
  let cur: unknown = root;
  for (const part of parts) {
    if (cur === null || cur === undefined) return { found: false, value: undefined };
    if (Array.isArray(cur)) {
      const i = Number(part);
      if (!Number.isInteger(i) || i < 0 || i >= cur.length)
        return { found: false, value: undefined };
      cur = cur[i];
      continue;
    }
    if (typeof cur !== 'object') return { found: false, value: undefined };
    if (!(part in (cur as Record<string, unknown>))) return { found: false, value: undefined };
    cur = (cur as Record<string, unknown>)[part];
  }
  return { found: true, value: cur };
}
