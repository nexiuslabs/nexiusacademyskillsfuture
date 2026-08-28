import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync(new URL('../../pages/AICareerFairPage.tsx', import.meta.url), 'utf8');
const assessment = fs.readFileSync(new URL('../../components/career/ActionKitAssessment.tsx', import.meta.url), 'utf8');
const pdf = fs.readFileSync(new URL('../../services/actionKitPdf.ts', import.meta.url), 'utf8');

test('makes the personalised Tech or Accountancy Action Kit the primary CTA', () => {
  assert.match(page, /Complete the check and build my kit/);
  assert.match(page, /AI changes tasks before it changes job titles/);
  assert.match(assessment, /Complete the check to download your personalised AI Career Readiness Action Kit/);
  assert.match(assessment, /\['tech','accountancy'\]/);
});

test('generates the approved eight-page practical kit sections', () => {
  for (const section of ['Your readiness snapshot','AI changes tasks before it changes job titles','My task-opportunity map','Skills to build','My 30/60/90-day readiness plan','Career-fair conversation guide','My next actions']) assert.match(pdf, new RegExp(section.replace(/[/?]/g, '\\$&')));
  assert.match(pdf, /doc\.addPage/);
  assert.match(pdf, /footer\(8\)/);
});

test('personalisation stays client-side and analytics contain enums only', () => {
  assert.doesNotMatch(assessment, /fetch\(|localStorage|sessionStorage/);
  const analytics = [...assessment.matchAll(/trackEvent\(([^;]+)\);/gs)].map(match => match[1]).join('\n');
  for (const pii of ['role:', 'concern:', 'tasks:']) assert.doesNotMatch(analytics, new RegExp(pii));
  assert.match(analytics, /field/);
  assert.match(analytics, /task_count/);
});

test('requires the personalised check and removes the generic kit shortcut', () => {
  assert.doesNotMatch(assessment, /Prefer not to complete the check/);
  assert.doesNotMatch(assessment, /generateGeneric/);
  assert.doesNotMatch(assessment, /generic_action_kit_downloaded/);
});
