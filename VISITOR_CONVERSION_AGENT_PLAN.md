# Visitor Conversion Agent Plan

This site already has:
- React/Vite frontend with route-level pages in `App.tsx`
- existing CTA analytics in `services/analytics.ts`
- lead capture modal in `components/leads/LeadCaptureModal.tsx`
- lead insert edge function in `supabase/functions/capture-lead/index.ts`
- admin view for `lead_captures` in `pages/AdminPage.tsx`
- Supabase as the operational backend

This plan extends the current stack into a real per-visitor tracking and conversion system.

## 1. Target outcome

Build a system that can:
- track each anonymous visitor as a session
- record page views, time spent, scroll depth, CTA clicks, modal opens, form starts, form submits, and WhatsApp exits
- compute a real-time intent score
- trigger the right next action on-site
- notify a human when a visitor becomes high intent
- merge anonymous session history into a known lead record once the visitor submits a form

## 2. Recommended architecture

Use Supabase as the source of truth and keep GA for marketing attribution only.

Layers:
1. Frontend instrumentation
2. Supabase event ingestion
3. Session + lead intelligence tables
4. Rule engine for conversion actions
5. Admin live-ops dashboard
6. Optional AI summarizer for high-intent visitors

## 3. What to keep vs replace

Keep:
- `services/analytics.ts` for Google Analytics events
- `LeadCaptureModal` as the main identity capture point
- `capture-lead` for final lead submission
- `AdminPage` as the admin entry point

Add:
- first-party event pipeline into Supabase
- persistent `visitor_id` and `session_id`
- real-time lead scoring
- trigger log and action log
- dashboard cards for active visitors and hot leads

Do not rely on GA alone for this use case. GA is not enough for per-visitor operational follow-up.

## 4. Data model

Add these tables.

### `visitor_sessions`

One row per browser session.

Suggested columns:
- `id uuid primary key default gen_random_uuid()`
- `visitor_id uuid not null`
- `session_id uuid not null unique`
- `first_seen_at timestamptz default now()`
- `last_seen_at timestamptz default now()`
- `landing_path text`
- `entry_referrer text`
- `utm_source text`
- `utm_medium text`
- `utm_campaign text`
- `device_type text`
- `country_code text`
- `lead_capture_id uuid null`
- `status text default 'active'`
- `intent_score integer default 0`
- `intent_stage text default 'cold'`
- `last_action_taken text null`

Indexes:
- `session_id`
- `visitor_id`
- `last_seen_at desc`
- `intent_score desc`

### `visitor_events`

Append-only behavioral log.

Suggested columns:
- `id bigint generated always as identity primary key`
- `session_id uuid not null`
- `visitor_id uuid not null`
- `occurred_at timestamptz default now()`
- `event_name text not null`
- `page_path text`
- `element_id text`
- `element_text text`
- `section_id text`
- `time_on_page_seconds integer`
- `scroll_depth integer`
- `metadata jsonb default '{}'::jsonb`

Indexes:
- `(session_id, occurred_at desc)`
- `(visitor_id, occurred_at desc)`
- `(event_name, occurred_at desc)`

### `visitor_profiles`

Cross-session rollup per browser identity.

Suggested columns:
- `visitor_id uuid primary key`
- `first_seen_at timestamptz default now()`
- `last_seen_at timestamptz default now()`
- `total_sessions integer default 1`
- `total_pageviews integer default 0`
- `known_email text null`
- `known_name text null`
- `known_phone text null`
- `lead_capture_id uuid null`
- `lifetime_intent_score integer default 0`
- `notes jsonb default '{}'::jsonb`

### `conversion_actions`

Tracks what the system decided to do.

Suggested columns:
- `id uuid primary key default gen_random_uuid()`
- `session_id uuid not null`
- `visitor_id uuid not null`
- `trigger_name text not null`
- `action_type text not null`
- `action_payload jsonb default '{}'::jsonb`
- `status text default 'pending'`
- `created_at timestamptz default now()`
- `executed_at timestamptz null`

### `sales_alerts`

Human escalation queue.

Suggested columns:
- `id uuid primary key default gen_random_uuid()`
- `session_id uuid not null`
- `visitor_id uuid not null`
- `lead_capture_id uuid null`
- `priority text default 'medium'`
- `reason text not null`
- `summary text not null`
- `status text default 'open'`
- `created_at timestamptz default now()`

## 5. Event taxonomy for this site

Implement these first-party events.

### Core session events
- `session_started`
- `page_view`
- `page_exit`
- `session_heartbeat`

