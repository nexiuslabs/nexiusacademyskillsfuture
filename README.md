<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Nexius Academy - GenAI Masterclass

This is a modern web application for Nexius Academy's Generative AI training courses, built with React, TypeScript, Vite, and Supabase.

## Features

- Course catalog and registration
- AI-powered chatbot advisor
- Newsletter subscription
- Responsive design with Tailwind CSS
- Secure API key handling via Supabase Edge Functions

## Prerequisites

- Node.js (v16 or higher)
- Supabase account
- Google Gemini API key

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Configure the Google Gemini API key as a secret in your Supabase project:
   - Go to your Supabase Dashboard
   - Navigate to Edge Functions > Secrets
   - Add a new secret: `GOOGLE_API_KEY` with your Google Gemini API key

## Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Deploy to Netlify

1. Add environment variables in Netlify:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

2. The Google API key is securely stored in Supabase Edge Functions and doesn't need to be configured in Netlify.

3. Deploy:
   ```bash
   npm run build
   ```

## Architecture

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase PostgreSQL
- **Edge Functions**: Supabase Edge Functions (Deno)
- **AI**: Google Gemini API (accessed securely via Edge Functions)

## Security

- API keys are never exposed to the client
- Google Gemini API calls are proxied through Supabase Edge Functions
- Environment variables for sensitive data are stored securely
- Row Level Security (RLS) enabled on all database tables
