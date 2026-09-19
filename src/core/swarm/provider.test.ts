/* Model selection and error classification are the two bits of provider logic with real
 * decisions in them, so they are tested without touching the network. */
import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  pickModel,
  plainVersion,
  isQuotaError,
  describe as describeErr,
} from '../../../server/swarm/providers/openai';

test('plainVersion only accepts bare gpt-N[.M] ids', () => {
  assert.equal(plainVersion('gpt-5'), 5);
  assert.equal(plainVersion('gpt-5.5'), 5.5);
  assert.equal(plainVersion('gpt-4.1'), 4.1);
  assert.equal(plainVersion('gpt-6-astra'), null, 'named variants are not plain versions');
  assert.equal(plainVersion('gpt-5-codex'), null);
  assert.equal(plainVersion('o3'), null);
});

test('pickModel takes the highest plain version available', () => {
  const ids = ['gpt-4o', 'gpt-5', 'gpt-5.1', 'gpt-5.5', 'gpt-5.5-pro', 'gpt-6-astra'];
  assert.equal(pickModel(ids), 'gpt-5.5');
});

test('pickModel skips mini/nano/codex/pro and other specialised tiers', () => {
  assert.equal(pickModel(['gpt-5-mini', 'gpt-5-nano', 'gpt-5-codex', 'gpt-5']), 'gpt-5');
  assert.equal(pickModel(['gpt-5.4-pro', 'gpt-5.2']), 'gpt-5.2');
});

test('pickModel falls back to a known family, preferring the stable alias', () => {
  assert.equal(pickModel(['gpt-4o-2024-05-13', 'gpt-4o', 'gpt-3.5-turbo']), 'gpt-4o');
  assert.equal(pickModel(['o3-2025-04-16', 'o3']), 'o3');
});

test('pickModel returns null rather than guessing when nothing is recognisable', () => {
  assert.equal(pickModel(['whisper-1', 'text-embedding-3-large']), null);
});

test('an exhausted balance is distinguished from a rate limit', () => {
  const quota = {
    status: 429,
    error: { type: 'insufficient_quota', code: 'credit_balance_exhausted' },
  };
  const limit = { status: 429, error: { type: 'rate_limit_error', message: 'slow down' } };
  assert.equal(isQuotaError(quota), true);
  assert.equal(isQuotaError(limit), false);
  assert.match(describeErr(quota), /no credits left/);
  assert.match(describeErr(quota), /key itself is valid/);
  assert.match(describeErr(limit), /retry shortly/);
});
