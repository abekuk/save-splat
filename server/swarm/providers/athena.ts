/* Athena as the reasoner.
 *
 * Athena is a hosted agent reached over MCP, not a raw model API, so there is no
 * response_format to lean on. The contract is enforced the same way regardless: the
 * prompt states the exact JSON shape, the reply is stripped of any prose or fence, and
 * parseRawProposal in the handler is the only way a value gets in. A reply that does not
 * parse is a rejected proposal with a readable reason, exactly like a bad number.
 *
 * Why it can be the default anyway: it is the provider Stripe Projects hands us with no
 * credits to top up and no per-day request cap we have hit, and the agent's own
 * instructions already carry the savesplat framing. The five agent prompts are still
 * sent verbatim, so the per-parameter discipline (evidence paths, abstain rules) is
 * unchanged from the other providers.
 */
import { askAthena, resolveTool } from '../athena';
import { extractJson } from './openrouter';
import { ProviderError } from './types';
import type { Reasoner, ReasonerRequest, ReasonerResponse } from './types';
import type { AgentParam } from '../../../src/core/swarm/agents';

const AGENT_TIMEOUT_MS = 50_000;

/** The wire shape, spelled out per parameter because there is no schema channel. */
const VALUE_SHAPE: Record<AgentParam, string> = {
  n: 'an integer from 0 to 50, or null when abstaining',
  r: 'a number from 0 to 1, or null when abstaining',
  tau: 'a number from 0.5 to 24, or null when abstaining',
  type: 'one of "pancake" | "mixed" | "lean", or null when abstaining',
  conf: 'one of "low" | "med" | "high", or null when abstaining',
};

export function buildAthenaPrompt(req: ReasonerRequest): string {
  return [
    req.system,
    '',
    req.user,
    '',
    'OUTPUT FORMAT — this is machine-parsed. Reply with ONE JSON object and nothing else:',
    'no prose before or after, no markdown fence, no comments. Shape:',
    '{',
    '  "abstain": boolean,',
    `  "value": ${VALUE_SHAPE[req.param]},`,
    '  "self_confidence": "low" | "med" | "high",',
    '  "rationale": string (at most three sentences),',
    '  "evidence_used": string[] (payload paths you actually used)',
    '}',
  ].join('\n');
}

export class AthenaReasoner implements Reasoner {
  readonly name = 'athena';
  private resolved: string | null = null;

  /** The agent slug stands in for a model id; resolving it also proves the key works. */
  async model(): Promise<string> {
    if (this.resolved) return this.resolved;
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 15_000);
    try {
      const tool = await resolveTool(ctl.signal);
      this.resolved = tool.replace(/__get_response$/, '');
      return this.resolved;
    } catch (err) {
      throw new ProviderError(
        `Athena agent unreachable: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      clearTimeout(timer);
    }
  }

  async complete(req: ReasonerRequest): Promise<ReasonerResponse> {
    let text: string;
    try {
      ({ text } = await askAthena(buildAthenaPrompt(req), AGENT_TIMEOUT_MS));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new ProviderError(
        /abort/i.test(msg) ? 'Athena did not answer within the time limit' : msg,
        /abort|429|5\d\d/.test(msg),
      );
    }
    let raw: unknown;
    try {
      raw = extractJson(text);
    } catch {
      throw new ProviderError(`Athena replied with prose instead of JSON: ${text.slice(0, 160)}`);
    }
    // Athena reports no token counts over MCP
    return { raw, usage: { input: 0, output: 0 } };
  }
}
