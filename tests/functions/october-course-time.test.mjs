import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = (relativePath) => readFileSync(new URL(`../../${relativePath}`, import.meta.url), 'utf8');

test('October Agentic AI cohort consistently uses the owner-confirmed 9am to 6pm hours', () => {
  const schedule = source('constants.tsx');
  const leadCapture = source('components/leads/LeadCaptureModal.tsx');
  const seo = source('scripts/postbuild-seo.mjs');

  assert.match(schedule, /09 Oct 2026 & 16 Oct 2026[^}]*time: '9:00am - 6:00pm'/);
  assert.match(leadCapture, /label: `\$\{schedule.dates\} \(\$\{schedule.time\}\)/);
  assert.match(seo, /startDate: '2026-10-09T09:00:00\+08:00'[\s\S]*?endDate: '2026-10-16T18:00:00\+08:00'/);
  assert.doesNotMatch(schedule, /09 Oct 2026 & 16 Oct 2026[^}]*time: '9:00am - 5:00pm'/);
  assert.doesNotMatch(leadCapture, /09 Oct 2026 & 16 Oct 2026 \(9am-5pm\)/);
});

test('Closed October Foundation has no registration URL and cannot be selected', () => {
  const scheduleData = source('constants.tsx');
  const start = scheduleData.indexOf("dates: '09 Oct 2026 & 16 Oct 2026'");
  const october = scheduleData.slice(start, scheduleData.indexOf('},', start));
  assert.match(october, /registrationClosed: true/);
  assert.match(october, /registrationCloses: '25 Sep 2026'/);
  assert.doesNotMatch(october, /registrationUrl/);
  assert.match(source('components/courses/Schedule.tsx'), /disabled[^>]*>Registration Closed/);
});
