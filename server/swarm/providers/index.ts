/* Which reasoner to use. SWARM_PROVIDER pins it; otherwise whichever key is present wins,
 * so adding a key is the whole setup step. Athena is checked first: it is the agent Stripe
 * Projects provisioned, it has no credit balance to run dry, and `stripe projects env
 * --pull` is the whole setup. OpenRouter/OpenAI/Anthropic remain one env var away. */
import { athenaConfig } from '../env';
import { AnthropicReasoner } from './anthropic';
import { AthenaReasoner } from './athena';
import { OpenAIReasoner } from './openai';
import { OpenRouterReasoner } from './openrouter';
import { normalizeEnv } from '../env';
import type { Reasoner } from './types';

export type ProviderName = 'athena' | 'openrouter' | 'openai' | 'anthropic';

export const KEY_ENV: Record<ProviderName, string> = {
  athena: 'ATHENA_ATHENA_AGENT_API_KEY',
  openrouter: 'OPENROUTER_API_KEY',
  openai: 'OPENAI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
};

const ORDER: ProviderName[] = ['athena', 'openrouter', 'openai', 'anthropic'];

export class MissingKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingKeyError';
  }
}

function isProvider(s: string | undefined): s is ProviderName {
  return s === 'athena' || s === 'openrouter' || s === 'openai' || s === 'anthropic';
}

function hasKey(p: ProviderName): boolean {
  // Athena needs the MCP URL as well as the key; the others are one variable
  return p === 'athena' ? athenaConfig() !== null : !!process.env[KEY_ENV[p]];
}

export function detectProvider(): ProviderName | null {
  normalizeEnv();
  const pinned = process.env.SWARM_PROVIDER?.toLowerCase();
  if (isProvider(pinned)) return pinned;
  for (const p of ORDER) if (hasKey(p)) return p;
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
  if (!hasKey(which)) {
    throw new MissingKeyError(`SWARM_PROVIDER=${which} but ${KEY_ENV[which]} is not set.`);
  }
  if (which === 'athena') return new AthenaReasoner();
  const key = process.env[KEY_ENV[which]] as string;
  if (which === 'openrouter') return new OpenRouterReasoner(key);
  if (which === 'openai') return new OpenAIReasoner(key);
  return new AnthropicReasoner(key);
}

export type { Reasoner } from './types';
export { ProviderError } from './types';
