import { getAdminConfig, readSession } from '../runtime/admin-session.mjs';

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed' });
  }

  const config = getAdminConfig();
  if (!config) {
    return json(503, { authenticated: false, error: 'Admin authentication is not configured.' });
  }

  const session = readSession(event.headers.cookie || event.headers.Cookie || '', config);

  if (!session) {
    return json(401, { authenticated: false });
  }

  return json(200, {
    authenticated: true,
    username: session.sub,
    expiresAt: session.exp,
  });
}
