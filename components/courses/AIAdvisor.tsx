import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../../types';
import { generateAIResponse, getSessionId } from '../../services/geminiService';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const AIAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Nexius Agent, your AI Course Advisor. I'm here to help you with any questions about our courses, subsidies, curriculum, or how agentic AI can benefit your business. How can I assist you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHandoff, setIsHandoff] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastMsgCountRef = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Poll for new messages when in handoff mode
  const pollMessages = useCallback(async () => {
    if (!isHandoff) return;
    try {
      const sessionId = getSessionId();
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/chat_messages?session_id=eq.${sessionId}&order=timestamp.asc&select=role,message_text`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data.length > lastMsgCountRef.current) {
        // New messages arrived — rebuild message list from DB
        const dbMessages: ChatMessage[] = data.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          text: m.message_text,
        }));
        // Keep the welcome message + DB messages
        setMessages([
          { role: 'model', text: "Hello! I'm Nexius Agent, your AI Course Advisor. I'm here to help you with any questions about our courses, subsidies, curriculum, or how agentic AI can benefit your business. How can I assist you today?" },
          ...dbMessages,
        ]);
        lastMsgCountRef.current = data.length;
      }
    } catch (e) {
      console.error('Poll error:', e);
    }
  }, [isHandoff]);

  useEffect(() => {
    if (isHandoff) {
      pollRef.current = setInterval(pollMessages, 3000);
      return () => {
        if (pollRef.current) clearInterval(pollRef.current);
      };
    }
  }, [isHandoff, pollMessages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await generateAIResponse(userMsg);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);

    // Detect handoff
    if (responseText.includes('connecting you with a team member') || responseText.includes('forwarded to our team')) {
      setIsHandoff(true);
      // Sync message count from DB
      try {
        const sessionId = getSessionId();
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/chat_messages?session_id=eq.${sessionId}&select=id`,
          {
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          lastMsgCountRef.current = data.length;
        }
      } catch (_e) { /* ignore */ }
    }
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
                <h3 className="font-bold text-sm">Nexius Agent</h3>
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${isHandoff ? 'bg-yellow-400' : 'bg-green-400'}`}></span> 
                  {isHandoff ? 'Team member joining...' : 'Online'}
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
                placeholder={isHandoff ? "Type your message..." : "Ask about subsidies..."} 
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
                 <span className="text-[10px] text-gray-400">Powered by Nexius Labs AI</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default AIAdvisor;
