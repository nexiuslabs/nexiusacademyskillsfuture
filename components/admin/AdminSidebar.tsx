import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  MessageSquare,
  Settings,
  LogOut,
  Bot,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar: React.FC = () => {
  const { logout } = useAuth();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/system-instructions', label: 'System Instructions', icon: Bot },
    { path: '/admin/knowledge-base', label: 'Knowledge Base', icon: BookOpen },
    { path: '/admin/files', label: 'File Uploads', icon: Upload },
    { path: '/admin/chat-history', label: 'Chat History', icon: MessageSquare },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin/login';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary">AI Chatbot</h1>
        <p className="text-sm text-gray-600">Admin Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
