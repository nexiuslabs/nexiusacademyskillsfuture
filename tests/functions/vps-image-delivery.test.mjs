import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('responsive images can bypass Netlify Image CDN on VPS builds', async () => {
  const source = await readFile(
    new URL('../../components/ResponsiveImage.tsx', import.meta.url),
    'utf8',
  );

  assert.match(source, /VITE_DISABLE_NETLIFY_IMAGE_CDN === 'true'/);
  assert.match(source, /return false/);
  assert.match(source, /\.netlify\/images/);
});
