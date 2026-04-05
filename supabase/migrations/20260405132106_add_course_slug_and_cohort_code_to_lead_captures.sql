alter table if exists public.lead_captures
  add column if not exists course_slug text,
  add column if not exists cohort_code text;

update public.lead_captures
set course_slug = coalesce(course_slug, split_part(page_path, '/', 3)),
    cohort_code = coalesce(cohort_code, nullif(replace(replace(preferred_intake, ' ', '-'), '–', '-'), ''))
where course_slug is null or cohort_code is null;
