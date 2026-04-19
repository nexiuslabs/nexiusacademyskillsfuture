import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const STORAGE_BUCKET = 'website-images';
const STORAGE_PREFIX = 'blog-post-views';
const SEEDED_COUNTS: Record<string, number> = {
  'beyond-chatgpt-ai-powered-company': 15,
  'enterprise-ai-insights': 87,
  'anthropic-ai-skills': 21,
  'what-is-agentic-ai-guide': 42,
  'best-ai-courses-singapore-2026': 63,
  'smes-no-code-ai-automation-singapore': 38,
  'ai-literacy-corporate-learning-2026': 0,
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    const requestedSlugs = Array.isArray(payload?.slugs)
      ? payload.slugs.filter((slug): slug is string => typeof slug === 'string' && slug.trim().length > 0)
      : null;

    const slugs = requestedSlugs && requestedSlugs.length > 0
      ? requestedSlugs
      : Object.keys(SEEDED_COUNTS);

    const counts = Object.fromEntries(slugs.map((slug) => [slug, SEEDED_COUNTS[slug] ?? 0]));

    for (const slug of slugs) {
      let offset = 0;
      let done = false;
      let markerCount = 0;

      while (!done) {
        const { data, error } = await supabase.storage
          .from(STORAGE_BUCKET)
          .list(`${STORAGE_PREFIX}/${slug}`, {
            limit: 100,
            offset,
          });

        if (error) {
          throw error;
        }

        markerCount += data?.filter((item) => item.name !== '.emptyFolderPlaceholder').length ?? 0;

        if (!data || data.length < 100) {
          done = true;
        } else {
          offset += 100;
        }
      }

      counts[slug] = (counts[slug] ?? 0) + markerCount;
    }

    return new Response(JSON.stringify({ counts }), {
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
