const REFERENCE_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const REFERENCE_PATTERN = /^NX-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/;

export const generateLeadReference = () => {
  const random = crypto.getRandomValues(new Uint8Array(12));
  const characters = Array.from(random, (value) => REFERENCE_ALPHABET[value % REFERENCE_ALPHABET.length]);
  return `NX-${characters.slice(0, 6).join('')}-${characters.slice(6).join('')}`;
};

export const normalizeLeadReference = (value) => {
  if (typeof value !== 'string') return null;
  const match = value.toUpperCase().match(/NX-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}/);
  return match && REFERENCE_PATTERN.test(match[0]) ? match[0] : null;
};

export const timingSafeEqual = (left, right) => {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let difference = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < length; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return difference === 0;
};

export const sha256Hex = async (value) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

