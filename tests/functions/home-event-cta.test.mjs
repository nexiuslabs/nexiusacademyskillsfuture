import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sourceUrl = new URL('../../components/home/CoursePreviewCTA.tsx', import.meta.url);

test('homepage offers undated Agentic AI preview interest with the historical internal flow', async () => {
  const source = await readFile(sourceUrl, 'utf8');

  assert.match(source, /Join our next Agentic AI preview session/);
  assert.match(source, /Free Preview/);
  assert.match(source, /We’ll share the next available preview session/);
  assert.match(source, /Venue details will be confirmed with the next session/);
  assert.match(source, /to="\/course-preview"/);
  assert.match(source, /course-preview-cta-mobile\.jpg/);
  assert.match(source, /course-preview-cta\.jpg/);
  assert.match(source, /openLeadModal\('free_preview', 'reserve_seat'/);
  assert.match(source, /preferredIntake: 'Register Interest'/);
  assert.match(source, /cohortCode: 'next-available'/);
  assert.match(source, /courseSlug: 'free-preview'/);
  assert.match(source, /ctaLabel: 'register_interest_free_preview'/);
  assert.doesNotMatch(source, /A Day at Work with My AI Workforce|luma\.com|September 2026|Hotel Boss/);
});
