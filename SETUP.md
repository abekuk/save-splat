# save-splat — infrastructure runbook

Verified against **Stripe CLI 1.51.0** + **projects plugin 0.41.0** on 2026-09-19.
Hackathon code: `uoft-future-legends`.

## What the app needs from infrastructure

| Need                   | Provider (via Stripe Projects) | Env var the code reads                           | Required?          |
| ---------------------- | ------------------------------ | ------------------------------------------------ | ------------------ |
| Reasoner for the swarm | `openrouter/api`               | `OPENROUTER_API_KEY`                             | yes, for RUN SWARM |
| Hosting                | `vercel/project`               | — (Vercel reads the vars above from its project) | yes, for a URL     |
| Run log                | `supabase/project`             | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`      | optional           |

All names are listed in `server/swarm/env.ts` and `.env.example`. None carry a `VITE_` prefix
on purpose — the reasoner runs server-side and the key never reaches the browser. If
`stripe projects env --json` shows a different name for a credential, map it in `env.ts`
rather than renaming what Stripe emitted.

## Done already

- `@stripe/cli@1.51.0` installed globally (npm)
- `stripe plugin install projects` → v0.41.0
- Stripe AI skills installed to `~/.claude/skills` via `npx skills add stripe/ai --all -g -y`
- This repo created private at `github.com/forkiron/save-splat`
- `.gitignore` covers `.env`, `.env.*` (except `.env.example`), `.projects/state.local.json`,
  `.projects/vault/`
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

## Step 2 — provision, one path end-to-end first

```bash
stripe projects catalog openrouter --json        # confirm the free tier is listed
stripe projects add openrouter/api --yes         # free tier; paid needs --confirm-paid-service
stripe projects env --pull                       # writes .env.local with OPENROUTER_API_KEY
npm run dev                                      # "swarm: ready via openrouter" in the banner
```

Then hosting, then the optional log:

```bash
stripe projects add vercel/project --yes         # hobby tier is free
stripe projects add supabase/project --yes       # free tier; then run the migration below
stripe projects env --pull
stripe projects llm-context                      # regenerate AGENTS.md provider section
```

Supabase: run `supabase/migrations/0001_swarm_runs.sql` once in the SQL editor (or
`supabase db push` if the CLI is linked). The table has RLS on with no policies, so only the
service-role key, held server-side, can touch it.

## Step 3 — deploy

`vercel.json` pins the Vite framework preset and a 60 s function limit (five model calls).
Vercel must carry the same server-side vars, set in the project's environment settings:

```bash
vercel env add OPENROUTER_API_KEY production
vercel env add SUPABASE_URL production               # optional
vercel env add SUPABASE_SERVICE_ROLE_KEY production  # optional
vercel --prod
```

Smoke test the deployment the same way as local:

```bash
curl https://<your-deployment>/api/swarm/status
# {"configured":true,"provider":"openrouter","model":"…","effort":"high","persist":…}
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

Free tiers confirmed in the cached catalogue (2026-09-19): `openrouter/free`, `vercel/hobby`,
`supabase/free`, `neon/free`. OpenRouter's free tier still bills per token on paid models —
pin a `:free` model with `SWARM_MODEL` if the credit balance matters.

## Danger

`stripe projects remove <resource>` genuinely deprovisions at the provider. No undo.
