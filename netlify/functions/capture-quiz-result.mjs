const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE = 'assessment_quiz_results';

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

const buildRecord = (payload) => {
  const visitor = payload?.visitorContext || {};
  const score = clampInteger(payload?.score, 0, 500);
  const totalQuestions = clampInteger(payload?.totalQuestions, 1, 500);
  const percentage = clampInteger(payload?.percentage, 0, 100);

  if (score === null || totalQuestions === null || percentage === null) {
    throw new Error('Invalid score payload.');
  }

  const record = {
    assessment_slug: clampText(payload?.assessmentSlug, 120) || 'agentic-ai-challenge',
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
  };

  const certificateRecipientName = clampText(payload?.certificateRecipientName, 200);
  const certificateCourseName = clampText(payload?.certificateCourseName, 500);
  const certificateCourseDates = asStringArray(payload?.certificateCourseDates, 12, 120);
  const certificateTrainerName = clampText(payload?.certificateTrainerName, 200);

  if (certificateRecipientName) record.certificate_recipient_name = certificateRecipientName;
  if (certificateCourseName) record.certificate_course_name = certificateCourseName;
  if (certificateCourseDates.length) record.certificate_course_dates = certificateCourseDates;
  if (certificateTrainerName) record.certificate_trainer_name = certificateTrainerName;
  if (payload?.certificateGenerated) record.certificate_generated_at = new Date().toISOString();

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

  let record;
  try {
    record = buildRecord(payload);
  } catch (error) {
    return json(400, { error: error.message || 'Invalid quiz result payload.' });
  }

  const headers = {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };

  const existingId = clampText(payload?.id, 64);
  const endpoint = existingId
    ? `${SUPABASE_URL}/rest/v1/${TABLE}?id=eq.${encodeURIComponent(existingId)}&select=id`
    : `${SUPABASE_URL}/rest/v1/${TABLE}?select=id`;

  const response = await fetch(endpoint, {
    method: existingId ? 'PATCH' : 'POST',
    headers,
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    const body = await response.text();
    return json(response.status, { error: body || 'Could not save quiz result.' });
  }

  const rows = await response.json();
  const id = rows?.[0]?.id || existingId;

  if (!id) {
    return json(500, { error: 'Quiz result saved but no id was returned.' });
  }

  return json(200, { id });
}
