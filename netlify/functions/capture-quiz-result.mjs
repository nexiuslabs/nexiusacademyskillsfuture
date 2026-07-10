const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE = 'assessment_quiz_results';
const INVITES_TABLE = 'assessment_invites';

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

const clampText = (value, max = 500) => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
};

const clampInteger = (value, min, max) => {
  const number = Number(value);
  if (!Number.isInteger(number)) return null;
  if (number < min || number > max) return null;
  return number;
};

const asStringArray = (value, maxItems = 10, maxLength = 120) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => clampText(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
};

const normalizeAnswers = (answers) => {
  if (!Array.isArray(answers)) return [];

  return answers.slice(0, 50).map((answer) => ({
    questionId: clampInteger(answer?.questionId, 1, 500),
    questionPrompt: clampText(answer?.questionPrompt, 1000),
    selectedIndex: clampInteger(answer?.selectedIndex, 0, 10),
    selectedOptionLetter: clampText(answer?.selectedOptionLetter, 4),
    selectedOptionText: clampText(answer?.selectedOptionText, 1000),
    correctIndex: clampInteger(answer?.correctIndex, 0, 10),
    correctOptionLetter: clampText(answer?.correctOptionLetter, 4),
    correctOptionText: clampText(answer?.correctOptionText, 1000),
    isCorrect: Boolean(answer?.isCorrect),
  }));
};

const supabaseHeaders = () => ({
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
});

const isExpired = (expiresAt) => Boolean(expiresAt && new Date(expiresAt).getTime() < Date.now());

const fetchInvite = async (inviteId, assessmentSlug) => {
  const endpoint = new URL(`${SUPABASE_URL}/rest/v1/${INVITES_TABLE}`);
  endpoint.searchParams.set('select', 'id,assessment_slug,cohort_code,learner_name,learner_email,course_name,course_dates,trainer_name,expires_at,active,certificate_enabled,max_results');
  endpoint.searchParams.set('id', `eq.${inviteId}`);
  endpoint.searchParams.set('assessment_slug', `eq.${assessmentSlug}`);
  endpoint.searchParams.set('active', 'eq.true');
  endpoint.searchParams.set('limit', '1');

  const response = await fetch(endpoint, { headers: supabaseHeaders() });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || 'Could not load learner invite.');
  }

  const rows = await response.json();
  const invite = rows?.[0];

  if (!invite || isExpired(invite.expires_at)) {
    const error = new Error('This assessment is only available to registered learners with a valid access code.');
    error.statusCode = 403;
    throw error;
  }

  return invite;
};

const fetchCompletedResultCount = async (inviteId) => {
  const endpoint = new URL(`${SUPABASE_URL}/rest/v1/${TABLE}`);
  endpoint.searchParams.set('select', 'id');
  endpoint.searchParams.set('assessment_invite_id', `eq.${inviteId}`);

  const response = await fetch(endpoint, {
    headers: {
      ...supabaseHeaders(),
      Prefer: 'count=exact',
    },
  });

  if (!response.ok) return null;
  const range = response.headers.get('content-range') || '';
  const count = Number(range.split('/')[1]);
  return Number.isFinite(count) ? count : null;
};

const buildRecord = (payload, invite) => {
  const visitor = payload?.visitorContext || {};
  const score = clampInteger(payload?.score, 0, 500);
  const totalQuestions = clampInteger(payload?.totalQuestions, 1, 500);
  const percentage = clampInteger(payload?.percentage, 0, 100);

  if (score === null || totalQuestions === null || percentage === null) {
    throw new Error('Invalid score payload.');
  }

  const record = {
    assessment_invite_id: invite.id,
    assessment_slug: invite.assessment_slug,
    question_version: clampText(payload?.questionVersion, 120) || 'unknown',
    visitor_id: clampText(visitor?.visitorId, 64),
    session_id: clampText(visitor?.sessionId, 64),
    page_path: clampText(payload?.pagePath, 500),
    landing_path: clampText(visitor?.landingPath, 500),
    referrer: clampText(visitor?.referrer, 500),
    lead_source: clampText(visitor?.leadSource, 120),
    utm_source: clampText(visitor?.utmSource, 120),
    utm_medium: clampText(visitor?.utmMedium, 120),
    utm_campaign: clampText(visitor?.utmCampaign, 180),
    utm_content: clampText(visitor?.utmContent, 180),
    device_type: clampText(visitor?.deviceType, 32),
    score,
    total_questions: totalQuestions,
    percentage,
    result_title: clampText(payload?.resultTitle, 160),
    result_description: clampText(payload?.resultDescription, 1000),
    answers: normalizeAnswers(payload?.answers),
    certificate_recipient_name: invite.learner_name,
    certificate_course_name: invite.course_name,
    certificate_course_dates: asStringArray(invite.course_dates, 12, 120),
    certificate_trainer_name: invite.trainer_name,
  };

  if (payload?.certificateGenerated && invite.certificate_enabled) {
    record.certificate_generated_at = new Date().toISOString();
  }

  return record;
};

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json(500, { error: 'Supabase server credentials are not configured.' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (_error) {
    return json(400, { error: 'Invalid JSON payload.' });
  }

  const assessmentSlug = clampText(payload?.assessmentSlug, 120) || 'agentic-ai-challenge';
  const inviteId = clampText(payload?.assessmentInviteId, 64);

  if (!inviteId) {
    return json(403, { error: 'Learner access validation is required before saving quiz results.' });
  }

  let invite;
  try {
    invite = await fetchInvite(inviteId, assessmentSlug);
  } catch (error) {
    return json(error.statusCode || 500, { error: error.message || 'Could not validate learner access.' });
  }

  const existingId = clampText(payload?.id, 64);
  if (!existingId) {
    const completedCount = await fetchCompletedResultCount(invite.id);
    if (completedCount !== null && completedCount >= invite.max_results) {
      return json(403, { error: 'This learner has reached the maximum number of assessment submissions.' });
    }
  }

  let record;
  try {
    record = buildRecord(payload, invite);
  } catch (error) {
    return json(400, { error: error.message || 'Invalid quiz result payload.' });
  }

  const endpoint = existingId
    ? `${SUPABASE_URL}/rest/v1/${TABLE}?id=eq.${encodeURIComponent(existingId)}&assessment_invite_id=eq.${encodeURIComponent(invite.id)}&select=id`
    : `${SUPABASE_URL}/rest/v1/${TABLE}?select=id`;

  const response = await fetch(endpoint, {
    method: existingId ? 'PATCH' : 'POST',
    headers: {
      ...supabaseHeaders(),
      Prefer: 'return=representation',
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    const body = await response.text();
    return json(response.status, { error: body || 'Could not save quiz result.' });
  }

  const rows = await response.json();
  const id = rows?.[0]?.id;

  if (!id) {
    return json(existingId ? 404 : 500, {
      error: existingId
        ? 'Could not update quiz result for this learner invite.'
        : 'Quiz result saved but no id was returned.',
    });
  }

  return json(200, { id });
}
