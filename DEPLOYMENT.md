# Deployment Guide

## Important: API Key Security

Your Google API key was previously exposed in the client-side code. This has been fixed by moving the Gemini API calls to a secure Supabase Edge Function.

## Required Actions

### 1. Rotate Your Google API Key (CRITICAL)

Since your API key `AIzaSyAAcjaRwevSWP0GNwweSmZejkvxhyMDA1s` was exposed in client-side code, you must create a new one:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services > Credentials
3. Create a new API key or regenerate your existing one
4. **Delete the old compromised key**
5. Add restrictions to your new key:
   - Set application restrictions (HTTP referrers or IP addresses)
   - Set API restrictions to only allow "Generative Language API"
   - Set up usage quotas to prevent abuse

### 2. Configure Supabase Edge Function Secret

Your Google API key needs to be stored securely in Supabase:

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **Edge Functions** in the left sidebar
4. Click on **Secrets** tab
5. Add a new secret:
   - Name: `GOOGLE_API_KEY`
   - Value: Your new Google Gemini API key
6. Click **Save**

### 3. Configure Netlify Environment Variables

In your Netlify dashboard:

1. Go to Site Settings > Environment Variables
2. Add the following variables:
   - `VITE_SUPABASE_URL`: `https://vujhfgsjvqamuszljxic.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key (from .env file)

**Note**: Do NOT add `GOOGLE_API_KEY` to Netlify. It's only needed in Supabase Edge Functions.

### 4. Update Local .env File

Remove the `VITE_API_KEY` line from your `.env` file. It's no longer needed since the Google API is now called from the server-side.

Your `.env` should only contain:
```
VITE_SUPABASE_URL=https://vujhfgsjvqamuszljxic.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Deploy to Netlify

Once you've completed steps 1-4:

1. Commit and push your code changes
2. Netlify will automatically build and deploy your site
3. Test the AI chatbot functionality to ensure it's working

## What Changed

### Before (Insecure)
- Google API key was in `.env` with `VITE_` prefix
- Key was exposed to all website visitors in JavaScript bundle
- Anyone could steal and abuse your API key

### After (Secure)
- Google API key is stored only in Supabase Edge Functions
- Frontend calls Supabase Edge Function endpoint
- Edge Function securely calls Google Gemini API
- API key is never exposed to clients

## Verification

After deployment, test your AI chatbot:

1. Visit your deployed site
2. Open the AI chatbot
3. Send a test message
4. Verify you get a response

If you see errors, check:
- Supabase Edge Function logs for any errors
- Browser console for any network errors
- Verify the `GOOGLE_API_KEY` secret is set correctly in Supabase

## Architecture Diagram

```
User Browser
    ↓
Frontend (React)
    ↓
Supabase Edge Function (/functions/v1/generate-ai-response)
    ↓
Google Gemini API
```

## Security Benefits

- ✅ API key never exposed to clients
- ✅ Rate limiting can be implemented on edge function
- ✅ Request validation and sanitization on server
- ✅ Audit logging of API usage
- ✅ Ability to switch AI providers without frontend changes
