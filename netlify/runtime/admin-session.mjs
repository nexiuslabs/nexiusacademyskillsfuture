import crypto from 'node:crypto';

export const COOKIE_NAME = 'nexius_academy_admin';
export const SESSION_TTL_SECONDS = 60 * 60 * 8;

export const getAdminConfig = () => {
  const username = process.env.ADMIN_USERNAME?.trim();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim().toLowerCase();
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!username || !/^[a-f0-9]{64}$/.test(passwordHash || '') || !sessionSecret || sessionSecret.length < 32) {
    return null;
  }

  return { username, passwordHash, sessionSecret };
};

const sign = (value, secret) =>
  crypto.createHmac('sha256', secret).update(value).digest('base64url');

const signaturesMatch = (actual, expected) => {
  const actualBuffer = Buffer.from(actual || '');
  const expectedBuffer = Buffer.from(expected || '');
  return actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
};

export const createSessionCookie = (config, now = Date.now()) => {
  const payload = {
    sub: config.username,
    exp: Math.floor(now / 1000) + SESSION_TTL_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(encodedPayload, config.sessionSecret);

  return `${COOKIE_NAME}=${encodedPayload}.${signature}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${SESSION_TTL_SECONDS}`;
};

const parseCookies = (cookieHeader = '') =>
  Object.fromEntries(
    cookieHeader
      .split(';')
      .map((part) => part.trim())
      .filter((part) => part.includes('='))
      .map((part) => {
        const separatorIndex = part.indexOf('=');
        return [part.slice(0, separatorIndex), part.slice(separatorIndex + 1)];
      })
  );

export const readSession = (cookieHeader, config, now = Date.now()) => {
  try {
    const raw = parseCookies(cookieHeader)[COOKIE_NAME];
    if (!raw) return null;

    const [payload, signature] = raw.split('.');
    if (!payload || !signature || !signaturesMatch(signature, sign(payload, config.sessionSecret))) return null;

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (decoded.sub !== config.username || !decoded.exp || decoded.exp < Math.floor(now / 1000)) return null;
    return decoded;
  } catch (_error) {
    return null;
  }
};
