create extension if not exists pgcrypto;

create table if not exists public.lead_captures (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  role text not null,
  age_band text not null check (age_band in ('below_40', '40_and_above')),
  preferred_intake text not null,
  intent text not null check (intent in ('subsidy_fit', 'reserve_seat', 'advisory_call')),
  source_tag text not null,
  page_path text not null,
  created_at timestamptz not null default now()
);

alter table public.lead_captures enable row level security;

create policy "allow anonymous insert lead captures"
on public.lead_captures
for insert
to anon
with check (true);

create policy "deny anonymous select lead captures"
on public.lead_captures
for select
to anon
using (false);
