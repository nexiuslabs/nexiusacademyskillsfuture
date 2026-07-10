-- Invite-only access control for Nexius Academy assessments.
-- Codes are stored as SHA-256 hashes of lower(email) || ':' || six_digit_code.

create table if not exists public.assessment_invites (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  assessment_slug text not null default 'agentic-ai-challenge',
  cohort_code text not null default 'agentic-ai-foundation',

  learner_name text not null,
  learner_email text not null,
  access_code_hash text not null,

  course_name text not null,
  course_dates text[] not null default '{}',
  trainer_name text not null default 'Melverick Ng',

  expires_at timestamptz,
  active boolean not null default true,
  certificate_enabled boolean not null default true,
  max_results integer not null default 3 check (max_results > 0),
  notes text,

  constraint assessment_invites_email_lowercase check (learner_email = lower(learner_email)),
  constraint assessment_invites_code_hash_length check (char_length(access_code_hash) = 64)
);

create index if not exists assessment_invites_lookup_idx
  on public.assessment_invites (assessment_slug, learner_email, access_code_hash)
  where active = true;

create index if not exists assessment_invites_cohort_idx
  on public.assessment_invites (cohort_code, created_at desc);

create table if not exists public.assessment_invite_access_attempts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  assessment_slug text not null default 'agentic-ai-challenge',
  learner_email text,
  ip_hash text,
  success boolean not null default false
);

create index if not exists assessment_invite_attempts_email_recent_idx
  on public.assessment_invite_access_attempts (assessment_slug, learner_email, created_at desc)
  where success = false;

create index if not exists assessment_invite_attempts_ip_recent_idx
  on public.assessment_invite_access_attempts (assessment_slug, ip_hash, created_at desc)
  where success = false;

alter table public.assessment_invite_access_attempts enable row level security;

create or replace function public.set_assessment_invites_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_assessment_invites_updated_at on public.assessment_invites;
create trigger trg_assessment_invites_updated_at
before update on public.assessment_invites
for each row
execute function public.set_assessment_invites_updated_at();

alter table public.assessment_invites enable row level security;

alter table public.assessment_quiz_results
  add column if not exists assessment_invite_id uuid references public.assessment_invites(id);

create index if not exists assessment_quiz_results_invite_idx
  on public.assessment_quiz_results (assessment_invite_id, created_at desc);

comment on table public.assessment_invites is
  'Invite-only learner access records for Nexius Academy assessments. Access codes are stored as hashes and consumed by server-side Netlify functions.';

comment on column public.assessment_invites.access_code_hash is
  'SHA-256 hex of lower(trim(learner_email)) || '':'' || six_digit_code.';

comment on table public.assessment_invite_access_attempts is
  'Server-side audit/rate-limit log for learner invite code validation attempts.';
