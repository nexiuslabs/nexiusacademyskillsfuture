import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle, RotateCcw, Trophy, XCircle } from 'lucide-react';

type QuizQuestion = {
  id: number;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

type ResultBand = {
  min: number;
  title: string;
  description: string;
  nextStep: string;
};

type AgenticAIQuizProps = {
  questions: QuizQuestion[];
  onLeadClick: (score: number, resultTitle: string) => void;
};

const RESULT_BANDS: ResultBand[] = [
  {
    min: 18,
    title: 'Agent Boss Ready',
    description: 'You understand how agentic systems need context, tools, memory, governance, and human checkpoints to execute safely.',
    nextStep: 'You are ready to turn this knowledge into real workplace mini-apps and bounded agent workflows.',
  },
  {
    min: 14,
    title: 'Workflow Practitioner',
    description: 'You have a strong working grasp of Agentic AI foundations and can start mapping repeatable workflows into safer AI-assisted systems.',
    nextStep: 'Focus next on Codex project structure, skills, plugins, and governance patterns.',
  },
  {
    min: 8,
    title: 'Builder in Training',
    description: 'You recognise several core ideas, but the details around context engineering, memory, tool access, and safety still need practice.',
    nextStep: 'The foundation workshop will help connect these concepts through guided hands-on activities.',
  },
  {
    min: 0,
    title: 'AI Explorer',
    description: 'You are at the beginning of the Agentic AI learning curve. That is a good place to start because the right foundation matters.',
    nextStep: 'Start with the basics: AI evolution, DUO prompting, context windows, and safe human-in-the-loop workflows.',
  },
];

const optionLetters = ['A', 'B', 'C', 'D'];

const getResultBand = (score: number) => RESULT_BANDS.find((band) => score >= band.min) ?? RESULT_BANDS[RESULT_BANDS.length - 1];

const AgenticAIQuiz: React.FC<AgenticAIQuizProps> = ({ questions, onLeadClick }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const score = useMemo(
    () => selectedAnswers.reduce((total, answer, index) => total + (answer === questions[index]?.answerIndex ? 1 : 0), 0),
    [questions, selectedAnswers],
  );
  const isAnswered = selectedOption !== null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = Math.round(((currentQuestionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100);
  const resultBand = getResultBand(score);

  const startQuiz = () => {
    setHasStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
  };

  const chooseOption = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setSelectedAnswers((answers) => {
      const next = [...answers];
      next[currentQuestionIndex] = optionIndex;
      return next;
    });
  };

  const goNext = () => {
    if (!isAnswered) return;

    if (isLastQuestion) {
      setShowResult(true);
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
    setSelectedOption(null);
  };

  if (!hasStarted) {
    return (
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center shadow-2xl shadow-black/20 backdrop-blur md:p-12">
        <div className="mb-5 inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-accent">
          20-question challenge
        </div>
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Ready to test your Agentic AI foundation?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          This challenge checks the training concepts behind AI evolution, context engineering, DUO prompting, Codex workflows, skills, memory, MCP, and safe governance.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={startQuiz}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-7 py-4 font-bold text-primary shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:bg-[#22E0D0]"
          >
            Start Challenge
            <ArrowRight size={18} />
          </button>
          <a
            href="/courses/agentic-ai"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-7 py-4 font-bold text-white transition hover:border-accent hover:text-accent"
          >
            View Foundation Course
          </a>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white p-6 shadow-2xl shadow-black/20 md:p-10">
        <div className="grid gap-8 md:grid-cols-[0.8fr,1.2fr] md:items-center">
          <div className="rounded-[1.5rem] bg-primary p-8 text-center text-white">
            <Trophy className="mx-auto mb-4 text-accent" size={44} />
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Your score</div>
            <div className="mt-3 font-heading text-6xl font-bold">{score}/{questions.length}</div>
            <div className="mt-2 text-slate-300">{percentage}% correct</div>
          </div>
          <div>
            <div className="mb-3 inline-flex rounded-full bg-accent/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-primary">
              {resultBand.title}
            </div>
            <h2 className="font-heading text-3xl font-bold text-primary md:text-4xl">Your Agentic AI readiness snapshot</h2>
            <p className="mt-4 text-gray-600">{resultBand.description}</p>
            <p className="mt-3 text-gray-600">{resultBand.nextStep}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onLeadClick(score, resultBand.title)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-blue-900"
              >
                Get Course Guidance
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={startQuiz}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/20 px-6 py-3 font-bold text-primary transition hover:border-primary"
              >
                <RotateCcw size={18} />
                Retake Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white p-5 shadow-2xl shadow-black/20 md:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Question {currentQuestionIndex + 1} of {questions.length}</div>
          <div className="mt-1 text-sm text-gray-500">Score: {score}</div>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 sm:max-w-xs">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="rounded-[1.5rem] bg-neutral p-5 md:p-7">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary/60">Training scenario</div>
        <h2 className="font-heading text-2xl font-bold leading-tight text-primary md:text-3xl">{currentQuestion.prompt}</h2>
      </div>

      <div className="mt-6 grid gap-3">
        {currentQuestion.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === currentQuestion.answerIndex;
          const isSelected = selectedOption === optionIndex;
          const showCorrect = isAnswered && isCorrect;
          const showWrong = isAnswered && isSelected && !isCorrect;

          return (
            <button
              key={option}
              type="button"
              disabled={isAnswered}
              onClick={() => chooseOption(optionIndex)}
              className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition ${
                showCorrect
                  ? 'border-accent bg-accent/10 text-primary'
                  : showWrong
                    ? 'border-red-300 bg-red-50 text-red-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-accent hover:bg-accent/5'
              }`}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${showCorrect ? 'bg-accent text-primary' : showWrong ? 'bg-red-500 text-white' : 'bg-primary text-white'}`}>
                {optionLetters[optionIndex]}
              </span>
              <span className="pt-1 font-semibold">{option}</span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={`mt-6 rounded-2xl border p-5 ${selectedOption === currentQuestion.answerIndex ? 'border-accent/40 bg-accent/10' : 'border-red-200 bg-red-50'}`}>
          <div className="flex items-start gap-3">
            {selectedOption === currentQuestion.answerIndex ? <CheckCircle className="mt-0.5 text-accent" size={22} /> : <XCircle className="mt-0.5 text-red-500" size={22} />}
            <div>
              <div className="font-bold text-primary">{selectedOption === currentQuestion.answerIndex ? 'Correct' : 'Not quite'}</div>
              <p className="mt-1 text-sm leading-relaxed text-gray-700">{currentQuestion.explanation}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={!isAnswered}
          onClick={goNext}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isLastQuestion ? 'See Results' : 'Next Question'}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export type { QuizQuestion };
export default AgenticAIQuiz;
