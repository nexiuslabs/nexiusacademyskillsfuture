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
  ageBand: 'below_40' | '40_and_above';
  preferredIntake: string;
  cohortCode: string;
  courseSlug: string;
  intent: 'subsidy_fit' | 'reserve_seat' | 'advisory_call';
  sourceTag: LeadSourceTag;
  pagePath: string;
}

const toFormFields = (payload: LeadCapturePayload) => {
  const now = new Date().toISOString();

  return [
    { name: 'firstname', value: payload.fullName.split(' ')[0] || payload.fullName },
    { name: 'lastname', value: payload.fullName.split(' ').slice(1).join(' ') || '-' },
    { name: 'email', value: payload.email },
    { name: 'phone', value: payload.phone },
    { name: 'jobtitle', value: payload.role },
    { name: 'company_name', value: payload.companyName },
    { name: 'department_or_designation', value: payload.departmentOrDesignation },
    { name: 'age_band', value: payload.ageBand },
    { name: 'preferred_intake', value: payload.preferredIntake },
    { name: 'cohort_code', value: payload.cohortCode },
    { name: 'course_slug', value: payload.courseSlug },
    { name: 'lead_intent', value: payload.intent },
    { name: 'lead_source_tag', value: payload.sourceTag },
    { name: 'page_path', value: payload.pagePath },
    { name: 'captured_at', value: now },
  ];
};

export const submitLeadCapture = async (payload: LeadCapturePayload) => {
  const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
  const formId = import.meta.env.VITE_HUBSPOT_FORM_ID;

  if (portalId && formId) {
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: toFormFields(payload),
        context: {
          pageUri: typeof window !== 'undefined' ? window.location.href : payload.pagePath,
          pageName: 'Nexius Academy Lead Capture',
        },
      }),
    });

    if (!response.ok) {
      throw new Error('HubSpot form submission failed');
    }

    return;
  }

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
      throw new Error('Lead capture edge function failed');
    }

    return;
  }

  throw new Error('No lead capture endpoint configured');
};

export const estimateNetFee = (ageBand: LeadCapturePayload['ageBand']) => {
  return ageBand === '40_and_above'
    ? {
        amount: '$111.03',
        note: 'Estimated with up to 90% subsidy for eligible SG Citizens aged 40+.',
      }
    : {
        amount: '$210.93',
        note: 'Estimated with up to 70% subsidy for eligible Singapore learners.',
      };
};
