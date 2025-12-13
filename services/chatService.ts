import { supabase } from '../lib/supabase';

export interface ChatSession {
  id: string;
  session_id: string;
  user_id?: string;
  started_at: string;
  last_activity_at: string;
  is_active: boolean;
  telegram_notified: boolean;
  status: 'active' | 'needs_help' | 'resolved';
}

export interface ChatMessageRecord {
  id: string;
  session_id: string;
  role: 'user' | 'model' | 'agent';
  message_text: string;
  timestamp: string;
  needs_human_help: boolean;
  confidence_score: number;
}

export const createChatSession = async (): Promise<string> => {
  const sessionId = crypto.randomUUID();

  const { error } = await supabase
    .from('chat_sessions')
    .insert({
      session_id: sessionId,
      started_at: new Date().toISOString(),
      last_activity_at: new Date().toISOString(),
      is_active: true,
      telegram_notified: false,
      status: 'active'
    });

  if (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }

  return sessionId;
};

export const saveChatMessage = async (
  sessionId: string,
  role: 'user' | 'model' | 'agent',
  messageText: string,
  needsHumanHelp: boolean = false,
  confidenceScore: number = 1.0
): Promise<void> => {
  const { error } = await supabase
    .from('chat_messages')
    .insert({
      session_id: sessionId,
      role,
      message_text: messageText,
      timestamp: new Date().toISOString(),
      needs_human_help: needsHumanHelp,
      confidence_score: confidenceScore
    });

  if (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }

  await supabase
    .from('chat_sessions')
    .update({
      last_activity_at: new Date().toISOString()
    })
    .eq('session_id', sessionId);
};

export const escalateToHuman = async (sessionId: string): Promise<void> => {
  const { error } = await supabase
    .from('chat_sessions')
    .update({
      status: 'needs_help',
      last_activity_at: new Date().toISOString()
    })
    .eq('session_id', sessionId);

  if (error) {
    console.error('Error escalating session:', error);
    throw error;
  }

  await sendTelegramNotification(sessionId);
};

export const sendTelegramNotification = async (sessionId: string): Promise<void> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const response = await fetch(`${supabaseUrl}/functions/v1/telegram-notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({ sessionId })
    });

    if (!response.ok) {
      console.error('Failed to send Telegram notification');
    } else {
      await supabase
        .from('chat_sessions')
        .update({ telegram_notified: true })
        .eq('session_id', sessionId);
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
};

export const getChatHistory = async (sessionId: string): Promise<ChatMessageRecord[]> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('timestamp', { ascending: true });

  if (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }

  return data || [];
};

export const markSessionResolved = async (sessionId: string): Promise<void> => {
  const { error } = await supabase
    .from('chat_sessions')
    .update({
      status: 'resolved',
      is_active: false
    })
    .eq('session_id', sessionId);

  if (error) {
    console.error('Error marking session resolved:', error);
    throw error;
  }
};
