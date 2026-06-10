alter table if exists public.lead_captures
  drop constraint if exists lead_captures_intent_check;

alter table if exists public.lead_captures
  add constraint lead_captures_intent_check
  check (intent = any (array[
    'subsidy_fit'::text,
    'reserve_seat'::text,
    'advisory_call'::text,
    'download_checklist'::text
  ]));
