import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { MessageSquare, AlertCircle, Loader2 } from 'lucide-react';

interface ChatSession {
  id: string;
  session_id: string;
  started_at: string;
  last_activity_at: string;
  status: string;
  is_active: boolean;
  telegram_notified: boolean;
}

interface ChatMessage {
  id: string;
  role: string;
  message_text: string;
  timestamp: string;
  needs_human_help: boolean;
}

const ChatHistoryViewer: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchSessions();
  }, [statusFilter]);

  const fetchSessions = async () => {
    try {
      let query = supabase
        .from('chat_sessions')
        .select('*')
        .order('last_activity_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    setLoadingMessages(true);
    setSelectedSession(sessionId);

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleMarkResolved = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('chat_sessions')
        .update({ status: 'resolved' })
        .eq('session_id', sessionId);

      if (error) throw error;
      await fetchSessions();
      if (selectedSession === sessionId) {
        setSelectedSession(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      needs_help: 'bg-red-100 text-red-700',
      resolved: 'bg-gray-100 text-gray-700',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.active}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Chat History</h1>
        <p className="text-gray-600">View and manage all chat conversations</p>
      </div>

      <div className="mb-6 flex gap-2">
        {['all', 'active', 'needs_help', 'resolved'].map((filter) => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === filter
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {filter.replace('_', ' ').charAt(0).toUpperCase() + filter.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Chat Sessions</h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {sessions.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No sessions found
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedSession === session.session_id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => fetchMessages(session.session_id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={20} className="text-gray-400" />
                      <span className="font-mono text-sm text-gray-600">
                        {session.session_id.substring(0, 8)}...
                      </span>
                    </div>
                    {getStatusBadge(session.status)}
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Started: {new Date(session.started_at).toLocaleString()}</p>
                    <p>Last Activity: {new Date(session.last_activity_at).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Conversation</h2>
            {selectedSession && (
              <button
                onClick={() => handleMarkResolved(selectedSession)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
              >
                Mark Resolved
              </button>
            )}
          </div>
          <div className="p-6 max-h-[600px] overflow-y-auto">
            {loadingMessages ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 size={32} className="animate-spin text-primary" />
              </div>
            ) : !selectedSession ? (
              <div className="flex items-center justify-center h-64 text-gray-500">
                Select a session to view messages
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No messages in this session
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-white'
                          : message.needs_human_help
                          ? 'bg-yellow-50 text-gray-800 border-2 border-yellow-300'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.needs_human_help && (
                        <div className="flex items-center gap-2 mb-2 text-yellow-700">
                          <AlertCircle size={16} />
                          <span className="text-xs font-semibold">Needs Help</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.message_text}</p>
                      <p className="text-xs mt-2 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryViewer;
