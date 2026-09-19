/* The reasoner. Runs in Node, never in the browser.
 *
 * The API key is the reason this file exists server-side. Anything bundled by Vite is
 * readable by anyone who opens the page, so the key is read from process.env here and the
 * browser talks to a local endpoint instead. That also keeps `dangerouslyAllowBrowser` out
 * of the codebase, which is the setting you only reach for when the key is already leaked.
 *
 * Shape: the four evidence agents are independent and run in parallel; corroboration runs
 * afterwards because it judges their output. No shared mutable state, every agent read-only
 * over the same payload.
 */
import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { SWARM_AGENTS, agentByKey } from '../../src/core/swarm/agents';
import type { AgentKey } from '../../src/core/swarm/agents';
import { AGENT_PROMPTS, buildUserMessage } from '../../src/core/swarm/prompts';
import { proposalSchemaFor } from '../../src/core/swarm/proposal';
import type { AgentResult, RawProposal, SwarmRunResult } from '../../src/core/swarm/proposal';
import { isVerified, verify } from '../../src/core/swarm/verify';

export const DEFAULT_MODEL = 'claude-opus-5';
const EVIDENCE_AGENTS: AgentKey[] = ['morphology', 'volume', 'access', 'records'];

export interface RunOptions {
  context: Record<string, unknown>;
  operatorNotes?: string | null;
  siteId?: number | null;
  model?: string;
  effort?: 'low' | 'medium' | 'high' | 'xhigh' | 'max';
  /** restrict the run to these agents; defaults to all five */
  only?: AgentKey[];
}

export class MissingKeyError extends Error {
  constructor() {
    super(
      'ANTHROPIC_API_KEY is not set. Put it in .env.local at the repo root ' +
        '(already gitignored) as ANTHROPIC_API_KEY=sk-ant-... and restart the dev server.',
    );
    this.name = 'MissingKeyError';
  }
}

function client(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) throw new MissingKeyError();
  return new Anthropic();
}

/** One agent, one call. Returns a result even on failure — a dead agent must not take the
 *  swarm down, and the operator needs to see which one died and why. */
async function runAgent(
  anthropic: Anthropic,
  key: AgentKey,
  payload: Record<string, unknown>,
  opts: Required<Pick<RunOptions, 'model' | 'effort'>>,
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
    const response = await anthropic.messages.parse({
      model: opts.model,
      max_tokens: 16000,
      // Opus 5 thinks by default; stated explicitly so the intent survives a model swap.
      thinking: { type: 'adaptive' },
      system: AGENT_PROMPTS[key],
      output_config: {
        format: zodOutputFormat(proposalSchemaFor(agent.param)),
        effort: opts.effort,
      },
      messages: [
        {
          role: 'user',
          content: buildUserMessage(key, JSON.stringify(payload, null, 1), upstreamJson),
        },
      ],
    });

    // Always check why generation stopped before touching content.
    if (response.stop_reason === 'refusal') {
      const cat = response.stop_details?.category ?? 'unspecified';
      return {
        ...base,
        error: `model declined this request (category: ${cat})`,
        ms: Date.now() - started,
      };
    }

    const parsed = response.parsed_output as RawProposal | null;
    if (!parsed) {
      return {
        ...base,
        error:
          response.stop_reason === 'max_tokens'
            ? 'response hit max_tokens before the JSON was complete'
            : 'model returned no parseable proposal',
        ms: Date.now() - started,
      };
    }

    const verdicts = verify({ key, param: agent.param, proposal: parsed, payload, upstream });
    return {
      key,
      param: agent.param,
      value: parsed.abstain ? null : parsed.value,
      abstained: parsed.abstain,
      rationale: parsed.rationale,
      selfConfidence: parsed.self_confidence,
      evidenceUsed: parsed.evidence_used,
      verdicts,
      verified: isVerified(verdicts),
      usage: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
      },
      ms: Date.now() - started,
    };
  } catch (err) {
    return { ...base, error: describeError(err), ms: Date.now() - started };
  }
}

/** Most specific first — a 429 and a 400 call for different responses from the operator. */
function describeError(err: unknown): string {
  if (err instanceof MissingKeyError) return err.message;
  if (err instanceof Anthropic.AuthenticationError) {
    return 'the API key was rejected (401) — check ANTHROPIC_API_KEY in .env.local';
  }
  if (err instanceof Anthropic.RateLimitError) {
    return 'rate limited (429) — wait and re-run the swarm';
  }
  if (err instanceof Anthropic.BadRequestError) {
    return `request rejected (400): ${err.message}`;
  }
  if (err instanceof Anthropic.APIConnectionError) {
    return 'could not reach the API — check the network connection';
  }
  if (err instanceof Anthropic.APIError) {
    return `API error ${err.status}: ${err.message}`;
  }
  return err instanceof Error ? err.message : String(err);
}

export async function runSwarm(opts: RunOptions): Promise<SwarmRunResult> {
  const started = Date.now();
  const model = opts.model ?? process.env.SWARM_MODEL ?? DEFAULT_MODEL;
  const effort = opts.effort ?? (process.env.SWARM_EFFORT as RunOptions['effort']) ?? 'high';
  const wanted = opts.only ?? SWARM_AGENTS.map((a) => a.key);

  const payload: Record<string, unknown> = {
    ...opts.context,
    operator_notes: opts.operatorNotes?.trim() ? opts.operatorNotes.trim() : null,
  };

  const anthropic = client();
  const run = { model, effort: effort ?? 'high' } as Required<Pick<RunOptions, 'model' | 'effort'>>;

  // four independent agents, concurrently
  const evidence = await Promise.all(
    EVIDENCE_AGENTS.filter((k) => wanted.includes(k)).map((k) =>
      runAgent(anthropic, k, payload, run),
    ),
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
    results.push(
      await runAgent(anthropic, 'corroboration', payload, run, upstream, upstreamJson),
    );
  }

  return {
    generated: new Date().toISOString(),
    model,
    siteId: opts.siteId ?? null,
    results,
    totalMs: Date.now() - started,
    note:
      'Advisory proposals for operator review. Each is inert until applied, and applying is ' +
      'logged against the value it replaced. Not an autonomous dispatch order.',
  };
}
