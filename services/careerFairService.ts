export const CAREER_FAIR_PRIVACY_VERSION = 'career-fair-2026-08-28';

export type CareerTrack = 'accounting_finance' | 'business_operations' | 'career_portfolio';
export type AiLevel = 'explorer' | 'collaborator' | 'workflow_builder' | 'not_sure';
export type CohortInterest = 'sep_18_25_2026' | 'oct_09_16_2026' | 'future' | 'not_now' | 'not_sure';
export type ConsultationWindow = 'weekday_morning' | 'weekday_afternoon' | 'weekday_evening' | 'flexible';

export type CareerFairSubmission = {
  idempotencyKey: string;
  firstName: string;
  email: string;
  phone: string;
  track: CareerTrack | '';
  targetRole: string;
  taskToImprove: string;
  aiLevel: AiLevel | '';
  aiConcern: string;
  cohortInterest: CohortInterest | '';
  consultationWindow: ConsultationWindow | '';
  serviceConsent: boolean;
  marketingConsent: boolean;
  whatsappConsent: boolean;
  privacyVersion: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const normalizePhone = (value: string) => {
  const raw = value.trim();
  if (!raw) return '';
  return `+${raw.replace(/\D/g, '')}`;
};

export const validateCareerFairSubmission = (value: CareerFairSubmission) => {
  const errors: Partial<Record<keyof CareerFairSubmission, string>> = {};
  const phoneDigits = normalizePhone(value.phone).replace(/\D/g, '');
  if (value.firstName.trim().length < 2 || value.firstName.trim().length > 60) errors.firstName = 'Enter your first name.';
  if (!emailPattern.test(value.email.trim())) errors.email = 'Enter a valid email address.';
  if (phoneDigits.length < 8 || phoneDigits.length > 15) errors.phone = 'Enter a valid mobile number with country code.';
  if (!['accounting_finance', 'business_operations', 'career_portfolio'].includes(value.track)) errors.track = 'Choose a pathway.';
  if (!value.targetRole.trim() || value.targetRole.length > 100) errors.targetRole = 'Enter your current or target role (up to 100 characters).';
  if (!value.taskToImprove.trim() || value.taskToImprove.length > 240) errors.taskToImprove = 'Enter one task (up to 240 characters).';
  if (!['explorer', 'collaborator', 'workflow_builder', 'not_sure'].includes(value.aiLevel)) errors.aiLevel = 'Choose your current AI experience.';
  if (value.aiConcern.length > 240) errors.aiConcern = 'Keep your answer within 240 characters.';
  if (!['sep_18_25_2026', 'oct_09_16_2026', 'future', 'not_now', 'not_sure'].includes(value.cohortInterest)) errors.cohortInterest = 'Choose a course-interest option.';
  if (!['weekday_morning', 'weekday_afternoon', 'weekday_evening', 'flexible'].includes(value.consultationWindow)) errors.consultationWindow = 'Choose a preferred consultation window.';
  if (!value.serviceConsent || value.privacyVersion !== CAREER_FAIR_PRIVACY_VERSION) errors.serviceConsent = 'Accept the Privacy Notice to request this service.';
  if (!/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(value.idempotencyKey)) errors.idempotencyKey = 'Refresh the page and try again.';
  return errors;
};

export const submitCareerFairApplication = async (payload: CareerFairSubmission) => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('The application service is not configured.');
  const response = await fetch(`${url}/functions/v1/capture-career-fair-lead`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result?.ok !== true) throw new Error(result?.error || 'We could not confirm your application yet. Please try again.');
  return result as { ok: true; duplicate: boolean; outcome: 'consultation_review' | 'waitlisted' };
};
