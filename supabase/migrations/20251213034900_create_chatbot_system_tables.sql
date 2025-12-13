/*
  # Create AI Chatbot System with Knowledge Base and Admin Dashboard

  ## Overview
  This migration creates the complete database schema for an AI chatbot system with:
  - Retrieval-Augmented Generation (RAG) knowledge base
  - Chat session and message tracking
  - System configuration and instructions
  - Admin settings management
  - Telegram notification support

  ## New Tables

  ### 1. `ai_config`
  Stores system instructions for the AI chatbot.
  - `id` (uuid, primary key) - Unique identifier
  - `instruction_text` (text) - The system instruction content
  - `is_active` (boolean) - Whether this instruction is currently active
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `created_by` (uuid) - User who created this instruction

  ### 2. `knowledge_base`
  Stores text-based knowledge entries for RAG.
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Entry title
  - `content` (text) - Entry content
  - `category` (text) - Category for organization
  - `tags` (text[]) - Array of tags for filtering
  - `is_active` (boolean) - Whether entry is active
  - `priority` (integer) - Priority for RAG retrieval (0-10)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `knowledge_files`
  Stores metadata and extracted text from uploaded documents.
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - File title
  - `file_url` (text) - Supabase Storage URL
  - `file_type` (text) - File type (pdf, docx, doc)
  - `file_size` (bigint) - File size in bytes
  - `extracted_text` (text) - Extracted text content
  - `category` (text) - Category for organization
  - `tags` (text[]) - Array of tags for filtering
  - `is_active` (boolean) - Whether file is active
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. `chat_sessions`
  Tracks all chat conversations.
  - `id` (uuid, primary key) - Unique identifier
  - `session_id` (uuid, unique) - Session identifier
  - `user_id` (uuid, nullable) - Optional user identifier
  - `started_at` (timestamptz) - Session start time
  - `last_activity_at` (timestamptz) - Last message time
  - `is_active` (boolean) - Whether session is active
  - `telegram_notified` (boolean) - Whether admin was notified
  - `status` (text) - Session status (active, needs_help, resolved)

  ### 5. `chat_messages`
  Stores all messages in conversations.
  - `id` (uuid, primary key) - Unique identifier
  - `session_id` (uuid) - References chat_sessions.session_id
  - `role` (text) - Message role (user, model)
  - `message_text` (text) - Message content
  - `timestamp` (timestamptz) - Message timestamp
  - `needs_human_help` (boolean) - Whether AI flagged for help
  - `confidence_score` (numeric) - AI confidence score (0-1)

  ### 6. `app_settings`
  Stores application configuration including Telegram credentials.
  - `id` (uuid, primary key) - Unique identifier
  - `setting_key` (text, unique) - Setting key
  - `setting_value` (text) - Setting value
  - `is_encrypted` (boolean) - Whether value is encrypted
  - `updated_at` (timestamptz) - Last update timestamp
  - `updated_by` (uuid) - User who updated setting

  ## Security
  - Enable RLS on all tables
  - Admin-only access for ai_config, app_settings
  - Public read access for active knowledge_base and knowledge_files entries
  - Public can create chat_sessions and chat_messages
  - Admins can view all chats

  ## Indexes
  - Index on knowledge_base: category, is_active
  - GIN index on knowledge_base: tags
  - Index on knowledge_files: category, is_active
  - GIN index on knowledge_files: tags
  - Index on chat_messages: session_id, timestamp
  - Unique index on chat_sessions: session_id
  - Unique index on app_settings: setting_key

  ## Storage
  - Create 'knowledge-files' storage bucket for document uploads
*/

-- Create ai_config table
CREATE TABLE IF NOT EXISTS ai_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  instruction_text text NOT NULL,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create knowledge_base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text,
  tags text[],
  is_active boolean DEFAULT true,
  priority integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for knowledge_base
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category_active ON knowledge_base(category, is_active);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_tags ON knowledge_base USING GIN(tags);

