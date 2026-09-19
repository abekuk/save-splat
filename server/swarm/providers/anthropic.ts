/* Anthropic reasoner. Kept alongside the OpenAI one because the seam makes it nearly free,
 * and because the swarm should not be welded to whichever key happened to be at hand. */
import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { wireSchemaFor } from '../../../src/core/swarm/proposal';
import { ProviderError } from './types';
import type { Reasoner, ReasonerRequest, ReasonerResponse } from './types';

const DEFAULT_MODEL = 'claude-opus-5';

export class AnthropicReasoner implements Reasoner {
  readonly name = 'anthropic';
  private client: Anthropic;
  private resolved: string | null = null;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  /** Same discipline as the OpenAI side: confirm the account can actually reach the model
   *  before a run depends on it, so an unavailable id is a clear message at status time
   *  rather than a 404 five agents deep. */
  async model(): Promise<string> {
    if (this.resolved) return this.resolved;
    const pinned = process.env.SWARM_MODEL;
    if (pinned) {
      this.resolved = pinned;
      return pinned;
    }
    let ids: string[];
    try {
      const list = await this.client.models.list({ limit: 100 });
      ids = list.data.map((m) => m.id);
    } catch {
      // listing is a convenience, not a requirement — fall back to the default and let
      // the actual request report the real failure
      this.resolved = DEFAULT_MODEL;
      return DEFAULT_MODEL;
    }
    if (ids.length === 0 || ids.includes(DEFAULT_MODEL)) {
      this.resolved = DEFAULT_MODEL;
      return DEFAULT_MODEL;
    }
    throw new ProviderError(
      `${DEFAULT_MODEL} is not available to this key. Set SWARM_MODEL to one of: ` +
        `${ids.slice(0, 12).join(', ')}${ids.length > 12 ? ` (+${ids.length - 12} more)` : ''}`,
    );
  }

  async complete(req: ReasonerRequest): Promise<ReasonerResponse> {
    const model = await this.model();
    const effort = (process.env.SWARM_EFFORT ?? 'high') as
      'low' | 'medium' | 'high' | 'xhigh' | 'max';
    try {
      const response = await this.client.messages.parse({
        model,
        max_tokens: 16000,
        thinking: { type: 'adaptive' },
        system: req.system,
        output_config: { format: zodOutputFormat(wireSchemaFor(req.param)), effort },
        messages: [{ role: 'user', content: req.user }],
      });
      if (response.stop_reason === 'refusal') {
        throw new ProviderError(
          `model declined this request (category: ${response.stop_details?.category ?? 'unspecified'})`,
        );
      }
      if (response.stop_reason === 'max_tokens') {
        throw new ProviderError('response hit max_tokens before the JSON was complete');
      }
      return {
        raw: response.parsed_output ?? null,
        usage: { input: response.usage.input_tokens, output: response.usage.output_tokens },
      };
    } catch (err) {
      if (err instanceof ProviderError) throw err;
      throw new ProviderError(describe(err), isRetryable(err));
    }
  }
}

function isRetryable(err: unknown): boolean {
  return (
    err instanceof Anthropic.RateLimitError ||
    (err instanceof Anthropic.APIError && (err.status ?? 0) >= 500)
  );
}

function describe(err: unknown): string {
  if (err instanceof Anthropic.AuthenticationError) {
    return 'the API key was rejected (401) — check ANTHROPIC_API_KEY in .env.local';
  }
  if (err instanceof Anthropic.RateLimitError) return 'rate limited (429)';
  if (err instanceof Anthropic.BadRequestError) return `request rejected (400): ${err.message}`;
  if (err instanceof Anthropic.APIConnectionError) return 'could not reach the API';
  if (err instanceof Anthropic.APIError) return `API error ${err.status}: ${err.message}`;
  return err instanceof Error ? err.message : String(err);
}
