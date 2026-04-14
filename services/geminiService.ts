// Wendy web chat transport — routes through the repo-owned Supabase Edge Function openclaw-chat

let _sessionId: string | null = null;

export function getSessionId(): string {
  if (!_sessionId) {
    _sessionId = crypto.randomUUID();
  }
  return _sessionId;
}

export const generateAIResponse = async (userMessage: string, site: 'academy' | 'labs' | 'os' = 'academy'): Promise<string> => {
  try {
    const base = String(import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
    const anon = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '');
    const agentId = String(import.meta.env.VITE_OPENCLAW_WEBCHAT_AGENT_ID || 'wendy-webchat');

    const response = await fetch(`${base}/functions/v1/openclaw-chat`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${anon}`,
        apikey: anon,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionKey: getSessionId(),
        agentId,
        site,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenClaw chat failed (${response.status})`);
    }

    const data = await response.json();
    return data?.response || data?.choices?.[0]?.message?.content || "I'm sorry, I didn't get that.";
  } catch (error) {
    console.error('Wendy web chat error:', error);
    return 'I’m experiencing a brief hiccup. Please try again in a moment.';
  }
};
