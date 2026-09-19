/* Incident review via the Athena agent.
 *
 * Athena's role is different from the five swarm agents and the difference is the point.
 * The swarm PROPOSES numbers, each gated by a verifier, each inert until applied. Athena
 * never proposes: it reads the finished run — proposals, verdicts, abstentions, the
 * operator's notes — and writes the paragraph an incident commander would want next to
 * the queue: what the ranking currently rests on, which verifier failed and why, what
 * evidence is missing. Its text touches no slider and enters no formula.
 *
 * Mechanically the agent is a headless MCP server that Stripe Projects provisioned
 * (athena/agents). One tool, `<slug>__get_response({ prompt })`, bearer-authenticated.
 * The tool name is discovered from tools/list rather than assumed, so a re-provisioned
 * agent with a new slug keeps working without a code change.
 */
import { athenaConfig } from './env';
import type { SwarmRunResult } from '../../src/core/swarm/proposal';

const TIMEOUT_MS = 55_000; // under the 60 s function limit, with room to answer

export interface ReviewRequest {
  run: SwarmRunResult;
  context: Record<string, unknown>;
  operatorNotes?: string | null;
}

export interface ReviewResult {
  text: string;
  agent: string;
  publicUrl: string | null;
  ms: number;
}

let toolName: string | null = null;

export async function rpc(method: string, params: unknown, signal: AbortSignal): Promise<unknown> {
  const cfg = athenaConfig();
  if (!cfg) throw new Error('Athena is not configured');
  const res = await fetch(cfg.mcpUrl, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${cfg.apiKey}`,
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
    },
    body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method, params }),
    signal,
  });
  if (!res.ok) throw new Error(`Athena MCP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const body = (await res.json()) as { result?: unknown; error?: { message?: string } };
  if (body.error) throw new Error(`Athena MCP error: ${body.error.message ?? 'unspecified'}`);
  return body.result;
}

export async function resolveTool(signal: AbortSignal): Promise<string> {
  if (toolName) return toolName;
  const result = (await rpc('tools/list', {}, signal)) as { tools?: { name: string }[] };
  const found = (result.tools ?? []).find((t) => t.name.endsWith('__get_response'));
  if (!found) throw new Error('Athena agent exposes no get_response tool');
  toolName = found.name;
  return toolName;
}

/** One prompt in, the agent's text out. Shared by the reasoner (per-agent proposals) and
 *  the reviewer (the closing paragraph); both are just this call with different prompts. */
export async function askAthena(
  prompt: string,
  timeoutMs = TIMEOUT_MS,
): Promise<{ text: string; agent: string; ms: number }> {
  const started = Date.now();
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const name = await resolveTool(ctl.signal);
    const result = (await rpc('tools/call', { name, arguments: { prompt } }, ctl.signal)) as {
      isError?: boolean;
      structuredContent?: { text?: string; rawResult?: { botName?: string } };
      content?: { type: string; text?: string }[];
    };
    const text =
      result.structuredContent?.text ?? result.content?.find((c) => c.type === 'text')?.text ?? '';
    if (result.isError || !text.trim()) throw new Error('Athena returned no text');
    return {
      text: text.trim(),
      agent: result.structuredContent?.rawResult?.botName ?? 'Athena',
      ms: Date.now() - started,
    };
  } finally {
    clearTimeout(timer);
  }
}

/** What Athena is shown: the run as the operator sees it, not the raw cloud. Kept
 *  compact so the answer comes back inside the function limit. */
export function buildReviewPrompt(req: ReviewRequest): string {
  const ctx = req.context as {
    site?: Record<string, unknown> | null;
    scan?: Record<string, unknown> | null;
    ranking?: unknown[];
    geometry?: { planes?: unknown[]; debris?: unknown; residual_fraction?: number } | null;
  };
  const results = req.run.results.map((r) => ({
    agent: r.key,
    parameter: r.param,
    proposed: r.abstained ? 'ABSTAINED' : r.value,
    verified: r.verified,
    self_confidence: r.selfConfidence,
    rationale: r.rationale,
    verdicts: r.verdicts.map((v) => `${v.check}: ${v.status} — ${v.detail}`),
    error: r.error ?? null,
  }));
  const geometry = ctx.geometry
    ? {
        planes: ctx.geometry.planes?.length ?? 0,
        debris: ctx.geometry.debris ?? null,
        residual_fraction: ctx.geometry.residual_fraction ?? null,
      }
    : null;
  return [
    'Review this savesplat swarm run for the incident commander. Answer in at most five short',
    'sentences, plain prose, no headings: (1) what the current rho ranking for this site rests',
    'on, (2) which verifiers failed or which agents abstained and what that means, (3) the one',
    'thing the operator should do next. Cite field names. Do not invent numbers.',
    '',
    `site: ${JSON.stringify(ctx.site ?? null)}`,
    `scan: ${JSON.stringify(ctx.scan ?? null)}`,
    `geometry_summary: ${JSON.stringify(geometry)}`,
    `ranking: ${JSON.stringify(ctx.ranking ?? [])}`,
    `operator_notes: ${JSON.stringify(req.operatorNotes?.trim() || null)}`,
    `swarm_results: ${JSON.stringify(results)}`,
  ].join('\n');
}

export async function reviewRun(req: ReviewRequest): Promise<ReviewResult> {
  const cfg = athenaConfig();
  if (!cfg) throw new Error('Athena is not configured');
  const r = await askAthena(buildReviewPrompt(req));
  return { text: r.text, agent: r.agent, publicUrl: cfg.publicUrl, ms: r.ms };
}
