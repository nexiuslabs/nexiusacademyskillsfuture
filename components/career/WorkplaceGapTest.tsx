import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, BarChart3, RotateCcw } from "lucide-react";
import { GapAnalysis } from "../../services/actionKitPdf";
import { trackEvent } from "../../services/analytics";

type Capability =
  | "AI task application"
  | "Context and instruction"
  | "Verification and judgment"
  | "Workflow thinking"
  | "Evidence of impact";
type Question = {
  title: string;
  prompt: string;
  capability: Capability;
  options: string[];
};

const questions: Question[] = [
  {
    title: "Framing the work",
    prompt:
      "Your manager asks you to use AI to improve a recurring task. What would you do first?",
    capability: "AI task application",
    options: [
      "Ask AI to complete the entire task.",
      "Choose the most popular AI tool.",
      "Describe the result I want and ask AI for suggestions.",
      "Map the goal, inputs, decisions, risks and expected output before deciding where AI should help.",
    ],
  },
  {
    title: "Giving useful instructions",
    prompt:
      "You need AI to draft a client update from several meeting notes. What would you provide?",
    capability: "Context and instruction",
    options: [
      "“Write a professional client update.”",
      "The meeting notes and desired word count.",
      "The notes, audience, purpose and output format.",
      "The notes, audience, purpose, constraints, source boundaries, format and quality criteria.",
    ],
  },
  {
    title: "Checking accuracy",
    prompt:
      "AI includes a convincing statistic, but you cannot find its source. What would you do?",
    capability: "Verification and judgment",
    options: [
      "Use it because it sounds reasonable.",
      "Ask AI whether it is confident.",
      "Remove the statistic.",
      "Verify it against a reliable original source and document any correction.",
    ],
  },
  {
    title: "Handling sensitive information",
    prompt:
      "You want AI to help summarise a document containing personal or confidential information. What would you do?",
    capability: "Verification and judgment",
    options: [
      "Upload the complete document to the available AI tool.",
      "Remove names but keep the remaining document unchanged.",
      "Use only the minimum necessary information in an approved AI environment.",
      "Check the applicable policy, minimise or anonymise the data, use an approved environment and review the output before use.",
    ],
  },
  {
    title: "Making work repeatable",
    prompt:
      "AI helps you prepare a weekly report. How would you make the process reliable?",
    capability: "Workflow thinking",
    options: [
      "Repeat the conversation from memory every week.",
      "Save the prompt for reuse.",
      "Create a reusable instruction and report template.",
      "Map the steps, inputs, output rules, human review points and exception handling.",
    ],
  },
  {
    title: "Handling failure cases",
    prompt:
      "Your AI process works with normal data but fails when information is missing. What would you do?",
    capability: "Workflow thinking",
    options: [
      "Continue using it and fix problems when they appear.",
      "Add a warning telling users to check the result.",
      "Tell AI what to do when information is missing.",
      "Test normal and unusual cases, define stop conditions and route exceptions to a human.",
    ],
  },
  {
    title: "Showing business value",
    prompt: "Which statement provides the strongest CV evidence?",
    capability: "Evidence of impact",
    options: [
      "“Familiar with ChatGPT.”",
      "“Used AI to improve productivity.”",
      "“Used AI to prepare reports and analyse information.”",
      "“Designed and tested an AI-assisted reporting workflow, verified outputs and retained human approval.”",
    ],
  },
  {
    title: "Building portfolio evidence",
    prompt: "What would make the strongest job-application example?",
    capability: "Evidence of impact",
    options: [
      "Saying that I regularly use AI.",
      "Showing a polished AI-generated output.",
      "Showing the prompt and final output.",
      "Showing the problem, process, AI contribution, verification, human decisions and final outcome.",
    ],
  },
];

