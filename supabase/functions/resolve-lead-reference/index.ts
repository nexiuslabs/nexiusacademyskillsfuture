import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { normalizeLeadReference, sha256Hex, timingSafeEqual } from '../_shared/lead-reference.mjs';

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

const failSafely = (status = 404) =>
  new Response(JSON.stringify({ resolved: false, fallback: 'email_verification' }), {
    status,
    headers: jsonHeaders,
  });

Deno.serve(async (request) => {
  if (request.method !== 'POST') return failSafely(404);

  const configuredToken = Deno.env.get('LEAD_REFERENCE_RESOLVER_TOKEN') ?? '';
  const suppliedToken = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? '';

  if (!configuredToken || !timingSafeEqual(suppliedToken, configuredToken)) {
    return failSafely(404);
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
  const callerAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const callerHash = await sha256Hex(`${suppliedToken}:${callerAddress}`);
  const { data: rateLimitAllowed, error: rateLimitError } = await supabase.rpc(
    'consume_lead_reference_rate_limit',
    { requested_caller_hash: callerHash, requested_limit: 30, requested_window: '1 minute' }
  );

  if (rateLimitError || !rateLimitAllowed) return failSafely(429);

  let body: { reference?: unknown };
  try {
    body = await request.json();
  } catch {
    return failSafely();
  }

  const reference = normalizeLeadReference(body.reference);
  if (!reference) return failSafely();

  const { data, error } = await supabase
    .from('lead_captures')
    .select('id, course_slug, cohort_code, intent, lead_flow')
    .eq('lead_reference_identifier', reference)
    .gt('lead_reference_expires_at', new Date().toISOString())
    .maybeSingle();

  if (error || !data) return failSafely();

  return new Response(JSON.stringify({
    resolved: true,
    capture: {
      sourceRecordId: data.id,
      courseSlug: data.course_slug,
      cohortCode: data.cohort_code,
      intent: data.intent,
      leadFlow: data.lead_flow,
    },
  }), { status: 200, headers: jsonHeaders });
});
