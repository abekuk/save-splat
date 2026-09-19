# save-splat

Gaussian-splat tooling. Infrastructure is provisioned and credentialed through
the Stripe Projects CLI plugin (developer preview) — see `AGENTS.md` once
`stripe projects init` has run.

## Setup

```bash
stripe login
stripe projects init save-splat
stripe projects catalog          # confirm real slugs before adding anything
stripe projects billing update --limit 5
```

Credentials live in `.projects/vault/vault.json` and `.env`. Neither is committed.
