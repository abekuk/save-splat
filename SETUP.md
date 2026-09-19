# save-splat — infrastructure runbook

Verified against **Stripe CLI 1.51.0** + **projects plugin 0.41.0** on 2026-09-19.
Hackathon code: `uoft-future-legends`.

## What Stripe is for here

Stripe is **not** taking payments in savesplat. It is the provisioning layer: **Stripe Projects**
creates and bills the third-party services the app runs on, and hands their credentials to the
code through `.env`. One CLI, one account, four providers, no dashboards. The Stripe account is
the team's "Projects" account (`acct_1UHR42FYZjKhlFYG`); the project is `save-splat`.

| Need                   | Provider (via Stripe Projects)       | Env var the code reads                                         | Role                                               |
| ---------------------- | ------------------------------------ | -------------------------------------------------------------- | -------------------------------------------------- |
| Reasoner for the swarm | `openrouter/free` + `openrouter/api` | `OPENROUTER_API_API_KEY`                                       | the five proposing agents                          |
| Incident reviewer      | `athena/agents` (`athena-review`)    | `ATHENA_ATHENA_AGENT_API_KEY`, `..._MCP_URL`, `..._PUBLIC_URL` | reads the finished run, writes the IC paragraph    |
| Hosting                | `vercel/hobby` + `vercel/project`    | `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`           | deploy target; functions run the swarm server-side |
| Run log                | `supabase/free` + `supabase/project` | `SUPABASE_POOLER_URL`                                          | append-only `swarm_runs`; optional                 |

These are the names `stripe projects env --pull` actually writes (verified 2026-09-19); they are
listed in `server/swarm/env.ts` and `.env.example`. None carry a `VITE_` prefix on purpose — every
key is read server-side and never reaches the browser. If a future pull shows a different name,
map it in `env.ts` rather than renaming what Stripe emitted. Note the Supabase URLs arrive with
the literal `[YOUR-PASSWORD]` placeholder; `env.ts` splices `SUPABASE_DB_PASS` in.

### What Athena does

Athena's `agents` service gives you a hosted agent with your instructions that is also a
**headless MCP server**: `POST $ATHENA_ATHENA_AGENT_MCP_URL` with `Authorization: Bearer
$ATHENA_ATHENA_AGENT_API_KEY`, one tool `<slug>__get_response({ prompt })`. savesplat uses it
twice, and the two uses are kept apart on purpose:

- **As the reasoner (default).** Each of the five swarm agents sends its own prompt to the agent
  and gets a JSON proposal back. There is no schema channel over MCP, so the prompt states the
  exact shape and the reply goes through the same Zod gate and deterministic verifiers as any
  other provider; a reply that does not parse is a rejected proposal, not a crash. Measured
  2026-09-19: five agents in 13 s, all verified. `server/swarm/providers/athena.ts`.
- **As the reviewer.** After a run it is shown the proposals, verdicts, abstentions and operator
  notes, and returns the paragraph an incident commander wants next to the queue: what the
  ranking currently rests on, which verifier failed and why, the one thing to do next. That text
  touches no slider and enters no formula. `POST /api/swarm/review`, rendered under INCIDENT
  REVIEW in the SWARM tab.

Endpoint: `POST /api/swarm/review { run, context, operatorNotes }`. The agent's instructions were
set at provisioning (`stripe projects add athena/agents --config …`); to change them, remove and
re-add (free tier: **one agent per Stripe account**). The agent's own `connect_mcp`/`mcp_url`
setting can point it back at our deployed swarm once that is exposed as MCP — that is the next
step, not yet built.

## Done already

- `@stripe/cli@1.51.0` installed globally (npm)
- `stripe plugin install projects` → v0.41.0
- Stripe AI skills installed to `~/.claude/skills` via `npx skills add stripe/ai --all -g -y`
- This repo created private at `github.com/forkiron/save-splat`
- `.gitignore` covers `.env`, `.env.*` (except `.env.example`), `.projects/vault/`
- Swarm endpoints exist for every host: Vite dev, Vite preview, and `api/swarm/*` on Vercel

## Step 1 — log in (browser, once)

`stripe login` on its own prints "already logged in" and exits 0 **without** authenticating
Projects when any old session exists. The flow that actually works:

```bash
stripe login --non-interactive --new-session   # prints browser_url + verification_code
# open browser_url, enter the code, then:
stripe login --complete-device                  # polls until the browser step is done
stripe projects init --preflight --json         # every check must pass
stripe projects init save-splat --accept-tos    # writes .projects/, .env, AGENTS.md section
```

Grab your `acct_...` ID for the leaderboard after login:

```bash
stripe projects status --json
```

## Step 2 — provision (done 2026-09-19; here for a fresh machine)

Plans must exist before deployables, and every provider's terms need `--accept-tos`:

