import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { supabase } from '../lib/supabase';
import { sendStuckNotification } from './telegramService';

const apiKey = import.meta.env.VITE_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export interface ChatMessage {
  role: 'user' | 'model';
  message_text: string;
  timestamp?: Date;
  needs_human_help?: boolean;
  confidence_score?: number;
}

async function fetchSystemInstruction(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('ai_config')
      .select('instruction_text')
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data?.instruction_text || SYSTEM_INSTRUCTION;
  } catch (error) {
    console.error('Error fetching system instruction:', error);
    return SYSTEM_INSTRUCTION;
  }
}

async function searchKnowledgeBase(query: string, limit: number = 5): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('title, content')
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .limit(limit);

    if (error) throw error;
    if (!data || data.length === 0) return [];

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 3);

    const scoredResults = data
      .map(entry => {
        const contentLower = `${entry.title} ${entry.content}`.toLowerCase();
        const score = searchTerms.reduce((acc, term) => {
          return acc + (contentLower.includes(term) ? 1 : 0);
        }, 0);
        return { ...entry, score };
      })
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return scoredResults.map(entry => `Title: ${entry.title}\nContent: ${entry.content}`);
  } catch (error) {
    console.error('Error searching knowledge base:', error);
    return [];
  }
}

async function searchKnowledgeFiles(query: string, limit: number = 5): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('knowledge_files')
      .select('title, extracted_text')
      .eq('is_active', true)
      .limit(limit);

    if (error) throw error;
    if (!data || data.length === 0) return [];

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 3);

    const scoredResults = data
      .map(entry => {
        const contentLower = `${entry.title} ${entry.extracted_text || ''}`.toLowerCase();
        const score = searchTerms.reduce((acc, term) => {
          return acc + (contentLower.includes(term) ? 1 : 0);
        }, 0);
        return { ...entry, score };
      })
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return scoredResults.map(entry => {
      const excerpt = entry.extracted_text?.substring(0, 500) || '';
      return `File: ${entry.title}\nExcerpt: ${excerpt}`;
    });
  } catch (error) {
    console.error('Error searching knowledge files:', error);
    return [];
  }
}

async function buildContextForAI(
  userMessage: string,
  conversationHistory: ChatMessage[]
): Promise<string> {
  const systemInstruction = await fetchSystemInstruction();

  const knowledgeEntries = await searchKnowledgeBase(userMessage, 3);
  const fileEntries = await searchKnowledgeFiles(userMessage, 2);

  let context = systemInstruction + '\n\n';

  if (knowledgeEntries.length > 0 || fileEntries.length > 0) {
    context += 'RELEVANT KNOWLEDGE BASE INFORMATION:\n\n';

    if (knowledgeEntries.length > 0) {
      context += 'Knowledge Entries:\n';
      context += knowledgeEntries.join('\n\n') + '\n\n';
    }

    if (fileEntries.length > 0) {
      context += 'Document Excerpts:\n';
      context += fileEntries.join('\n\n') + '\n\n';
    }

    context += 'Use the above information to provide accurate, helpful responses. If the information is not in the knowledge base, you can still provide general assistance.\n\n';
  }

  if (conversationHistory.length > 0) {
    context += 'CONVERSATION HISTORY:\n';
    conversationHistory.slice(-5).forEach(msg => {
      context += `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.message_text}\n`;
    });
    context += '\n';
  }

  context += `Current User Message: ${userMessage}`;

  return context;
}

function detectLowConfidence(aiResponse: string): boolean {
  const uncertaintyPhrases = [
    "i don't know",
    "i'm not sure",
    "i cannot",
    "i can't",
    "i'm unable",
    "unclear",
    "i don't have",
    "i'm sorry, i don't",
    "i apologize, but i don't",
  ];

  const responseLower = aiResponse.toLowerCase();

  const hasUncertainty = uncertaintyPhrases.some(phrase =>
    responseLower.includes(phrase)
  );

  const isTooShort = aiResponse.trim().length < 20;
  const isVeryGeneric = /^(okay|ok|yes|no|maybe|perhaps)\.?$/i.test(aiResponse.trim());

  return hasUncertainty || isTooShort || isVeryGeneric;
}

async function loadConversationHistory(sessionId: string): Promise<ChatMessage[]> {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('role, message_text, timestamp, needs_human_help, confidence_score')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error loading conversation history:', error);
    return [];
  }
}

async function saveMessage(
  sessionId: string,
  role: 'user' | 'model',
  messageText: string,
  needsHumanHelp: boolean = false,
  confidenceScore?: number
): Promise<void> {
  try {
    const { error } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        role,
        message_text: messageText,
        needs_human_help: needsHumanHelp,
        confidence_score: confidenceScore,
      });

    if (error) throw error;

    await supabase
      .from('chat_sessions')
      .update({ last_activity_at: new Date().toISOString() })
      .eq('session_id', sessionId);

  } catch (error) {
    console.error('Error saving message:', error);
  }
}

export const generateAIResponse = async (
  userMessage: string,
  sessionId?: string
): Promise<string> => {
  try {
    const history = sessionId ? await loadConversationHistory(sessionId) : [];
    const enrichedContext = await buildContextForAI(userMessage, history);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
    });

    const result = await model.generateContent(enrichedContext);
    const response = await result.response;
    const aiResponse = response.text() || "I'm sorry, I didn't get that.";

    const lowConfidence = detectLowConfidence(aiResponse);

    if (sessionId) {
      await saveMessage(sessionId, 'model', aiResponse, lowConfidence);

      if (lowConfidence) {
        await supabase
          .from('chat_sessions')
          .update({ status: 'needs_help' })
          .eq('session_id', sessionId);

        const conversationContext = history
          .slice(-5)
          .map(msg => `${msg.role}: ${msg.message_text}`);
        conversationContext.push(`user: ${userMessage}`);
        conversationContext.push(`model: ${aiResponse}`);

        await sendStuckNotification(sessionId, conversationContext);
      }
    }

    return aiResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing high traffic. Please try again later.";
  }
};

export async function saveUserMessage(sessionId: string, message: string): Promise<void> {
  await saveMessage(sessionId, 'user', message);
}