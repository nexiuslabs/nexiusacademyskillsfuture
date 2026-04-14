alter table if exists public.lead_captures
  add column if not exists company_name text,
  add column if not exists department_or_designation text;
