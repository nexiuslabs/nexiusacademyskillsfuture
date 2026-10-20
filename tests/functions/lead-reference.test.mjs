import assert from 'node:assert/strict';
import test from 'node:test';
import {
  generateLeadReference,
  normalizeLeadReference,
  sha256Hex,
  timingSafeEqual,
} from '../../supabase/functions/_shared/lead-reference.mjs';

test('generates opaque human-readable lead references without ambiguous characters', () => {
  const references = new Set(Array.from({ length: 1_000 }, generateLeadReference));

  assert.equal(references.size, 1_000);
  for (const reference of references) {
    assert.match(reference, /^NX-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/);
  }
});

test('extracts references case-insensitively with surrounding punctuation', () => {
  assert.equal(normalizeLeadReference('Reference: (nx-7q4m2k-p9d3ab).'), 'NX-7Q4M2K-P9D3AB');
  assert.equal(normalizeLeadReference('NX-INVALID-P9D3AB'), null);
  assert.equal(normalizeLeadReference(null), null);
});

test('compares resolver credentials without early length or character exits', () => {
  assert.equal(timingSafeEqual('integration-secret', 'integration-secret'), true);
  assert.equal(timingSafeEqual('integration-secret', 'integration-secreu'), false);
  assert.equal(timingSafeEqual('integration-secret', 'short'), false);
});

test('hashes rate-limit caller keys deterministically', async () => {
  const digest = await sha256Hex('caller');
  assert.equal(digest.length, 64);
  assert.equal(digest, await sha256Hex('caller'));
  assert.notEqual(digest, await sha256Hex('another-caller'));
});

