/* The swarm run. Provider-agnostic: it owns the shape of the run, not the vendor.
 *
 * Runs in Node, never in the browser. The API key is the reason — anything Vite bundles is
 * readable by anyone who opens the page, so the key is read from process.env here and the
 * browser talks to a local endpoint instead. That also keeps dangerouslyAllowBrowser out of
 * the codebase, which is the setting you only reach for when the key is already leaked.
 *
 * Shape: the four evidence agents are independent and run in parallel; corroboration runs
 * afterwards because it judges their output. No shared mutable state; every agent is
 * read-only over the same payload.
 */
import { SWARM_AGENTS, agentByKey } from '../../src/core/swarm/agents';
import type { AgentKey } from '../../src/core/swarm/agents';
import { AGENT_PROMPTS, buildUserMessage } from '../../src/core/swarm/prompts';
import { parseRawProposal } from '../../src/core/swarm/proposal';
import type { AgentResult, SwarmRunResult } from '../../src/core/swarm/proposal';
import { isVerified, verify } from '../../src/core/swarm/verify';
import { getReasoner } from './providers';
import type { Reasoner } from './providers';

const EVIDENCE_AGENTS: AgentKey[] = ['morphology', 'volume', 'access', 'records'];

export interface RunOptions {
  context: Record<string, unknown>;
  operatorNotes?: string | null;
  siteId?: number | null;
  /** restrict the run to these agents; defaults to all five */
  only?: AgentKey[];
}

/** One agent, one call. Returns a result even on failure — a dead agent must not take the
 *  swarm down, and the operator needs to see which one died and why. */
async function runAgent(
  reasoner: Reasoner,
  key: AgentKey,
  payload: Record<string, unknown>,
  upstream?: { key: AgentKey; abstained: boolean; verified: boolean }[],
  upstreamJson?: string,
): Promise<AgentResult> {
  const agent = agentByKey(key);
  const started = Date.now();
  const base: AgentResult = {
    key,
    param: agent ? agent.param : 'n',
    value: null,
    abstained: false,
    rationale: '',
    selfConfidence: 'low',
    evidenceUsed: [],
    verdicts: [],
    verified: false,
    ms: 0,
  };
  if (!agent) return { ...base, error: `unknown agent "${key}"`, ms: Date.now() - started };

  try {
    const { raw, usage } = await reasoner.complete({
      param: agent.param,
      system: AGENT_PROMPTS[key],
      user: buildUserMessage(key, JSON.stringify(payload, null, 1), upstreamJson),
    });

    // The trust boundary. Shape came back from the provider; the ranges are enforced here,
    // and an out-of-range value is reported as the reasoning failure it is.
    const parsed = parseRawProposal(agent.param, raw);
    if (!parsed.ok) {
      return { ...base, error: `rejected the proposal — ${parsed.error}`, usage, ms: Date.now() - started };
    }

    const verdicts = verify({ key, param: agent.param, proposal: parsed.value, payload, upstream });
    return {
      key,
      param: agent.param,
      value: parsed.value.abstain ? null : parsed.value.value,
      abstained: parsed.value.abstain,
      rationale: parsed.value.rationale,
      selfConfidence: parsed.value.self_confidence,
      evidenceUsed: parsed.value.evidence_used,
      verdicts,
      verified: isVerified(verdicts),
      usage,
      ms: Date.now() - started,
    };
  } catch (err) {
    return {
      ...base,
      error: err instanceof Error ? err.message : String(err),
      ms: Date.now() - started,
    };
  }
}

export async function runSwarm(opts: RunOptions): Promise<SwarmRunResult> {
  const started = Date.now();
  const wanted = opts.only ?? SWARM_AGENTS.map((a) => a.key);

  const payload: Record<string, unknown> = {
    ...opts.context,
    operator_notes: opts.operatorNotes?.trim() ? opts.operatorNotes.trim() : null,
  };

  const reasoner = getReasoner();
  const model = await reasoner.model();

  // four independent agents, concurrently
  const evidence = await Promise.all(
    EVIDENCE_AGENTS.filter((k) => wanted.includes(k)).map((k) => runAgent(reasoner, k, payload)),
  );

  const results = [...evidence];

  // corroboration judges the others, so it cannot start until they finish
  if (wanted.includes('corroboration')) {
    const upstream = evidence.map((r) => ({
      key: r.key,
      abstained: r.abstained,
      verified: r.verified && !r.error,
    }));
    const upstreamJson = JSON.stringify(
      evidence.map((r) => ({
        agent: r.key,
        parameter: r.param,
        value: r.value,
        abstained: r.abstained,
        self_confidence: r.selfConfidence,
        rationale: r.rationale,
        verifier: r.verdicts.map((v) => `${v.check}: ${v.status} — ${v.detail}`),
        error: r.error ?? null,
      })),
      null,
      1,
    );
    results.push(await runAgent(reasoner, 'corroboration', payload, upstream, upstreamJson));
  }

  return {
    generated: new Date().toISOString(),
    model: `${reasoner.name}:${model}`,
    siteId: opts.siteId ?? null,
    results,
    totalMs: Date.now() - started,
    note:
      'Advisory proposals for operator review. Each is inert until applied, and applying is ' +
      'logged against the value it replaced. Not an autonomous dispatch order.',
  };
}
