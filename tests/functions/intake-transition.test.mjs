import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('Started September and withdrawn December cohorts are removed while October and November remain', () => {
 const constants=readFileSync(new URL('../../constants.tsx',import.meta.url),'utf8');
 assert.doesNotMatch(constants,/18 Sep 2026|2026-09-18|15 Dec 2026|18 Dec 2026|2026-12-15/);
 for (const code of ['2026-10-09', '2026-11-13-interest']) assert.ok(constants.includes(code));
 const seo=readFileSync(new URL('../../scripts/postbuild-seo.mjs',import.meta.url),'utf8');
 assert.doesNotMatch(seo,/2026-09-18|2026-09-25|2026-12-15|2026-12-18/);
 assert.match(seo,/2026-10-09T09:00:00/);
 const modal=readFileSync(new URL('../../components/leads/LeadCaptureModal.tsx',import.meta.url),'utf8');
 assert.doesNotMatch(modal,/code: '2026-09-18'/);
 const options=modal.slice(modal.indexOf("'agentic-ai': ["));
 assert.match(options, /SCHEDULES.filter/);
 assert.match(options, /!schedule.registrationClosed/);
 const schedule=readFileSync(new URL('../../components/courses/Schedule.tsx',import.meta.url),'utf8');
 assert.match(schedule,/SCHEDULES.find\(\(schedule\) => !schedule.registrationClosed\)/);
 assert.match(schedule,/disabled[^>]*>Registration Closed/);
});
