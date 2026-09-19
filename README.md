# 🛰️ save-splat

*One scan. Every measurement. Zero guesswork about who to reach first.*

**save-splat** is an _engineer-in-the-loop_, AI-assisted **post-disaster triage viewer** built for the people standing in front of a collapsed building. It loads a Scaniverse/Polycam gaussian-splat `.ply`, extracts measurable structural facts from it — wall verticality, slab and lean-to angles, debris volume — and ranks assessment sites by **expected lives saved per crew-hour**. For urban search-and-rescue (USAR) crews it turns "that wall looks bad" into a drift number you can act on; for incident command it replaces gut-feel triage with a defensible, logged, reproducible prior. It reads the rubble so the crew can decide where to dig — and it never pretends to be the one making the call.

## Demo

```bash
npm install
npm run dev        # http://localhost:5173 → click "View demo"
```

A synthetic rubble field auto-loads, so the app runs with **no API key and no `.ply` file**. Press `m` and click a structure to place the first site.

<!-- Drop screenshots / a gallery here:
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="docs/img/viewer.png" width="48%" />
  <img src="docs/img/geo-panel.png" width="48%" />
</div>
-->

## What it Does

USAR teams juggle disconnected tools that don't remember anything: a handheld scanner here, a paper recon form there, a structural engineer's eyeball, a whiteboard with site names and arrows. None of them turn a scan into a number you can *argue about* — and after an earthquake, the order you visit sites in is, bluntly, who lives.

There's a second problem nobody says out loud: **"that wall looks bad" is not a measurement.** Is it a 1% drift or a 6% drift about to pancake onto the crew? Without a number you can't rank, you can't hand off, and you can't defend the decision afterward.

**For the crew:** Drop in a gaussian-splat `.ply` and save-splat extracts the structural facts — walls, slabs, inclines, wall drift in severity bands, debris volume above a detected ground plane — and lights up a ranked dispatch list. It handles the geometry so the engineer can focus on judgment.

**For incident command:** A ranked prior with every input visible and every override logged. Not a black box. Not an autopilot. A number you can question.

## Architecture

<div align="center">

<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
<img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />

&darr;

<img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
<img src="https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres" />
<img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />

&darr;

<img src="https://img.shields.io/badge/OpenRouter-000000?style=for-the-badge&logoColor=white" alt="OpenRouter" />
&nbsp;&nbsp;
<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
&nbsp;&nbsp;
<img src="https://img.shields.io/badge/Anthropic-D4A27F?style=for-the-badge&logo=anthropic&logoColor=white" alt="Anthropic" />
&nbsp;&nbsp;
<img src="https://img.shields.io/badge/Athena-4A90D9?style=for-the-badge&logoColor=white" alt="Athena" />

</div>

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Vite, React 18, TypeScript | Panel UI + scene, single-page workspace |
| **State** | `useSyncExternalStore` store | Sites live in state; their meshes live in the viewer, keyed by id |
| **Renderer** | Three.js | Camera, hand-written orbit, markers, plane/drift overlay — splats render as `THREE.Points` |
| **Core logic** | Pure TypeScript (no three.js, no DOM) | Parsing, RANSAC, ranking, export — unit-testable without a browser |
| **Parsing** | Custom `.ply` + gaussian-splat reader | Per-Gaussian covariance from `scale_*`/`rot_*`, SH `f_dc_*` colour, streaming with progress |
| **Geometry** | Opacity-weighted RANSAC (seeded mulberry32) | Planes, wall drift bands, column-method debris volume |
| **Validation** | Zod (`core/swarm/schema.ts`) | The boundary — anything from outside is rejected, not clamped |
| **Reasoner** | Node-only `server/swarm/` | Prompts → provider call → Zod gate → verifiers |
| **Providers** | OpenRouter · OpenAI · Anthropic · Athena | One `Reasoner` interface; whichever key is present wins; model resolved from the account |
| **Hosting** | Vercel functions + Vite dev/preview | Same `/api/swarm/*` handlers mount in all three |
| **Run log** | Supabase Postgres pooler (optional) | Append-only `swarm_runs`; a write failure warns, never blocks a run |

