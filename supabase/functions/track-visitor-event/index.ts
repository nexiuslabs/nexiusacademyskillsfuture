import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.87.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type VisitorEventPayload = {
  visitorId: string;
  sessionId: string;
  eventName: string;
  pagePath?: string;
  occurredAt?: string;
  elementId?: string;
  elementText?: string;
  sectionId?: string;
  timeOnPageSeconds?: number;
  scrollDepth?: number;
  metadata?: Record<string, unknown>;
};

const readMetadataValue = (
  metadata: Record<string, unknown> | undefined,
  key: string
): string | null => {
  const value = metadata?.[key];
  if (typeof value !== 'string' || value.trim() === '') return null;
  return value;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as VisitorEventPayload;

    if (!payload.visitorId || !payload.sessionId || !payload.eventName) {
      return new Response(JSON.stringify({ error: 'visitorId, sessionId, and eventName are required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const occurredAt = payload.occurredAt ?? new Date().toISOString();
    const metadata = payload.metadata ?? {};

    const { error: insertEventError } = await supabase.from('visitor_events').insert({
      visitor_id: payload.visitorId,
      session_id: payload.sessionId,
      occurred_at: occurredAt,
      event_name: payload.eventName,
      page_path: payload.pagePath ?? null,
      element_id: payload.elementId ?? null,
      element_text: payload.elementText ?? null,
      section_id: payload.sectionId ?? null,
      time_on_page_seconds: payload.timeOnPageSeconds ?? null,
      scroll_depth: payload.scrollDepth ?? null,
      metadata,
    });

    if (insertEventError) throw insertEventError;

    const { data: existingSession, error: sessionLookupError } = await supabase
      .from('visitor_sessions')
      .select('id')
      .eq('session_id', payload.sessionId)
      .maybeSingle();

    if (sessionLookupError) throw sessionLookupError;

    const sessionRecord = {
      visitor_id: payload.visitorId,
      session_id: payload.sessionId,
      last_seen_at: occurredAt,
      status: 'active',
      landing_path:
        existingSession?.id
          ? undefined
          : payload.pagePath ?? readMetadataValue(metadata, 'landing_path') ?? null,
      entry_referrer:
        existingSession?.id
          ? undefined
          : readMetadataValue(metadata, 'referrer'),
      utm_source:
        existingSession?.id
          ? undefined
          : readMetadataValue(metadata, 'utm_source'),
      utm_medium:
        existingSession?.id
          ? undefined
          : readMetadataValue(metadata, 'utm_medium'),
      utm_campaign:
        existingSession?.id
          ? undefined
          : readMetadataValue(metadata, 'utm_campaign'),
      device_type:
        existingSession?.id
          ? undefined
          : readMetadataValue(metadata, 'device_type'),
    };

    const sessionWrite = existingSession?.id
      ? supabase
          .from('visitor_sessions')
          .update(sessionRecord)
          .eq('session_id', payload.sessionId)
      : supabase.from('visitor_sessions').insert({
          ...sessionRecord,
          first_seen_at: occurredAt,
        });

    const { error: sessionWriteError } = await sessionWrite;
    if (sessionWriteError) throw sessionWriteError;

    const { data: existingProfile, error: profileLookupError } = await supabase
      .from('visitor_profiles')
      .select('visitor_id,total_sessions,total_pageviews')
      .eq('visitor_id', payload.visitorId)
      .maybeSingle();

    if (profileLookupError) throw profileLookupError;

    const pageViewIncrement = payload.eventName === 'page_view' ? 1 : 0;

    if (existingProfile?.visitor_id) {
      const { error: profileUpdateError } = await supabase
        .from('visitor_profiles')
        .update({
          last_seen_at: occurredAt,
          total_sessions:
            existingSession?.id ? existingProfile.total_sessions : existingProfile.total_sessions + 1,
          total_pageviews: existingProfile.total_pageviews + pageViewIncrement,
        })
        .eq('visitor_id', payload.visitorId);

      if (profileUpdateError) throw profileUpdateError;
    } else {
      const { error: profileInsertError } = await supabase.from('visitor_profiles').insert({
        visitor_id: payload.visitorId,
        first_seen_at: occurredAt,
        last_seen_at: occurredAt,
        total_sessions: 1,
        total_pageviews: pageViewIncrement,
      });

      if (profileInsertError) throw profileInsertError;
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
