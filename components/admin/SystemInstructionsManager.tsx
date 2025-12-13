import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, History, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AIConfig {
  id: string;
  instruction_text: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const SystemInstructionsManager: React.FC = () => {
  const [currentInstruction, setCurrentInstruction] = useState('');
  const [history, setHistory] = useState<AIConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchInstructions();
  }, []);

  const fetchInstructions = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_config')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const active = data.find(item => item.is_active);
        if (active) {
          setCurrentInstruction(active.instruction_text);
        }
        setHistory(data);
      }
    } catch (error) {
      console.error('Error fetching instructions:', error);
      showMessage('error', 'Failed to load instructions');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSave = async () => {
    if (!currentInstruction.trim()) {
      showMessage('error', 'Instruction cannot be empty');
      return;
    }

    setSaving(true);

    try {
      await supabase
        .from('ai_config')
        .update({ is_active: false })
        .eq('is_active', true);

      const { error } = await supabase.from('ai_config').insert({
        instruction_text: currentInstruction,
        is_active: true,
        created_by: user?.id || null,
      });

      if (error) throw error;

      showMessage('success', 'System instruction saved successfully!');
      await fetchInstructions();
    } catch (error) {
      console.error('Error saving instruction:', error);
      showMessage('error', 'Failed to save instruction');
    } finally {
      setSaving(false);
    }
  };

  const handleActivate = async (id: string, text: string) => {
    try {
      await supabase
        .from('ai_config')
        .update({ is_active: false })
        .eq('is_active', true);

      const { error } = await supabase
        .from('ai_config')
        .update({ is_active: true })
        .eq('id', id);

      if (error) throw error;

      setCurrentInstruction(text);
      showMessage('success', 'Previous instruction activated!');
      await fetchInstructions();
    } catch (error) {
      console.error('Error activating instruction:', error);
      showMessage('error', 'Failed to activate instruction');
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
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Instructions</h1>
        <p className="text-gray-600">
          Manage the AI chatbot's behavior and personality
        </p>
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Current Instruction</h2>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <History size={20} />
            {showHistory ? 'Hide' : 'Show'} History
          </button>
        </div>

        <textarea
          value={currentInstruction}
          onChange={(e) => setCurrentInstruction(e.target.value)}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
          placeholder="Enter the system instruction for your AI chatbot..."
        />

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {currentInstruction.length} characters
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Instruction
              </>
            )}
          </button>
        </div>
      </div>

      {showHistory && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Version History</h2>

          {history.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No previous versions</p>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border ${
                    item.is_active
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-700">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                      {item.is_active && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-primary text-white rounded text-xs font-medium">
                          <Check size={14} />
                          Active
                        </span>
                      )}
                    </div>
                    {!item.is_active && (
                      <button
                        onClick={() => handleActivate(item.id, item.instruction_text)}
                        className="text-sm text-primary hover:text-primary-dark font-medium"
                      >
                        Activate
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-3">
                    {item.instruction_text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SystemInstructionsManager;