const actions: Record<Capability, string> = {
  "AI task application":
    "Map one target-role task into goal, inputs, decisions, risks and output.",
  "Context and instruction":
    "Build one reusable instruction using context, task, constraints, format and criteria.",
  "Verification and judgment":
    "Create a fact, calculation, privacy and human-approval checklist.",
  "Workflow thinking":
    "Map a recurring process with review gates, exceptions and stop conditions.",
  "Evidence of impact":
    "Produce a one-page portfolio case study with process, checks and outcome.",
};
const descriptions: Record<Capability, string> = {
  "AI task application":
    "You can identify where AI should and should not assist a business task.",
  "Context and instruction":
    "You recognise that useful AI output depends on context, constraints and a defined format.",
  "Verification and judgment":
    "Employers need people who check claims, protect sensitive information and remain accountable.",
  "Workflow thinking":
    "Reliable AI-enabled work needs review gates, exceptions, testing and stop conditions.",
  "Evidence of impact":
    "Credible evidence shows the problem, process, checks, human decisions and outcome.",
};
const band = (score: number) =>
  score < 30
    ? "AI Awareness Gap"
    : score < 50
      ? "AI Application Gap"
      : score < 70
        ? "AI Workplace Developing"
        : score < 85
          ? "AI Workplace Ready"
          : "AI Workflow Ready";
const capabilityBand = (score: number) =>
  score <= 33
    ? "Priority gap"
    : score <= 66
      ? "Developing"
      : "Demonstrated judgment";
const shuffle = (length: number) => {
  const values = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
};