> **The split that matters:** `core/` knows nothing about three.js or the DOM. `buildWorkingSet` takes vertex data and a world matrix rather than a `THREE.Points`, so the geometry pass can be run and checked without a renderer.

## Getting Started

### Prerequisites

- **Node.js 20+**
- **npm**
- *(optional)* the **Stripe Projects CLI** — provisions the reasoner and run-log credentials

### 1. Clone and install

```bash
git clone https://github.com/your-org/save-splat.git
cd save-splat
npm install
```

### 2. Run it

```bash
npm run dev        # http://localhost:5173
```

The synthetic scene loads on open, so this works with no further setup. Click **View demo** (or open `#viewer`) to skip the landing page.

### 3. (Optional) Enable the agent swarm

The reasoner needs **one key**, server-side, in `.env.local` (see [`.env.example`](.env.example)). The easiest path provisions everything at once:

```bash
stripe projects env --pull        # writes .env.local with the real values
```

Or add a single key by hand:

```env
# any ONE of these is enough — OpenRouter is what Stripe Projects provisions
OPENROUTER_API_KEY=your_key
# OPENAI_API_KEY=your_key
# ANTHROPIC_API_KEY=your_key

# optional tuning
# SWARM_PROVIDER=openrouter                 # pin when more than one key is present
# SWARM_MODEL=anthropic/claude-opus-5       # skip catalogue lookup

# optional append-only run log (server-side Postgres connection string)
# SUPABASE_POOLER_URL=...
# SUPABASE_DB_PASS=...
```

> **No `VITE_` prefix on any secret.** Vite inlines `VITE_*` into the client bundle; reasoner keys are read only in `server/swarm/` from `process.env`. The browser talks to `/api/swarm/*` only.

`/api/swarm/status` reports what is configured, and the **RUN SWARM** button says why it is disabled when nothing is. **Athena** is an additional Stripe-provisioned agent used as both a reasoner and an incident reviewer; it is checked first when its key and MCP URL are present.

### Scripts

```bash
npm run dev          # vite dev server
npm run check        # typecheck + lint + test — the gate; run before you claim done
npm run test         # vitest (core is testable without a browser)
npm run build        # tsc -b && vite build  ->  dist/
npm run preview      # serve the production build (the on-stage fallback)
```

## What this is *not*

- **Not a true gaussian rasterizer** — the splat renders as `THREE.Points` with vertex colours.
- **Not a mesh.** Planes, angles and volumes are the deliverable; a surface hides the residual an assessor needs to see.
- **A/B scan slots are a visual toggle** — no alignment, registration or change detection.
- **The agent swarm is assisted assessment, not autonomy.** Five agents (one per ranking parameter, each with its own evidence source and a deterministic verifier) run server-side against the extracted geometry and return proposals validated by Zod — *rejected* rather than clamped, because silently turning `n = 500` into `50` launders a reasoning failure into the ranking. A proposal is inert until an operator applies it, and every application is logged with the value it replaced. `q` (P trapped alive) has no agent on purpose.
- **Output is a ranked prior for incident command review, not an autonomous dispatch order.**

## Documentation

- **[AGENTS.md](AGENTS.md)** — conventions, the `core/` purity rule, which files are verbatim ports, and the domain invariants that must not be "fixed". Read it before changing anything.
- **[PROJECT-BRIEF.md](PROJECT-BRIEF.md)** — the project mapped against the Sendai Framework for Disaster Risk Reduction 2015–2030 and the SDG targets, with limits stated in full.
- **[SETUP.md](SETUP.md)** — the verified login flow, provisioning order, and deploy steps via the Stripe Projects CLI.
- **[DEVPOST.md](DEVPOST.md)** — the submission writeup: pipeline diagram, ranking index, and the agent/verifier design.