```bash
stripe projects add openrouter/free --accept-tos --yes && stripe projects add openrouter/api --accept-tos --yes
stripe projects add vercel/hobby    --accept-tos --yes && stripe projects add vercel/project --accept-tos --yes
stripe projects add supabase/free   --accept-tos --yes && stripe projects add supabase/project --accept-tos --yes
stripe projects add athena/agents --name athena-review --accept-tos --yes --config '<json, see below>'
stripe projects env --pull                       # writes .env (gitignored)
npm run dev                                      # banner: "swarm: ready via openrouter, athena review on"
```

Athena config JSON keys: `name`, `instructions` (≤2000 chars), `connect_mcp` (`no`|`yes`),
`mcp_url`, `enable_image_generation`, `enable_music_generation`, `enable_live`, `enable_coding`,
`enable_deep_research`, `enable_google_maps` (all `no`|`yes`, all required), optional
`starter_1..3`. The instructions we used are the savesplat incident-review brief; keep
"assisted assessment, never a dispatch order" in them.

Supabase: create the table once with the runner, which reads the pooler URL from `.env`:

```bash
npx tsx scripts/migrate.ts
```

RLS is on with no policies, so the publishable key cannot reach `swarm_runs` through the API;
only the server's Postgres connection can.

## Step 3 — deploy to the Vercel project Stripe created

Stripe Projects provisioned the Vercel project and issued a deploy token; it does not run
deploys itself. The Vercel CLI does, authenticated by env vars (never `--token` on the command
line, it lands in shell history):

```bash
set -a; . ./.env; set +a                         # VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
# server-side vars the functions need — piped, so values never appear in argv
printf %s "$OPENROUTER_API_API_KEY"      | npx vercel env add OPENROUTER_API_API_KEY      production --yes
printf %s "$SUPABASE_POOLER_URL"         | npx vercel env add SUPABASE_POOLER_URL         production --yes
printf %s "$SUPABASE_DB_PASS"            | npx vercel env add SUPABASE_DB_PASS            production --yes
printf %s "$ATHENA_ATHENA_AGENT_API_KEY" | npx vercel env add ATHENA_ATHENA_AGENT_API_KEY production --yes
printf %s "$ATHENA_ATHENA_AGENT_MCP_URL" | npx vercel env add ATHENA_ATHENA_AGENT_MCP_URL production --yes
printf %s "$ATHENA_ATHENA_AGENT_PUBLIC_URL" | npx vercel env add ATHENA_ATHENA_AGENT_PUBLIC_URL production --yes
npx vercel deploy --prod --yes                   # builds with the Vite preset from vercel.json
```

`VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` must both be set; the CLI links to the existing project
from them without `vercel link`. `vercel.json` sets a 60 s function limit (five model calls).

Smoke test the deployment the same way as local:

```bash
curl https://<your-deployment>/api/swarm/status
# {"configured":true,"provider":"openrouter","model":"…","persist":true,"review":{"configured":true,…}}
```

## Corrections to the guide that was circulating

Three commands in it are **not real** in plugin 0.41.0 — they will just error:

| Circulated                                                             | Reality                                                                                                               |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `stripe projects billing update --limit 5`                             | No such command. Billing is only `billing show`, `billing add`, `spend [provider]`. **There is no spend-limit flag.** |
| `stripe projects share`                                                | Doesn't exist. Use `stripe projects list`, then `stripe projects pull <projectId>` on the other machine.              |
| `npx skills add https://docs.stripe.com --skill stripe-projects -g -y` | The CLI's own guidance is `npx skills add --all stripe/ai`.                                                           |

### How to actually avoid charges

Since no spend cap exists, the real guard is that **provisioning a paid service requires an
explicit flag**. In non-interactive mode `--confirm-paid-service` is _required_ — so as long as
you never pass it, a paid tier cannot be provisioned by accident:

```bash
stripe projects add <provider>/<service> --json --yes     # free tiers only; paid will refuse
stripe projects spend                                     # check charges at any time
stripe projects billing show
```

Free tiers used (2026-09-19): `openrouter/free`, `vercel/hobby`, `supabase/free`, `athena/agents`.

**Why Athena is the default and OpenRouter is not.** The OpenRouter key is on the free plan: no
credits, only `:free` routes, **50 free-model requests per day**. The provider handles that
(it reads `/auth/key` and picks a `:free` route with structured output), but on 2026-09-19 the
fastest free route still timed out on the real agent prompts. Athena answered all five in 13 s
with no daily cap we have hit. OpenRouter/OpenAI/Anthropic remain one env var away
(`SWARM_PROVIDER`) because the provider seam makes that a config change. Athena's free tier is one agent per Stripe account;
the CLI's `--existing` adopt path does not work for Athena (it sends no identifier), so the
only way to change the agent is remove + add.

## Danger

`stripe projects remove <resource>` genuinely deprovisions at the provider. No undo.
