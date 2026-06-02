alter table if exists public.lead_captures
  add column if not exists landing_path text,
  add column if not exists referrer text,
  add column if not exists lead_source text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text,
  add column if not exists device_type text;

alter table if exists public.visitor_sessions
  add column if not exists utm_content text,
  add column if not exists lead_source text;

create index if not exists idx_lead_captures_lead_source on public.lead_captures (lead_source);
create index if not exists idx_lead_captures_utm_campaign on public.lead_captures (utm_campaign);
create index if not exists idx_lead_captures_utm_source_medium on public.lead_captures (utm_source, utm_medium);
create index if not exists idx_visitor_sessions_campaign_attribution on public.visitor_sessions (utm_campaign, utm_source, utm_medium);
