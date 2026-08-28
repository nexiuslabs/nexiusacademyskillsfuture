alter table public.lead_captures
  drop constraint if exists lead_captures_age_band_check;

alter table public.lead_captures
  add constraint lead_captures_age_band_check
  check (age_band in ('below_40', '40_and_above', 'not_provided'));
