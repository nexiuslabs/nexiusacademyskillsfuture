// Published Foundation fee tiers. Keep calculator and enquiry estimates in sync.
export type FoundationProfile = {
  learnerType: '' | 'sg_citizen' | 'pr' | 'ltvp' | 'full_fee';
  ageBand: 'not_provided' | 'below_40' | '40_and_above';
  smeSponsored: boolean;
};

let profile: FoundationProfile = { learnerType: '', ageBand: 'not_provided', smeSponsored: false };
const listeners = new Set<() => void>();
export const getFoundationProfile = () => profile;
export const subscribeFoundationProfile = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};
export const updateFoundationProfile = (update: Partial<FoundationProfile>) => {
  profile = { ...profile, ...update };
  listeners.forEach((listener) => listener());
};

export const calculateFoundationFee = (value: FoundationProfile) => {
  if (!value.learnerType || (value.learnerType === 'sg_citizen' && value.ageBand === 'not_provided' && !value.smeSponsored)) return null;
  if (value.learnerType === 'full_fee') return { amount: 'S$970.10', note: 'Full fee, including GST. No subsidy applied.' };
  const enhanced = value.smeSponsored || (value.learnerType === 'sg_citizen' && value.ageBand === '40_and_above');
  return enhanced
    ? { amount: 'S$113.03', note: 'Enhanced funded rate, including GST, for eligible Singapore Citizens aged 40+ or eligible SME-sponsored learners.' }
    : { amount: 'S$291.03', note: 'Standard funded rate, including GST, for eligible Singapore Citizens below 40, PR and LTVP+ learners.' };
};
