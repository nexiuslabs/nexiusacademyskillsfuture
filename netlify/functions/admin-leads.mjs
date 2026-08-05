import { getAdminConfig, readSession } from '../runtime/admin-session.mjs';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

const derivePayerType = (lead) => {
  if (lead.payer_type) return lead.payer_type;
  if (lead.lead_flow === 'company_sponsorship') return 'company_sponsored';
  if (lead.intent === 'reserve_seat') return 'self';
  return null;
};

const deriveSponsorStatus = (lead) => {
  if (lead.sponsor_status) return lead.sponsor_status;
  return lead.lead_flow === 'company_sponsorship' ? 'pending_hr_approval' : null;
};

export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed' });
  }

  const config = getAdminConfig();
  if (!config) {
    return json(503, { error: 'Admin authentication is not configured.' });
  }

  const session = readSession(event.headers.cookie || event.headers.Cookie || '', config);
  if (!session) {
    return json(401, { error: 'Unauthorized' });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json(500, { error: 'Supabase server credentials are not configured.' });
  }

  const headers = {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  };

  const leadSelectWithSponsorship =
    'id,created_at,full_name,email,phone,role,company_name,department_or_designation,lead_flow,age_band,preferred_intake,cohort_code,course_slug,intent,payer_type,sponsor_contact_name,sponsor_contact_email,sponsor_status,source_tag,page_path';

  const leadSelectLegacy =
    'id,created_at,full_name,email,phone,role,company_name,department_or_designation,lead_flow,age_band,preferred_intake,cohort_code,course_slug,intent,source_tag,page_path';

  const loadLeads = async (select) => {
    const query = new URLSearchParams({
      select,
      order: 'created_at.desc',
      limit: '100',
    });

    return fetch(`${SUPABASE_URL}/rest/v1/lead_captures?${query.toString()}`, { headers });
  };

  let response = await loadLeads(leadSelectWithSponsorship);

  if (!response.ok) {
    const body = await response.text();

    if (body.includes('payer_type') || body.includes('sponsor_contact_name') || body.includes('sponsor_status')) {
      response = await loadLeads(leadSelectLegacy);

      if (!response.ok) {
        const legacyBody = await response.text();
        return json(response.status, { error: legacyBody || 'Could not load lead captures.' });
      }

      const data = await response.json();
      const normalized = data.map((lead) => ({
        ...lead,
        payer_type: derivePayerType(lead),
        sponsor_contact_name: null,
        sponsor_contact_email: null,
        sponsor_status: deriveSponsorStatus(lead),
      }));

      return json(200, { leads: normalized });
    }

    return json(response.status, { error: body || 'Could not load lead captures.' });
  }

  const data = await response.json();
  const normalized = data.map((lead) => ({
    ...lead,
    payer_type: derivePayerType(lead),
    sponsor_status: deriveSponsorStatus(lead),
  }));

  return json(200, { leads: normalized });
}
