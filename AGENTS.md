# AGENTS.md

Working notes for anyone — human or agent — changing this repo. Read this before editing.

## Commands

```bash
npm run dev          # vite dev server
npm run check        # typecheck + lint + test  — run this before you claim done
npm run test         # vitest (src/**/*.test.ts, node environment)
npm run lint         # eslint
npm run format       # prettier --write
npm run build        # tsc -b && vite build
npm run preview      # serve the production build (this is the demo fallback)
```

`npm run check` is the gate. It is fast (a few seconds); there is no excuse for skipping it.

## Layout and the one rule that matters

```
src/core/     pure logic. NO three.js, NO DOM, NO React. Unit-tested.
src/scene/    all three.js, imperative, behind a callback surface.
src/state/    useSyncExternalStore. Sites live here; their meshes live in the viewer.
src/components/  the panel UI.
```

**`src/core/` must stay free of three.js and the DOM.** `buildWorkingSet` takes vertex data and a
world matrix rather than a `THREE.Points`; `nearestPlane` takes geometry explicitly; exporters take
an `AppSnapshot`. That boundary is what makes the geometry testable without a renderer, and it is
the reason `extract.test.ts` can assert a known drift ratio. Do not reintroduce a `THREE` import
into `core/`.

## Files that are verbatim ports — treat as load-bearing

`core/geometry/extract.ts`, `core/ply/parse.ts`, `core/orientation.ts`, `core/synthetic.ts` were
ported line-for-line from a working single-file build. They use `var`, inner function declarations
and hand-aligned matrix maths. That style is **excluded from Prettier and relaxed in ESLint on
purpose** — reflowing it is an unreviewed rewrite of numerics that currently produce known-correct
output. If you must change them, change behaviour deliberately and update the tests in the same
commit.

The RANSAC RNG is seeded (mulberry32). Re-running extraction on the same cloud must produce
identical planes; `extract.test.ts` asserts this. Do not swap in `Math.random()`.

## Validation boundary

Anything arriving from outside — a model, a paste, a console call, an imported file — goes through
Zod in `core/swarm/schema.ts` before it becomes typed data. `PARAM_SCHEMAS` mirrors the slider
ranges and is the single source of truth for both.

Proposals are **rejected**, not clamped. `n = 500` is a reasoning failure; clamping it to 50 would
launder a bad number into the ranking as though it had been considered. The error message names the
field and the received value so a caller can retry.

## Domain invariants — do not "fix" these

- **Confidence never enters ρ.** It is an operator evidence flag. `rho()` takes `n, q, r, tau, type`.
- **The τ denominator is guarded at 0.1** so a slider at minimum cannot divide by zero.
- **`q` (P trapped alive) deliberately has no agent.** An exterior scan carries no evidence that an
  occupant is alive. The gap is the honest answer, not an oversight.
- **The swarm proposes; the operator applies.** Nothing may write a slider without an explicit
  operator action, and every application is logged with the value it replaced.
- **Not a mesh.** Planes, angles and volumes are the deliverable. Mesh extraction is the reflex
  answer and the wrong one — a surface hides the residual.
- **A/B slots are a visual toggle.** There is no registration or change detection between them.
- Output is a ranked prior for incident command review, never an autonomous dispatch order. Keep
  the UI copy honest about this.

## Testing notes

`src/core` is testable without a browser. The geometry fixture in `extract.test.ts` builds a floor
plus a wall leaning exactly 3% and asserts the extractor recovers `drift ≈ 0.03` in the SEVERE band
— that test is the regression guard for the whole RANSAC path. Keep it.

For end-to-end work, `npm run preview` plus a headless Chrome over CDP is what has been used; a
large `.ply` fixture can be generated rather than committed (they are hundreds of MB).

<!-- stripe projects llm-context appends provider guidance below this line -->
