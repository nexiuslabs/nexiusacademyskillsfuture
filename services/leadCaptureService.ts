export type LeadSourceTag =
  | 'home_cta'
  | 'course_sticky'
  | 'blog_inline'
  | 'navbar_check_subsidy'
  | 'course_page_cta'
  | 'about_cta'
  | 'unknown';

export interface LeadCapturePayload {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  companyName: string;
  departmentOrDesignation: string;
  leadFlow: 'apply_now' | 'subsidy_fit' | 'advisory_call' | 'checklist_download' | 'company_sponsorship';
  ageBand: 'below_40' | '40_and_above';
  preferredIntake: string;
  cohortCode: string;
  courseSlug: string;
  intent: 'subsidy_fit' | 'reserve_seat' | 'advisory_call' | 'download_checklist';
  payerType: 'self' | 'company_sponsored';
  sponsorContactName: string;
  sponsorContactEmail: string;
  sponsorStatus: 'not_applicable' | 'pending_hr_approval';
  sourceTag: LeadSourceTag;
  pagePath: string;
  visitorId?: string;
  sessionId?: string;
}

export const submitLeadCapture = async (payload: LeadCapturePayload) => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    const response = await fetch(`${supabaseUrl}/functions/v1/capture-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let message = 'Lead capture edge function failed';

      try {
        const payload = await response.json();
        if (payload?.error) {
          message = payload.error;
        }
      } catch {
        // Fall back to the default message when the response is not JSON.
      }

      throw new Error(message);
    }

    return;
  }

  throw new Error('No lead capture endpoint configured');
};

export const estimateNetFee = (ageBand: LeadCapturePayload['ageBand']) => {
  return ageBand === '40_and_above'
    ? {
        amount: '$113.03',
        note: 'Estimated with up to 90% subsidy for eligible SG Citizens aged 40+.',
      }
    : {
        amount: '$291.03',
        note: 'Estimated with up to 70% subsidy for eligible Singapore learners.',
      };
};
