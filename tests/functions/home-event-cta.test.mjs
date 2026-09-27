import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sourceUrl = new URL('../../components/home/CoursePreviewCTA.tsx', import.meta.url);

test('homepage promotes the October AI agent workshop through its existing registration page', async () => {
  const source = await readFile(sourceUrl, 'utf8');

  assert.match(source, /Build your first AI agent/);
  assert.match(source, /in 2 hours/);
  assert.match(source, /17 October 2026/);
  assert.match(source, /10am–12pm \(Singapore time\)/);
  assert.match(source, /Devan Nair Institute/);
  assert.match(source, /No coding background required/);
  assert.match(source, /first-ai-agent-20261017\.jpg/);
  assert.match(source, /WORKSHOP_PATH = '\/workshops\/build-your-first-ai-agent\/'/);
  assert.match(source, /to=\{WORKSHOP_PATH\}/);
  assert.match(source, /REGISTER NOW/);
  assert.doesNotMatch(source, /openLeadModal|free_preview|Free Preview|Register Interest|course-preview-cta|confirmed seat|\$\d/);
});
