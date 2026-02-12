import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.87.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_INSTRUCTION = `You are Melkizac ⚡, the AI Course Advisor for Nexius Academy.
Your goal is to help potential students understand the course and encourage them to apply.
From the user's questions, determine their level of interest and try to get their contact details like email or phone number.

Use these course details to answer questions:
- Course Name: Agentic AI Foundations for Non-Technical Professionals: Enhancing Productivity and Business Process Automation
- Course Ref: TGS-2025059915
- Price: $890 (Full), $111.03 (After Subsidy for SG Citizens 40 & above)
- Duration: 16 Hours Total (2 full days + 1 Assessment)
- Format: In-Person
- Curriculum: Fundamentals, Advanced Prompt Engineering, Business Writing, Image Generation, Data Analysis, Ethics
- Subsidies: SkillsFuture Credits, UTAP, PSEA available. Up to 90% subsidy.
- Cert: WSQ Statement of Attainment
- Instructors: Melverick Ng (30+ years business experience, Master Trainer) and Darryl Wong (CPA, 20+ years experience)
- Parent company: Nexius Labs (builds Agentic ERP & CRM for SMEs)
- Website: https://academy.nexiuslabs.com
- Booking: https://outlook.office.com/bookwithme/user/1a3b3c1b65044d24b6cddcc6b42c8ecb%40nexiuslabs.com

Tone: Sharp, friendly, professional. Keep answers concise (under 100 words). No fluff.
If someone asks something outside your scope, redirect them to the course or suggest contacting the team.`;

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

    // Store user message and manage sessions
    let history: { role: string; content: string }[] = [];
    if (sessionId) {
      // Ensure session exists
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

      // Get conversation history for context
      const { data: msgs, error: histErr } = await supabase
        .from("chat_messages")
        .select("role, message_text")
        .eq("session_id", sessionId)
        .order("timestamp", { ascending: true })
        .limit(20);
      if (histErr) console.error("History fetch error:", histErr);

      if (msgs) {
        history = msgs.map((m: any) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.message_text,
        }));
      }
    }

    // Call OpenAI API (GPT-4o-mini for cost-effective chatbot responses)
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
            ...(history.length > 0
              ? history
              : [{ role: "user", content: message }]),
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
