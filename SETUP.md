# save-splat — infrastructure runbook

Verified against **Stripe CLI 1.51.0** + **projects plugin 0.41.0** on 2026-09-19.
Hackathon code: `uoft-future-legends`.

## Done already

- `@stripe/cli@1.51.0` installed globally (npm)
- `stripe plugin install projects` → v0.41.0
- Stripe AI skills installed to `~/.claude/skills` via `npx skills add stripe/ai --all -g -y`
- This repo created private at `github.com/forkiron/save-splat`
- `.gitignore` covers `.env`, `.projects/state.local.json`, `.projects/vault/`

## You must run these (browser / interactive)

```bash
stripe login                      # pairs the CLI with your account
stripe projects init save-splat   # also authenticates; writes .projects/, .env, AGENTS.md
```

Grab your `acct_...` ID for the leaderboard from the dashboard URL, or after login:

```bash
stripe projects status --json
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

Confirm tiers before adding:

```bash
stripe projects catalog                 # all providers
stripe projects catalog supabase --json # tiers for one provider
stripe projects search database
```

## Provisioning

```bash
stripe projects link supabase        # if you ALREADY have an account — attach, don't create
stripe projects add supabase/project
stripe projects add vercel/project
stripe projects add openrouter/api
stripe projects env --pull           # sync credentials into .env
stripe projects llm-context          # regenerate AGENTS.md after adding services
```

Get one path working end-to-end (db → auth → deployed URL) before adding breadth.

## Danger

`stripe projects remove <resource>` genuinely deprovisions at the provider. No undo.
