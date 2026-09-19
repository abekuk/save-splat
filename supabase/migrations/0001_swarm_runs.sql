-- Append-only log of swarm runs. Written by the server with the service-role key;
-- RLS is on with no policies, so the anon key can neither read nor write it.
create table if not exists public.swarm_runs (
  id          bigint generated always as identity primary key,
  generated   timestamptz not null,
  model       text        not null,
  site_id     integer,
  total_ms    integer     not null,
  agents      integer     not null,
  verified    integer     not null,
  abstained   integer     not null,
  errored     integer     not null,
  results     jsonb       not null,
  created_at  timestamptz not null default now()
);

alter table public.swarm_runs enable row level security;

create index if not exists swarm_runs_generated_idx on public.swarm_runs (generated desc);
