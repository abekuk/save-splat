# 🛰️ save-splat

An AI tool for rescue teams that takes LiDAR gaussian splat scans of collapsed buildings, measures structural damage like wall lean and debris volume, and weighs how many people might be trapped alive to rank which sites to reach first.

## Demo Images

<div style="display: flex; flex-wrap: wrap; gap: 10;">
  <img src="https://github.com/user-attachments/assets/81ec4f73-fd1b-483c-8a8c-8a2d6dcc0ac2" width="48%" />
  <img src="https://github.com/user-attachments/assets/6d226392-1c9d-4f8b-ba9f-670fd3e8e1ec" width="48%" />
  <img src="https://github.com/user-attachments/assets/983b2136-499f-4346-9ea6-fc52dc83d0fd" width="48%" />
  <img src="https://github.com/user-attachments/assets/f8aa2c1c-aac5-4a88-a4f8-113fcb144044" width="48%" />
</div>

## What it does

After an earthquake, a search-and-rescue team can face dozens of collapsed buildings and only a handful of crews. The order they work the sites in decides who lives. Right now that call is usually made by looking at a leaning wall, guessing, and writing site names on a whiteboard. None of the tools involved talk to each other, and none of them turn a scan into a number you can actually compare.

save-splat takes a phone scan of a collapsed structure and pulls real measurements out of it: how far each wall leans, how the slabs and floors are angled, and how much debris is piled up. It then ranks the sites so command can see where a crew buys the most lives per hour. It measures the damage and lays out the priority. A person still makes every decision.

You load a Scaniverse or Polycam gaussian-splat `.ply` (a `.glb` or `.gltf` mesh works too), and the app fits planes to the walls and floors, reads the lean off each wall as a drift number, finds the ground and measures debris volume above it, and lets you place sites and rank them. There is no autopilot here. The output is a ranked list for a human to review, not a dispatch order.

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

| Layer | Technology | What it handles |
|-------|------------|-----------------|
| Frontend | Vite, React 18, TypeScript | The panel UI and the 3D scene, all in one page |
| State | `useSyncExternalStore` store | Site records live here; their 3D markers live in the viewer, keyed by id |
| Renderer | Three.js | Camera, a hand-written orbit control, site markers, and the plane overlay. Splats draw as `THREE.Points` |
| Core logic | Plain TypeScript, no Three.js and no DOM | Parsing, RANSAC, ranking, and export. Runs and gets tested without a browser |
| Parsing | Custom `.ply` and gaussian-splat reader | Reads per-Gaussian covariance from `scale_*` and `rot_*`, colour from `f_dc_*`, with streaming progress |
| Geometry | Opacity-weighted RANSAC, seeded (mulberry32) | Fits planes, reads wall drift bands, and measures debris volume |
| Validation | Zod (`core/swarm/schema.ts`) | The gate for anything coming from outside. Bad values are rejected, not clamped |
| Reasoner | Node-only `server/swarm/` | Prompt, call the provider, run it through Zod, then verify |
| Providers | OpenRouter, OpenAI, Anthropic, Athena | One `Reasoner` interface. Whichever key is set gets used; the model comes from the account |
| Hosting | Vercel functions, plus Vite dev and preview | The same `/api/swarm/*` handlers run in all three |
| Run log | Supabase Postgres pooler (optional) | Appends each run to `swarm_runs`. A failed write logs a warning and never blocks a run |

The one rule worth knowing: `core/` never imports Three.js or touches the DOM. The geometry functions take plain arrays and a matrix instead of a `THREE.Points` object, so the measurement code can be unit-tested without a renderer.

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm
- The Stripe Projects CLI, if you want it to provision the reasoner and run-log credentials for you (optional)

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

The synthetic scene loads on open, so this works with nothing else set up. Click "View demo" or open `#viewer` to go straight to the viewer.

### 3. Turn on the agent swarm (optional)

The reasoner needs one key, set server-side in `.env.local`. See [`.env.example`](.env.example). The quickest path pulls everything at once:

```bash
stripe projects env --pull        # writes .env.local with the real values
```

Or add a single key by hand:

```env
# any one of these is enough. OpenRouter is what Stripe Projects provisions.
OPENROUTER_API_KEY=your_key
# OPENAI_API_KEY=your_key
# ANTHROPIC_API_KEY=your_key

# optional tuning
# SWARM_PROVIDER=openrouter                 # pin this when more than one key is set
# SWARM_MODEL=anthropic/claude-opus-5       # skip the catalogue lookup

# optional run log (a server-side Postgres connection string)
# SUPABASE_POOLER_URL=...
# SUPABASE_DB_PASS=...
```

Keep the `VITE_` prefix off every secret. Vite inlines any `VITE_*` variable into the client bundle, so reasoner keys are read only inside `server/swarm/` from `process.env`. The browser only ever calls `/api/swarm/*`.

`/api/swarm/status` reports what is configured, and the RUN SWARM button explains why it is disabled when nothing is set. Athena is an extra agent that Stripe Projects can provision. It works as both a reasoner and an incident reviewer, and it gets picked first when its key and MCP URL are present.

### Scripts

```bash
npm run dev          # vite dev server
npm run check        # typecheck, lint, and test. Run this before you call something done
npm run test         # vitest. The core is testable without a browser
npm run build        # tsc -b && vite build, output in dist/
npm run preview      # serve the production build
```
