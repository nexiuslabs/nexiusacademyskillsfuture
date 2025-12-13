import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TelegramUpdate {
  message?: {
    message_id: number;
    from: {
      id: number;
      first_name: string;
      username?: string;
    };
    chat: {
      id: number;
    };
    text?: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const update: TelegramUpdate = await req.json();

    if (!update.message || !update.message.text) {
      return new Response(
        JSON.stringify({ ok: true, message: "No text message" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const text = update.message.text;
    const chatId = update.message.chat.id;

    const { data: settings } = await supabase
      .from("app_settings")
      .select("setting_value")
      .eq("setting_key", "telegram_bot_token")
      .single();

    const botToken = settings?.setting_value;

    if (!botToken) {
      console.error("Bot token not configured");
      return new Response(
        JSON.stringify({ ok: true }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (text.startsWith("/reply ")) {
      const parts = text.substring(7).trim().split(" ");
      const sessionId = parts[0];
      const replyMessage = parts.slice(1).join(" ");

      if (!sessionId || !replyMessage) {
        await sendTelegramMessage(
          botToken,
          chatId,
          "Invalid format. Use: /reply <session_id> <message>"
        );
        return new Response(
          JSON.stringify({ ok: true }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: session, error: sessionError } = await supabase
        .from("chat_sessions")
        .select("id, status")
        .eq("session_id", sessionId)
        .single();

      if (sessionError || !session) {
        await sendTelegramMessage(
          botToken,
          chatId,
          `Session not found: ${sessionId}`
        );
        return new Response(
          JSON.stringify({ ok: true }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { error: insertError } = await supabase
        .from("chat_messages")
        .insert({
          session_id: sessionId,
          role: "agent",
          message_text: replyMessage,
          timestamp: new Date().toISOString(),
          needs_human_help: false,
          confidence_score: 1.0,
        });

      if (insertError) {
        console.error("Error inserting message:", insertError);
        await sendTelegramMessage(
          botToken,
          chatId,
          "Failed to send reply to customer."
        );
        return new Response(
          JSON.stringify({ ok: true }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      await sendTelegramMessage(
        botToken,
        chatId,
        `✅ Reply sent to customer in session ${sessionId}`
      );

      return new Response(
        JSON.stringify({ ok: true, message: "Reply sent" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else if (text === "/active") {
      const { data: sessions, error: sessionsError } = await supabase
        .from("chat_sessions")
        .select("session_id, started_at, status")
        .eq("status", "needs_help")
        .order("last_activity_at", { ascending: false })
        .limit(10);

      if (sessionsError || !sessions || sessions.length === 0) {
        await sendTelegramMessage(
          botToken,
          chatId,
          "No active support requests."
        );
        return new Response(
          JSON.stringify({ ok: true }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      let responseText = "📋 *Active Support Requests:*\n\n";
      sessions.forEach((session: any, index: number) => {
        responseText += `${index + 1}. Session: ${session.session_id}\n`;
        responseText += `   Started: ${new Date(session.started_at).toLocaleString()}\n\n`;
      });
      responseText += "Use /reply <session_id> <message> to respond";

      await sendTelegramMessage(botToken, chatId, responseText);

      return new Response(
        JSON.stringify({ ok: true }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else if (text === "/help" || text === "/start") {
      const helpText =
        "🤖 *Customer Support Bot*\n\n" +
        "Available commands:\n" +
        "/active - List active support requests\n" +
        "/reply <session_id> <message> - Reply to a customer\n" +
        "/help - Show this help message\n\n" +
        "You'll receive notifications when customers need help.";

      await sendTelegramMessage(botToken, chatId, helpText);

      return new Response(
        JSON.stringify({ ok: true }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in telegram-webhook:", error);
    return new Response(
      JSON.stringify({ ok: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function sendTelegramMessage(
  botToken: string,
  chatId: number,
  text: string
): Promise<void> {
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  await fetch(telegramApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown",
    }),
  });
}
