import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type RecordViewPayload = {
  slug?: string;
  sessionId?: string;
};

const STORAGE_BUCKET = 'website-images';
const STORAGE_PREFIX = 'blog-post-views';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as RecordViewPayload;
    const slug = payload.slug?.trim();
    const sessionId = payload.sessionId?.trim();

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Missing slug' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Missing sessionId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const markerPath = `${STORAGE_PREFIX}/${slug}/${sessionId}.json`;
    const markerPayload = JSON.stringify({
      slug,
      sessionId,
      recordedAt: new Date().toISOString(),
    });

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(markerPath, new Blob([markerPayload], { type: 'application/json' }), {
        contentType: 'application/json',
        upsert: false,
      });

    if (uploadError && !uploadError.message.toLowerCase().includes('duplicate')) {
      throw uploadError;
    }

    return new Response(JSON.stringify({ ok: true, slug }), {
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
