/* Which reasoner to use. SWARM_PROVIDER pins it; otherwise whichever key is present wins,
 * so adding a key is the whole setup step. */
import { AnthropicReasoner } from './anthropic';
import { OpenAIReasoner } from './openai';
import type { Reasoner } from './types';

export type ProviderName = 'openai' | 'anthropic';

export class MissingKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingKeyError';
  }
}

export function detectProvider(): ProviderName | null {
  const pinned = process.env.SWARM_PROVIDER?.toLowerCase();
  if (pinned === 'openai' || pinned === 'anthropic') return pinned;
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  return null;
}

export function getReasoner(): Reasoner {
  const which = detectProvider();
  if (which === 'openai') {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new MissingKeyError('SWARM_PROVIDER=openai but OPENAI_API_KEY is not set.');
    return new OpenAIReasoner(key);
  }
  if (which === 'anthropic') {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key)
      throw new MissingKeyError('SWARM_PROVIDER=anthropic but ANTHROPIC_API_KEY is not set.');
    return new AnthropicReasoner(key);
  }
  throw new MissingKeyError(
    'No API key found. Put OPENAI_API_KEY (or ANTHROPIC_API_KEY) in .env.local at the repo ' +
      'root — it is already gitignored — and restart the dev server.',
  );
}

export type { Reasoner } from './types';
export { ProviderError } from './types';
