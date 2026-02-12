// Chat service - routes through Supabase Edge Function to AI backend

let _sessionId: string | null = null;

function getSessionId(): string {
  if (!_sessionId) {
    _sessionId = crypto.randomUUID();
  }
  return _sessionId;
}

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-response`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        sessionId: getSessionId(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    return data.response || "I'm sorry, I didn't get that.";
  } catch (error) {
    console.error("Chat API Error:", error);
    return "I'm experiencing a brief hiccup. Please try again in a moment.";
  }
};
