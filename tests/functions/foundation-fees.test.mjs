import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../../services/foundationFees.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { calculateFoundationFee, getFoundationProfile, updateFoundationProfile, subscribeFoundationProfile } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);

test('Foundation fees do not assume a visitor is eligible for a funded tier', () => {
  assert.equal(calculateFoundationFee({ learnerType: '', ageBand: 'not_provided', smeSponsored: false }), null);
  assert.equal(calculateFoundationFee({ learnerType: 'sg_citizen', ageBand: 'not_provided', smeSponsored: false }), null);
});

test('all published residency, age and sponsorship combinations keep the correct tier', () => {
  for (const learnerType of ['sg_citizen', 'pr', 'ltvp', 'full_fee']) {
    for (const ageBand of ['below_40', '40_and_above']) {
      for (const smeSponsored of [false, true]) {
        const expected = learnerType === 'full_fee' ? 'S$970.10'
          : smeSponsored || (learnerType === 'sg_citizen' && ageBand === '40_and_above') ? 'S$113.03' : 'S$291.03';
        assert.equal(calculateFoundationFee({ learnerType, ageBand, smeSponsored }).amount, expected, JSON.stringify({ learnerType, ageBand, smeSponsored }));
      }
    }
  }
});

test('fee profile survives movement between calculator and registration in the same page session', () => {
  let changes = 0;
  const unsubscribe = subscribeFoundationProfile(() => changes++);
  updateFoundationProfile({ learnerType: 'pr', ageBand: '40_and_above', smeSponsored: false });
  assert.equal(calculateFoundationFee(getFoundationProfile()).amount, 'S$291.03');
  updateFoundationProfile({ smeSponsored: true });
  assert.equal(calculateFoundationFee(getFoundationProfile()).amount, 'S$113.03');
  assert.equal(changes, 2);
  unsubscribe();
});
