import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = (relativePath) => readFileSync(new URL(`../../${relativePath}`, import.meta.url), 'utf8');

test('October Agentic AI cohort consistently uses the owner-confirmed 9am to 6pm hours', () => {
  const schedule = source('constants.tsx');
  const leadCapture = source('components/leads/LeadCaptureModal.tsx');
  const seo = source('scripts/postbuild-seo.mjs');

  assert.match(schedule, /09 Oct 2026 & 16 Oct 2026[^}]*time: '9:00am - 6:00pm'/);
  assert.match(leadCapture, /09 Oct 2026 & 16 Oct 2026 \(9am-6pm\)/);
  assert.match(seo, /startDate: '2026-10-09T09:00:00\+08:00'[\s\S]*?endDate: '2026-10-16T18:00:00\+08:00'/);
  assert.doesNotMatch(schedule, /09 Oct 2026 & 16 Oct 2026[^}]*time: '9:00am - 5:00pm'/);
  assert.doesNotMatch(leadCapture, /09 Oct 2026 & 16 Oct 2026 \(9am-5pm\)/);
});

test('October Agentic AI cohort routes its CTA to the official registration destination', () => {
  const scheduleData = source('constants.tsx');
  const scheduleComponent = source('components/courses/Schedule.tsx');
  const officialRegistrationUrl =
    'https://stms.polite.edu.sg/cetapi/api/v1/custom/extendauthorize?id_token=1wsDaJJk5wQr1wPR7QlB%2fPIC08jBM4tkciRKsCmN6LAJxPVn3yrm6zAFin2Y6rXd';
  const octoberScheduleStart = scheduleData.indexOf("dates: '09 Oct 2026 & 16 Oct 2026'");
  const octoberSchedule = scheduleData.slice(octoberScheduleStart, scheduleData.indexOf('},', octoberScheduleStart));

  assert.notEqual(octoberScheduleStart, -1);
  assert.ok(octoberSchedule.includes(`registrationUrl: '${officialRegistrationUrl}'`));
  assert.match(octoberSchedule, /cohortCode: '2026-10-09'/);
  assert.match(scheduleComponent, /redirectUrl: schedule\.registrationUrl/);
  assert.match(scheduleComponent, /skipPayerStep: Boolean\(schedule\.registrationUrl\)/);
});
