import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.87.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN') || '';
const TELEGRAM_CHAT_ID = '1037337205';

async function sendTelegramNotification(sessionId: string, customerMessage: string) {
  if (!TELEGRAM_BOT_TOKEN) return;
  const text = `🔔 *Customer needs help* (academy)\n\nSession: \`${sessionId}\`\nMessage: ${customerMessage.substring(0, 500)}\n\nReply with:\n\`/reply academy:${sessionId} Your message here\``;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' }),
    });
  } catch (e) {
    console.error('Telegram notification error:', e);
  }
}

const SYSTEM_INSTRUCTION = `You are Nexius Agent, the AI Course Advisor for Nexius Academy — Singapore's specialist training provider for Agentic AI.

Your role is to warmly welcome potential students, answer their questions about our courses, and gently guide interested visitors toward booking a consultation or signing up.

Course Details:
- Course Name: Agentic AI Foundations for Non-Technical Professionals: Enhancing Productivity and Business Process Automation
- Course Ref: TGS-2025059915
- Price: $890 (Full Fee), $111.03 (After Subsidy — SG Citizens aged 40 & above)
- Duration: 16 Hours Total (2 full days in-person + 1 Assessment day)
- Format: In-Person classroom training in Singapore
- Curriculum: AI Fundamentals, Advanced Prompt Engineering, Business Writing with AI, AI Image Generation, Data Analysis with AI, AI Ethics & Governance
- Subsidies: SkillsFuture Credits, UTAP, PSEA accepted. Up to 90% government subsidy available.
- Certification: WSQ Statement of Attainment (nationally recognised)
- Instructors: Melverick Ng (30+ years business & technology experience, Master Trainer) and Darryl Wong (CPA, 20+ years corporate finance experience)
- Parent Company: Nexius Labs — we build Agentic AI systems (ERP, CRM, workflow automation) for SMEs
- Website: https://academy.nexiuslabs.com
- Book a free consultation: https://outlook.office.com/bookwithme/user/1a3b3c1b65044d24b6cddcc6b42c8ecb%40nexiuslabs.com

Communication Guidelines:
- Be professional, warm, and helpful at all times
- Keep answers clear and concise (under 120 words unless more detail is requested)
- Use simple language — our students are non-technical professionals
- When someone shows interest, suggest they book a free consultation or ask for their email so we can send more information
- If asked about topics outside your scope, politely let them know and offer to connect them with our team
- Never make up information — if unsure, say you'll check with the team
- Highlight the practical, career-boosting value of the course
- Mention the generous subsidy when relevant — it's a major selling point

ESCALATION RULES:
If the customer asks something you genuinely cannot answer (e.g. specific class dates/availability, corporate group booking, custom training, partnership inquiries, complaints, refund requests, or requests to speak with a person), respond helpfully but include the exact marker [ESCALATE] at the very end of your message. This marker will NOT be shown to the customer — it triggers a handoff to a human team member.
Do NOT escalate for general questions about the course, subsidies, curriculum, or booking a consultation.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { message, sessionId } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let history: { role: string; content: string }[] = [];
    if (sessionId) {
      const { error: sessErr } = await supabase.from("chat_sessions").upsert({
        session_id: sessionId,
        last_activity_at: new Date().toISOString(),
        is_active: true,
      }, { onConflict: "session_id", ignoreDuplicates: false });
      if (sessErr) console.error("Session upsert error:", sessErr);

      const { error: msgErr } = await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "user",
        message_text: message,
      });
      if (msgErr) console.error("Message insert error:", msgErr);

      // Check if session is in handoff mode
      const { data: sessionData } = await supabase
        .from("chat_sessions")
        .select("handoff_active")
        .eq("session_id", sessionId)
        .single();

      if (sessionData?.handoff_active) {
        // Forward to Telegram, don't call AI
        await sendTelegramNotification(sessionId, message);
        const waitText = "Your message has been forwarded to our team. They'll respond shortly — please stay on this chat.";
        await supabase.from("chat_messages").insert({
          session_id: sessionId,
          role: "model",
          message_text: waitText,
        });
        return new Response(
          JSON.stringify({ response: waitText }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: msgs } = await supabase
        .from("chat_messages")
        .select("role, message_text")
        .eq("session_id", sessionId)
        .order("timestamp", { ascending: true })
        .limit(20);

      if (msgs) {
        history = msgs.map((m: any) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.message_text,
        }));
      }
    }

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    let responseText: string;

    if (apiKey) {
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            ...(history.length > 0 ? history : [{ role: "user", content: message }]),
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const openaiData = await openaiRes.json();
      responseText = openaiData.choices?.[0]?.message?.content || "I'm sorry, I didn't get that.";
    } else {
      responseText = "Chat is temporarily unavailable. Please contact us directly at the academy.";
    }

    // Check for escalation
    const shouldEscalate = responseText.includes('[ESCALATE]');
    responseText = responseText.replace(/\s*\[ESCALATE\]\s*/g, '').trim();

    if (shouldEscalate) {
      responseText += '\n\nI\'m connecting you with a team member who can help you further. Please hold on — they\'ll join this chat shortly.';

      // Set handoff mode
      if (sessionId) {
        await supabase
          .from("chat_sessions")
          .update({ handoff_active: true })
          .eq("session_id", sessionId);

        await sendTelegramNotification(sessionId, message);
      }
    }

    // Store bot response
    if (sessionId) {
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "model",
        message_text: responseText,
      });
    }

    return new Response(
      JSON.stringify({ response: responseText }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: "I'm experiencing issues right now. Please try again shortly." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
