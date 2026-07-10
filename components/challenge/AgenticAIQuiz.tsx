import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle, Printer, RotateCcw, Trophy, XCircle } from 'lucide-react';

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
  onQuizActiveChange?: (isActive: boolean) => void;
};

type CertificateDetails = {
  recipientName: string;
  courseName: string;
  courseDates: string[];
  trainerName: string;
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
  courseDates: ['07 Oct 2026', '08 Oct 2026', '15 Oct 2026'],
  trainerName: 'Melverick Ng',
};

const escapeHtml = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[–—]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildCertificatePrintHtml = (details: CertificateDetails) => {
  const safeName = escapeHtml(details.recipientName.trim() || 'Participant');
  const safeCourseName = escapeHtml(details.courseName.trim() || CERTIFICATE_DETAILS.courseName);
  const safeTrainerName = escapeHtml(details.trainerName.trim() || CERTIFICATE_DETAILS.trainerName);
  const dateLines = (details.courseDates.length ? details.courseDates : ['Date to be confirmed']).slice(0, 4).map(escapeHtml);
  const coursePeriod = dateLines.join('<br />');
  const assetBase = window.location.origin;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Certificate of Completion - ${safeName}</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; }
    body {
      background: #f7f6f1;
      color: #172033;
      font-family: Arial, Helvetica, sans-serif;
    }
    .screen-actions { padding: 16px; text-align: center; }
    .screen-actions button {
      border: 0;
      border-radius: 14px;
      background: #b98b2d;
      color: #fff;
      cursor: pointer;
      font-weight: 800;
      padding: 12px 18px;
    }
    .sheet {
      width: 210mm;
      height: 297mm;
      margin: 0 auto;
      padding: 12.5mm;
      background: #fffdf8;
    }
    .certificate {
      position: relative;
      width: 100%;
      height: 100%;
      border: 0.55mm solid #1c2635;
      background: #fffdf8;
      overflow: hidden;
      text-align: center;
    }
    .certificate::before {
      content: '';
      position: absolute;
      inset: 3.2mm;
      border: 0.26mm solid #b98b2d;
      pointer-events: none;
      z-index: 1;
    }
    .logo {
      position: absolute;
      top: 16mm;
      right: 10mm;
      width: 52mm;
      height: auto;
      z-index: 2;
    }
    .title {
      position: absolute;
      top: 74mm;
      left: 0;
      right: 0;
      z-index: 2;
      color: #151d2c;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 24pt;
      font-weight: 600;
      letter-spacing: 0.055em;
      line-height: 1.08;
      text-transform: uppercase;
    }
    .title-rule {
      position: absolute;
      display: none;
      z-index: 2;
    }
    .awarded {
      position: absolute;
      top: 104mm;
      left: 0;
      right: 0;
      z-index: 2;
      color: #647084;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 13pt;
      font-style: italic;
    }
    .recipient {
      position: absolute;
      top: 118mm;
      left: 18mm;
      right: 18mm;
      z-index: 2;
      color: #173a63;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 25pt;
      font-style: italic;
      font-weight: 700;
      line-height: 1.12;
    }
    .course-panel {
      position: absolute;
      top: 139mm;
      left: 50%;
      width: 154mm;
      height: 35mm;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateX(-50%);
      text-align: center;
      padding: 6.5mm 9mm;
      border-top: 0.28mm solid #8a94a3;
      border-bottom: 0.28mm solid #8a94a3;
      background: transparent;
      overflow: hidden;
    }

    .course-title {
      position: relative;
      z-index: 2;
      color: #151d2c;
      max-width: 100%;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 14.8pt;
      font-weight: 700;
      letter-spacing: 0.035em;
      line-height: 1.32;
      text-align: center;
      text-transform: uppercase;
    }
    .info-box {
      position: absolute;
      top: 184mm;
      left: 50%;
      width: 142mm;
      min-height: 23mm;
      z-index: 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      transform: translateX(-50%);
      text-align: center;
      border: 0.55mm solid #1c2635;
      background: transparent;
    }
    .info-cell {
      min-height: 22mm;
      padding: 4.4mm 4mm 3.6mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .info-cell + .info-cell { border-left: 0.55mm solid #1c2635; }
    .info-label {
      margin-bottom: 3.2mm;
      color: #647084;
      font-size: 8.2pt;
      font-weight: 700;
      letter-spacing: 0.13em;
      text-transform: uppercase;
    }
    .info-value {
      color: #172033;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 11.4pt;
      font-style: italic;
      font-weight: 700;
      line-height: 1.34;
    }
    .signature-block {
      position: absolute;
      top: 224mm;
      left: 112mm;
      width: 54mm;
      z-index: 2;
      color: #172033;
      text-align: center;
      font-family: Georgia, 'Times New Roman', serif;
    }
    .signature-image {
      display: block;
      width: 36mm;
      height: auto;
      margin: 0 auto -1mm;
    }
    .signature-line {
      width: 48mm;
      margin: 0 auto 2.4mm;
      border-top: 0.35mm solid #1c2635;
    }
    .signatory-name { margin: 0 0 1mm; font-size: 11.4pt; font-weight: 700; }
    .signatory-title, .signatory-company { margin: 0.7mm 0; font-size: 10.2pt; }
    .footer-note {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 4mm;
      z-index: 2;
      color: #526071;
      font-size: 8.2pt;
    }
    @media print {
      body { background: #fff; }
      .screen-actions { display: none; }
      .sheet { margin: 0; }
    }
  </style>
</head>
<body>
  <div class="screen-actions"><button onclick="window.print()">Save / Print as PDF</button></div>
  <main class="sheet">
    <section class="certificate" aria-label="Certificate of completion">
      <img class="logo" src="${assetBase}/images/certificate/nexius-labs-logo.png" alt="Nexius Labs" />
      <h1 class="title">Certificate of Completion</h1>
      <div class="title-rule"></div>
      <div class="awarded">Awarded to</div>
      <div class="recipient">${safeName}</div>
      <section class="course-panel">
        <div class="course-title">${safeCourseName}</div>
      </section>
      <section class="info-box">
        <div class="info-cell">
          <div class="info-label">Course Period</div>
          <div class="info-value">${coursePeriod}</div>
        </div>
        <div class="info-cell">
          <div class="info-label">Issued By</div>
          <div class="info-value">Nexius Academy</div>
        </div>
      </section>
      <section class="signature-block">
        <img class="signature-image" src="${assetBase}/images/certificate/melverick-signature.png" alt="Melverick signature" />
        <div class="signature-line"></div>
        <p class="signatory-name">${safeTrainerName}</p>
        <p class="signatory-title">Director</p>
        <p class="signatory-company">Nexius Labs Pte Ltd</p>
      </section>
      <p class="footer-note">This certificate is issued by Nexius Academy for completion of the stated programme.</p>
    </section>
  </main>
  <script>window.addEventListener('load', () => setTimeout(() => window.print(), 250));</script>
</body>
</html>`;
};

const openCertificatePrintWindow = (details: CertificateDetails) => {
  const certificateWindow = window.open('', '_blank');

  if (!certificateWindow) {
    window.print();
    return;
  }

  certificateWindow.document.open();
  certificateWindow.document.write(buildCertificatePrintHtml(details));
  certificateWindow.document.close();
  certificateWindow.focus();
};

const getResultBand = (score: number) => RESULT_BANDS.find((band) => score >= band.min) ?? RESULT_BANDS[RESULT_BANDS.length - 1];

const AgenticAIQuiz: React.FC<AgenticAIQuizProps> = ({ questions, onLeadClick, onQuizActiveChange }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [certificateName, setCertificateName] = useState('');
  const [certificateCourseName, setCertificateCourseName] = useState(CERTIFICATE_DETAILS.courseName);
  const [certificateDates, setCertificateDates] = useState(CERTIFICATE_DETAILS.courseDates.join('\n'));
  const [certificateTrainerName, setCertificateTrainerName] = useState(CERTIFICATE_DETAILS.trainerName);

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
    onQuizActiveChange?.(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setCertificateName('');
    setCertificateCourseName(CERTIFICATE_DETAILS.courseName);
    setCertificateDates(CERTIFICATE_DETAILS.courseDates.join('\n'));
    setCertificateTrainerName(CERTIFICATE_DETAILS.trainerName);
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
    const certificateDateEntries = certificateDates
      .split(/\n|,/)
      .map((date) => date.trim())
      .filter(Boolean);
    const canDownloadCertificate =
      certificateName.trim() && certificateCourseName.trim() && certificateDateEntries.length > 0 && certificateTrainerName.trim();

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
                Enter the learner name, course name, course dates, and trainer name exactly as they should appear. The button opens the browser print dialog; choose “Save as PDF” to avoid antivirus blocking a generated download.
              </p>
              <div className="mt-4 grid gap-3">
                <label className="block text-sm font-bold text-primary" htmlFor="certificate-name">
                  Learner name
                  <input
                    id="certificate-name"
                    type="text"
                    value={certificateName}
                    onChange={(event) => setCertificateName(event.target.value)}
                    placeholder="e.g. Rachel Tan"
                    className="mt-2 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 font-normal text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </label>
                <label className="block text-sm font-bold text-primary" htmlFor="certificate-course">
                  Course name
                  <input
                    id="certificate-course"
                    type="text"
                    value={certificateCourseName}
                    onChange={(event) => setCertificateCourseName(event.target.value)}
                    placeholder="Course name"
                    className="mt-2 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 font-normal text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </label>
                <label className="block text-sm font-bold text-primary" htmlFor="certificate-dates">
                  Course dates <span className="font-normal text-gray-500">(one date per line)</span>
                  <textarea
                    id="certificate-dates"
                    value={certificateDates}
                    onChange={(event) => setCertificateDates(event.target.value)}
                    placeholder="07 Oct 2026\n08 Oct 2026\n15 Oct 2026"
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 font-normal text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </label>
                <label className="block text-sm font-bold text-primary" htmlFor="certificate-trainer">
                  Trainer name
                  <input
                    id="certificate-trainer"
                    type="text"
                    value={certificateTrainerName}
                    onChange={(event) => setCertificateTrainerName(event.target.value)}
                    placeholder="e.g. Melverick Ng"
                    className="mt-2 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 font-normal text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </label>
              </div>
              <button
                type="button"
                disabled={!canDownloadCertificate}
                onClick={() =>
                  openCertificatePrintWindow(
                    {
                      recipientName: certificateName,
                      courseName: certificateCourseName,
                      courseDates: certificateDateEntries,
                      trainerName: certificateTrainerName,
                    },
                  )
                }
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3 font-bold text-primary transition hover:bg-[#22E0D0] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:w-auto"
              >
                <Printer size={18} />
                Save Certificate as PDF
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
