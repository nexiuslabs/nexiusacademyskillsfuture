import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync(new URL('../../pages/AICareerFairPage.tsx', import.meta.url), 'utf8');
const service = fs.readFileSync(new URL('../../services/careerFairService.ts', import.meta.url), 'utf8');
const fn = fs.readFileSync(new URL('../../supabase/functions/capture-career-fair-lead/index.ts', import.meta.url), 'utf8');
const migration = fs.readFileSync(new URL('../../supabase/migrations/20260828103000_create_career_fair_applications.sql', import.meta.url), 'utf8');

test('publishes approved tracks, self-check, course facts, and downloadable starter pack', () => {
  for (const phrase of ['Accounting & Finance','Business Operations','Career & Portfolio','Explorer','Collaborator','Workflow Builder','18 & 25 September 2026','9 & 16 October 2026','/downloads/ai-career-starter-pack.pdf']) assert.match(page, new RegExp(phrase.replace(/[&/]/g, '\\$&')));
});
test('keeps service, marketing and WhatsApp consent separate and unchecked', () => {
  assert.match(page, /serviceConsent: false, marketingConsent: false, whatsappConsent: false/);
  assert.match(migration, /'service'.*'marketing'.*'whatsapp'/s);
});
test('validates client and server fields and uses atomic idempotent persistence', () => {
  for (const field of ['firstName','email','phone','track','targetRole','taskToImprove','aiLevel','cohortInterest','consultationWindow','serviceConsent']) { assert.match(service, new RegExp(field)); assert.match(fn, new RegExp(field)); }
  assert.match(migration, /idempotency_key uuid not null unique/);
  assert.match(migration, /pg_advisory_xact_lock/);
  assert.match(migration, /created_at>=v_now-interval '24 hours'/);
});
test('analytics include only approved enums and exclude form PII', () => {
  const analyticsCalls = [...page.matchAll(/trackEvent\(([^;]+)\);/gs)].map(match => match[1]).join('\n');
  for (const pii of ['firstName','email','phone','targetRole','taskToImprove','aiConcern','consultationWindow']) assert.doesNotMatch(analyticsCalls, new RegExp(pii));
});
test('storage is private and server-only with rate limiting and safe errors', () => {
  assert.match(migration, /enable row level security/g); assert.match(migration, /revoke all .* from public, anon, authenticated/);
  assert.match(fn, /CAREER_FAIR_ABUSE_KEY/); assert.match(fn, /Too many attempts/); assert.doesNotMatch(fn, /JSON\.stringify\(error\)/);
});
