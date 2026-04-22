import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type LeadPayload = {
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
  sourceTag: string;
  pagePath: string;
  visitorId?: string;
  sessionId?: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const COMPANY_SPONSOR_APPROVAL_URL =
  'https://stms.polite.edu.sg/cetapi/api/v1/custom/extendauthorize?id_token=Ea7UNfnYJIA4WoawOIysyb%2fRszBZpQj6bwqOfYb6huvtQY6INb9OlRTc1WGKNDge';

const sendSponsorRequestEmail = async (payload: LeadPayload) => {
  const sendGridApiKey = Deno.env.get('SENDGRID_API_KEY');
  const fromEmail = Deno.env.get('SENDGRID_FROM_EMAIL') ?? 'hello@nexiuslabs.com';
  const fromName = Deno.env.get('SENDGRID_FROM_NAME') ?? 'Nexius Academy';

  if (!sendGridApiKey) {
    throw new Error('Company sponsorship email is not configured.');
  }

  const subject = `${payload.fullName} needs company-sponsored registration approval`;
  const preferredIntake = payload.preferredIntake || 'To be confirmed';
  const learnerPhone = payload.phone || 'Not provided';
  const companyName = payload.companyName || 'Company not provided';
  const employeeRoleOrDepartment = payload.role || payload.departmentOrDesignation || 'Not provided';
  const sponsorEmail = payload.sponsorContactEmail.trim().toLowerCase();
  const learnerEmail = payload.email.trim().toLowerCase();
  const personalization: {
    to: Array<{ email: string; name: string }>;
    cc?: Array<{ email: string; name: string }>;
    subject: string;
  } = {
    to: [{ email: payload.sponsorContactEmail, name: payload.sponsorContactName }],
    subject,
  };

  if (sponsorEmail !== learnerEmail) {
    personalization.cc = [{ email: payload.email, name: payload.fullName }];
  }

  const text = `Hello ${payload.sponsorContactName},

${payload.fullName} has started registration for Nexius Academy's Agentic AI course and indicated that ${companyName} will be sponsoring the registration.

What you need to know:
- Learner: ${payload.fullName}
- Email: ${payload.email}
- Mobile: ${learnerPhone}
- Role/department: ${employeeRoleOrDepartment}
- Preferred intake: ${preferredIntake}
- Estimated time to review: 3 minutes

Next step:
Please review this sponsorship request and complete the company-side approval needed for registration using this link:
${COMPANY_SPONSOR_APPROVAL_URL}

If you need more context on funding or claim mechanics, reply to this email and our team will help.
`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #24335b;">
      <p>Hello ${escapeHtml(payload.sponsorContactName)},</p>
      <p>
        ${escapeHtml(payload.fullName)} has started registration for Nexius Academy's Agentic AI course and indicated that
        <strong>${escapeHtml(companyName)}</strong> will be sponsoring the registration.
      </p>
      <p style="margin-bottom: 8px;"><strong>What you need to know</strong></p>
      <ul style="padding-left: 20px; margin-top: 0;">
        <li>Learner: ${escapeHtml(payload.fullName)}</li>
        <li>Email: ${escapeHtml(payload.email)}</li>
        <li>Mobile: ${escapeHtml(learnerPhone)}</li>
        <li>Role/department: ${escapeHtml(employeeRoleOrDepartment)}</li>
        <li>Preferred intake: ${escapeHtml(preferredIntake)}</li>
        <li>Estimated time to review: 3 minutes</li>
      </ul>
      <p>
        <strong>Next step:</strong> Please review this sponsorship request and complete the company-side approval needed for registration using the link below.
      </p>
      <p>
        <a href="${COMPANY_SPONSOR_APPROVAL_URL}" style="color: #0f4c81; font-weight: 700;">
          Complete company approval
        </a>
      </p>
      <p>
        If you need more context on funding or claim mechanics, reply to this email and our team will help.
      </p>
    </div>
  `;

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sendGridApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [personalization],
      from: { email: fromEmail, name: fromName },
      reply_to: { email: payload.email, name: payload.fullName },
      content: [
        { type: 'text/plain', value: text },
        { type: 'text/html', value: html },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Sponsor email failed: ${errorText}`);
  }
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as LeadPayload;

    const requiredFields: Array<keyof LeadPayload> = ['fullName', 'email', 'leadFlow', 'intent', 'sourceTag', 'pagePath'];

    if (payload.intent !== 'download_checklist') {
      requiredFields.push('role', 'ageBand', 'preferredIntake', 'cohortCode', 'courseSlug');
    }

    if (payload.intent === 'reserve_seat') {
      requiredFields.push('payerType');
    }

    if (payload.intent === 'reserve_seat' && payload.payerType === 'company_sponsored') {
      requiredFields.push('companyName', 'departmentOrDesignation', 'sponsorContactName', 'sponsorContactEmail', 'sponsorStatus');
    }

    for (const field of requiredFields) {
      if (!payload[field] || `${payload[field]}`.trim() === '') {
        return new Response(JSON.stringify({ error: `Missing field: ${field}` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error } = await supabase.from('lead_captures').insert({
      full_name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      company_name: payload.companyName,
      department_or_designation: payload.departmentOrDesignation,
      lead_flow: payload.leadFlow,
      age_band: payload.ageBand,
      preferred_intake: payload.preferredIntake,
      cohort_code: payload.cohortCode,
      course_slug: payload.courseSlug,
      intent: payload.intent,
      source_tag: payload.sourceTag,
      page_path: payload.pagePath,
    });

    if (error) {
      throw new Error(error.message || 'Lead capture insert failed');
    }

    if (payload.intent === 'reserve_seat' && payload.payerType === 'company_sponsored') {
      await sendSponsorRequestEmail(payload);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('capture-lead failed', error);

    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: unknown }).message)
          : JSON.stringify(error);

    return new Response(JSON.stringify({ error: message || 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
