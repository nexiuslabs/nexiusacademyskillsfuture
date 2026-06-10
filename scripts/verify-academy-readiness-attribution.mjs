#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const repoRoot = process.cwd();
const envFiles = [
  path.join(repoRoot, '.env'),
  path.join(repoRoot, '.env.local'),
  '/root/.hermes/.env',
];

for (const file of envFiles) {
  if (!fs.existsSync(file)) continue;
  for (const rawLine of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const [key, ...parts] = line.split('=');
    if (!process.env[key]) process.env[key] = parts.join('=').replace(/^['"]|['"]$/g, '');
  }
}

const supabaseUrl = process.env.NEXIUS_ACADEMY_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.NEXIUS_ACADEMY_SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const executeLiveSmoke = process.argv.includes('--execute-live-production-smoke');

const requiredLeadColumns = [
  'source_tag',
  'lead_source',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'landing_path',
  'entry_referrer',
  'device_type',
  'visitor_id',
  'session_id',
  'page_path',
  'lead_flow',
  'intent',
];

const requiredSessionColumns = ['lead_source', 'utm_content', 'lead_capture_id', 'session_id'];

const result = {
  mode: executeLiveSmoke ? 'live-production-smoke' : 'schema-only-dry-run',
  env: {
    supabaseUrl: Boolean(supabaseUrl),
    anonKey: Boolean(anonKey),
    serviceRoleKey: Boolean(serviceRoleKey),
  },
  leadCaptureColumnCheck: null,
  visitorSessionColumnCheck: null,
  syntheticCapture: null,
  cleanup: null,
};

const fail = (message) => {
  console.error(JSON.stringify({ ok: false, message, result }, null, 2));
  process.exit(1);
};

if (!supabaseUrl || !serviceRoleKey) {
  fail('Missing Supabase URL or service-role key. No live read/write attempted.');
}

const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

const checkSelectableColumns = async (table, columns) => {
  const { error } = await admin.from(table).select(columns.join(',')).limit(0);
  if (error) return { ok: false, table, columns, error: error.message };
  return { ok: true, table, columns };
};

result.leadCaptureColumnCheck = await checkSelectableColumns('lead_captures', requiredLeadColumns);
result.visitorSessionColumnCheck = await checkSelectableColumns('visitor_sessions', requiredSessionColumns);

if (!result.leadCaptureColumnCheck.ok || !result.visitorSessionColumnCheck.ok) {
  fail('Required attribution columns are not all selectable.');
}

if (!executeLiveSmoke) {
  console.log(JSON.stringify({
    ok: true,
    note: 'Schema-only verification passed. Re-run with --execute-live-production-smoke to insert and delete one synthetic lead; output remains PII-free.',
    result,
  }, null, 2));
  process.exit(0);
}

if (!anonKey) {
  fail('Missing VITE_SUPABASE_ANON_KEY; cannot call capture-lead edge function.');
}

const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
const syntheticVisitorId = randomUUID();
const syntheticSessionId = randomUUID();
const synthetic = {
  fullName: `Synthetic Academy Attribution Test ${stamp}`,
  email: `academy-attribution-${stamp}@example.invalid`,

  phone: '',
  role: 'Readiness report download lead',
  companyName: '',
  departmentOrDesignation: '',
  leadFlow: 'checklist_download',
  ageBand: 'below_40',
  preferredIntake: 'AI readiness report download',
  cohortCode: 'ai-readiness-report-download',
  courseSlug: 'agentic-ai',
  intent: 'download_checklist',
  payerType: 'self',
  sponsorContactName: '',
  sponsorContactEmail: '',
  sponsorStatus: 'not_applicable',
  sourceTag: 'website_internal_cta_sme_ai_readiness_report_2026',
  pagePath: '/',
  visitorId: syntheticVisitorId,
  sessionId: syntheticSessionId,
  landingPath: '/?lead=download-ai-readiness-report&lead_source=website_internal_cta_sme_ai_readiness_report_2026&utm_source=website_cta&utm_medium=owned_web&utm_campaign=sme_ai_readiness_report_2026&utm_content=homepage_cta_01_sme_ai_readiness_report_2026',
  referrer: '',
  leadSource: 'website_internal_cta_sme_ai_readiness_report_2026',
  utmSource: 'website_cta',
  utmMedium: 'owned_web',
  utmCampaign: 'sme_ai_readiness_report_2026',
  utmContent: 'homepage_cta_01_sme_ai_readiness_report_2026',
  deviceType: 'desktop',
};

try {
  const edgeResponse = await fetch(`${supabaseUrl}/functions/v1/capture-lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${anonKey}` },
    body: JSON.stringify(synthetic),
  });
  result.syntheticCapture = { httpStatus: edgeResponse.status, ok: edgeResponse.ok };
  if (!edgeResponse.ok) {
    const body = await edgeResponse.text();
    result.syntheticCapture.errorBodyLength = body.length;
    fail('Synthetic capture edge-function call failed; response body withheld.');
  }

  const { data: row, error: selectError } = await admin
    .from('lead_captures')
    .select(requiredLeadColumns.join(','))
    .eq('email', synthetic.email)
    .maybeSingle();

  if (selectError || !row) {
    fail(selectError?.message || 'Synthetic lead row was not readable after capture.');
  }

  const fieldPresence = Object.fromEntries(requiredLeadColumns.map((column) => [column, row[column] !== null && row[column] !== undefined && String(row[column]).length > 0]));
  result.syntheticCapture.fieldPresence = fieldPresence;

  const missing = requiredLeadColumns.filter((column) => !fieldPresence[column] && !['entry_referrer'].includes(column));
  if (missing.length) {
    result.syntheticCapture.missingRequired = missing;
    fail('Synthetic capture row is missing required attribution fields.');
  }
} finally {
  const { error: deleteError, count } = await admin
    .from('lead_captures')
    .delete({ count: 'exact' })
    .eq('email', synthetic.email);
  result.cleanup = { attempted: true, deletedCount: count ?? 0, ok: !deleteError, error: deleteError?.message };
}

console.log(JSON.stringify({ ok: true, result }, null, 2));
