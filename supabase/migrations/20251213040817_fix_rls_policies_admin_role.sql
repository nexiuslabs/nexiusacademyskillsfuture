/*
  # Fix RLS Policies for Admin Role Access

  ## Problem
  The existing RLS policies check `auth.jwt()->>'role'` but the role is stored
  in `app_metadata`, not at the top level of the JWT. This causes "Database error
  querying schema" when admins try to login and access tables.

  ## Solution
  Update all RLS policies to correctly access the role from app_metadata:
  - Change from: `auth.jwt()->>'role'`
  - Change to: `(auth.jwt()->'app_metadata'->>'role')`

  ## Affected Tables
  - ai_config (all policies)
  - knowledge_base (admin policies)
  - knowledge_files (admin policies)
  - chat_sessions (admin policies)
  - chat_messages (admin policies)
  - app_settings (all policies)
  - storage.objects (knowledge-files bucket policies)
*/

-- Drop and recreate policies for ai_config
DROP POLICY IF EXISTS "Admins can view all ai_config" ON ai_config;
DROP POLICY IF EXISTS "Admins can insert ai_config" ON ai_config;
DROP POLICY IF EXISTS "Admins can update ai_config" ON ai_config;
DROP POLICY IF EXISTS "Admins can delete ai_config" ON ai_config;

CREATE POLICY "Admins can view all ai_config"
  ON ai_config FOR SELECT
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can insert ai_config"
  ON ai_config FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update ai_config"
  ON ai_config FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete ai_config"
  ON ai_config FOR DELETE
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

-- Drop and recreate policies for knowledge_base
DROP POLICY IF EXISTS "Anyone can view active knowledge_base entries" ON knowledge_base;
DROP POLICY IF EXISTS "Admins can insert knowledge_base" ON knowledge_base;
DROP POLICY IF EXISTS "Admins can update knowledge_base" ON knowledge_base;
DROP POLICY IF EXISTS "Admins can delete knowledge_base" ON knowledge_base;

CREATE POLICY "Anyone can view active knowledge_base entries"
  ON knowledge_base FOR SELECT
  USING (is_active = true OR (auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can insert knowledge_base"
  ON knowledge_base FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update knowledge_base"
  ON knowledge_base FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete knowledge_base"
  ON knowledge_base FOR DELETE
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

-- Drop and recreate policies for knowledge_files
DROP POLICY IF EXISTS "Anyone can view active knowledge_files entries" ON knowledge_files;
DROP POLICY IF EXISTS "Admins can insert knowledge_files" ON knowledge_files;
DROP POLICY IF EXISTS "Admins can update knowledge_files" ON knowledge_files;
DROP POLICY IF EXISTS "Admins can delete knowledge_files" ON knowledge_files;

CREATE POLICY "Anyone can view active knowledge_files entries"
  ON knowledge_files FOR SELECT
  USING (is_active = true OR (auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can insert knowledge_files"
  ON knowledge_files FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update knowledge_files"
  ON knowledge_files FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete knowledge_files"
  ON knowledge_files FOR DELETE
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

-- Drop and recreate policies for chat_sessions
DROP POLICY IF EXISTS "Admins can update chat_sessions" ON chat_sessions;
DROP POLICY IF EXISTS "Admins can delete chat_sessions" ON chat_sessions;

CREATE POLICY "Admins can update chat_sessions"
  ON chat_sessions FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete chat_sessions"
  ON chat_sessions FOR DELETE
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

-- Drop and recreate policies for chat_messages
DROP POLICY IF EXISTS "Admins can update chat_messages" ON chat_messages;
DROP POLICY IF EXISTS "Admins can delete chat_messages" ON chat_messages;

CREATE POLICY "Admins can update chat_messages"
  ON chat_messages FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete chat_messages"
  ON chat_messages FOR DELETE
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

-- Drop and recreate policies for app_settings
DROP POLICY IF EXISTS "Admins can view app_settings" ON app_settings;
DROP POLICY IF EXISTS "Admins can update app_settings" ON app_settings;

CREATE POLICY "Admins can view app_settings"
  ON app_settings FOR SELECT
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update app_settings"
  ON app_settings FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

-- Drop and recreate storage policies for knowledge-files bucket
DROP POLICY IF EXISTS "Admins can upload knowledge files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can view knowledge files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update knowledge files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete knowledge files" ON storage.objects;

CREATE POLICY "Admins can upload knowledge files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'knowledge-files' AND
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "Admins can view knowledge files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'knowledge-files' AND
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "Admins can update knowledge files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'knowledge-files' AND
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  )
  WITH CHECK (
    bucket_id = 'knowledge-files' AND
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "Admins can delete knowledge files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'knowledge-files' AND
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );
