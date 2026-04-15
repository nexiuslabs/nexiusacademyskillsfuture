import crypto from 'node:crypto';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'hello@nexiuslabs.com';
const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH || '9ca55fc28a597f6643d7ba622c885aeb455023d171778bad658b86f7ea5858b1';
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'nexius-academy-admin-session-secret';
const COOKIE_NAME = 'nexius_academy_admin';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

const json = (statusCode, body, headers = {}) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    ...headers,
  },
  body: JSON.stringify(body),
});

const sign = (value) =>
  crypto.createHmac('sha256', ADMIN_SESSION_SECRET).update(value).digest('base64url');

const createSessionCookie = () => {
  const payload = {
    sub: ADMIN_USERNAME,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(encodedPayload);

  return `${COOKIE_NAME}=${encodedPayload}.${signature}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${SESSION_TTL_SECONDS}`;
};

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const { username, password } = JSON.parse(event.body || '{}');
    const normalizedUsername = `${username || ''}`.trim().toLowerCase();
    const passwordHash = crypto.createHash('sha256').update(`${password || ''}`).digest('hex');

    if (normalizedUsername !== ADMIN_USERNAME.toLowerCase() || passwordHash !== ADMIN_PASSWORD_HASH) {
      return json(401, { error: 'Invalid credentials' });
    }

    return json(
      200,
      { ok: true },
      {
        'Set-Cookie': createSessionCookie(),
      }
    );
  } catch (_error) {
    return json(400, { error: 'Invalid request' });
  }
}
