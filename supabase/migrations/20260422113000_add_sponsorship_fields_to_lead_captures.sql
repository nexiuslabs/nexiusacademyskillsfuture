alter table if exists public.lead_captures
  add column if not exists payer_type text default 'self',
  add column if not exists sponsor_contact_name text,
  add column if not exists sponsor_contact_email text,
  add column if not exists sponsor_status text default 'not_applicable';
