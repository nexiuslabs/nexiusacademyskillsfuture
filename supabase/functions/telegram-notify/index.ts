import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  sessionId: string;
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*\[\]()~`>#+=|{}.!-]/g, '\\$&');
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

    const { sessionId }: RequestBody = await req.json();

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: "sessionId is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: settings, error: settingsError } = await supabase
      .from("app_settings")
      .select("setting_key, setting_value")
      .in("setting_key", ["telegram_bot_token", "telegram_chat_id"]);

    if (settingsError || !settings) {
      console.error("Error fetching settings:", settingsError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch settings" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const botToken = settings.find((s) => s.setting_key === "telegram_bot_token")?.setting_value;
    const chatId = settings.find((s) => s.setting_key === "telegram_chat_id")?.setting_value;

    if (!botToken || !chatId) {
      console.error("Telegram credentials not configured");
      return new Response(
        JSON.stringify({ error: "Telegram credentials not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: messages, error: messagesError } = await supabase
      .from("chat_messages")
      .select("role, message_text, timestamp")
      .eq("session_id", sessionId)
      .order("timestamp", { ascending: true });

    if (messagesError) {
      console.error("Error fetching messages:", messagesError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch messages" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let conversationText = "🚨 *New Support Request* 🚨\n\n";
    conversationText += `*Session ID:* ${escapeMarkdown(sessionId)}\n\n`;
    conversationText += "*Conversation History:*\n";
    conversationText += "━━━━━━━━━━━━━━━━━\n\n";

    if (messages && messages.length > 0) {
      messages.forEach((msg: any) => {
        const roleLabel = msg.role === "user" ? "👤 Customer" : "🤖 AI";
        conversationText += `*${roleLabel}:*\n${escapeMarkdown(msg.message_text)}\n\n`;
      });
    } else {
      conversationText += "No messages found\n\n";
    }

    conversationText += "━━━━━━━━━━━━━━━━━\n";
    conversationText += `\nTo reply, use:\n/reply ${escapeMarkdown(sessionId)} <your message>`;

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const telegramResponse = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: conversationText,
        parse_mode: "MarkdownV2",
      }),
    });

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error("Telegram API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to send Telegram notification" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in telegram-notify:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
