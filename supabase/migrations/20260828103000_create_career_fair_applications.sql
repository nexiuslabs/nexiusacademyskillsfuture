create extension if not exists pgcrypto;

create table if not exists public.career_fair_applications (
  id uuid primary key default gen_random_uuid(), idempotency_key uuid not null unique, contact_hash text not null,
  first_name text not null, email text not null, phone text not null,
  track text not null check (track in ('accounting_finance','business_operations','career_portfolio')),
  target_role text not null, task_to_improve text not null,
  ai_level text not null check (ai_level in ('explorer','collaborator','workflow_builder','not_sure')),
  ai_concern text, cohort_interest text not null check (cohort_interest in ('sep_18_25_2026','oct_09_16_2026','future','not_now','not_sure')),
  consultation_window text not null check (consultation_window in ('weekday_morning','weekday_afternoon','weekday_evening','flexible')),
  status text not null check (status in ('consultation_review','waitlisted','contacted','booked','completed','paid_registration')),
  campaign text not null default 'career_fair_2026', source text not null default 'booth_qr', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists career_fair_applications_contact_idx on public.career_fair_applications(contact_hash, created_at desc);
create index if not exists career_fair_applications_status_idx on public.career_fair_applications(status, created_at desc);

create table if not exists public.career_fair_consents (
  application_id uuid not null references public.career_fair_applications(id) on delete cascade,
  consent_type text not null check (consent_type in ('service','marketing','whatsapp')), consent_value boolean not null,
  consented_at timestamptz not null, policy_version text not null, campaign text not null, source text not null,
  primary key(application_id, consent_type)
);
create table if not exists public.career_fair_rate_limits (rate_limit_hash text primary key, window_started_at timestamptz not null default now(), request_count integer not null default 0 check(request_count >= 0));
alter table public.career_fair_applications enable row level security;
alter table public.career_fair_consents enable row level security;
alter table public.career_fair_rate_limits enable row level security;
revoke all on public.career_fair_applications, public.career_fair_consents, public.career_fair_rate_limits from public, anon, authenticated;

create or replace function public.submit_career_fair_application(
  p_idempotency_key uuid, p_contact_hash text, p_rate_limit_hash text, p_first_name text, p_email text, p_phone text, p_track text,
  p_target_role text, p_task_to_improve text, p_ai_level text, p_ai_concern text, p_cohort_interest text, p_consultation_window text,
  p_service_consent boolean, p_marketing_consent boolean, p_whatsapp_consent boolean, p_privacy_version text, p_capacity integer
) returns jsonb language plpgsql security definer set search_path=public as $$
declare v_existing public.career_fair_applications%rowtype; v_app public.career_fair_applications%rowtype; v_count integer; v_status text; v_now timestamptz:=now();
begin
  if not p_service_consent or p_privacy_version <> 'career-fair-2026-08-28' or p_capacity < 0 then raise exception 'invalid request'; end if;
  select * into v_existing from public.career_fair_applications where idempotency_key=p_idempotency_key;
  if v_existing.id is not null then return jsonb_build_object('stored',true,'duplicate',true,'outcome',v_existing.status,'submissionId',v_existing.id); end if;
  insert into public.career_fair_rate_limits as r(rate_limit_hash,window_started_at,request_count) values(p_rate_limit_hash,v_now,1)
    on conflict(rate_limit_hash) do update set window_started_at=case when r.window_started_at<v_now-interval '10 minutes' then v_now else r.window_started_at end, request_count=case when r.window_started_at<v_now-interval '10 minutes' then 1 else r.request_count+1 end returning request_count into v_count;
  if v_count>8 then return jsonb_build_object('stored',false,'rateLimited',true); end if;
  select * into v_existing from public.career_fair_applications where contact_hash=p_contact_hash and track=p_track and created_at>=v_now-interval '24 hours' order by created_at desc limit 1;
  if v_existing.id is not null then return jsonb_build_object('stored',true,'duplicate',true,'outcome',v_existing.status,'submissionId',v_existing.id); end if;
  perform pg_advisory_xact_lock(hashtextextended('career-fair-consultation-capacity',0));
  select count(*) into v_count from public.career_fair_applications where status in ('consultation_review','contacted','booked','completed');
  v_status:=case when v_count<p_capacity then 'consultation_review' else 'waitlisted' end;
  insert into public.career_fair_applications(idempotency_key,contact_hash,first_name,email,phone,track,target_role,task_to_improve,ai_level,ai_concern,cohort_interest,consultation_window,status)
    values(p_idempotency_key,p_contact_hash,p_first_name,p_email,p_phone,p_track,p_target_role,p_task_to_improve,p_ai_level,nullif(p_ai_concern,''),p_cohort_interest,p_consultation_window,v_status) returning * into v_app;
  insert into public.career_fair_consents(application_id,consent_type,consent_value,consented_at,policy_version,campaign,source) values
    (v_app.id,'service',p_service_consent,v_now,p_privacy_version,'career_fair_2026','booth_qr'),
    (v_app.id,'marketing',p_marketing_consent,v_now,p_privacy_version,'career_fair_2026','booth_qr'),
    (v_app.id,'whatsapp',p_whatsapp_consent,v_now,p_privacy_version,'career_fair_2026','booth_qr');
  return jsonb_build_object('stored',true,'duplicate',false,'outcome',v_status,'submissionId',v_app.id);
exception when unique_violation then
  select * into v_existing from public.career_fair_applications where idempotency_key=p_idempotency_key;
  if v_existing.id is not null then return jsonb_build_object('stored',true,'duplicate',true,'outcome',v_existing.status,'submissionId',v_existing.id); end if; raise;
end $$;
revoke all on function public.submit_career_fair_application(uuid,text,text,text,text,text,text,text,text,text,text,text,text,boolean,boolean,boolean,text,integer) from public, anon, authenticated;
grant execute on function public.submit_career_fair_application(uuid,text,text,text,text,text,text,text,text,text,text,text,text,boolean,boolean,boolean,text,integer) to service_role;
