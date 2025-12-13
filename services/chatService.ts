import { supabase } from '../lib/supabase';

const SESSION_STORAGE_KEY = 'chat_session_id';

export interface ChatSession {
  id: string;
  created_at: string;
  last_activity: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: 'user' | 'model';
  content: string;
  created_at: string;
}

export const chatService = {
  async createSession(): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          last_activity: new Date().toISOString()
        })
        .select('id')
        .maybeSingle();

      if (error) {
        console.error('Error creating chat session:', error);
        return null;
      }

      if (data?.id) {
        localStorage.setItem(SESSION_STORAGE_KEY, data.id);
        return data.id;
      }

      return null;
    } catch (error) {
      console.error('Error in createSession:', error);
      return null;
    }
  },

  getStoredSessionId(): string | null {
    return localStorage.getItem(SESSION_STORAGE_KEY);
  },

  async initializeSession(): Promise<string | null> {
    const existingSessionId = this.getStoredSessionId();

    if (existingSessionId) {
      const isValid = await this.validateSession(existingSessionId);
      if (isValid) {
        await this.updateSessionActivity(existingSessionId);
        return existingSessionId;
      }
    }

    return await this.createSession();
  },

  async validateSession(sessionId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('id, last_activity')
        .eq('id', sessionId)
        .maybeSingle();

      if (error || !data) {
        return false;
      }

      const lastActivity = new Date(data.last_activity);
      const now = new Date();
      const hoursSinceActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);

      return hoursSinceActivity < 24;
    } catch (error) {
      console.error('Error validating session:', error);
      return false;
    }
  },

  async updateSessionActivity(sessionId: string): Promise<void> {
    try {
      await supabase
        .from('chat_sessions')
        .update({ last_activity: new Date().toISOString() })
        .eq('id', sessionId);
    } catch (error) {
      console.error('Error updating session activity:', error);
    }
  },

  async saveMessage(sessionId: string, role: 'user' | 'model', content: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          role,
          content
        });

      if (error) {
        console.error('Error saving message:', error);
        return false;
      }

      await this.updateSessionActivity(sessionId);
      return true;
    } catch (error) {
      console.error('Error in saveMessage:', error);
      return false;
    }
  },

  async loadMessages(sessionId: string): Promise<Array<{ role: 'user' | 'model'; text: string }>> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('role, content, created_at')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
        return [];
      }

      return (data || []).map(msg => ({
        role: msg.role,
        text: msg.content
      }));
    } catch (error) {
      console.error('Error in loadMessages:', error);
      return [];
    }
  },

  clearStoredSession(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
};
