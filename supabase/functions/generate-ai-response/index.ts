import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.87.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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
- Mention the generous subsidy when relevant — it's a major selling point`;

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
