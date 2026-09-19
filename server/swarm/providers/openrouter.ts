/* OpenRouter reasoner.
 *
 * OpenRouter speaks the OpenAI chat-completions dialect, so the SDK is reused with a
 * different base URL. This is the provider Stripe Projects provisions (`openrouter/api`),
 * which is why it is first in the detection order: pulling the project's env is meant to be
 * the whole setup step.
 *
 * Model choice is resolved against the catalogue rather than hardcoded, for the same reason
 * as the OpenAI side: an id the account cannot route is a confusing 404 at the worst moment,
 * and OpenRouter's line-up changes weekly. We take the first preference that the catalogue
 * lists as supporting structured output, and we prefer the bare alias over a dated snapshot.
 */
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { wireSchemaFor } from '../../../src/core/swarm/proposal';
import { ProviderError } from './types';
import type { Reasoner, ReasonerRequest, ReasonerResponse } from './types';

export const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
/** Under the 60 s function limit with room for the response to be parsed and verified. */
export const REQUEST_TIMEOUT_MS = 45_000;

/** In order. General reasoning models only; anything cheaper or more specialised can still
 *  be pinned with SWARM_MODEL. */
const PAID_PREFERENCE: RegExp[] = [
  /^anthropic\/claude-opus-5/,
  /^anthropic\/claude-sonnet-5/,
  /^openai\/gpt-5(?:\.\d+)?$/,
  /^anthropic\/claude-opus-4/,
  /^anthropic\/claude-sonnet-4/,
  /^openai\/gpt-4\.1$/,
  /^google\/gemini-2\.5-pro/,
];

/** For a key with no purchased credits — which is what Stripe Projects' `openrouter/free`
 *  plan issues — only `:free` routes will answer. Same idea: strongest general reasoner
 *  first, and the Zod gate downstream still rejects anything that does not fit. */
const FREE_PREFERENCE: RegExp[] = [
  // measured 2026-09-19 on the openrouter/free key: deepseek-v4-flash answered a strict
  // JSON-schema request in 2.5 s; nex-n2.5-pro in 0.6 s; qwen3.8-27b in 6.6 s and stalled
  // on a long agent prompt; gemma routes returned 429; nemotron ignored response_format
  /^deepseek\/deepseek-[a-z0-9.-]+:free$/,
  /^nex-agi\/nex-[a-z0-9.-]*pro[a-z0-9.-]*:free$/,
  /^qwen\/qwen[0-9.]+[a-z0-9.-]*:free$/,
  /^dots-studio\/[a-z0-9.-]+:free$/,
  /^meta-llama\/llama-[0-9.]+-[0-9]+b[a-z0-9.-]*:free$/,
  /^[a-z0-9-]+\/[a-z0-9.-]+:free$/,
];

export interface CatalogueModel {
  id: string;
  supported_parameters?: string[];
}

export interface KeyInfo {
  is_free_tier?: boolean;
  limit?: number | null;
  limit_remaining?: number | null;
  usage?: number;
}

/** Whether this key can be billed for paid routes at all. OpenRouter reports
 *  `is_free_tier` when no credits have ever been bought; a hard limit that is spent is
 *  the same situation in practice. Unknown means assume paid and let a 402 explain. */
export function keyIsFreeOnly(info: KeyInfo | null): boolean {
  if (!info) return false;
  if (info.is_free_tier) return true;
  return typeof info.limit_remaining === 'number' && info.limit_remaining <= 0;
}

/** Whether the catalogue says this model honours a JSON-schema response_format. Agents
 *  must answer in a fixed shape, so a model that cannot promise that is not a candidate. */
export function supportsStructuredOutput(m: CatalogueModel): boolean {
  const p = m.supported_parameters ?? [];
  return p.includes('structured_outputs') || p.includes('response_format');
}

/** First preference present in the catalogue, shortest id first within a family so the
 *  stable alias wins over a dated snapshot. Null rather than a guess when nothing matches.
 *  On a free-only key the search is restricted to `:free` routes; if none of those
 *  advertise structured output, any `:free` route is accepted and the Zod gate does the
 *  rest — a free answer that gets rejected is better than a paid one that gets a 402. */
export function pickOpenRouterModel(models: CatalogueModel[], freeOnly = false): string | null {
  const ids = models.map((m) => m.id);
  const structured = models.filter(supportsStructuredOutput).map((m) => m.id);
  const search = (prefs: RegExp[], pool: string[]): string | null => {
    for (const re of prefs) {
      const hits = pool.filter((id) => re.test(id)).sort((a, b) => a.length - b.length);
      if (hits.length) return hits[0];
    }
    return null;
  };
  if (freeOnly) {
    const free = (pool: string[]) => pool.filter((id) => id.endsWith(':free'));
    return search(FREE_PREFERENCE, free(structured)) ?? search(FREE_PREFERENCE, free(ids));
  }
  return search(PAID_PREFERENCE, structured);
}

/** Some routed models wrap JSON in a fence even under response_format. The handler still
 *  validates with Zod afterwards, so this only has to recover the text, not trust it. */
