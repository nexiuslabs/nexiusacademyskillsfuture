import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sourceUrl = new URL('../../components/home/CoursePreviewCTA.tsx', import.meta.url);

test('homepage promotes the current Luma event instead of the free preview form', async () => {
  const source = await readFile(sourceUrl, 'utf8');

  assert.match(source, /A Day at Work with My AI Workforce/);
  assert.match(source, /16 September 2026/);
  assert.match(source, /2:00 PM–5:00 PM/);
  assert.match(source, /https:\/\/luma\.com\/0g6j2m5c/);
  assert.match(source, /Register free on Luma/);
  assert.doesNotMatch(source, /openLeadModal|Register Interest|Free Preview/);
});
