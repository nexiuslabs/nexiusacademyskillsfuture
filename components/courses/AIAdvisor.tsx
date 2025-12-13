import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../../types';
import { generateAIResponse, saveUserMessage } from '../../services/geminiService';
import { sendNewChatNotification } from '../../services/telegramService';
import { supabase } from '../../lib/supabase';

const AIAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi there! I'm the GenAI Course Advisor. Ask me anything about subsidies, curriculum, or schedules!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const initializeSession = async () => {
      const storedSessionId = localStorage.getItem('chat_session_id');

      if (storedSessionId) {
        const { data, error } = await supabase
          .from('chat_sessions')
          .select('session_id, is_active, telegram_notified')
          .eq('session_id', storedSessionId)
          .maybeSingle();

        if (!error && data && data.is_active) {
          setSessionId(storedSessionId);
          setIsFirstMessage(!data.telegram_notified);
          await loadConversationHistory(storedSessionId);
          return;
        }
      }

      const newSessionId = crypto.randomUUID();
      setSessionId(newSessionId);
      setIsFirstMessage(true);
      localStorage.setItem('chat_session_id', newSessionId);

      await supabase.from('chat_sessions').insert({
        session_id: newSessionId,
        started_at: new Date().toISOString(),
        last_activity_at: new Date().toISOString(),
        is_active: true,
        telegram_notified: false,
        status: 'active',
      });
    };

    initializeSession();
  }, []);

  const loadConversationHistory = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('role, message_text, timestamp')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const loadedMessages: ChatMessage[] = data.map(msg => ({
          role: msg.role as 'user' | 'model',
          text: msg.message_text,
        }));

        setMessages([
          { role: 'model', text: "Hi there! I'm the GenAI Course Advisor. Ask me anything about subsidies, curriculum, or schedules!" },
          ...loadedMessages,
        ]);
      }
    } catch (error) {
      console.error('Error loading conversation history:', error);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !sessionId) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    await saveUserMessage(sessionId, userMsg);

    if (isFirstMessage) {
      await sendNewChatNotification(sessionId, userMsg);
      await supabase
        .from('chat_sessions')
        .update({ telegram_notified: true })
        .eq('session_id', sessionId);
      setIsFirstMessage(false);
    }

    const responseText = await generateAIResponse(userMsg, sessionId);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[9999] bg-accent hover:bg-teal-400 text-white rounded-full p-4 shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center ${isOpen ? 'hidden' : 'block'}`}
      >
        <Sparkles size={28} className="animate-pulse" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">1</span>
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-full max-w-sm h-[500px] bg-white rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Course AI Advisor</h3>
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-sm border border-gray-100">
                  <Loader2 size={16} className="animate-spin text-accent" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-accent transition-colors">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about subsidies..." 
                className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700"
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || !inputValue.trim()}
                className="text-primary hover:text-accent disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="text-center mt-2">
                 <span className="text-[10px] text-gray-400">Powered by Google Gemini</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default AIAdvisor;