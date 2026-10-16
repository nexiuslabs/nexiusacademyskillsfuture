alter table public.lead_captures
  add column if not exists lead_reference_identifier text,
  add column if not exists lead_reference_issued_at timestamptz,
  add column if not exists lead_reference_expires_at timestamptz;

alter table public.lead_captures
  drop constraint if exists lead_captures_reference_format_check;

alter table public.lead_captures
  add constraint lead_captures_reference_format_check
  check (
    lead_reference_identifier is null
    or lead_reference_identifier ~ '^NX-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$'
  );

create unique index if not exists lead_captures_reference_identifier_key
  on public.lead_captures (lead_reference_identifier)
  where lead_reference_identifier is not null;

create index if not exists lead_captures_reference_expiry_idx
  on public.lead_captures (lead_reference_expires_at)
  where lead_reference_identifier is not null;

create table if not exists public.lead_reference_rate_limits (
  caller_hash text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0,
  constraint lead_reference_rate_limits_request_count_check check (request_count >= 0)
);

alter table public.lead_reference_rate_limits enable row level security;

create or replace function public.consume_lead_reference_rate_limit(
  requested_caller_hash text,
  requested_limit integer default 30,
  requested_window interval default interval '1 minute'
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  allowed boolean;
begin
  insert into public.lead_reference_rate_limits as limits (
    caller_hash,
    window_started_at,
    request_count
  ) values (
    requested_caller_hash,
    now(),
    1
  )
  on conflict (caller_hash) do update
    set window_started_at = case
          when limits.window_started_at <= now() - requested_window then now()
          else limits.window_started_at
        end,
        request_count = case
          when limits.window_started_at <= now() - requested_window then 1
          else limits.request_count + 1
        end
  returning request_count <= requested_limit into allowed;

  return allowed;
end;
$$;

revoke all on function public.consume_lead_reference_rate_limit(text, integer, interval) from public;
grant execute on function public.consume_lead_reference_rate_limit(text, integer, interval) to service_role;

