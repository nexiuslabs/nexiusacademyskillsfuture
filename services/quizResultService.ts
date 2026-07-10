import { getVisitorContext } from './visitorSession';

export type QuizResultAnswer = {
  questionId: number;
  questionPrompt: string;
  selectedIndex: number;
  selectedOptionLetter: string;
  selectedOptionText: string;
  correctIndex: number;
  correctOptionLetter: string;
  correctOptionText: string;
  isCorrect: boolean;
};

export type AssessmentInvite = {
  id: string;
  assessmentSlug: string;
  cohortCode: string;
  learnerName: string;
  learnerEmail: string;
  courseName: string;
  courseDates: string[];
  trainerName: string;
  certificateEnabled: boolean;
  maxResults: number;
};

export type QuizResultPayload = {
  id?: string;
  assessmentInviteId: string;
  assessmentSlug: string;
  questionVersion: string;
  pagePath: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  resultTitle: string;
  resultDescription: string;
  answers: QuizResultAnswer[];
  certificateGenerated?: boolean;
};

const parseError = async (response: Response, fallback: string) => {
  const body = await response.json().catch(() => ({}));
  return new Error(body.error || fallback);
};

export const validateAssessmentInvite = async (email: string, accessCode: string) => {
  const response = await fetch('/.netlify/functions/validate-assessment-invite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      accessCode,
      assessmentSlug: 'agentic-ai-challenge',
    }),
  });

  if (!response.ok) {
    throw await parseError(response, 'Could not validate learner access.');
  }

  return (await response.json()) as { invite: AssessmentInvite };
};

export const submitQuizResult = async (payload: QuizResultPayload) => {
  const visitorContext = getVisitorContext();

  const response = await fetch('/.netlify/functions/capture-quiz-result', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      visitorContext,
    }),
    keepalive: true,
  });

  if (!response.ok) {
    throw await parseError(response, 'Could not save quiz result.');
  }

  return (await response.json()) as { id: string };
};