export function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fenced = /^```(?:json)?\s*([\s\S]*?)\s*```$/i.exec(trimmed);
  const body = fenced ? fenced[1] : trimmed;
  try {
    return JSON.parse(body);
  } catch {
    const start = body.indexOf('{');
    const end = body.lastIndexOf('}');
    if (start >= 0 && end > start) return JSON.parse(body.slice(start, end + 1));
    throw new ProviderError('model returned text that was not JSON');
  }
}

export class OpenRouterReasoner implements Reasoner {
  readonly name = 'openrouter';
  private client: OpenAI;
  private resolved: string | null = null;

  constructor(private apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      baseURL: OPENROUTER_BASE_URL,
      // free routes can stall indefinitely; a stalled agent must become an error the operator
      // can see, not a request that outlives the function. No SDK retries: the handler
      // already reports per-agent failures and a retry would double the wait.
      timeout: REQUEST_TIMEOUT_MS,
      maxRetries: 0,
      // attribution headers OpenRouter asks for; harmless elsewhere
      defaultHeaders: {
        'HTTP-Referer': process.env.SWARM_APP_URL ?? 'https://github.com/forkiron/save-splat',
        'X-Title': 'savesplat swarm',
      },
    });
  }

  async model(): Promise<string> {
    if (this.resolved) return this.resolved;
    const pinned = process.env.SWARM_MODEL;
    if (pinned) {
      this.resolved = pinned;
      return pinned;
    }
    const headers = { authorization: `Bearer ${this.apiKey}` };
    let models: CatalogueModel[];
    try {
      const res = await fetch(`${OPENROUTER_BASE_URL}/models`, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = (await res.json()) as { data?: CatalogueModel[] };
      models = body.data ?? [];
    } catch (err) {
      throw new ProviderError(`could not read the OpenRouter model catalogue: ${describe(err)}`);
    }
    // what this key can pay for decides which half of the catalogue is real for it
    let info: KeyInfo | null = null;
    try {
      const res = await fetch(`${OPENROUTER_BASE_URL}/auth/key`, { headers });
      if (res.ok) info = ((await res.json()) as { data?: KeyInfo }).data ?? null;
    } catch {
      info = null; // unknown: assume paid and let a 402 explain itself
    }
    const freeOnly = keyIsFreeOnly(info);
    const picked = pickOpenRouterModel(models, freeOnly);
    if (!picked) {
      const sample = models
        .filter((m) => (freeOnly ? m.id.endsWith(':free') : supportsStructuredOutput(m)))
        .slice(0, 12)
        .map((m) => m.id);
      throw new ProviderError(
        `no preferred ${freeOnly ? ':free ' : ''}model found on OpenRouter — set SWARM_MODEL ` +
          `explicitly. Candidates: ${sample.join(', ')}`,
      );
    }
    this.resolved = picked;
    return picked;
  }

  async complete(req: ReasonerRequest): Promise<ReasonerResponse> {
    const model = await this.model();
    try {
      const completion = await this.client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: req.system },
          { role: 'user', content: req.user },
        ],
        response_format: zodResponseFormat(wireSchemaFor(req.param), 'proposal'),
      });
      // OpenRouter can report an upstream failure inside a 200 body
      const inBody = (completion as unknown as { error?: { message?: string; code?: number } })
        .error;
      if (inBody) {
        throw new ProviderError(
          `upstream error via OpenRouter${inBody.code ? ` (${inBody.code})` : ''}: ` +
            `${inBody.message ?? 'unspecified'}`,
          inBody.code === 429 || (inBody.code ?? 0) >= 500,
        );
      }
      const choice = completion.choices[0];
      if (choice?.message.refusal) {
        throw new ProviderError(`model declined this request: ${choice.message.refusal}`);
      }
      if (choice?.finish_reason === 'length') {
        throw new ProviderError('response was cut off before the JSON was complete');
      }
      const content = choice?.message.content;
      if (typeof content !== 'string' || !content.trim()) {
        throw new ProviderError('model returned an empty response');
      }
      return {
        raw: extractJson(content),
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

type ApiErrorish = { status?: number; error?: { code?: number | string; message?: string } };

function isRetryable(err: unknown): boolean {
  const status = (err as ApiErrorish).status;
  return status === 429 || (typeof status === 'number' && status >= 500);
}

export function describe(err: unknown): string {
  const e = err as ApiErrorish;
  const status = e?.status;
  const msg = e?.error?.message ?? (err instanceof Error ? err.message : String(err));
  if (status === 401) return 'the API key was rejected (401) — check OPENROUTER_API_KEY';
  if (status === 402) {
    return (
      'this OpenRouter key has no credits left (402). The key itself is valid; top up at ' +
      'https://openrouter.ai/settings/credits or pin a free model with SWARM_MODEL.'
    );
  }
  if (status === 429) return `rate limited (429) — retry shortly: ${msg}`;
  if (status === 404) return `model not routable for this key (404): ${msg}`;
  if (status === 400) return `request rejected (400): ${msg}`;
  return msg;
}
