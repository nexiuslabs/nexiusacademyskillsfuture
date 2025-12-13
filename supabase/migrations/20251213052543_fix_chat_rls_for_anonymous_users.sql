/*
  # Fix RLS Policies for Anonymous Chat Users

  ## Problem
  The chat_sessions and chat_messages policies don't explicitly grant access to anonymous users.
  The policies need to allow anon role to create and read chat data.

  ## Solution
  Update RLS policies to explicitly grant access to anonymous (public) users:
  - Add TO anon for insert policies
  - Add TO anon for select policies
  - Ensure anonymous users can fully interact with the chat system

  ## Affected Tables
  - chat_sessions (insert and select policies)
  - chat_messages (insert and select policies)
*/

-- Drop and recreate policies for chat_sessions
DROP POLICY IF EXISTS "Anyone can create chat_sessions" ON chat_sessions;
DROP POLICY IF EXISTS "Anyone can view their own chat_sessions" ON chat_sessions;

CREATE POLICY "Anyone can create chat_sessions"
  ON chat_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view chat_sessions"
  ON chat_sessions FOR SELECT
  TO anon, authenticated
  USING (true);

-- Drop and recreate policies for chat_messages
DROP POLICY IF EXISTS "Anyone can create chat_messages" ON chat_messages;
DROP POLICY IF EXISTS "Anyone can view chat_messages" ON chat_messages;

CREATE POLICY "Anyone can create chat_messages"
  ON chat_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view chat_messages"
  ON chat_messages FOR SELECT
  TO anon, authenticated
  USING (true);
