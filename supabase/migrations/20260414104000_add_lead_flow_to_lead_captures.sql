alter table if exists public.lead_captures
  add column if not exists lead_flow text;

update public.lead_captures
set lead_flow = case
  when intent = 'reserve_seat' then 'apply_now'
  when intent = 'advisory_call' then 'advisory_call'
  else 'subsidy_fit'
end
where lead_flow is null;