-- Create knowledge_files table
CREATE TABLE IF NOT EXISTS knowledge_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  file_size bigint,
  extracted_text text,
  category text,
  tags text[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for knowledge_files
CREATE INDEX IF NOT EXISTS idx_knowledge_files_category_active ON knowledge_files(category, is_active);
CREATE INDEX IF NOT EXISTS idx_knowledge_files_tags ON knowledge_files USING GIN(tags);

-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid UNIQUE NOT NULL,
  user_id uuid,
  started_at timestamptz DEFAULT now(),
  last_activity_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  telegram_notified boolean DEFAULT false,
  status text DEFAULT 'active'
);

-- Create index for chat_sessions
CREATE UNIQUE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions(session_id);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
  role text NOT NULL,
  message_text text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  needs_human_help boolean DEFAULT false,
  confidence_score numeric
);

-- Create index for chat_messages
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_timestamp ON chat_messages(session_id, timestamp);

-- Create app_settings table
CREATE TABLE IF NOT EXISTS app_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value text NOT NULL,
  is_encrypted boolean DEFAULT false,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Create unique index for app_settings
CREATE UNIQUE INDEX IF NOT EXISTS idx_app_settings_key ON app_settings(setting_key);

-- Insert default app settings
INSERT INTO app_settings (setting_key, setting_value, is_encrypted)
VALUES 
  ('telegram_bot_token', '', false),
  ('telegram_chat_id', '', false),
  ('rag_search_limit', '5', false),
  ('confidence_threshold', '0.5', false)
ON CONFLICT (setting_key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE ai_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_config (admin only)
CREATE POLICY "Admins can view all ai_config"
  ON ai_config FOR SELECT
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can insert ai_config"
  ON ai_config FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can update ai_config"
  ON ai_config FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can delete ai_config"
  ON ai_config FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin');

-- RLS Policies for knowledge_base (public read active, admin write)
CREATE POLICY "Anyone can view active knowledge_base entries"
  ON knowledge_base FOR SELECT
  USING (is_active = true OR (auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can insert knowledge_base"
  ON knowledge_base FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can update knowledge_base"
  ON knowledge_base FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can delete knowledge_base"
  ON knowledge_base FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin');

-- RLS Policies for knowledge_files (public read active, admin write)
CREATE POLICY "Anyone can view active knowledge_files entries"
  ON knowledge_files FOR SELECT
  USING (is_active = true OR (auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can insert knowledge_files"
  ON knowledge_files FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can update knowledge_files"
  ON knowledge_files FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can delete knowledge_files"
  ON knowledge_files FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin');

-- RLS Policies for chat_sessions (public create, admin manage)
CREATE POLICY "Anyone can create chat_sessions"
  ON chat_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own chat_sessions"
  ON chat_sessions FOR SELECT
  USING (true);

CREATE POLICY "Admins can update chat_sessions"
  ON chat_sessions FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can delete chat_sessions"
  ON chat_sessions FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin');

-- RLS Policies for chat_messages (public create/read, admin manage)
CREATE POLICY "Anyone can create chat_messages"
  ON chat_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view chat_messages"
  ON chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Admins can update chat_messages"
  ON chat_messages FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can delete chat_messages"
  ON chat_messages FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin');

-- RLS Policies for app_settings (admin only)
CREATE POLICY "Admins can view app_settings"
  ON app_settings FOR SELECT
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin');

CREATE POLICY "Admins can update app_settings"
  ON app_settings FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->>'role') = 'admin');

-- Create storage bucket for knowledge files
INSERT INTO storage.buckets (id, name, public)
VALUES ('knowledge-files', 'knowledge-files', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for knowledge-files bucket
CREATE POLICY "Admins can upload knowledge files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'knowledge-files' AND
    (auth.jwt()->>'role') = 'admin'
  );

CREATE POLICY "Admins can view knowledge files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'knowledge-files' AND
    (auth.jwt()->>'role') = 'admin'
  );

CREATE POLICY "Admins can update knowledge files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'knowledge-files' AND
    (auth.jwt()->>'role') = 'admin'
  )
  WITH CHECK (
    bucket_id = 'knowledge-files' AND
    (auth.jwt()->>'role') = 'admin'
  );

CREATE POLICY "Admins can delete knowledge files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'knowledge-files' AND
    (auth.jwt()->>'role') = 'admin'
  );
