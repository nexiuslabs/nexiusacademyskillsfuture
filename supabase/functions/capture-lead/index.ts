import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type LeadPayload = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  ageBand: 'below_40' | '40_and_above';
  preferredIntake: string;
  cohortCode: string;
  courseSlug: string;
  intent: 'subsidy_fit' | 'reserve_seat' | 'advisory_call';
  sourceTag: string;
  pagePath: string;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as LeadPayload;

    const requiredFields: Array<keyof LeadPayload> = [
      'fullName',
      'email',
      'phone',
      'role',
      'ageBand',
      'preferredIntake',
      'cohortCode',
      'courseSlug',
      'intent',
      'sourceTag',
      'pagePath',
    ];

    for (const field of requiredFields) {
      if (!payload[field] || `${payload[field]}`.trim() === '') {
        return new Response(JSON.stringify({ error: `Missing field: ${field}` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error } = await supabase.from('lead_captures').insert({
      full_name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      age_band: payload.ageBand,
      preferred_intake: payload.preferredIntake,
      cohort_code: payload.cohortCode,
      course_slug: payload.courseSlug,
      intent: payload.intent,
      source_tag: payload.sourceTag,
      page_path: payload.pagePath,
    });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