### Engagement events
- `scroll_depth_reached`
- `time_on_page_15s`
- `time_on_page_30s`
- `time_on_page_60s`
- `time_on_page_120s`

### CTA and UI events
- `cta_click`
- `whatsapp_click`
- `lead_modal_open`
- `lead_modal_close`
- `advisor_widget_open`
- `advisor_widget_whatsapp_click`

### Form events
- `lead_form_started`
- `lead_form_field_completed`
- `lead_form_submit_success`
- `lead_form_submit_failed`

### High-intent page events
- `pricing_section_viewed`
- `schedule_section_viewed`
- `faq_section_viewed`
- `testimonials_section_viewed`
- `return_to_course_page`

## 6. Where each event belongs in the current codebase

### Global app shell

Files:
- `App.tsx`
- `components/ScrollToTop.tsx`

Add a global session bootstrap hook here:
- create/read `visitor_id` from `localStorage`
- create `session_id` per tab session with `sessionStorage`
- capture UTM params and landing path
- fire `session_started`
- on route change, fire `page_view`
- on unload or visibility change, fire `page_exit`

### Existing analytics service

File:
- `services/analytics.ts`

Expand this into two paths:
1. send event to GA through `gtag`
2. send event to your own Supabase ingest endpoint

Add a new function family:
- `trackPageView`
- `trackSessionStarted`
- `trackTimeOnPage`
- `trackSectionView`
- `trackFormStarted`
- `trackFormFieldCompleted`
- `trackLeadSubmit`
- `trackAdvisorInteraction`

### Course page

File:
- `pages/CoursePage.tsx`

Existing scroll tracking already fires milestone events. Extend it to:
- also send first-party `scroll_depth_reached`
- mark section views for pricing, schedule, testimonials, faq
- fire `time_on_page_*` milestones

This page is the highest-intent route and should contribute heavily to score.

### Sticky conversion rail

File:
- `components/courses/StickyConversionRail.tsx`

Already tracks CTA clicks and WhatsApp outbound clicks.

Extend each button event with:
- `session_id`
- `visitor_id`
- `intent_context: 'course_purchase'`
- `offer_variant`
- `cta_surface: desktop|mobile`

### AI advisor widget

File:
- `components/courses/AIAdvisor.tsx`

Right now this is only a WhatsApp launcher.

Track:
- `advisor_widget_open`
- `advisor_widget_close`
- `advisor_widget_whatsapp_click`

Later, replace or augment this with a rules-driven prompt:
- low intent: "Need help choosing the right course?"
- high intent: "Want to confirm your subsidy and next cohort now?"

### Lead capture modal

File:
- `components/leads/LeadCaptureModal.tsx`

This is the identity merge point.

Add:
- `lead_form_started` when the user focuses first field
- `lead_form_field_completed` on key milestones like email and phone
- `lead_modal_close`
- `session_id` and `visitor_id` in submit payload

When submit succeeds:
- insert into `lead_captures`
- link current `visitor_sessions.lead_capture_id`
- upsert `visitor_profiles` known identity fields
- create a sales alert if score threshold is met

## 7. Backend implementation

### A. New edge function: `track-visitor-event`

Add:
- `supabase/functions/track-visitor-event/index.ts`

Responsibility:
- validate event payload
- insert into `visitor_events`
- upsert `visitor_sessions.last_seen_at`
- update `visitor_profiles`
- optionally call scoring function

Payload shape:
- `visitorId`
- `sessionId`
- `eventName`
- `pagePath`
- `occurredAt`
- `metadata`

### B. Update edge function: `capture-lead`

File:
- `supabase/functions/capture-lead/index.ts`

Extend payload:
- `visitorId`
- `sessionId`
- `utmSource`
- `utmMedium`
- `utmCampaign`

After inserting `lead_captures`:
- update `visitor_sessions` for that session
- update `visitor_profiles`
- insert `sales_alerts` if the session is hot

### C. Add SQL function: `recompute_session_intent_score`

Create a Postgres function that calculates score from event history.

Suggested scoring:
- first course page view: `+10`
- return visit to course page: `+15`
- pricing section viewed: `+20`
- schedule section viewed: `+10`
- testimonials viewed: `+5`
- stayed 60s on course page: `+15`
- lead modal open: `+25`
- form started: `+30`
- form submit success: `+60`
- WhatsApp click: `+35`
- multiple page views in same session: `+5`

Intent stages:
- `0-24 cold`
- `25-59 warm`
- `60-99 hot`
- `100+ sales_ready`

### D. Add SQL function: `evaluate_conversion_actions`

