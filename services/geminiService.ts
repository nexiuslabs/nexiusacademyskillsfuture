// Chat service - routes through Supabase Edge Function openclaw-chat (Wendy)

let _sessionId: string | null = null;

export function getSessionId(): string {
  if (!_sessionId) {
    _sessionId = `academy-${crypto.randomUUID()}`;
  }
  return _sessionId;
}

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const base = String(import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
    const anon = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '');
    const agentId = String(import.meta.env.VITE_OPENCLAW_WEBCHAT_AGENT_ID || 'whatsapp-frontdesk');

    const apiUrl = `${base}/functions/v1/openclaw-chat`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${anon}`,
        apikey: anon,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionKey: getSessionId(),
        agentId,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenClaw chat failed (${response.status})`);
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || "I'm sorry, I didn't get that.";
  } catch (error) {
    console.error('OpenClaw Chat API Error:', error);
    return "I'm experiencing a brief hiccup. Please try again in a moment.";
  }
};
