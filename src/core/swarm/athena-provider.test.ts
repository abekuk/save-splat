/* The Athena reasoner has no schema channel, so the prompt IS the contract. */
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { buildAthenaPrompt } from '../../../server/swarm/providers/athena';

test('the prompt carries the agent prompts verbatim and spells out the value shape', () => {
  const p = buildAthenaPrompt({ system: 'SYSTEM-TEXT', user: 'USER-TEXT', param: 'n' });
  assert.ok(p.startsWith('SYSTEM-TEXT'));
  assert.ok(p.includes('USER-TEXT'));
  assert.match(p, /"value": an integer from 0 to 50, or null when abstaining/);
  assert.match(p, /ONE JSON object and nothing else/);
});

test('each parameter gets its own value shape', () => {
  const shape = (param: 'n' | 'r' | 'tau' | 'type' | 'conf') =>
    /"value": ([^,]+),/.exec(buildAthenaPrompt({ system: '', user: '', param }))?.[1];
  assert.match(shape('r')!, /0 to 1/);
  assert.match(shape('tau')!, /0\.5 to 24/);
  assert.match(shape('type')!, /pancake/);
  assert.match(shape('conf')!, /"low" \| "med" \| "high"/);
});
