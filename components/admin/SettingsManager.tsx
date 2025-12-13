import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Send, Loader2 } from 'lucide-react';
import { testTelegramConnection } from '../../services/telegramService';
import { useAuth } from '../../contexts/AuthContext';

const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState({
    telegram_bot_token: '',
    telegram_chat_id: '',
    rag_search_limit: '5',
    confidence_threshold: '0.5',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('setting_key, setting_value');

      if (error) throw error;

      if (data) {
        const settingsMap: Record<string, string> = {};
        data.forEach((item) => {
          settingsMap[item.setting_key] = item.setting_value;
        });

        setSettings({
          telegram_bot_token: settingsMap.telegram_bot_token || '',
          telegram_chat_id: settingsMap.telegram_chat_id || '',
          rag_search_limit: settingsMap.rag_search_limit || '5',
          confidence_threshold: settingsMap.confidence_threshold || '0.5',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      showMessage('error', 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
          .from('app_settings')
          .update({
            setting_value: value,
            updated_at: new Date().toISOString(),
            updated_by: user?.id || null,
          })
          .eq('setting_key', key);

        if (error) throw error;
      }

      showMessage('success', 'Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      showMessage('error', 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleTestTelegram = async () => {
    setTesting(true);

    try {
      await handleSave();

      const result = await testTelegramConnection();

      if (result.success) {
        showMessage('success', result.message);
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', 'Failed to test Telegram connection');
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Configure your AI chatbot system</p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Telegram Configuration</h2>
          <p className="text-sm text-gray-600 mb-6">
            Configure your Telegram bot to receive notifications about new chats and when the AI needs help.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telegram Bot Token
              </label>
              <input
                type="password"
                value={settings.telegram_bot_token}
                onChange={(e) =>
                  setSettings({ ...settings, telegram_bot_token: e.target.value })
                }
                placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                Get this from @BotFather on Telegram
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telegram Chat ID
              </label>
              <input
                type="text"
                value={settings.telegram_chat_id}
                onChange={(e) =>
                  setSettings({ ...settings, telegram_chat_id: e.target.value })
                }
                placeholder="123456789"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                Get this from @userinfobot on Telegram
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleTestTelegram}
                disabled={testing}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {testing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Test Notification
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Knowledge Base Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RAG Search Limit
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={settings.rag_search_limit}
                onChange={(e) =>
                  setSettings({ ...settings, rag_search_limit: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                Number of knowledge entries to include in AI context (1-20)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confidence Threshold
              </label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={settings.confidence_threshold}
                onChange={(e) =>
                  setSettings({ ...settings, confidence_threshold: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimum confidence score before triggering help notification (0.0-1.0)
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
