import crypto from 'node:crypto';

const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'nexius-academy-admin-session-secret';
const COOKIE_NAME = 'nexius_academy_admin';
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

const sign = (value) =>
  crypto.createHmac('sha256', ADMIN_SESSION_SECRET).update(value).digest('base64url');

const parseCookies = (cookieHeader = '') =>
  Object.fromEntries(
    cookieHeader
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separatorIndex = part.indexOf('=');
        return [part.slice(0, separatorIndex), part.slice(separatorIndex + 1)];
      })
  );

const readSession = (cookieHeader) => {
  const cookies = parseCookies(cookieHeader);
  const raw = cookies[COOKIE_NAME];

  if (!raw) return null;

  const [payload, signature] = raw.split('.');
  if (!payload || !signature) return null;
  if (sign(payload) !== signature) return null;

  const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) return null;

  return decoded;
};

export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed' });
  }

  const session = readSession(event.headers.cookie || event.headers.Cookie || '');
  if (!session) {
    return json(401, { error: 'Unauthorized' });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json(500, { error: 'Supabase server credentials are not configured.' });
  }

  const query = new URLSearchParams({
    select:
      'id,created_at,full_name,email,phone,role,company_name,department_or_designation,lead_flow,age_band,preferred_intake,cohort_code,course_slug,intent,source_tag,page_path',
    order: 'created_at.desc',
    limit: '100',
  });

  const response = await fetch(`${SUPABASE_URL}/rest/v1/lead_captures?${query.toString()}`, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    return json(response.status, { error: body || 'Could not load lead captures.' });
  }

  const data = await response.json();
  return json(200, { leads: data });
}
