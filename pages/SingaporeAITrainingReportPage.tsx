import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle, FileText, ShieldCheck, Users } from 'lucide-react';
import SEO from '../components/SEO';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';

const findings = [
  {
    title: 'Non-technical teams need workflow skills, not only tool demos',
    body:
      'Many business teams already know how to ask a chatbot for text. The capability gap is turning repeated work into structured instructions, review steps, and reusable AI-assisted workflows.',
    icon: FileText,
  },
  {
    title: 'SMEs need low-friction automation paths',
    body:
      'SMEs often lack dedicated automation teams. No-code AI workflows can help with reporting, lead follow-up, documentation, customer support, and internal coordination when staff receive practical guidance.',
    icon: Users,
  },
  {
    title: 'Governance is now part of AI literacy',
    body:
      'Safe AI adoption requires human review, confidentiality boundaries, data-handling discipline, and clear accountability. This is especially important for finance, accounting, CSP, HR, and client-service environments.',
    icon: ShieldCheck,
  },
  {
    title: 'Course selection should match work context',
    body:
      'A broad generative AI course may be enough for basic literacy, but agentic AI training is more relevant when teams need multi-step execution, workflow design, and productivity systems.',
    icon: BarChart3,
  },
];

const courseFitRows = [
  {
    learner: 'Non-technical professionals',
    need: 'Use AI safely for drafting, synthesis, reporting, and recurring workplace tasks',
    page: '/courses/agentic-ai/',
    anchor: 'Agentic AI Foundations for Non-Technical Professionals',
  },
  {
    learner: 'Accountants and CSP firms',
    need: 'Improve first drafts, documentation, client updates, compliance support, and human-reviewed workflows',
    page: '/courses/agentic-ai-accountants/',
    anchor: 'Agentic AI course for accountants and CSP firms in Singapore',
  },
  {
    learner: 'SME owners and operations teams',
    need: 'Identify and automate repetitive work without hiring a technical automation team',
    page: '/blog/smes-no-code-ai-automation-singapore/',
    anchor: 'No-code AI automation training ideas for Singapore SMEs',
  },
  {
    learner: 'Advanced Agentic AI learners',
    need: 'Understand Frontier Firm strategy, governance, and human-agent operating models',
    page: '/courses/advanced-agentic-ai/',
    anchor: 'Advanced Agentic AI course on Frontier Firm and Agent Boss concepts',
  },
];

const sources = [
  {
    label: 'Singapore National AI Strategy update',
    href: 'https://www.mddi.gov.sg/newsroom/update-to-singapore-s-national-ai-strategy--refreshed-priorities-to-harness-ai-for-the-public-good-factsheet/',
  },
  {
    label: 'SkillsFuture employer initiatives',
    href: 'https://www.skillsfuture.gov.sg/initiatives/employers',
  },
  {
    label: 'SkillsFuture for Digital Workplace',
    href: 'https://www.skillsfuture.gov.sg/initiatives/individuals/skillsfuture-for-digital-workplace',
  },
  {
    label: 'IMDA AI Verify',
    href: 'https://www.imda.gov.sg/how-we-can-help/ai-verify',
  },
];

const SingaporeAITrainingReportPage: React.FC = () => (
  <div className="font-body text-charcoal bg-white min-h-screen flex flex-col">
    <SEO
      title="Singapore AI Training & Readiness Report 2026 | Nexius Academy"
      description="A practical Singapore AI training and readiness report for SMEs, non-technical professionals, accountants, CSP firms, and business leaders evaluating agentic AI skills."
      canonical="/reports/singapore-ai-training-readiness-2026"
      ogType="article"
    />
    <Navbar />

    <main className="flex-grow">
      <section className="bg-primary pt-32 pb-20 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <Link to="/blog/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-100 hover:text-accent">
            <ArrowLeft size={18} />
            Back to resources
          </Link>
          <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">
            Nexius Academy field report
          </div>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Singapore AI Training & Readiness Report 2026
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-blue-50 md:text-xl">
            A practical report for Singapore SMEs, non-technical professionals, accountants, CSP firms, and business leaders evaluating what AI training should cover in 2026.
          </p>
          <p className="mt-6 text-sm text-blue-100">Published 29 May 2026 | Nexius Academy, operated by Nexius Labs</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-gray-100 bg-neutral p-8">
            <h2 className="mb-4 text-2xl font-bold text-primary">Executive summary</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Singapore's AI training market is moving from basic prompt literacy toward practical workflow execution. In 2026, the strongest AI training for business teams is not just about learning individual tools; it is about knowing which work should be assisted by AI, how to design reusable instructions, how to review outputs, and how to protect sensitive information. For SMEs and non-technical teams, the highest-value programmes are hands-on, no-code, and tied to real workplace workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-primary">Four practical findings</h2>
            <p className="mx-auto mt-3 max-w-3xl text-gray-600">
              These findings are based on Nexius Academy's course design work, learner conversations, market review, and public Singapore AI policy context.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {findings.map((finding) => (
              <article key={finding.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <finding.icon size={24} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-primary">{finding.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{finding.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-primary">Which AI training path fits which learner?</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-neutral text-primary">
                <tr>
                  <th className="px-5 py-4 font-bold">Learner profile</th>
                  <th className="px-5 py-4 font-bold">Primary training need</th>
                  <th className="px-5 py-4 font-bold">Relevant Nexius resource</th>
                </tr>
              </thead>
              <tbody>
                {courseFitRows.map((row) => (
                  <tr key={row.learner} className="border-t border-gray-100">
                    <td className="px-5 py-4 font-semibold text-primary">{row.learner}</td>
                    <td className="px-5 py-4 text-gray-700">{row.need}</td>
                    <td className="px-5 py-4">
                      <Link to={row.page} className="font-semibold text-accent hover:underline">
                        {row.anchor}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-neutral py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-primary p-8 text-white md:p-10">
            <h2 className="mb-4 text-3xl font-bold">Recommended AI readiness checklist</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                'List recurring work that happens weekly or monthly.',
                'Separate drafting, synthesis, and coordination tasks from judgement-heavy decisions.',
                'Decide what information cannot be entered into public AI tools.',
                'Define the human reviewer for each AI-assisted workflow.',
                'Create reusable instructions for repeated tasks.',
                'Measure time saved and quality issues after each workflow trial.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-white/10 p-4">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-blue-50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-4 text-3xl font-bold text-primary">Official sources and context</h2>
          <p className="mb-6 text-gray-600">
            This report should be read alongside official Singapore AI and SkillsFuture sources, especially when evaluating funding, employer support, and governance requirements.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-neutral px-5 py-4 text-sm font-semibold text-primary hover:border-accent hover:text-accent"
              >
                <span>{source.label}</span>
                <ArrowRight size={16} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default SingaporeAITrainingReportPage;
