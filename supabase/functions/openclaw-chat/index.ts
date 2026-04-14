import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.87.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const WHATSAPP_URL = 'https://wa.me/6596615284?text=Hi%20Wendy%2C%20I%20need%20help%20with%20a%20Nexius%20Academy%20course.';

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
- For direct human help, visitors can contact Wendy on WhatsApp: ${WHATSAPP_URL}

Guidelines:
- Be warm, concise, and clear.
- Keep most answers under 120 words unless more detail is requested.
- Do not invent dates, subsidies, or guarantees.
- If unsure, say so plainly.
- For human support, direct the visitor to WhatsApp rather than pretending a live handoff is happening.
- If a question clearly needs a human, explicitly suggest WhatsApp in the answer.
- Focus on helping users understand the right next step.`;

type IncomingMessage = { role: 'user' | 'assistant' | 'system'; content: string };
type LlmMessage = { role: 'user' | 'assistant' | 'system'; content: string };

const needsHumanHelp = (message: string) => {
  const text = message.toLowerCase();
  return [
    'speak to someone',
    'human',
    'whatsapp',
    'call me',
    'contact me',
    'partnership',
    'refund',
    'complaint',
    'corporate training',
    'private cohort',
    'team training',
  ].some((term) => text.includes(term));
};

const simpleGreetingReply = (message: string) => {
  const text = message.trim().toLowerCase();
  if (['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'].includes(text)) {
    return 'Hi! I’m Wendy 👋 I can help with course details, fees, subsidy questions, suitability, and next steps. What would you like to know?';
  }
  return null;
};

async function callOpenAI(apiKey: string, history: LlmMessage[]) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
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

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OPENAI_${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error('OPENAI_EMPTY_RESPONSE');
  return content;
}

async function callAnthropic(apiKey: string, history: LlmMessage[]) {
  const messages = history.filter((m) => m.role !== 'system').map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content,
  }));

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-latest',
      max_tokens: 350,
      system: SYSTEM_INSTRUCTION,
      messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ANTHROPIC_${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data?.content?.find((item: any) => item?.type === 'text')?.text?.trim();
  if (!content) throw new Error('ANTHROPIC_EMPTY_RESPONSE');
  return content;
}

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

    const history: LlmMessage[] = (historyRows || []).map((row: any) => ({
      role: row.role === 'user' ? 'user' : 'assistant',
      content: row.message_text,
    }));

    let responseText = simpleGreetingReply(latestUserMessage) || `I’m having trouble answering right now. Please try again, or message Wendy directly on WhatsApp for help: ${WHATSAPP_URL}`;

    if (needsHumanHelp(latestUserMessage)) {
      responseText = `For this, the fastest next step is to message Wendy directly on WhatsApp so a human can help you properly: ${WHATSAPP_URL}`;
    } else if (!simpleGreetingReply(latestUserMessage)) {
      const openaiKey = Deno.env.get('OPENAI_API_KEY');
      const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
      const diagnostics: string[] = [];

      if (openaiKey) {
        try {
          responseText = await callOpenAI(openaiKey, history);
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          console.error(msg);
          diagnostics.push(msg);
        }
      } else {
        diagnostics.push('OPENAI_KEY_MISSING');
      }

      if (responseText.includes('I’m having trouble answering right now') && anthropicKey) {
        try {
          responseText = await callAnthropic(anthropicKey, history);
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          console.error(msg);
          diagnostics.push(msg);
        }
      } else if (responseText.includes('I’m having trouble answering right now') && !anthropicKey) {
        diagnostics.push('ANTHROPIC_KEY_MISSING');
      }

      if (responseText.includes('I’m having trouble answering right now') && diagnostics.length > 0) {
        responseText = `WENDY_DEBUG: ${diagnostics.join(' | ')}`;
      }
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
      JSON.stringify({ error: 'Wendy is temporarily unavailable. Please try again shortly.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
