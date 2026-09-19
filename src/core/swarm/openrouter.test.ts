/* OpenRouter model selection and response recovery, tested without the network. */
import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  extractJson,
  pickOpenRouterModel,
  supportsStructuredOutput,
  describe as describeErr,
} from '../../../server/swarm/providers/openrouter';

const m = (id: string, params: string[] = ['response_format', 'structured_outputs']) => ({
  id,
  supported_parameters: params,
});

test('only models advertising structured output are candidates', () => {
  assert.equal(supportsStructuredOutput(m('x', ['structured_outputs'])), true);
  assert.equal(supportsStructuredOutput(m('x', ['response_format'])), true);
  assert.equal(supportsStructuredOutput(m('x', ['temperature'])), false);
  assert.equal(supportsStructuredOutput({ id: 'x' }), false);
});

test('preference order is honoured, and the bare alias beats a dated snapshot', () => {
  const picked = pickOpenRouterModel([
    m('openai/gpt-5'),
    m('anthropic/claude-sonnet-5'),
    m('anthropic/claude-opus-5-20260901'),
    m('anthropic/claude-opus-5'),
  ]);
  assert.equal(picked, 'anthropic/claude-opus-5');
});

test('a preferred model without structured output is skipped, not chosen', () => {
  const picked = pickOpenRouterModel([
    m('anthropic/claude-opus-5', ['temperature']),
    m('openai/gpt-5'),
  ]);
  assert.equal(picked, 'openai/gpt-5');
});

test('nothing recognisable yields null rather than a guess', () => {
  assert.equal(pickOpenRouterModel([m('mistralai/mistral-small'), m('meta-llama/llama-3')]), null);
});

test('extractJson tolerates a fenced or padded body but still returns parsed JSON', () => {
  assert.deepEqual(extractJson('{"a":1}'), { a: 1 });
  assert.deepEqual(extractJson('```json\n{"a":1}\n```'), { a: 1 });
  assert.deepEqual(extractJson('Sure: {"a":1} — done'), { a: 1 });
  assert.throws(() => extractJson('no json here'));
});

test('402 is reported as exhausted credits, distinct from a rate limit', () => {
  assert.match(describeErr({ status: 402 }), /no credits left/);
  assert.match(describeErr({ status: 429, error: { message: 'slow' } }), /retry shortly/);
  assert.match(describeErr({ status: 401 }), /OPENROUTER_API_KEY/);
});
