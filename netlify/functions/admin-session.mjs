import crypto from 'node:crypto';

const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'nexius-academy-admin-session-secret';
const COOKIE_NAME = 'nexius_academy_admin';

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
    return json(401, { authenticated: false });
  }

  return json(200, {
    authenticated: true,
    username: session.sub,
    expiresAt: session.exp,
  });
}
