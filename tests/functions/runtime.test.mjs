import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import test from 'node:test';

import { handler as adminLogin } from '../../netlify/functions/admin-login.mjs';
import { handler as adminSession } from '../../netlify/functions/admin-session.mjs';
import { createServer } from '../../netlify/runtime/server.mjs';

const withServer = async (callback) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    await callback(`http://127.0.0.1:${server.address().port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
};

const clearAdminEnvironment = () => {
  delete process.env.ADMIN_USERNAME;
  delete process.env.ADMIN_PASSWORD_HASH;
  delete process.env.ADMIN_SESSION_SECRET;
};

test('admin authentication fails closed without explicit configuration', async () => {
  clearAdminEnvironment();
  const response = await adminLogin({ httpMethod: 'POST', body: '{}' });
  assert.equal(response.statusCode, 503);
});

test('admin session cookie round-trips and rejects tampering', async () => {
  process.env.ADMIN_USERNAME = 'admin@example.com';
  process.env.ADMIN_PASSWORD_HASH = crypto.createHash('sha256').update('correct horse').digest('hex');
  process.env.ADMIN_SESSION_SECRET = 'a-test-secret-that-is-at-least-32-characters-long';

  const login = await adminLogin({
    httpMethod: 'POST',
    body: JSON.stringify({ username: 'admin@example.com', password: 'correct horse' }),
  });
  assert.equal(login.statusCode, 200);

  const cookie = login.headers['Set-Cookie'].split(';')[0];
  const session = await adminSession({ httpMethod: 'GET', headers: { cookie } });
  assert.equal(session.statusCode, 200);

  const tampered = await adminSession({ httpMethod: 'GET', headers: { cookie: `${cookie}x` } });
  assert.equal(tampered.statusCode, 401);
  clearAdminEnvironment();
});

test('HTTP adapter exposes health and function routes only', async () => {
  clearAdminEnvironment();
  await withServer(async (baseUrl) => {
    const health = await fetch(`${baseUrl}/healthz`);
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), { ok: true });

    const missing = await fetch(`${baseUrl}/.netlify/functions/not-a-function`);
    assert.equal(missing.status, 404);

    const session = await fetch(`${baseUrl}/.netlify/functions/admin-session`);
    assert.equal(session.status, 503);
    assert.match(session.headers.get('content-type'), /application\/json/);
  });
});

test('HTTP adapter enforces the request-body limit', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/.netlify/functions/admin-login`, {
      method: 'POST',
      body: 'x'.repeat(1024 * 1024 + 1),
    });
    assert.equal(response.status, 413);
  });
});
