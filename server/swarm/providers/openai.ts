/* OpenAI reasoner.
 *
 * Model choice is resolved against the account rather than hardcoded: SWARM_MODEL wins if
 * set, otherwise we ask /v1/models what this key can reach and take the first match by
 * preference. Guessing an id that the account cannot use is a confusing 404 at the worst
 * possible moment, and model line-ups move faster than this file will.
 */
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { wireSchemaFor } from '../../../src/core/swarm/proposal';
import { ProviderError } from './types';
import type { Reasoner, ReasonerRequest, ReasonerResponse } from './types';

/* Specialised or cost-tier variants: excluded from auto-selection so the default is a
 * general reasoning model. Any of them can still be pinned explicitly via SWARM_MODEL. */
const SPECIALISED = /-(mini|nano|codex|pro|chat-latest|live|preview)/;
const FALLBACK_PREFIXES = ['o4', 'o3', 'gpt-4.1', 'gpt-4o'];

/** "gpt-5.5" -> 5.5, "gpt-5" -> 5, "gpt-6-astra" -> null (named variant, not a plain version). */
export function plainVersion(id: string): number | null {
  const m = /^gpt-(\d+)(?:\.(\d+))?$/.exec(id);
  if (!m) return null;
  return Number(m[2] ? `${m[1]}.${m[2]}` : m[1]);
}

/** Highest plain gpt-N[.M] the account can reach, else the first fallback family present.
 *  Deliberately conservative: it will not auto-select a named or cost-tier variant it
 *  cannot reason about, it takes the stable alias over a dated snapshot, and it reports
 *  what it found rather than failing silently. */
export function pickModel(ids: string[]): string | null {
  const usable = ids.filter((id) => !SPECIALISED.test(id));
  let best: { id: string; v: number } | null = null;
  for (const id of usable) {
    const v = plainVersion(id);
    if (v === null) continue;
    if (!best || v > best.v) best = { id, v };
  }
  if (best) return best.id;
  for (const pref of FALLBACK_PREFIXES) {
    // prefer the bare alias (shortest id) over a dated snapshot
    const matches = usable.filter((id) => id.startsWith(pref)).sort((a, b) => a.length - b.length);
    if (matches.length) return matches[0];
  }
  return null;
}

export class OpenAIReasoner implements Reasoner {
  readonly name = 'openai';
  private client: OpenAI;
  private resolved: string | null = null;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async model(): Promise<string> {
    if (this.resolved) return this.resolved;
    const pinned = process.env.SWARM_MODEL;
    if (pinned) {
      this.resolved = pinned;
      return pinned;
    }
    let ids: string[];
    try {
      const list = await this.client.models.list();
      ids = list.data.map((m) => m.id);
    } catch (err) {
      throw new ProviderError(`could not list models for this key: ${describe(err)}`);
    }
    const picked = pickModel(ids);
    if (!picked) {
      throw new ProviderError(
        `no general chat model found for this key — set SWARM_MODEL explicitly. ` +
          `Available: ${ids.slice(0, 15).join(', ')}${ids.length > 15 ? ` (+${ids.length - 15} more)` : ''}`,
      );
    }
    this.resolved = picked;
    return picked;
  }

  async complete(req: ReasonerRequest): Promise<ReasonerResponse> {
    const model = await this.model();
    try {
      const schema = (req.schema ?? wireSchemaFor(req.param!)) as Parameters<
        typeof zodResponseFormat
      >[0];
      const parts: { type: 'text'; text: string }[] | unknown[] = req.images?.length
        ? [
            ...req.images.map((img) => ({
              type: 'image_url' as const,
              image_url: { url: `data:${img.mediaType};base64,${img.data}` },
            })),
            { type: 'text' as const, text: req.user },
          ]
        : [{ type: 'text' as const, text: req.user }];

      const completion = await this.client.chat.completions.parse({
        model,
        messages: [
          { role: 'system', content: req.system },
          { role: 'user', content: parts as never },
        ],
        response_format: zodResponseFormat(schema, 'proposal'),
      });
      const choice = completion.choices[0];
      if (choice?.message.refusal) {
        throw new ProviderError(`model declined this request: ${choice.message.refusal}`);
      }
      if (choice?.finish_reason === 'length') {
        throw new ProviderError('response was cut off before the JSON was complete');
      }
      return {
        raw: choice?.message.parsed ?? null,
        usage: {
          input: completion.usage?.prompt_tokens ?? 0,
          output: completion.usage?.completion_tokens ?? 0,
        },
      };
    } catch (err) {
      if (err instanceof ProviderError) throw err;
      throw new ProviderError(describe(err), isRetryable(err));
    }
  }
}

type ApiErrorish = { status?: number; error?: { type?: string; code?: string; message?: string } };

/** A 429 means two completely different things and they need different responses:
 *  a real rate limit is worth retrying, an exhausted balance never is. */
export function isQuotaError(err: unknown): boolean {
  const e = err as ApiErrorish;
  return e?.error?.type === 'insufficient_quota' || e?.error?.code === 'credit_balance_exhausted';
}

function isRetryable(err: unknown): boolean {
  const status = (err as ApiErrorish).status;
  if (status === 429) return !isQuotaError(err);
  return typeof status === 'number' && status >= 500;
}

export function describe(err: unknown): string {
  const e = err as ApiErrorish;
  const status = e?.status;
  const msg = e?.error?.message ?? (err instanceof Error ? err.message : String(err));
  if (status === 401) return 'the API key was rejected (401) — check OPENAI_API_KEY in .env.local';
  if (isQuotaError(err)) {
    return (
      'this API key has no credits left, so no request will succeed until the account is ' +
      'topped up (429 insufficient_quota). The key itself is valid. ' +
      'Billing: https://platform.openai.com/settings/organization/billing/'
    );
  }
  if (status === 429) return `rate limited (429) — retry shortly: ${msg}`;
  if (status === 404) return `model not available to this key (404): ${msg}`;
  if (status === 400) return `request rejected (400): ${msg}`;
  return msg;
}
