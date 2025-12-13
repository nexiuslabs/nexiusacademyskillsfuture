import { supabase } from '../lib/supabase';

interface TelegramSettings {
  botToken: string;
  chatId: string;
}

async function getTelegramSettings(): Promise<TelegramSettings | null> {
  try {
    const { data, error } = await supabase
      .from('app_settings')
      .select('setting_key, setting_value')
      .in('setting_key', ['telegram_bot_token', 'telegram_chat_id']);

    if (error) throw error;
    if (!data || data.length === 0) return null;

    const settings: Record<string, string> = {};
    data.forEach(item => {
      settings[item.setting_key] = item.setting_value;
    });

    const botToken = settings['telegram_bot_token'];
    const chatId = settings['telegram_chat_id'];

    if (!botToken || !chatId || botToken.trim() === '' || chatId.trim() === '') {
      return null;
    }

    return { botToken, chatId };
  } catch (error) {
    console.error('Error fetching Telegram settings:', error);
    return null;
  }
}

export async function sendTelegramMessage(message: string): Promise<boolean> {
  try {
    const settings = await getTelegramSettings();
    if (!settings) {
      console.warn('Telegram settings not configured');
      return false;
    }

    const url = `https://api.telegram.org/bot${settings.botToken}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: settings.chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return false;
    }

    return data.ok === true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}

export async function sendNewChatNotification(
  sessionId: string,
  initialMessage: string
): Promise<boolean> {
  const dashboardUrl = `${window.location.origin}/admin/chat-history?session=${sessionId}`;

  const message = `
🆕 <b>New Chat Session Started</b>

<b>Session ID:</b> ${sessionId.substring(0, 8)}...
<b>Time:</b> ${new Date().toLocaleString()}

<b>First Message:</b>
${initialMessage.substring(0, 200)}${initialMessage.length > 200 ? '...' : ''}

<a href="${dashboardUrl}">View in Dashboard →</a>
  `.trim();

  return await sendTelegramMessage(message);
}

export async function sendStuckNotification(
  sessionId: string,
  conversationContext: string[]
): Promise<boolean> {
  const dashboardUrl = `${window.location.origin}/admin/chat-history?session=${sessionId}`;

  const contextPreview = conversationContext
    .slice(-3)
    .map((msg, idx) => `${idx === conversationContext.length - 1 ? '→' : ' '} ${msg.substring(0, 100)}`)
    .join('\n');

  const message = `
⚠️ <b>AI Needs Help</b>

<b>Session ID:</b> ${sessionId.substring(0, 8)}...
<b>Time:</b> ${new Date().toLocaleString()}

The AI detected low confidence in its response and may need human assistance.

<b>Recent conversation:</b>
${contextPreview}

<a href="${dashboardUrl}">View Full Chat →</a>
  `.trim();

  return await sendTelegramMessage(message);
}

export async function testTelegramConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const settings = await getTelegramSettings();

    if (!settings) {
      return {
        success: false,
        message: 'Telegram settings are not configured. Please enter your Bot Token and Chat ID.',
      };
    }

    const testMessage = `
✅ <b>Test Notification</b>

Your Telegram bot is configured correctly!

<b>Time:</b> ${new Date().toLocaleString()}

You will receive notifications here when:
• New chat sessions are started
• The AI needs human assistance
    `.trim();

    const sent = await sendTelegramMessage(testMessage);

    if (sent) {
      return {
        success: true,
        message: 'Test message sent successfully! Check your Telegram.',
      };
    } else {
      return {
        success: false,
        message: 'Failed to send message. Please verify your Bot Token and Chat ID.',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
