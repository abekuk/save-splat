# save-splat

**Rubble** — a post-disaster triage viewer. Loads a Scaniverse/Polycam gaussian-splat `.ply`,
extracts measurable structural facts from it (wall verticality, slab and lean-to angles, debris
volume), and ranks assessment sites by expected lives saved per crew-hour.

Vite + React + TypeScript. Migrated from a single-file vanilla build, which is kept verbatim at
[`legacy/rubble.html`](legacy/rubble.html) as the reference the port is checked against.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve the production build
npm run typecheck
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
  components/        the panel UI
  styles/            tokens / scene / panel / responsive
```

The split that matters: **`core/` knows nothing about three.js or the DOM.** `buildWorkingSet`
takes vertex data and a world matrix rather than a `THREE.Points`, so the geometry pass can be
run and checked without a renderer.

## What this is not

- Not a true gaussian rasterizer — the splat renders as `THREE.Points` with vertex colours.
- Not a mesh. Planes, angles and volumes are the deliverable; a surface hides the residual.
- A/B scan slots are a visual toggle. No alignment, registration or change detection.
- The agent swarm is a **UI shell**: no reasoning, no backend, no API key. `RubbleSwarm.propose()`
  is the seam a reasoner plugs into; proposals are inert until an operator applies one, and every
  application is logged with the value it replaced.
- Output is a ranked prior for incident command review, not an autonomous dispatch order.

## Infrastructure

Provisioning and credentials go through the Stripe Projects CLI — see [SETUP.md](SETUP.md),
which also corrects three commands from the guide that was circulating.
