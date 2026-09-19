/* OpenRouter model selection and response recovery, tested without the network. */
import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  extractJson,
  keyIsFreeOnly,
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

test('a free-only key restricts the pick to :free routes, structured output first', () => {
  const cat = [
    m('anthropic/claude-opus-5'),
    m('deepseek/deepseek-r1:free', ['temperature']),
    m('meta-llama/llama-3.3-70b-instruct:free'),
    m('qwen/qwen3.8-27b:free'),
  ];
  assert.equal(pickOpenRouterModel(cat, false), 'anthropic/claude-opus-5');
  // deepseek is preferred but does not advertise structured output; qwen does and outranks llama
  assert.equal(pickOpenRouterModel(cat, true), 'qwen/qwen3.8-27b:free');
  // the real catalogue id, structured, wins outright
  assert.equal(
    pickOpenRouterModel([...cat, m('deepseek/deepseek-v4-flash-0731:free')], true),
    'deepseek/deepseek-v4-flash-0731:free',
  );
});

test('with no structured-output :free route, any :free route is accepted rather than a paid one', () => {
  const cat = [m('openai/gpt-5'), m('deepseek/deepseek-r1:free', ['temperature'])];
  assert.equal(pickOpenRouterModel(cat, true), 'deepseek/deepseek-r1:free');
});

test('keyIsFreeOnly reads is_free_tier, or an exhausted hard limit', () => {
  assert.equal(keyIsFreeOnly(null), false);
  assert.equal(keyIsFreeOnly({ is_free_tier: true }), true);
  assert.equal(keyIsFreeOnly({ is_free_tier: false, limit: 10, limit_remaining: 0 }), true);
  assert.equal(keyIsFreeOnly({ is_free_tier: false, limit: null, limit_remaining: null }), false);
});
