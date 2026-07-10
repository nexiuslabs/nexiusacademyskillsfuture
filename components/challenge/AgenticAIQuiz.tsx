import React, { useMemo, useState } from 'react';
import { ArrowDownToLine, ArrowRight, CheckCircle, RotateCcw, Trophy, XCircle } from 'lucide-react';

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

const CERTIFICATE_DETAILS = {
  courseName:
    'Agentic AI Foundations for Non-Technical Professionals: Enhancing Productivity and Business Process Automation',
  courseDates: '07 Oct 2026, 08 Oct 2026 & 15 Oct 2026',
  trainerName: 'Melverick Ng',
};

const escapePdfText = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[–—]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');

const pdfText = (x: number, y: number, size: number, text: string, font = 'F1') =>
  `BT /${font} ${size} Tf ${x} ${y} Td (${escapePdfText(text)}) Tj ET`;

const centeredPdfText = (y: number, size: number, text: string, font = 'F1') => {
  const approxWidth = text.length * size * 0.52;
  const x = Math.max(40, (595.28 - approxWidth) / 2);
  return pdfText(Number(x.toFixed(1)), y, size, text, font);
};

const wrapText = (text: string, maxChars: number) => {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  return lines;
};

const buildCertificatePdf = (recipientName: string, score: number, total: number) => {
  const issuedOn = new Intl.DateTimeFormat('en-SG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date());
  const courseLines = wrapText(CERTIFICATE_DETAILS.courseName.toUpperCase(), 33);
  const safeName = recipientName.trim() || 'Participant';
  const content = [
    'q 0.98 0.99 1 rg 0 0 595.28 841.89 re f Q',
    'q 0.02 0.12 0.24 RG 5 w 34 34 527 774 re S Q',
    'q 0.00 0.78 0.72 RG 1.5 w 48 48 499 746 re S Q',
    'q 0.93 0.97 0.97 rg 125 404 345 74 re f Q',
    'q 0.88 0.95 0.95 rg 112 300 370 28 re f Q',
    'q 0.80 0.92 0.92 rg 176 520 244 1.2 re f Q',
    'q 0.80 0.92 0.92 rg 176 248 244 1.2 re f Q',
    'q 0.87 0.94 0.94 rg 0.95 0 0 0.95 84 326 cm /F2 38 Tf 0 0 Td (NEXIUS ACADEMY) Tj Q',
    '0.02 0.12 0.24 rg',
    centeredPdfText(735, 24, 'CERTIFICATE OF COMPLETION', 'F2'),
    '0.20 0.28 0.36 rg',
    centeredPdfText(684, 13, 'Awarded to'),
    '0.02 0.12 0.24 rg',
    centeredPdfText(646, 28, safeName, 'F2'),
    '0.20 0.28 0.36 rg',
    centeredPdfText(594, 12, `having completed the Agentic AI assessment with a score of ${score}/${total}`),
    centeredPdfText(568, 12, 'and the stated training programme'),
    '0.02 0.12 0.24 rg',
    ...courseLines.map((line, index) => centeredPdfText(506 - index * 22, 16, line, 'F2')),
    '0.20 0.28 0.36 rg',
    pdfText(90, 332, 10, 'COURSE DATES', 'F2'),
    pdfText(90, 306, 12, CERTIFICATE_DETAILS.courseDates),
    pdfText(354, 332, 10, 'TRAINER', 'F2'),
    pdfText(354, 306, 12, CERTIFICATE_DETAILS.trainerName),
    pdfText(90, 258, 10, 'ISSUED ON', 'F2'),
    pdfText(90, 232, 12, issuedOn),
    pdfText(354, 258, 10, 'ISSUED BY', 'F2'),
    pdfText(354, 232, 12, 'Nexius Academy'),
    '0.02 0.12 0.24 rg',
    centeredPdfText(152, 18, CERTIFICATE_DETAILS.trainerName, 'F2'),
    '0.20 0.28 0.36 rg',
    centeredPdfText(132, 10, 'Master Trainer, Nexius Academy'),
    centeredPdfText(112, 9, 'This certificate is generated by Nexius Academy for completion of the stated programme.'),
  ].join('\n');

  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >> endobj',
    '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    '5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj',
    `6 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${offset.toString().padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
};

const downloadCertificate = (recipientName: string, score: number, total: number) => {
  const blob = buildCertificatePdf(recipientName, score, total);
  const url = URL.createObjectURL(blob);
  const filenameName = recipientName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'participant';
  const link = document.createElement('a');
  link.href = url;
  link.download = `nexius-academy-agentic-ai-certificate-${filenameName}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const getResultBand = (score: number) => RESULT_BANDS.find((band) => score >= band.min) ?? RESULT_BANDS[RESULT_BANDS.length - 1];

const AgenticAIQuiz: React.FC<AgenticAIQuizProps> = ({ questions, onLeadClick }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [certificateName, setCertificateName] = useState('');

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
    setCertificateName('');
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
            <div className="mt-6 rounded-2xl border border-primary/10 bg-neutral p-5">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Certificate download</div>
              <h3 className="mt-2 font-heading text-xl font-bold text-primary">Generate your completion certificate</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Enter your name exactly as you want it to appear on the certificate. The PDF will include the course name, course dates, and trainer name.
              </p>
              <label className="mt-4 block text-sm font-bold text-primary" htmlFor="certificate-name">
                Full name for certificate
              </label>
              <input
                id="certificate-name"
                type="text"
                value={certificateName}
                onChange={(event) => setCertificateName(event.target.value)}
                placeholder="e.g. Rachel Tan"
                className="mt-2 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <div className="mt-3 grid gap-1 text-xs text-gray-500 sm:grid-cols-3">
                <span><strong>Course:</strong> Agentic AI Foundations</span>
                <span><strong>Dates:</strong> {CERTIFICATE_DETAILS.courseDates}</span>
                <span><strong>Trainer:</strong> {CERTIFICATE_DETAILS.trainerName}</span>
              </div>
              <button
                type="button"
                disabled={!certificateName.trim()}
                onClick={() => downloadCertificate(certificateName, score, questions.length)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3 font-bold text-primary transition hover:bg-[#22E0D0] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:w-auto"
              >
                <ArrowDownToLine size={18} />
                Download Certificate PDF
              </button>
            </div>
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
