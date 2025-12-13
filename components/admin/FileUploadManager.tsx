import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, FileText, Trash2, Loader2, Eye } from 'lucide-react';
import { processUploadedFile, saveFileToDatabase } from '../../services/fileProcessingService';

interface FileEntry {
  id: string;
  title: string;
  file_url: string;
  file_type: string;
  file_size: number;
  extracted_text: string | null;
  category: string | null;
  is_active: boolean;
  created_at: string;
}

const FileUploadManager: React.FC = () => {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewFile, setPreviewFile] = useState<FileEntry | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('knowledge_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      showMessage('error', 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);

    for (const file of Array.from(selectedFiles)) {
      try {
        const processed = await processUploadedFile(file);
        await saveFileToDatabase(processed);
        showMessage('success', `${file.name} uploaded successfully!`);
      } catch (error) {
        showMessage('error', `Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    setUploading(false);
    await fetchFiles();
    e.target.value = '';
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const { error } = await supabase.from('knowledge_files').delete().eq('id', id);
      if (error) throw error;

      showMessage('success', 'File deleted successfully!');
      await fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      showMessage('error', 'Failed to delete file');
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
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">File Upload Manager</h1>
        <p className="text-gray-600">Upload and manage PDF and Word documents</p>
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

      <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-8 mb-6 text-center">
        <Upload size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Documents</h3>
        <p className="text-sm text-gray-600 mb-4">
          Support for PDF and Word files (max 10MB per file)
        </p>
        <label className="inline-block">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <span className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 disabled:opacity-50">
            {uploading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={20} />
                Select Files
              </>
            )}
          </span>
        </label>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Uploaded Files</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {files.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No files uploaded yet
            </div>
          ) : (
            files.map((file) => (
              <div key={file.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{file.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="uppercase">{file.file_type}</span>
                        <span>{(file.file_size / 1024).toFixed(2)} KB</span>
                        <span>{new Date(file.created_at).toLocaleDateString()}</span>
                      </div>
                      {file.category && (
                        <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {file.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewFile(file)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Preview extracted text"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete file"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {previewFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Extracted Text: {previewFile.title}
              </h2>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Eye size={24} />
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                {previewFile.extracted_text || 'No text extracted'}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadManager;
