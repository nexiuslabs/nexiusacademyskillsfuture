/*
  # Create email subscriptions table

  1. New Tables
    - `email_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, required)
      - `subscribed_at` (timestamptz, default now())
      - `is_active` (boolean, default true)

  2. Security
    - Enable RLS on `email_subscriptions` table
    - Add policy for public to insert their own email subscription
    - Add policy for authenticated users to read subscriptions (for admin purposes)
*/

CREATE TABLE IF NOT EXISTS email_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON email_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscriptions"
  ON email_subscriptions
  FOR SELECT
  TO authenticated
  USING (true);