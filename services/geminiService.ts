export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-response`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    return data.response || "I'm sorry, I didn't get that.";
  } catch (error) {
    console.error("AI API Error:", error);
    return "I am currently experiencing high traffic. Please try again later.";
  }
};