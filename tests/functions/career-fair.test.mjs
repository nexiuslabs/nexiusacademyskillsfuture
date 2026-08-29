import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync(new URL('../../pages/AICareerFairPage.tsx', import.meta.url), 'utf8');
const gapTest = fs.readFileSync(new URL('../../components/career/WorkplaceGapTest.tsx', import.meta.url), 'utf8');
const service = fs.readFileSync(new URL('../../services/careerFairService.ts', import.meta.url), 'utf8');
const fn = fs.readFileSync(new URL('../../supabase/functions/capture-career-fair-lead/index.ts', import.meta.url), 'utf8');
const migration = fs.readFileSync(new URL('../../supabase/migrations/20260828103000_create_career_fair_applications.sql', import.meta.url), 'utf8');

test('publishes the three-minute scenario diagnostic and course facts without the removed pathway section', () => {
  for (const phrase of ['3-minute gap test','18 & 25 September 2026','9 & 16 October 2026']) assert.match(page, new RegExp(phrase.replace(/[&/]/g, '\\$&')));
  for (const phrase of ['Free 3-minute diagnostic','A number does not match','The useful file contains sensitive data','The automation stops halfway','Put the work in order','Evidence of practice','Confidence calibration','AI-aware','Applied foundation','Workflow practitioner','Workplace-proven','Retake the test']) assert.match(gapTest, new RegExp(phrase));
  assert.match(gapTest, /Math\.random/);
  assert.match(gapTest, /seconds <= 180 \? 1 : seconds <= 240 \? 0\.5 : seconds <= 300 \? 0\.3 : 0\.1/);
  assert.match(gapTest, /role="timer"/);
  assert.match(gapTest, /relationScore/);
  assert.match(gapTest, /resultRef\.current\?\.scrollIntoView/);
  assert.doesNotMatch(page, /Two-minute self-check/);
  assert.doesNotMatch(page, /<ActionKitAssessment/);
  assert.doesNotMatch(page, /Build the Action Kit you will actually use/);
  assert.doesNotMatch(page, /Choose your pathway/);
});
test('uses the supplied career artwork and matching hero background', () => {
  assert.match(page, /\/images\/career\/ai-career-readiness-hero\.jpg/);
  assert.match(page, /bg-\[#001827\]/);
  assert.match(page, /loading="eager"/);
  assert.match(page, /lg:object-contain/);
  assert.match(page, /lg:object-right/);
  assert.doesNotMatch(page, /lg:object-cover/);
  assert.match(page, /transparent_58%/);
  assert.doesNotMatch(page, /via-\[#001827\]\/95/);
  for (const label of ['AI Gap Test','Book Consultation','AI Learning Guide']) assert.match(page, new RegExp(label));
});
test('requires name, valid email and an eight-digit Singapore phone to unlock booking', () => {
  assert.match(page, /label="Full name"/);
  assert.match(page, /label="Email address"/);
  assert.match(page, /label="Phone number"/);
  assert.match(page, /validEmail/);
  assert.match(page, /\^\\\+65\[0-9\]\{8\}\$/);
  assert.match(page, /contactReady/);
  assert.match(page, /submitLeadCapture/);
  assert.match(page, /ageBand: "not_provided"/);
  assert.match(page, /intent: isGuide \? "download_checklist" : "advisory_call"/);
  assert.match(page, /consultation_lead_captured/);
  assert.doesNotMatch(page, /These details stay on this page/);
  assert.match(page, /setContactIntent\("consultation"\)/);
  assert.match(page, /rQlRqMpqtECRRRNfXW-T9A2/);
  for (const removed of ['Pathway','Current or target role','Preferred consultation window']) assert.doesNotMatch(page, new RegExp(removed));
});
test('gates the agentic AI employability guide behind a stored lead capture', () => {
  for (const phrase of ['30 Days to Agentic AI Employability','Full name','Get AI Learning Guide']) {
    assert.match(page, new RegExp(phrase));
  }
  assert.match(page, /30-days-to-agentic-ai-employability\.pdf/);
  assert.match(page, /contactIntent === "guide"/);
  assert.match(page, /leadFlow: isGuide \? "checklist_download" : "advisory_call"/);
  assert.match(page, /intent: isGuide \? "download_checklist" : "advisory_call"/);
  assert.match(page, /isGuide \? "ai-career-employability-guide" : "ai-career-consultation"/);
  assert.match(page, /await submitLeadCapture/);
  assert.match(page, /employability_guide_downloaded/);
  assert.match(page, /startGuideDownload\(\)/);
  assert.match(page, /role="dialog"/);
  assert.match(page, /translate-x-full/);
  assert.match(page, /md:grid-cols-2/);
});
test('validates client and server fields and uses atomic idempotent persistence', () => {
  for (const field of ['firstName','email','phone','track','targetRole','taskToImprove','aiLevel','cohortInterest','consultationWindow','serviceConsent']) { assert.match(service, new RegExp(field)); assert.match(fn, new RegExp(field)); }
  assert.match(migration, /idempotency_key uuid not null unique/);
  assert.match(migration, /pg_advisory_xact_lock/);
  assert.match(migration, /created_at>=v_now-interval '24 hours'/);
  assert.match(migration, /p_capacity is null or v_count<p_capacity/);
});
test('analytics include only approved enums and exclude form PII', () => {
  const analyticsCalls = [...page.matchAll(/trackEvent\(([^;]+)\);/gs)].map(match => match[1]).join('\n');
  for (const pii of ['firstName','email','phone','targetRole','taskToImprove','aiConcern','consultationWindow']) assert.doesNotMatch(analyticsCalls, new RegExp(pii));
});
test('storage is private and server-only with rate limiting and safe errors', () => {
  assert.match(migration, /enable row level security/g); assert.match(migration, /revoke all .* from public, anon, authenticated/);
  assert.match(fn, /CAREER_FAIR_ABUSE_KEY/); assert.match(fn, /Too many attempts/); assert.doesNotMatch(fn, /JSON\.stringify\(error\)/);
});
