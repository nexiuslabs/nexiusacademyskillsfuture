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

export type QuizResultPayload = {
  id?: string;
  assessmentSlug: string;
  questionVersion: string;
  pagePath: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  resultTitle: string;
  resultDescription: string;
  answers: QuizResultAnswer[];
  certificateRecipientName?: string;
  certificateCourseName?: string;
  certificateCourseDates?: string[];
  certificateTrainerName?: string;
  certificateGenerated?: boolean;
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
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Could not save quiz result.');
  }

  return (await response.json()) as { id: string };
};
