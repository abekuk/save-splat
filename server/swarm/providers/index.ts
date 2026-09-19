/* Which reasoner to use. SWARM_PROVIDER pins it; otherwise whichever key is present wins,
 * so adding a key is the whole setup step. OpenRouter is checked first because it is the
 * provider Stripe Projects provisions — `stripe projects env --pull` should be enough. */
import { AnthropicReasoner } from './anthropic';
import { OpenAIReasoner } from './openai';
import { OpenRouterReasoner } from './openrouter';
import type { Reasoner } from './types';

export type ProviderName = 'openrouter' | 'openai' | 'anthropic';

export const KEY_ENV: Record<ProviderName, string> = {
  openrouter: 'OPENROUTER_API_KEY',
  openai: 'OPENAI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
};

const ORDER: ProviderName[] = ['openrouter', 'openai', 'anthropic'];

export class MissingKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingKeyError';
  }
}

function isProvider(s: string | undefined): s is ProviderName {
  return s === 'openrouter' || s === 'openai' || s === 'anthropic';
}

export function detectProvider(): ProviderName | null {
  const pinned = process.env.SWARM_PROVIDER?.toLowerCase();
  if (isProvider(pinned)) return pinned;
  for (const p of ORDER) if (process.env[KEY_ENV[p]]) return p;
  return null;
}

export function getReasoner(): Reasoner {
  const which = detectProvider();
  if (!which) {
    throw new MissingKeyError(
      `No API key found. Put ${ORDER.map((p) => KEY_ENV[p]).join(', ')} (any one) in .env.local ` +
        'at the repo root — it is already gitignored — or run `stripe projects env --pull`, ' +
        'then restart the dev server.',
    );
  }
  const key = process.env[KEY_ENV[which]];
  if (!key) throw new MissingKeyError(`SWARM_PROVIDER=${which} but ${KEY_ENV[which]} is not set.`);
  if (which === 'openrouter') return new OpenRouterReasoner(key);
  if (which === 'openai') return new OpenAIReasoner(key);
  return new AnthropicReasoner(key);
}

export type { Reasoner } from './types';
export { ProviderError } from './types';
