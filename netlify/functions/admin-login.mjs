import crypto from 'node:crypto';
import { createSessionCookie, getAdminConfig } from '../runtime/admin-session.mjs';

const json = (statusCode, body, headers = {}) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    ...headers,
  },
  body: JSON.stringify(body),
});

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const config = getAdminConfig();
  if (!config) {
    return json(503, { error: 'Admin authentication is not configured.' });
  }

  try {
    const { username, password } = JSON.parse(event.body || '{}');
    const normalizedUsername = `${username || ''}`.trim().toLowerCase();
    const passwordHash = crypto.createHash('sha256').update(`${password || ''}`).digest('hex');

    if (normalizedUsername !== config.username.toLowerCase() || passwordHash !== config.passwordHash) {
      return json(401, { error: 'Invalid credentials' });
    }

    return json(
      200,
      { ok: true },
      {
        'Set-Cookie': createSessionCookie(config),
      }
    );
  } catch (_error) {
    return json(400, { error: 'Invalid request' });
  }
}
