import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import SystemInstructionsManager from '../components/admin/SystemInstructionsManager';
import KnowledgeBaseManager from '../components/admin/KnowledgeBaseManager';
import FileUploadManager from '../components/admin/FileUploadManager';
import ChatHistoryViewer from '../components/admin/ChatHistoryViewer';
import SettingsManager from '../components/admin/SettingsManager';
import { Activity, MessageSquare, Book, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState({
    totalChats: 0,
    activeChats: 0,
    knowledgeEntries: 0,
    uploadedFiles: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setError(null);

      const { data: session } = await supabase.auth.getSession();
      console.log('Current session:', session);

      if (!session?.session) {
        setError('No active session found');
        return;
      }

      const [chatsRes, activeChatsRes, knowledgeRes, filesRes] = await Promise.all([
        supabase.from('chat_sessions').select('id', { count: 'exact', head: true }),
        supabase
          .from('chat_sessions')
          .select('id', { count: 'exact', head: true })
          .eq('is_active', true),
        supabase
          .from('knowledge_base')
          .select('id', { count: 'exact', head: true })
          .eq('is_active', true),
        supabase
          .from('knowledge_files')
          .select('id', { count: 'exact', head: true })
          .eq('is_active', true),
      ]);

      if (chatsRes.error) {
        console.error('Error fetching chats:', chatsRes.error);
        setError(`Error: ${chatsRes.error.message}`);
        return;
      }

      setStats({
        totalChats: chatsRes.count || 0,
        activeChats: activeChatsRes.count || 0,
        knowledgeEntries: knowledgeRes.count || 0,
        uploadedFiles: filesRes.count || 0,
      });
    } catch (err) {
      console.error('Exception in fetchStats:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const statCards = [
    {
      label: 'Total Chat Sessions',
      value: stats.totalChats,
      icon: MessageSquare,
      color: 'bg-blue-500',
    },
    {
      label: 'Active Chats',
      value: stats.activeChats,
      icon: Activity,
      color: 'bg-green-500',
    },
    {
      label: 'Knowledge Entries',
      value: stats.knowledgeEntries,
      icon: Book,
      color: 'bg-purple-500',
    },
    {
      label: 'Uploaded Files',
      value: stats.uploadedFiles,
      icon: FileText,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your AI Chatbot administration panel
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold">Error loading dashboard data:</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/admin/dashboard/knowledge-base"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-gray-800">Add Knowledge Entry</h3>
              <p className="text-sm text-gray-600">Create new knowledge base entry</p>
            </a>
            <a
              href="/admin/dashboard/files"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-gray-800">Upload Document</h3>
              <p className="text-sm text-gray-600">Upload PDF or Word files</p>
            </a>
            <a
              href="/admin/dashboard/chat-history"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-gray-800">View Chat History</h3>
              <p className="text-sm text-gray-600">Review conversations</p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">AI Service</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Storage</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="system-instructions" element={<SystemInstructionsManager />} />
          <Route path="knowledge-base" element={<KnowledgeBaseManager />} />
          <Route path="files" element={<FileUploadManager />} />
          <Route path="chat-history" element={<ChatHistoryViewer />} />
          <Route path="settings" element={<SettingsManager />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
