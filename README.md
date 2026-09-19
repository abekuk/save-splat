# save-splat

**savesplat** — a post-disaster triage viewer. Loads a Scaniverse/Polycam gaussian-splat `.ply`,
extracts measurable structural facts from it (wall verticality, slab and lean-to angles, debris
volume), and ranks assessment sites by expected lives saved per crew-hour.

Vite + React + TypeScript + Zod. Migrated from a single-file vanilla build; that original is in git
history (`git show 1d1b115:rubble.html` — it was removed in the tooling pass) and remains the
reference the numbers are checked against.

```bash
npm install
npm run dev        # http://localhost:5173
npm run check      # typecheck + lint + test — the gate
npm run test       # vitest
npm run build      # -> dist/
npm run preview    # serve the production build
```

> **Note:** unlike the legacy build, this no longer opens by double-clicking an `.html` file.
> The on-stage fallback is `npm run build && npm run preview`.

## Layout

```
src/
  core/              pure logic — no DOM, no three.js, unit-testable
    ply/parse.ts       .ply + gaussian-splat parsing, per-Gaussian covariance
    ply/load.ts        streaming read with progress, header sniff, big-file guard
    geometry/extract.ts opacity-weighted RANSAC plane fitting + debris volume
    swarm/             agent contract and the context payload
    ranking.ts         the rho index, lambda by collapse type
    export.ts          JSON / CSV
    orientation.ts     up-axis detection
    synthetic.ts       the on-stage fallback scene
  scene/viewer.ts    all three.js: camera, hand-written orbit, markers, plane overlay
  state/store.ts     useSyncExternalStore; sites live here, their meshes live in the viewer
    swarm/schema.ts    Zod: the validation boundary for anything from outside
  components/        the panel UI
  styles/            tokens / scene / panel / responsive
*.test.ts            vitest, colocated; run in a node env because core has no DOM
```

The split that matters: **`core/` knows nothing about three.js or the DOM.** `buildWorkingSet`
takes vertex data and a world matrix rather than a `THREE.Points`, so the geometry pass can be
run and checked without a renderer.

## What this is not

- Not a true gaussian rasterizer — the splat renders as `THREE.Points` with vertex colours.
- Not a mesh. Planes, angles and volumes are the deliverable; a surface hides the residual.
- A/B scan slots are a visual toggle. No alignment, registration or change detection.
- The agent swarm is a **UI shell**: no reasoning, no backend, no API key. `RubbleSwarm.propose()`
  is the seam a reasoner plugs into, validated by Zod — proposals are _rejected_ rather than
  clamped, because silently turning `n = 500` into `50` launders a reasoning failure into the
  ranking. Proposals stay inert until an operator applies one, and every application is logged
  with the value it replaced.
- Output is a ranked prior for incident command review, not an autonomous dispatch order.

## Conventions

See [AGENTS.md](AGENTS.md) before changing anything — it records which files are verbatim ports
(excluded from Prettier on purpose), the `core/` purity rule, and the domain invariants that must
not be "fixed".

## Infrastructure

Provisioning and credentials go through the Stripe Projects CLI — see [SETUP.md](SETUP.md),
which also corrects three commands from the guide that was circulating.