Rule examples:
- if `pricing_section_viewed` and no modal open after 20s -> show subsidy CTA
- if `time_on_page_60s` on `/courses/agentic-ai` and no CTA click -> open advisor prompt
- if `lead_modal_open` then close without submit -> wait 30s, show WhatsApp rescue CTA
- if `intent_stage = 'sales_ready'` -> insert `sales_alerts`

## 8. Frontend action engine

Add a lightweight client-side rule engine first.

Suggested new files:
- `services/visitorSession.ts`
- `services/behaviorTracker.ts`
- `services/conversionEngine.ts`
- `hooks/useVisitorSession.ts`
- `hooks/useTimeOnPage.ts`

Client-side actions to support:
- open `LeadCaptureModal`
- show advisor widget nudge
- swap CTA copy
- show floating banner
- show exit-intent prompt

Do not auto-trigger too many interventions in one session.

Recommended limits:
- max 1 modal auto-open per session
- max 2 nudges per session
- never interrupt within first 8 seconds

## 9. Admin dashboard changes

File:
- `pages/AdminPage.tsx`

Add three sections after auth:

### Live visitors
- active sessions in last 5 minutes
- current page
- time on page
- intent score
- last event

### Hot leads
- sessions with `intent_score >= 60`
- known identity if captured
- recommended action
- whether WhatsApp was clicked

### Alert queue
- rows from `sales_alerts`
- reason, summary, created time, status

Useful filters:
- page path
- source/utm campaign
- intent stage
- known vs anonymous

## 10. Exact rollout sequence

### Phase 1: first-party tracking
- create `visitor_sessions`, `visitor_events`, `visitor_profiles`
- add `visitor_id` + `session_id` bootstrap
- add `track-visitor-event`
- instrument page views, CTA clicks, modal opens, WhatsApp clicks, time-on-page

### Phase 2: score and identify
- update `capture-lead`
- add session score function
- link anonymous behavior to submitted leads
- show live visitor list in admin

### Phase 3: on-site actions
- add `conversion_actions`
- build client-side conversion engine
- trigger subsidy prompt / WhatsApp rescue / advisor nudge

### Phase 4: human escalation
- add `sales_alerts`
- push high-intent alerts to WhatsApp, Telegram, or Slack
- show recommended next step to human operator

### Phase 5: AI layer
- generate short visitor summaries:
  - pages visited
  - strongest buying signals
  - likely concern
  - recommended human message

Use AI only after the deterministic event pipeline is stable.

## 11. Conversion actions that fit Nexius Academy

For this site, the best actions are:

### Anonymous high-intent visitor on course page
- show "Check Subsidy & Fit"
- show WhatsApp shortcut to Melverick
- show next available intake

### Returning visitor on same course page
- emphasize cohort deadline and subsidy estimate
- preselect the course in the modal

### Private class / company training visitor
- trigger `advisory_call` flow instead of consumer subsidy flow

### Visitor opened modal but did not submit
- rescue with WhatsApp CTA
- optionally reduce fields on second attempt

### Visitor clicked WhatsApp
- mark session as human-assisted
- create admin alert with summary

## 12. Compliance constraints

You are in Singapore, so plan for PDPA-safe behavior:
- show cookie/analytics consent if using non-essential tracking
- keep first-party behavioral tracking disclosed in privacy policy
- do not infer personally identifiable identity until the user submits it
- do not auto-send email or WhatsApp without consent / submitted contact details

## 13. Minimal viable build

If you want the fastest path, implement only this first:
- persistent `visitor_id` + `session_id`
- first-party event ingest
- course page events
- modal and WhatsApp events
- session scoring
- admin live visitor list

That already gives you a usable "salesperson on the site" view.

## 14. Best next code changes

The first concrete implementation batch should be:
1. add Supabase migration for `visitor_sessions`, `visitor_events`, `visitor_profiles`, `sales_alerts`
2. add `supabase/functions/track-visitor-event/index.ts`
3. add session bootstrap to `App.tsx`
4. expand `services/analytics.ts` into dual-track GA + Supabase event logging
5. instrument `AIAdvisor.tsx`, `CoursePage.tsx`, `StickyConversionRail.tsx`, and `LeadCaptureModal.tsx`
6. extend `pages/AdminPage.tsx` to show live sessions and hot leads

## 15. Recommendation

For this codebase, do not start with a fully autonomous AI sales agent.

Start with:
- deterministic tracking
- deterministic scoring
- deterministic triggers
- human escalation

Then add AI summarization and message recommendation on top.

That will be more reliable, easier to debug, and much less likely to hurt conversions.
