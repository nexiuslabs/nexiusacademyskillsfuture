import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  normalizeCommit,
  resolveCommit,
  writeDeployMetadata,
} from '../../scripts/write-deploy-metadata.mjs';

test('normalizes and validates deployment commits', () => {
  assert.equal(normalizeCommit('ABCDEF123\n'), 'abcdef123');
  assert.throws(() => normalizeCommit('main'), /hexadecimal Git SHA/);
});

test('prefers Netlify COMMIT_REF over local build metadata', async () => {
  const commit = await resolveCommit({
    env: { COMMIT_REF: 'A'.repeat(40), DEPLOY_COMMIT: 'b'.repeat(40) },
  });
  assert.equal(commit, 'a'.repeat(40));
});

test('writes public deployment metadata from the VPS build commit', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'nexius-deploy-metadata-'));
  try {
    await mkdir(path.join(root, 'dist'));
    await writeFile(path.join(root, '_BUILD_COMMIT'), `${'c'.repeat(40)}\n`, 'utf8');
    const result = await writeDeployMetadata({
      env: {},
      root,
      builtAt: '2026-08-06T00:00:00.000Z',
    });
    const metadata = JSON.parse(await readFile(result.outputPath, 'utf8'));
    assert.deepEqual(metadata, {
      commit: 'c'.repeat(40),
      builtAt: '2026-08-06T00:00:00.000Z',
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