export default function WorkplaceGapTest() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [hasOutcomeEvidence, setHasOutcomeEvidence] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [orders, setOrders] = useState(() => questions.map(() => shuffle(4)));
  const analysis = useMemo<GapAnalysis | null>(() => {
    if (!submitted || Object.keys(answers).length !== 8) return null;
    const points = Object.values(answers).reduce((a, b) => a + b, 0);
    const score = Math.round((points / 24) * 100);
    const groups: Record<Capability, number[]> = {
      "AI task application": [],
      "Context and instruction": [],
      "Verification and judgment": [],
      "Workflow thinking": [],
      "Evidence of impact": [],
    };
    questions.forEach((q, i) => groups[q.capability].push(answers[i]));
    const capabilities = (
      Object.entries(groups) as [Capability, number[]][]
    ).map(([name, values]) => ({
      name,
      score: Math.round(
        (values.reduce((a, b) => a + b, 0) / (values.length * 3)) * 100,
      ),
    }));
    const sorted = [...capabilities].sort((a, b) => a.score - b.score);
    const strongest = [...capabilities].sort((a, b) => b.score - a.score)[0];
    return {
      score,
      label: band(score),
      gap: Math.max(0, 70 - score),
      capabilities,
      strongest: strongest.name,
      priorityGaps: [sorted[0].name, sorted[1].name],
      sevenDayChallenge:
        "Choose one task connected to your target role. Create a sanitised AI-assisted work sample and document the business problem, your instructions, what you verified, what you changed and the final outcome.",
      thirtyDayAction: actions[sorted[0].name],
    };
  }, [submitted, answers]);
  useEffect(() => {
    if (analysis)
      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        resultRef.current?.focus({ preventScroll: true });
      });
  }, [analysis]);
  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setStarted(true);
    setOrders(questions.map(() => shuffle(4)));
  };

  return (
    <section id="self-check" className="container-page py-20">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wider text-secondary">
          Free 3-minute diagnostic
        </p>
        <h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">
          How ready are you for AI-enabled business work?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Make eight workplace decisions to uncover your strongest capability,
          most important AI gap and next practical step.
        </p>
        <p className="mt-3 text-gray-600">
          AI literacy is increasingly appearing in technical and non-technical
          job requirements. This test compares your decisions with a practical
          Nexius workplace-readiness rubric—not with other candidates.
        </p>
        {!started && !analysis && (
          <button
            onClick={() => setStarted(true)}
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-white"
          >
            Find my AI workplace gap <ArrowRight size={18} />
          </button>
        )}
        {started && !analysis && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (Object.keys(answers).length === 8) {
                setSubmitted(true);
                trackEvent("workplace_gap_test_completed", {
                  campaign: "career_fair_2026",
                });
              }
            }}
            className="mt-8 space-y-6"
          >
            {questions.map((q, qi) => (
              <fieldset
                key={q.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <legend className="text-xl font-black text-primary">
                  {qi + 1}. {q.title}
                </legend>
                <p className="mt-3 font-semibold">{q.prompt}</p>
                {qi === 6 && (
                  <label className="mt-4 flex gap-3 rounded-lg bg-purple-50 p-3 text-sm">
                    <input
                      type="checkbox"
                      checked={hasOutcomeEvidence}
                      onChange={(e) => setHasOutcomeEvidence(e.target.checked)}
                      className="mt-1 h-4 w-4 accent-secondary"
                    />
                    <span>
                      I have evidence of a measured outcome. (Only include an
                      outcome on your CV when you can support it.)
                    </span>
                  </label>
                )}
                <div className="mt-4 space-y-3">
                  {orders[qi].map((value) => {
                    let text = q.options[value];
                    if (qi === 6 && value === 3 && hasOutcomeEvidence)
                      text =
                        "“Designed and tested an AI-assisted reporting workflow, verified outputs, recorded the evidenced outcome and retained human approval.”";
                    return (
                      <label
                        key={value}
                        className="flex cursor-pointer gap-3 rounded-lg border border-gray-200 p-4 hover:border-secondary"
                      >
                        <input
                          required
                          type="radio"
                          name={`question-${qi}`}
                          checked={answers[qi] === value}
                          onChange={() =>
                            setAnswers((v) => ({ ...v, [qi]: value }))
                          }
                          className="mt-1 h-5 w-5 accent-secondary"
                        />
                        <span>{text}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
            <button
              disabled={Object.keys(answers).length !== 8}
              className="min-h-12 w-full rounded-lg bg-accent px-6 py-3 font-bold text-white disabled:opacity-50"
            >
              See my readiness result
            </button>
          </form>
        )}
        {analysis && (
          <div
            ref={resultRef}
            tabIndex={-1}
            className="mt-8 scroll-mt-28 rounded-2xl bg-white p-6 shadow-xl outline-none md:p-8"
            aria-live="polite"
          >
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">
              {analysis.label}
            </p>
            <h3 className="mt-2 text-3xl font-black text-primary">
              Your AI Workplace Readiness: {analysis.score}/100
            </h3>
            <p className="mt-2 text-gray-600">
              Gap to the workplace-ready benchmark:{" "}
              <strong>{analysis.gap} points</strong>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              70 is a criterion-based Nexius benchmark informed by emerging
              workplace expectations—not an industry average.
            </p>
            <div
              className="mt-7 space-y-4"
              aria-label="Five capability results"
            >
              <h4 className="flex items-center gap-2 text-xl font-black text-primary">
                <BarChart3 /> Capability results
              </h4>
              {analysis.capabilities.map((item) => (
                <div key={item.name}>
                  <div className="mb-1 flex justify-between gap-4 text-sm">
                    <strong>{item.name}</strong>
                    <span>
                      {item.score}/100 · {capabilityBand(item.score)}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-secondary"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl bg-teal-50 p-5">
                <p className="text-sm font-bold uppercase text-secondary">
                  Your strength
                </p>
                <h4 className="mt-1 text-xl font-black text-primary">
                  {analysis.strongest}
                </h4>
                <p className="mt-2 text-sm">
                  {descriptions[analysis.strongest as Capability]}
                </p>
              </div>
              <div className="rounded-xl bg-orange-50 p-5">
                <p className="text-sm font-bold uppercase text-orange-700">
                  Your priority gap
                </p>
                <h4 className="mt-1 text-xl font-black text-primary">
                  {analysis.priorityGaps[0]}
                </h4>
                <p className="mt-2 text-sm">
                  {descriptions[analysis.priorityGaps[0] as Capability]}
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-purple-50 p-5">
              <h4 className="text-xl font-black text-primary">
                Your seven-day challenge
              </h4>
              <p className="mt-2">{analysis.sevenDayChallenge}</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() =>
                  document
                    .getElementById("gap-plan")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="min-h-12 rounded-lg border-2 border-secondary px-5 py-3 font-bold text-primary"
              >
                See my 30-day gap-closing plan
              </button>
              <button
                onClick={reset}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 font-bold text-secondary"
              >
                <RotateCcw size={17} />
                Retake the test
              </button>
            </div>
            <div
              id="gap-plan"
              className="mt-6 rounded-xl border border-purple-100 p-5"
            >
              <h4 className="font-black text-primary">
                Your 30-day gap-closing plan
              </h4>
              <p className="mt-2">{analysis.thirtyDayAction}</p>
            </div>
            <p className="mt-7 border-t pt-5 text-xs leading-5 text-gray-500">
              This is a short, educational diagnostic based on practical
              workplace scenarios. It is not a certified assessment, hiring
              decision, population percentile or prediction of employment
              success. It is informed by changing workplace expectations
              reported in the LinkedIn AI Labor Market Update and World Economic
              Forum Future of Jobs Report 2025.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
