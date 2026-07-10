-- Stores completed Nexius Academy assessment / quiz attempts.
-- Server-side Netlify Functions insert/update this table with the Supabase service role key.

create table if not exists public.assessment_quiz_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  assessment_slug text not null default 'agentic-ai-challenge',
  question_version text not null,

  visitor_id text,
  session_id text,
  page_path text,
  landing_path text,
  referrer text,
  lead_source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  device_type text,

  score integer not null check (score >= 0),
  total_questions integer not null check (total_questions > 0),
  percentage integer not null check (percentage >= 0 and percentage <= 100),
  result_title text,
  result_description text,
  answers jsonb not null default '[]'::jsonb,

  certificate_recipient_name text,
  certificate_course_name text,
  certificate_course_dates text[] not null default '{}',
  certificate_trainer_name text,
  certificate_generated_at timestamptz
);

create index if not exists assessment_quiz_results_created_at_idx
  on public.assessment_quiz_results (created_at desc);

create index if not exists assessment_quiz_results_assessment_created_idx
  on public.assessment_quiz_results (assessment_slug, created_at desc);

create index if not exists assessment_quiz_results_visitor_idx
  on public.assessment_quiz_results (visitor_id, session_id);

create or replace function public.set_assessment_quiz_results_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_assessment_quiz_results_updated_at on public.assessment_quiz_results;
create trigger trg_assessment_quiz_results_updated_at
before update on public.assessment_quiz_results
for each row
execute function public.set_assessment_quiz_results_updated_at();

alter table public.assessment_quiz_results enable row level security;

comment on table public.assessment_quiz_results is
  'Completed public assessment attempts for Nexius Academy. Written only through server-side functions using service role credentials.';
