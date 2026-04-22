create table if not exists public.visitor_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null,
  session_id uuid not null unique,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  landing_path text,
  entry_referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  device_type text,
  lead_capture_id uuid null,
  status text not null default 'active',
  intent_score integer not null default 0,
  intent_stage text not null default 'cold',
  last_action_taken text
);

create index if not exists idx_visitor_sessions_visitor_id on public.visitor_sessions (visitor_id);
create index if not exists idx_visitor_sessions_last_seen_at on public.visitor_sessions (last_seen_at desc);
create index if not exists idx_visitor_sessions_intent_score on public.visitor_sessions (intent_score desc);

create table if not exists public.visitor_events (
  id bigint generated always as identity primary key,
  session_id uuid not null,
  visitor_id uuid not null,
  occurred_at timestamptz not null default now(),
  event_name text not null,
  page_path text,
  element_id text,
  element_text text,
  section_id text,
  time_on_page_seconds integer,
  scroll_depth integer,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists idx_visitor_events_session_occurred_at
  on public.visitor_events (session_id, occurred_at desc);
create index if not exists idx_visitor_events_visitor_occurred_at
  on public.visitor_events (visitor_id, occurred_at desc);
create index if not exists idx_visitor_events_event_name_occurred_at
  on public.visitor_events (event_name, occurred_at desc);

create table if not exists public.visitor_profiles (
  visitor_id uuid primary key,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  total_sessions integer not null default 1,
  total_pageviews integer not null default 0,
  known_email text,
  known_name text,
  known_phone text,
  lead_capture_id uuid null,
  lifetime_intent_score integer not null default 0,
  notes jsonb not null default '{}'::jsonb
);

create table if not exists public.sales_alerts (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  visitor_id uuid not null,
  lead_capture_id uuid null,
  priority text not null default 'medium',
  reason text not null,
  summary text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

alter table public.visitor_sessions enable row level security;
alter table public.visitor_events enable row level security;
alter table public.visitor_profiles enable row level security;
alter table public.sales_alerts enable row level security;

alter table if exists public.lead_captures
  add column if not exists visitor_id uuid,
  add column if not exists session_id uuid;

create index if not exists idx_lead_captures_visitor_id on public.lead_captures (visitor_id);
create index if not exists idx_lead_captures_session_id on public.lead_captures (session_id);
