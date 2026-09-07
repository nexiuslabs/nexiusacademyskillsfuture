import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('September is closed while October is the default available Foundation intake', () => {
 const constants=readFileSync(new URL('../../constants.tsx',import.meta.url),'utf8');
 const september=constants.slice(constants.indexOf("dates: '18 Sep 2026"),constants.indexOf("dates: '09 Oct 2026"));
 assert.match(september,/registrationClosed: true/);
 assert.doesNotMatch(september,/slotsLeft/);
 const modal=readFileSync(new URL('../../components/leads/LeadCaptureModal.tsx',import.meta.url),'utf8');
 assert.doesNotMatch(modal,/code: '2026-09-18'/);
 const options=modal.slice(modal.indexOf("'agentic-ai': ["));
 assert.ok(options.indexOf("code: '2026-10-09'") < options.indexOf("code: '2026-11-13-interest'"));
 const schedule=readFileSync(new URL('../../components/courses/Schedule.tsx',import.meta.url),'utf8');
 assert.match(schedule,/SCHEDULES.find\(\(schedule\) => !schedule.registrationClosed\)/);
 assert.match(schedule,/disabled[^>]*>Registration Closed/);
});
