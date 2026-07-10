import crypto from 'node:crypto';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE = 'assessment_invites';
const ATTEMPTS_TABLE = 'assessment_invite_access_attempts';
const EMAIL_FAIL_LIMIT = 5;
const IP_FAIL_LIMIT = 30;
const RATE_LIMIT_WINDOW_MINUTES = 15;

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

const normalizeEmail = (value) => (typeof value === 'string' ? value.trim().toLowerCase() : '');
const normalizeCode = (value) => (typeof value === 'string' ? value.replace(/\D/g, '') : '');
const hashAccessCode = (email, code) =>
  crypto.createHmac('sha256', SUPABASE_SERVICE_ROLE_KEY).update(`${email}:${code}`).digest('hex');
const hashIp = (value) =>
  value ? crypto.createHmac('sha256', SUPABASE_SERVICE_ROLE_KEY).update(value).digest('hex') : null;

const clampText = (value, max = 500) => {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
};

const isExpired = (expiresAt) => Boolean(expiresAt && new Date(expiresAt).getTime() < Date.now());

const supabaseHeaders = (extra = {}) => ({
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
  ...extra,
});

const clientIp = (event) =>
  event.headers?.['x-nf-client-connection-ip'] ||
  event.headers?.['client-ip'] ||
  event.headers?.['x-forwarded-for']?.split(',')?.[0]?.trim() ||
  event.headers?.['x-real-ip'] ||
  '';

const rateWindowIso = () => new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();

const countRecentFailures = async ({ email, ipHash, assessmentSlug }) => {
  const since = rateWindowIso();
  const countFor = async (field, value) => {
    if (!value) return 0;
    const endpoint = new URL(`${SUPABASE_URL}/rest/v1/${ATTEMPTS_TABLE}`);
    endpoint.searchParams.set('select', 'id');
    endpoint.searchParams.set('assessment_slug', `eq.${assessmentSlug}`);
    endpoint.searchParams.set(field, `eq.${value}`);
    endpoint.searchParams.set('success', 'eq.false');
    endpoint.searchParams.set('created_at', `gte.${since}`);

    const response = await fetch(endpoint, {
      headers: supabaseHeaders({ Prefer: 'count=exact' }),
    });

    if (!response.ok) return 0;
    const range = response.headers.get('content-range') || '';
    const count = Number(range.split('/')[1]);
    return Number.isFinite(count) ? count : 0;
  };

  const [emailFailures, ipFailures] = await Promise.all([
    countFor('learner_email', email),
    countFor('ip_hash', ipHash),
  ]);

  return { emailFailures, ipFailures };
};

const logAttempt = async ({ assessmentSlug, email, ipHash, success }) => {
  await fetch(`${SUPABASE_URL}/rest/v1/${ATTEMPTS_TABLE}`, {
    method: 'POST',
    headers: supabaseHeaders(),
    body: JSON.stringify({
      assessment_slug: assessmentSlug,
      learner_email: email || null,
      ip_hash: ipHash,
      success,
    }),
  }).catch(() => undefined);
};

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json(500, { error: 'Supabase server credentials are not configured.' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (_error) {
    return json(400, { error: 'Invalid JSON payload.' });
  }

  const email = normalizeEmail(payload?.email);
  const accessCode = normalizeCode(payload?.accessCode);
  const assessmentSlug = clampText(payload?.assessmentSlug, 120) || 'agentic-ai-challenge';
  const ipHash = hashIp(clientIp(event));

  if (!email || !email.includes('@')) {
    return json(400, { error: 'Enter the learner email used for registration.' });
  }

  if (!/^\d{6}$/.test(accessCode)) {
    await logAttempt({ assessmentSlug, email, ipHash, success: false });
    return json(400, { error: 'Enter the 6-digit learner access code.' });
  }

  const { emailFailures, ipFailures } = await countRecentFailures({ email, ipHash, assessmentSlug });
  if (emailFailures >= EMAIL_FAIL_LIMIT || ipFailures >= IP_FAIL_LIMIT) {
    return json(429, { error: 'Too many incorrect attempts. Please try again later or contact Nexius Academy.' });
  }

  const accessCodeHash = hashAccessCode(email, accessCode);
  const endpoint = new URL(`${SUPABASE_URL}/rest/v1/${TABLE}`);
  endpoint.searchParams.set('select', 'id,assessment_slug,cohort_code,learner_name,learner_email,course_name,course_dates,trainer_name,expires_at,certificate_enabled,max_results');
  endpoint.searchParams.set('assessment_slug', `eq.${assessmentSlug}`);
  endpoint.searchParams.set('learner_email', `eq.${email}`);
  endpoint.searchParams.set('access_code_hash', `eq.${accessCodeHash}`);
  endpoint.searchParams.set('active', 'eq.true');
  endpoint.searchParams.set('limit', '1');

  const response = await fetch(endpoint, {
    headers: supabaseHeaders(),
  });

  if (!response.ok) {
    return json(500, { error: 'Could not validate learner access.' });
  }

  const rows = await response.json();
  const invite = rows?.[0];

  if (!invite || isExpired(invite.expires_at)) {
    await logAttempt({ assessmentSlug, email, ipHash, success: false });
    return json(401, { error: 'This learner email and access code combination is not valid or has expired.' });
  }

  await logAttempt({ assessmentSlug, email, ipHash, success: true });

  return json(200, {
    invite: {
      id: invite.id,
      assessmentSlug: invite.assessment_slug,
      cohortCode: invite.cohort_code,
      learnerName: invite.learner_name,
      learnerEmail: invite.learner_email,
      courseName: invite.course_name,
      courseDates: invite.course_dates || [],
      trainerName: invite.trainer_name,
      certificateEnabled: Boolean(invite.certificate_enabled),
      maxResults: invite.max_results,
    },
  });
}
