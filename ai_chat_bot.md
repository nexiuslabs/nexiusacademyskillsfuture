# AI Chat Bot with Knowledge Base, Admin Dashboard, and Telegram Integration

## Overview
This document outlines the implementation plan for an enhanced AI chatbot system with Retrieval-Augmented Generation (RAG), admin dashboard, and Telegram notifications.

## Technology Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **AI**: Google Gemini API
- **Notifications**: Telegram Bot API
- **File Processing**: pdf-parse, mammoth

---

## TELEGRAM BOT SETUP INSTRUCTIONS

### Step 1: Create Your Telegram Bot
1. Open Telegram and search for "@BotFather" (official Telegram bot)
2. Start a chat with BotFather
3. Send the command: `/newbot`
4. BotFather will ask for a name for your bot (e.g., "My AI Chat Monitor")
5. BotFather will ask for a username (must end in 'bot', e.g., "myai_chat_monitor_bot")
6. BotFather will respond with your bot token (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
7. **SAVE THIS TOKEN SECURELY** - you'll need it for the app

### Step 2: Get Your Telegram Chat ID
1. Search for "@userinfobot" in Telegram
2. Start a chat with it and send any message
3. The bot will reply with your user information including your Chat ID (a number like `123456789`)
4. **SAVE THIS CHAT ID** - this is where notifications will be sent

### Step 3: Start Your Bot
1. Search for your bot username in Telegram (the one you created in Step 1)
2. Click "Start" or send `/start` to activate the bot
3. The bot won't respond yet (functionality will be added in code)

### Step 4: Configure in Admin Dashboard
1. Log into the admin dashboard at `/admin/login`
2. Navigate to Settings
3. Enter your Telegram Bot Token and Chat ID
4. Click "Test Notification" to verify the setup
5. You should receive a test message in your Telegram chat

---

## Database Schema

### 1. `ai_config` Table
Stores system instructions for the AI chatbot.

**Fields:**
- `id` (uuid, primary key, default: gen_random_uuid())
- `instruction_text` (text, not null)
- `is_active` (boolean, default: false)
- `created_at` (timestamptz, default: now())
- `updated_at` (timestamptz, default: now())
- `created_by` (uuid, references auth.users.id)

**RLS Policies:**
- Only admins can read/write

### 2. `knowledge_base` Table
Stores text-based knowledge entries for RAG.

**Fields:**
- `id` (uuid, primary key, default: gen_random_uuid())
- `title` (text, not null)
- `content` (text, not null)
- `category` (text)
- `tags` (text[], array of tags)
- `is_active` (boolean, default: true)
- `priority` (integer, default: 0)
- `created_at` (timestamptz, default: now())
- `updated_at` (timestamptz, default: now())

**Indexes:**
- Index on `category` and `is_active`
- GIN index on `tags` for array searches

**RLS Policies:**
- Public can SELECT active entries (for RAG)
- Only admins can INSERT/UPDATE/DELETE

### 3. `knowledge_files` Table
Stores metadata and extracted text from uploaded PDF/Word documents.

**Fields:**
- `id` (uuid, primary key, default: gen_random_uuid())
- `title` (text, not null)
- `file_url` (text, not null)
- `file_type` (text, not null)
- `file_size` (bigint)
- `extracted_text` (text)
- `category` (text)
- `tags` (text[])
- `is_active` (boolean, default: true)
- `created_at` (timestamptz, default: now())
- `updated_at` (timestamptz, default: now())

**RLS Policies:**
- Public can SELECT active entries (for RAG)
- Only admins can INSERT/UPDATE/DELETE

### 4. `chat_sessions` Table
Tracks all chat conversations.

**Fields:**
- `id` (uuid, primary key, default: gen_random_uuid())
- `session_id` (uuid, unique, not null)
- `user_id` (uuid, nullable)
- `started_at` (timestamptz, default: now())
- `last_activity_at` (timestamptz, default: now())
- `is_active` (boolean, default: true)
- `telegram_notified` (boolean, default: false)
- `status` (text, default: 'active')

**Status Options:** 'active', 'needs_help', 'resolved'

**RLS Policies:**
- Public can INSERT (create new sessions)
- Admins can SELECT/UPDATE all sessions

### 5. `chat_messages` Table
Stores all messages in conversations.

**Fields:**
- `id` (uuid, primary key, default: gen_random_uuid())
- `session_id` (uuid, not null, references chat_sessions.session_id)
- `role` (text, not null)
- `message_text` (text, not null)
- `timestamp` (timestamptz, default: now())
- `needs_human_help` (boolean, default: false)
- `confidence_score` (numeric, nullable)

**Role Options:** 'user', 'model'

**Indexes:**
- Index on `session_id` and `timestamp`

**RLS Policies:**
- Public can INSERT (send messages)
- Public can SELECT their own session messages
- Admins can SELECT/UPDATE all messages

### 6. `app_settings` Table
Stores application configuration.

**Fields:**
- `id` (uuid, primary key, default: gen_random_uuid())
- `setting_key` (text, unique, not null)
- `setting_value` (text, not null)
- `is_encrypted` (boolean, default: false)
- `updated_at` (timestamptz, default: now())
- `updated_by` (uuid, references auth.users.id)

**Pre-populated Keys:**
- `telegram_bot_token`
- `telegram_chat_id`
- `rag_search_limit`
- `confidence_threshold`

**RLS Policies:**
- Only admins can SELECT/UPDATE

### 7. Storage Bucket: `knowledge-files`
- **Access:** Private (admin only)
- **File Size Limit:** 10MB
- **Allowed Types:** PDF, DOCX, DOC
- **MIME Types:** 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'

---

## Authentication Setup

### Admin Role Configuration
1. Use Supabase built-in auth system
2. First user must be created via Supabase dashboard
3. Set user metadata: `{ "role": "admin" }`
4. All admin routes check for `auth.jwt()->>'role' = 'admin'`

### Frontend Auth Context
- `contexts/AuthContext.tsx` provides authentication state
- Login/logout functions using Supabase Auth
- Protected routes check admin role

---

## Services

### 1. Telegram Service (`services/telegramService.ts`)

**Functions:**
- `sendTelegramMessage(message: string)` - Send message via Telegram Bot API
- `sendNewChatNotification(sessionId: string, initialMessage: string)` - Notify admin of new chat
- `sendStuckNotification(sessionId: string, context: string[])` - Notify when AI needs help
- `testTelegramConnection()` - Verify bot setup

**API Endpoint:** `https://api.telegram.org/bot{TOKEN}/sendMessage`

### 2. Enhanced Gemini Service (`services/geminiService.ts`)

**RAG Functions:**
- `fetchSystemInstruction()` - Get active AI instruction from database
- `searchKnowledgeBase(query: string, limit: number)` - Search text knowledge entries
- `searchKnowledgeFiles(query: string, limit: number)` - Search uploaded file content
- `buildContextForAI(userMessage: string, history: ChatMessage[])` - Build enriched prompt
- `detectLowConfidence(aiResponse: string)` - Detect when AI is uncertain

**Enhanced sendMessage:**
- Load conversation history from database
- Build context with RAG
- Detect low confidence responses
- Trigger Telegram notifications
- Save messages to database

### 3. File Processing Service (`services/fileProcessingService.ts`)

**Functions:**
- `extractTextFromPDF(file: File)` - Extract text using pdf-parse
- `extractTextFromWord(file: File)` - Extract text using mammoth
- `processUploadedFile(file: File)` - Orchestrate upload and extraction
- `uploadToSupabase(file: File)` - Upload to Supabase Storage

---

## Admin Dashboard Components

### Layout Components
- `pages/AdminDashboard.tsx` - Main dashboard layout
- `components/admin/AdminSidebar.tsx` - Navigation sidebar
- `components/admin/ProtectedRoute.tsx` - Route protection wrapper
- `pages/AdminLogin.tsx` - Login page

### Feature Components

#### 1. System Instructions Manager
**Component:** `components/admin/SystemInstructionsManager.tsx`

**Features:**
- Display current active instruction
- Edit instruction with textarea
- Save new instruction (auto-deactivates old ones)
- View version history
- Reactivate previous versions

#### 2. Knowledge Base Manager
**Component:** `components/admin/KnowledgeBaseManager.tsx`

**Features:**
- List all knowledge entries in table
- Search by title/content
- Filter by category and tags
- Add/Edit/Delete entries
- Bulk actions (activate/deactivate/delete)
- Priority management
- Pagination (25 items per page)

#### 3. File Upload Manager
**Component:** `components/admin/FileUploadManager.tsx`

**Features:**
- Drag-and-drop file upload
- File type validation (PDF, DOCX, DOC)
- File size validation (max 10MB)
- Automatic text extraction
- Preview extracted text
- Edit file metadata (title, category, tags)
- Delete files from storage and database
- Download original files

#### 4. Chat History Viewer
**Component:** `components/admin/ChatHistoryViewer.tsx`

**Features:**
- List all chat sessions
- Filter by status and date range
- View full conversation details
- Status badges (active, needs_help, resolved)
- Mark sessions as resolved
- Highlight low-confidence messages
- Export conversations

#### 5. Settings Manager
**Component:** `components/admin/SettingsManager.tsx`

**Features:**
- Configure Telegram bot token and chat ID
- Test Telegram notification
- Manage knowledge base settings
- Configure AI model parameters
- Set confidence threshold
- Session timeout settings

---

## Chat Interface Enhancements

### Updated AIAdvisor Component

**New Features:**
- Generate unique session ID on mount
- Create chat session in database
- Send Telegram notification on first message
- Save all messages to database
- Load conversation history on session recovery
- Display typing indicator
- Show confidence warnings
- Markdown rendering for AI responses

**Session Management:**
- Store session_id in localStorage
- Recover previous session on page reload
- Track telegram_notified status
- Update last_activity_at on each message

---

## Security Implementation

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

**Admin-Only Tables:**
- `ai_config` - Only admins can read/write
- `app_settings` - Only admins can read/write

**Public Read, Admin Write:**
- `knowledge_base` - Public can read active entries, admins can write
- `knowledge_files` - Public can read active entries, admins can write

**Public Create, Admin Manage:**
- `chat_sessions` - Public can create, admins can read/update all
- `chat_messages` - Public can create/read own session, admins can read all

### Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_GEMINI_API_KEY` - Google Gemini API key

**Security Notes:**
- Never commit `.env` file
- Telegram credentials stored encrypted in database
- Admin role checked on both client and server via RLS

---

## Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/course/:id` - Course detail page
- `/blog/:slug` - Blog post page
- `/anthropic-ai-skills` - Anthropic AI skills page
- `/enterprise-ai-insights` - Enterprise AI insights page

### Admin Routes (Protected)
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard home
- `/admin/system-instructions` - System instructions manager
- `/admin/knowledge-base` - Knowledge base manager
- `/admin/files` - File upload manager
- `/admin/chat-history` - Chat history viewer
- `/admin/settings` - Settings manager

---

## NPM Dependencies

### To Install
```bash
npm install pdf-parse mammoth react-hot-toast react-markdown
```

**Package Details:**
- `pdf-parse` - Extract text from PDF files
- `mammoth` - Extract text from Word documents (.docx)
- `react-hot-toast` - Toast notifications for user feedback
- `react-markdown` - Render markdown in AI responses

---

## Testing Checklist

### Telegram Integration
- [ ] Create bot with BotFather
- [ ] Get chat ID from userinfobot
- [ ] Configure in admin settings
- [ ] Send test notification
- [ ] Verify message received in Telegram

### Chat Flow
- [ ] Start new chat
- [ ] Verify session created in database
- [ ] Send first message
- [ ] Verify Telegram notification sent
- [ ] Check conversation in admin dashboard
- [ ] Test session recovery (reload page)

### RAG Functionality
- [ ] Add knowledge base entries
- [ ] Upload PDF file
- [ ] Ask question related to knowledge
- [ ] Verify AI response includes knowledge base info
- [ ] Test with questions outside knowledge base

### Low Confidence Detection
- [ ] Ask question AI cannot answer
- [ ] Verify "needs_human_help" flag set
- [ ] Verify Telegram notification sent
- [ ] Check session status changed to "needs_help"
- [ ] Test admin marking session as resolved

### File Upload
- [ ] Upload PDF file
- [ ] Verify text extraction works
- [ ] Upload Word document
- [ ] Preview extracted text
- [ ] Edit file metadata
- [ ] Delete file

### Admin Dashboard
- [ ] Log in as admin
- [ ] Test all CRUD operations in knowledge base
- [ ] Update system instructions
- [ ] View chat history
- [ ] Filter and search functionality
- [ ] Export conversations

---

## Implementation Notes

### RAG Strategy
The system uses a simple keyword-based RAG approach:
1. User sends message
2. Search knowledge_base and knowledge_files for relevant content
3. Include top 5 matches in AI prompt context
4. AI generates response using knowledge + conversation history

### Confidence Detection
The system detects low confidence by looking for:
- Uncertainty phrases: "I don't know", "I'm not sure", "I cannot"
- Very short responses (< 20 characters)
- Generic responses without specific information

When detected:
- Set `needs_human_help = true` in message record
- Update session status to "needs_help"
- Send Telegram notification with conversation context

### Telegram Notifications
Two types of notifications:
1. **New Chat** - Sent on first message of every new session
2. **Stuck/Help Needed** - Sent when AI detects low confidence

Notifications include:
- Session ID
- Direct link to view in admin dashboard
- Message context (last 3-5 messages)
- Timestamp

---

## Future Enhancements

### Potential Improvements
- Semantic search using embeddings instead of keyword matching
- Vector database (Supabase pgvector) for better RAG
- Multi-language support
- Analytics dashboard (popular questions, satisfaction scores)
- A/B testing different system instructions
- Conversation sentiment analysis
- Automatic categorization of chats
- Integration with other messaging platforms (WhatsApp, Slack)
- Voice message support
- Image analysis in chat (Gemini Vision)
- Fine-tuned models for specific domains

### Scalability Considerations
- Implement caching for frequently accessed knowledge
- Use Supabase Edge Functions for heavy processing
- Set up database indexes for performance
- Implement rate limiting on chat API
- Archive old chat sessions (> 90 days)
- Compress extracted text for large files

---

## Support and Maintenance

### Monitoring
- Monitor Telegram notification success rate
- Track AI confidence scores over time
- Review "needs_help" sessions regularly
- Monitor knowledge base search performance
- Check error logs for failed file uploads

### Regular Tasks
- Update system instructions based on feedback
- Add new knowledge base entries
- Review and categorize chat sessions
- Archive resolved sessions
- Update AI model parameters
- Rotate API keys periodically

---

## Conclusion

This AI chatbot system provides a comprehensive solution for intelligent customer support with knowledge base integration, real-time monitoring, and complete administrative control. The Telegram integration ensures you're always aware of new conversations and potential issues, while the RAG system ensures accurate, knowledge-grounded responses. The admin dashboard gives you full transparency and control over the system's behavior.

**Key Benefits:**
- ✅ Intelligent responses using RAG
- ✅ Real-time Telegram notifications
- ✅ Complete conversation history
- ✅ Easy knowledge management
- ✅ Confidence detection and human escalation
- ✅ Secure, role-based access control
- ✅ File upload and text extraction
- ✅ Scalable Supabase architecture
