/* End-to-end proof that the swarm runs against the real API.
 *
 * Drives the actual pipeline rather than a fixture: synthetic scene -> plane extraction ->
 * swarm context -> five agents -> verifiers. If this passes, the wiring is real.
 *
 *   npx tsx scripts/swarm-smoke.ts --dry     build and print the payload, no API call
 *   npx tsx scripts/swarm-smoke.ts           run the swarm for real (needs ANTHROPIC_API_KEY)
 *   npx tsx scripts/swarm-smoke.ts --notes "school, weekday 10am, ~20 pupils reported"
 */
import { makeSynthetic } from '../src/core/synthetic';
import { extractGeometry } from '../src/core/geometry/extract';
import { buildSwarmContext } from '../src/core/swarm/context';
import { runSwarm } from '../server/swarm/handler';
import type { AppSnapshot } from '../src/core/snapshot';
import type { GeometryResult, Site } from '../src/types';

const argv = process.argv.slice(2);
const dry = argv.includes('--dry');
const notesIdx = argv.indexOf('--notes');
const notes = notesIdx >= 0 ? (argv[notesIdx + 1] ?? null) : null;

function geometry(): Promise<GeometryResult> {
  const ply = makeSynthetic();
  // identity transform: the synthetic field is generated Y-up already
  const identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  let radius = 0;
  for (let i = 0; i < ply.positions.length; i += 3) {
    const d = Math.hypot(ply.positions[i], ply.positions[i + 1], ply.positions[i + 2]);
    if (d > radius) radius = d;
  }
  return new Promise((resolve, reject) => {
    extractGeometry(
      { positions: ply.positions, alphas: ply.alphas, cov: ply.cov, matrixWorld: identity, radius },
      () => {},
      resolve,
      reject,
    );
  });
}

const site: Site = {
  id: 1,
  name: 'Site A',
  pos: { x: 0, y: 1, z: 0 },
  n: 8,
  q: 0.35,
  r: 0.6,
  tau: 4,
  type: 'mixed',
  conf: 'med',
};

function bar(s: string, w = 78): string {
  return s.padEnd(w, '─');
}

async function main(): Promise<void> {
  process.stdout.write('extracting geometry from the synthetic field…\n');
  const geom = await geometry();
  process.stdout.write(
    `  ${geom.planes.length} planes in ${geom.ms} ms · ` +
      `${geom.planes.filter((p) => p.cls === 'wall').length} walls · ` +
      `debris ${geom.debris.totalVolume.toFixed(1)} units³\n\n`,
  );

  const snap: AppSnapshot = {
    sites: [site],
    slotKey: 'A',
    slot: {
      name: 'synthetic rubble field',
      kept: 140000,
      total: 140000,
      orient: { name: 'Y-UP', rx: 0 },
      hasCov: false,
      radius: geom.radius,
      auto: true,
      geom,
    },
    geom,
    metresPerUnit: 1,
    selectedId: 1,
  };

  const context = buildSwarmContext(snap) as unknown as Record<string, unknown>;
  const payload = { ...context, operator_notes: notes };
  const chars = JSON.stringify(payload).length;
  process.stdout.write(`context payload: ${chars} chars, notes: ${notes ? `"${notes}"` : 'none'}\n`);

  if (dry) {
    process.stdout.write('\n--dry: payload only, no API call\n\n');
    process.stdout.write(JSON.stringify(payload, null, 1).slice(0, 2600) + '\n…\n');
    return;
  }

  process.stdout.write('\nrunning the swarm…\n\n');
  const out = await runSwarm({ context, operatorNotes: notes, siteId: site.id });

  let failures = 0;
  for (const r of out.results) {
    process.stdout.write(`${bar(`── ${r.key.toUpperCase()}  (${r.param}) `)}\n`);
    if (r.error) {
      process.stdout.write(`   ERROR: ${r.error}\n\n`);
      failures++;
      continue;
    }
    const v = r.abstained ? 'ABSTAINED' : JSON.stringify(r.value);
    process.stdout.write(`   value: ${v}   self-confidence: ${r.selfConfidence}   ${r.ms} ms\n`);
    process.stdout.write(`   rationale: ${r.rationale}\n`);
    process.stdout.write(`   cited: ${r.evidenceUsed.join(', ') || '(none)'}\n`);
    for (const d of r.verdicts) {
      const mark = d.status === 'pass' ? '✓' : d.status === 'fail' ? '✗' : '·';
      process.stdout.write(`   ${mark} ${d.check}: ${d.detail}\n`);
      if (d.status === 'fail') failures++;
    }
    if (r.usage) process.stdout.write(`   tokens: ${r.usage.input} in / ${r.usage.output} out\n`);
    process.stdout.write('\n');
  }
  const tok = out.results.reduce(
    (a, r) => ({ i: a.i + (r.usage?.input ?? 0), o: a.o + (r.usage?.output ?? 0) }),
    { i: 0, o: 0 },
  );
  process.stdout.write(
    `${out.results.length} agents · ${out.totalMs} ms wall clock · ` +
      `${tok.i} input + ${tok.o} output tokens · model ${out.model}\n`,
  );
  process.stdout.write(`${failures} verifier failure(s) / agent error(s)\n`);
}

main().catch((e: unknown) => {
  process.stderr.write(`\n${e instanceof Error ? e.message : String(e)}\n`);
  process.exitCode = 1;
});
