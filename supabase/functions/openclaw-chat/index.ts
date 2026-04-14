import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.87.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const SYSTEM_INSTRUCTION = `You are Wendy, the AI Course Advisor for Nexius Academy in Singapore.

Your job is to help visitors understand Nexius Academy workshops, schedules, funding-related questions, suitability, and enrolment paths.

Key facts:
- Main programme: Agentic AI Foundations for Non-Technical Professionals
- Course ref: TP-NC-C0021-F
- Format: in-person classroom training in Singapore
- Full fee: $890
- Indicative subsidised fee shown on site for eligible SG Citizens aged 40+: $111.03
- Website: https://academy.nexiuslabs.com
- Primary registration path is through the official external registration flow on the website.
- For direct human help, visitors can contact Wendy on WhatsApp: https://wa.me/6596615284?text=Hi%20Wendy%2C%20I%20need%20help%20with%20a%20Nexius%20Academy%20course.

Guidelines:
- Be warm, concise, and clear.
- Keep most answers under 120 words unless more detail is requested.
- Do not invent dates, subsidies, or guarantees.
- If unsure, say so plainly.
- For human support, direct the visitor to WhatsApp rather than pretending a live handoff is happening.
- Focus on helping users understand the right next step.`;

type IncomingMessage = { role: 'user' | 'assistant' | 'system'; content: string };

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { sessionKey, messages } = await req.json();
    const sessionId = typeof sessionKey === 'string' && sessionKey.trim() ? sessionKey.trim() : crypto.randomUUID();
    const incomingMessages: IncomingMessage[] = Array.isArray(messages) ? messages : [];
    const latestUserMessage = [...incomingMessages].reverse().find((m) => m?.role === 'user' && typeof m?.content === 'string')?.content?.trim();

    if (!latestUserMessage) {
      return new Response(JSON.stringify({ error: 'Invalid message payload' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await supabase.from('chat_sessions').upsert(
      {
        session_id: sessionId,
        last_activity_at: new Date().toISOString(),
        is_active: true,
        handoff_active: false,
      },
      { onConflict: 'session_id', ignoreDuplicates: false }
    );

    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'user',
      message_text: latestUserMessage,
    });

    const { data: historyRows } = await supabase
      .from('chat_messages')
      .select('role, message_text')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true })
      .limit(20);

    const history = (historyRows || []).map((row: any) => ({
      role: row.role === 'user' ? 'user' : 'assistant',
      content: row.message_text,
    }));

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    let responseText = 'I’m having trouble answering right now. Please try again, or contact Wendy on WhatsApp for help: https://wa.me/6596615284?text=Hi%20Wendy%2C%20I%20need%20help%20with%20a%20Nexius%20Academy%20course.';

    if (apiKey) {
      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'system', content: SYSTEM_INSTRUCTION }, ...history],
          max_tokens: 350,
          temperature: 0.5,
        }),
      });

      const openaiData = await openaiRes.json();
      responseText = openaiData?.choices?.[0]?.message?.content?.trim() || responseText;
    }

    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'model',
      message_text: responseText,
    });

    return new Response(
      JSON.stringify({
        id: sessionId,
        choices: [{ message: { role: 'assistant', content: responseText } }],
        response: responseText,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('openclaw-chat error:', error);
    return new Response(
      JSON.stringify({
        error: 'Wendy is temporarily unavailable. Please try again shortly.',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
