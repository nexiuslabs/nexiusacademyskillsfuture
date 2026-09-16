import { useSyncExternalStore } from 'react';
import { calculateFoundationFee, FoundationProfile, getFoundationProfile, subscribeFoundationProfile, updateFoundationProfile } from '../../services/foundationFees';

export default function FoundationFeeEstimator({ title = 'Check your Foundation course fee' }: { title?: string }) {
  const profile = useSyncExternalStore(subscribeFoundationProfile, getFoundationProfile, getFoundationProfile);
  const estimate = calculateFoundationFee(profile);
  return <div className="space-y-4 rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
    <h3 className="font-bold text-primary">{title}</h3>
    <p className="text-sm text-gray-600">No contact details needed. Choose your eligibility profile to see an estimate.</p>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-medium text-primary">Residency / funding profile
        <select className="mt-2 w-full rounded-lg border bg-white p-3" value={profile.learnerType} onChange={(e) => updateFoundationProfile({ learnerType: e.target.value as FoundationProfile['learnerType'] })}>
          <option value="">Choose your profile</option>
          <option value="sg_citizen">Singapore Citizen</option>
          <option value="pr">Singapore Permanent Resident</option>
          <option value="ltvp">Long Term Visit Pass+ (LTVP+)</option>
          <option value="full_fee">No subsidy / full fee</option>
        </select>
      </label>
      <label className="text-sm font-medium text-primary">Age band
        <select className="mt-2 w-full rounded-lg border bg-white p-3" value={profile.ageBand} onChange={(e) => updateFoundationProfile({ ageBand: e.target.value as FoundationProfile['ageBand'] })}>
          <option value="not_provided">Choose age band (optional)</option>
          <option value="below_40">Below 40</option>
          <option value="40_and_above">40 and above</option>
        </select>
      </label>
    </div>
    <label className="flex items-start gap-3 text-sm text-gray-700">
      <input type="checkbox" className="mt-1 h-4 w-4" checked={profile.smeSponsored && profile.learnerType !== 'full_fee'} disabled={!profile.learnerType || profile.learnerType === 'full_fee'} onChange={(e) => updateFoundationProfile({ smeSponsored: e.target.checked })} />
      I am sponsored by an eligible SME employer
    </label>
    <div aria-live="polite" className="rounded-xl bg-white p-4">
      <p className="font-bold text-primary">{estimate ? `Estimated payable: ${estimate.amount}` : 'Select your profile to see your estimate'}</p>
      <p className="mt-1 text-sm text-gray-600">{estimate?.note ?? 'Singapore Citizens: select an age band or eligible SME sponsorship.'}</p>
      <p className="mt-2 text-xs text-gray-600">Subject to final eligibility confirmation. SkillsFuture Credits, if available, are applied separately during registration.</p>
    </div>
  </div>;
}
