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

/** In order. General reasoning models only; anything cheaper or more specialised can still
 *  be pinned with SWARM_MODEL. */
const PREFERENCE: RegExp[] = [
  /^anthropic\/claude-opus-5/,
  /^anthropic\/claude-sonnet-5/,
  /^openai\/gpt-5(?:\.\d+)?$/,
  /^anthropic\/claude-opus-4/,
  /^anthropic\/claude-sonnet-4/,
  /^openai\/gpt-4\.1$/,
  /^google\/gemini-2\.5-pro/,
];

export interface CatalogueModel {
  id: string;
  supported_parameters?: string[];
}

/** Whether the catalogue says this model honours a JSON-schema response_format. Agents
 *  must answer in a fixed shape, so a model that cannot promise that is not a candidate. */
export function supportsStructuredOutput(m: CatalogueModel): boolean {
  const p = m.supported_parameters ?? [];
  return p.includes('structured_outputs') || p.includes('response_format');
}

/** First preference present in the catalogue, shortest id first within a family so the
 *  stable alias wins over a dated snapshot. Null rather than a guess when nothing matches. */
export function pickOpenRouterModel(models: CatalogueModel[]): string | null {
  const usable = models.filter(supportsStructuredOutput).map((m) => m.id);
  for (const re of PREFERENCE) {
    const hits = usable.filter((id) => re.test(id)).sort((a, b) => a.length - b.length);
    if (hits.length) return hits[0];
  }
  return null;
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
    let models: CatalogueModel[];
    try {
      const res = await fetch(`${OPENROUTER_BASE_URL}/models`, {
        headers: { authorization: `Bearer ${this.apiKey}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = (await res.json()) as { data?: CatalogueModel[] };
      models = body.data ?? [];
    } catch (err) {
      throw new ProviderError(`could not read the OpenRouter model catalogue: ${describe(err)}`);
    }
    const picked = pickOpenRouterModel(models);
    if (!picked) {
      const sample = models
        .filter(supportsStructuredOutput)
        .slice(0, 12)
        .map((m) => m.id);
      throw new ProviderError(
        `no preferred model with structured output found on OpenRouter — set SWARM_MODEL ` +
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
