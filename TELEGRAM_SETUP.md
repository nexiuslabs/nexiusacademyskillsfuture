# Telegram AI Chat Integration Setup Guide

This guide will help you set up the AI-to-human handoff system with Telegram.

## Overview

The system automatically detects when the AI chatbot cannot confidently answer a customer's question and sends you a notification on Telegram. You can then reply directly through Telegram, and your message will appear instantly in the customer's chat on your website.

## Setup Steps

### 1. Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Start a chat and send the command `/newbot`
3. Follow the prompts to choose a name and username for your bot
4. BotFather will give you a **Bot Token** (looks like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
5. Save this token - you'll need it in step 3

### 2. Get Your Telegram Chat ID

1. Search for **@userinfobot** on Telegram
2. Start a chat with it
3. It will reply with your **Chat ID** (a number like `123456789`)
4. Save this ID - you'll need it in step 3

### 3. Configure the Bot in Supabase

You need to add your Bot Token and Chat ID to the Supabase database:

```sql
-- Update these values with your actual token and chat ID
UPDATE app_settings
SET setting_value = 'YOUR_BOT_TOKEN_HERE'
WHERE setting_key = 'telegram_bot_token';

UPDATE app_settings
SET setting_value = 'YOUR_CHAT_ID_HERE'
WHERE setting_key = 'telegram_chat_id';
```

Run these SQL queries in your Supabase SQL Editor (found in your Supabase Dashboard).

### 4. Set Up the Webhook

Configure your Telegram bot to send updates to your Edge Function:

```bash
# Replace YOUR_BOT_TOKEN and YOUR_SUPABASE_URL with your actual values
curl -X POST "https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://YOUR_SUPABASE_URL/functions/v1/telegram-webhook"}'
```

You can find your Supabase URL in your project's `.env` file under `VITE_SUPABASE_URL`.

### 5. Test the Bot

1. Send `/start` to your bot on Telegram
2. You should receive a welcome message with available commands
3. Try the `/help` command to see all available options

## How It Works

### Customer Flow

1. Customer opens the AI chat widget on your website
2. Customer asks a question
3. AI attempts to answer
4. If AI confidence is below 50%, the conversation is escalated
5. Customer sees: "I've notified our team about your question. A human advisor will respond shortly via this chat."

### Admin Flow

1. You receive a Telegram notification with:
   - Session ID
   - Full conversation history
   - Customer's question

2. You reply using the command:
   ```
   /reply SESSION_ID Your message here
   ```

3. Your response appears instantly in the customer's chat on the website
4. Customer sees your message with a "Human Advisor" label

## Bot Commands

- `/start` - Get started with the bot
- `/help` - Show help message
- `/active` - List all active support requests
- `/reply <session_id> <message>` - Reply to a customer

## Example Usage

When you receive a notification like this:

```
🚨 New Support Request 🚨

Session ID: abc123-def456-ghi789

Conversation History:
━━━━━━━━━━━━━━━━━

👤 Customer:
What are the payment options for international students?

🤖 AI:
I'm not sure about international payment options.

━━━━━━━━━━━━━━━━━

To reply, use: /reply abc123-def456-ghi789 <your message>
```

You would reply:

```
/reply abc123-def456-ghi789 Hi! International students can pay via bank transfer or PayPal. Let me send you the payment details.
```

## Troubleshooting

### Bot doesn't respond to commands

- Check that the webhook is set up correctly
- Verify the bot token is correct in the database
- Check Supabase Edge Function logs for errors

### Customer doesn't receive your replies

- Verify the session ID is correct
- Check that Supabase Realtime is enabled in your project
- Ensure the customer's chat window is still open

### Not receiving notifications

- Confirm your Chat ID is correct in the database
- Check that the bot token is valid
- Verify the Edge Function `telegram-notify` is deployed

## Security Notes

- Never share your bot token publicly
- Store credentials securely in the Supabase database
- Only authorized admins should have access to the bot
- Regularly review chat logs for quality assurance

## Confidence Detection

The AI automatically flags messages for human review when:

- Response contains phrases like "I don't know" or "I'm not sure"
- Response is very short (less than 30 characters)
- Confidence score falls below 50%

You can adjust the confidence threshold in the database:

```sql
UPDATE app_settings
SET setting_value = '0.6'
WHERE setting_key = 'confidence_threshold';
```

## Support

For issues or questions about this integration, check:
- Supabase Edge Function logs
- Browser console for frontend errors
- Telegram Bot API status
