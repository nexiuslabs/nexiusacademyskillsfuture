import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const allowedOrigin = Deno.env.get('ACADEMY_SITE_URL') || 'https://academy.nexiuslabs.com';
const headers = { 'Access-Control-Allow-Origin': allowedOrigin, 'Access-Control-Allow-Headers': 'authorization, content-type, x-client-info', 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max: number) => String(value ?? '').trim().replace(/\s+/g, ' ').slice(0, max);
const phone = (value: unknown) => `+${String(value ?? '').replace(/\D/g, '')}`;
const hmac = async (value: string, secret: string) => {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
};

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers });
  if (req.method !== 'POST') return json({ error: 'Not found.' }, 404);
  try {
    const raw = await req.text();
    if (new TextEncoder().encode(raw).byteLength > 12_000) return json({ error: 'Request is too large.' }, 413);
    const input = JSON.parse(raw);
    const data = {
      idempotencyKey: clean(input.idempotencyKey, 80), firstName: clean(input.firstName, 60), email: clean(input.email, 254).toLowerCase(), phone: phone(input.phone),
      track: clean(input.track, 40), targetRole: clean(input.targetRole, 100), taskToImprove: clean(input.taskToImprove, 240), aiLevel: clean(input.aiLevel, 40), aiConcern: clean(input.aiConcern, 240),
      cohortInterest: clean(input.cohortInterest, 40), consultationWindow: clean(input.consultationWindow, 40), serviceConsent: input.serviceConsent === true, marketingConsent: input.marketingConsent === true, whatsappConsent: input.whatsappConsent === true,
      privacyVersion: clean(input.privacyVersion, 80),
    };
    const invalid = !/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(data.idempotencyKey) || data.firstName.length < 2 || !emailPattern.test(data.email) || data.phone.replace(/\D/g,'').length < 8 || !['accounting_finance','business_operations','career_portfolio'].includes(data.track) || !data.targetRole || !data.taskToImprove || !['explorer','collaborator','workflow_builder','not_sure'].includes(data.aiLevel) || !['sep_18_25_2026','oct_09_16_2026','future','not_now','not_sure'].includes(data.cohortInterest) || !['weekday_morning','weekday_afternoon','weekday_evening','flexible'].includes(data.consultationWindow) || !data.serviceConsent || data.privacyVersion !== 'career-fair-2026-08-28';
    if (invalid) return json({ error: 'Check the highlighted fields. Your application has not been submitted.' }, 400);
    const url = Deno.env.get('SUPABASE_URL'); const roleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'); const abuseKey = Deno.env.get('CAREER_FAIR_ABUSE_KEY');
    if (!url || !roleKey || !abuseKey) throw new Error('Career fair service is not configured');
    const capacity = Number(Deno.env.get('CAREER_FAIR_CONSULTATION_CAPACITY') || '0');
    const caller = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const [contactHash, rateHash] = await Promise.all([hmac(`career-fair:contact:${data.email}`, abuseKey), hmac(`career-fair:caller:${caller}`, abuseKey)]);
    const supabase = createClient(url, roleKey, { auth: { persistSession: false } });
    const { data: result, error } = await supabase.rpc('submit_career_fair_application', {
      p_idempotency_key: data.idempotencyKey, p_contact_hash: contactHash, p_rate_limit_hash: rateHash, p_first_name: data.firstName, p_email: data.email, p_phone: data.phone,
      p_track: data.track, p_target_role: data.targetRole, p_task_to_improve: data.taskToImprove, p_ai_level: data.aiLevel, p_ai_concern: data.aiConcern || null,
      p_cohort_interest: data.cohortInterest, p_consultation_window: data.consultationWindow, p_service_consent: data.serviceConsent, p_marketing_consent: data.marketingConsent,
      p_whatsapp_consent: data.whatsappConsent, p_privacy_version: data.privacyVersion, p_capacity: Number.isInteger(capacity) && capacity >= 0 ? capacity : 0,
    });
    if (error) throw error;
    if (result?.rateLimited) return json({ error: 'Too many attempts. Please wait and try again.' }, 429);
    if (result?.stored !== true || !result?.submissionId) throw new Error('Persistence was not confirmed');
    return json({ ok: true, duplicate: result.duplicate === true, outcome: result.outcome }, result.duplicate ? 200 : 201);
  } catch (error) {
    console.error('career fair capture failed', error instanceof Error ? error.message : 'unknown failure');
    return json({ error: 'We could not confirm your application yet. Please try again.' }, 503);
  }
});
