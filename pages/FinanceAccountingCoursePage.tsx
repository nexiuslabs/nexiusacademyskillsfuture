import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Building2,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle,
  Database,
  FileSearch,
  Receipt,
  BarChart3,
  Calculator,
  Shield,
} from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import Instructors from '../components/courses/Instructors';
import { openLeadModal } from '../services/leadModal';

const learningObjectives = [
  'Explain how agentic AI differs from generative AI in finance workflows, with emphasis on accuracy, controls, and oversight.',
  'Design autonomous financial workflows that reduce manual spreadsheet work while maintaining human review checkpoints.',
  'Apply Agentic RAG patterns to query accounting standards, tax rules, and internal SOPs for faster decision support.',
  'Build multi-step reconciliation workflows that cross-check invoices, ledger entries, and payment data for discrepancies.',
  'Connect agents to structured finance systems such as SQL databases, spreadsheets, and accounting platforms.',
  'Use structured outputs, JSON schemas, and SQL thinking to improve determinism and auditability in AI-assisted processes.',
  'Evaluate security, privacy, data residency, and PII masking requirements in finance and accounting environments.',
  'Prototype an AI finance assistant for reporting, categorisation, reconciliation, or management insight generation.',
];

const modules = [
  {
    title: '01 · Foundations for Finance AI',
    description:
      'Move from general AI awareness to finance-specific judgement: hallucination risk, precision, explainability, and control design in accounting contexts.',
    icon: Calculator,
  },
  {
    title: '02 · Agentic RAG for Standards & Policy',
    description:
      'Build a digital standards library using IFRS, tax codes, SOPs, and policy documents so teams can retrieve grounded guidance quickly.',
    icon: FileSearch,
  },
  {
    title: '03 · The Reconciliation Engine',
    description:
      'Design multi-step workflows that verify vendor records, invoice data, ledger entries, and payment records before flagging exceptions.',
    icon: Receipt,
  },
  {
    title: '04 · ERP, SQL & Spreadsheet Integration',
    description:
      'Connect agents to finance data sources including SQL databases, Excel files, and accounting APIs such as Xero or QuickBooks.',
    icon: Database,
  },
  {
    title: '05 · Build Your AI Finance Assistant',
    description:
      'Prototype a practical assistant for P&L insight generation, automated expense categorisation, exception review, or monthly reporting support.',
    icon: BarChart3,
  },
  {
    title: '06 · Security, Privacy & Audit Trails',
    description:
      'Implement structured outputs, approval checkpoints, masking patterns, and governance controls suited for financial data handling.',
    icon: Shield,
  },
];

const useCases = [
  {
    title: 'The Agentic Auditor',
    description:
      'Design agents that cross-reference invoices against bank statements and automatically flag discrepancies for human review.',
  },
  {
    title: 'Autonomous Financial Reporting',
    description:
      'Build workflows that pull ERP data, perform trend analysis, and draft monthly management reports with structured output.',
  },
  {
    title: 'Tax & Compliance Research',
    description:
      'Use Agentic RAG to query local tax rules or Financial Reporting Standards and provide grounded guidance on complex transactions.',
  },
  {
    title: 'AR/AP Automation',
    description:
      'Create intelligent agents that analyse payment history, predict cash flow gaps, and support collections or payables prioritisation.',
  },
];

const audience = [
  {
    title: 'CPAs & Chartered Accountants',
    desc: 'Professionals looking to transition into more strategic Digital CFO or finance transformation roles.',
    icon: Briefcase,
  },
  {
    title: 'Finance Operations Managers',
    desc: 'SME finance teams tired of manual spreadsheet manipulation, repetitive reconciliations, and fragmented reporting.',
    icon: Users,
  },
  {
    title: 'Audit & Assurance Teams',
    desc: 'Firms that want to accelerate sampling, verification, exception detection, and evidence gathering.',
    icon: ShieldCheck,
  },
  {
    title: 'Business & Transformation Leaders',
    desc: 'Leaders responsible for finance modernisation, operational control, and productivity improvement across functions.',
    icon: Building2,
  },
];

const faqs = [
  {
    question: 'Is this course suitable for non-coders in finance?',
    answer:
      'Yes. The core Nexius Workflow remains no-code/low-code, but the use cases, labs, and governance framing are adapted for finance and accounting teams.',
  },
  {
    question: 'Will this focus on compliance and accuracy, not just productivity?',
    answer:
      'Yes. The page is intentionally framed around financial precision, hallucination management, auditability, privacy controls, and reconciliation logic.',
  },
  {
    question: 'What kind of prototype will participants build?',
    answer:
      'Participants will work toward an AI finance assistant concept such as P&L insight generation, automated categorisation, or reconciliation support.',
  },
  {
    question: 'Can this support accounting firms as well as in-house finance teams?',
    answer:
      'Yes. The use cases include audit verification, standards lookup, AR/AP workflows, and finance operations inside SMEs or professional firms.',
  },
];

const FinanceAccountingCoursePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Agentic AI for Finance & Accounting | Automating Precision Workflows | Nexius Academy"
        description="A finance-focused agentic AI course for accountants, finance leaders, and operations teams who want to automate reconciliation, reporting, standards lookup, and precision workflows."
        canonical="/courses/agentic-ai-finance-accounting"
        ogType="website"
      />

      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-accent font-bold text-xl">N</div>
              <span className="font-heading font-bold text-xl text-primary tracking-tight">
                Nexius<span className="text-accent">Academy</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <a href="#overview" className="hover:text-accent">Overview</a>
              <a href="#use-cases" className="hover:text-accent">Use Cases</a>
              <a href="#curriculum" className="hover:text-accent">Curriculum</a>
              <a href="#instructors" className="hover:text-accent">Instructors</a>
            </nav>
            <button
              type="button"
              onClick={() =>
                openLeadModal('course_page_cta', 'reserve_seat', {
                  page: '/courses/agentic-ai-finance-accounting',
                  position: 'finance_course_nav_waitlist',
                  ctaLabel: 'join_waitlist',
                })
              }
              className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-900 transition-colors"
            >
              Join Waitlist
            </button>
          </div>
        </header>

        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#12306b] to-[#0c1b3f] text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#14b8a6,_transparent_30%),radial-gradient(circle_at_bottom_left,_#60a5fa,_transparent_25%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold mb-6">
                  <Sparkles size={16} className="text-accent" />
                  New Vertical · Finance & Accounting
                </div>
                <h1 className="text-4xl lg:text-6xl font-heading font-extrabold leading-tight mb-6">
                  Agentic AI for Finance &amp; Accounting: Automating Precision Workflows
                </h1>
                <p className="text-lg lg:text-xl text-blue-50/90 leading-relaxed mb-8 max-w-3xl">
                  Learn how to build autonomous financial workflows — from reconciliation and reporting to standards lookup and compliance support — so finance teams can shift from manual data entry to agentic oversight.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'reserve_seat', {
                        page: '/courses/agentic-ai-finance-accounting',
                        position: 'finance_course_hero_waitlist',
                        ctaLabel: 'join_waitlist',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors shadow-xl"
                  >
                    Join Waitlist <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'advisory_call', {
                        page: '/courses/agentic-ai-finance-accounting',
                        position: 'finance_course_hero_advisory',
                        ctaLabel: 'request_advisory_call',
                      })
                    }
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                  >
                    Request Advisory Call
                  </button>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-bold mb-1">Outcome</div>
                    <div className="text-blue-50/85">Build autonomous financial workflows</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-bold mb-1">Focus</div>
                    <div className="text-blue-50/85">Accuracy, compliance, reconciliation</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-bold mb-1">Messaging angle</div>
                    <div className="text-blue-50/85">Reduce month-end effort with agentic oversight</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-8">
                  <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Waitlist</div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Build AI for finance without turning it into a black box</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    This version reframes the core Nexius methodology for financial accuracy, compliance, structured outputs, and multi-step verification workflows.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 mb-8">
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />From manual entry to agentic oversight</li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />JSON, SQL, and structured outputs for deterministic workflows</li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />Security, privacy, and PII masking built into the framing</li>
                  </ul>
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'reserve_seat', {
                        page: '/courses/agentic-ai-finance-accounting',
                        position: 'finance_course_waitlist_card',
                        ctaLabel: 'join_waitlist',
                      })
                    }
                    className="w-full bg-primary hover:bg-blue-900 text-white px-6 py-4 rounded-xl font-bold transition-colors"
                  >
                    Join Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">Why this vertical matters</h2>
              <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p>
                    The same no-code/low-code + agentic thinking stack can be applied to finance and accounting, but the framing must change. Here, the goal is not generic productivity. It is financial accuracy, compliance confidence, structured multi-step verification, and faster decision support with stronger controls.
                  </p>
                  <p>
                    Instead of general AI examples, this page is focused on precision work: reconciliations, management reporting, tax and standards lookup, AR/AP intelligence, and audit-friendly workflows that keep humans in the loop.
                  </p>
                  <p>
                    The outcome is not “build a cool AI agent.” The outcome is the ability to build autonomous financial workflows that reduce manual spreadsheet dependency while preserving audit trails, privacy boundaries, and accountable review checkpoints.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-neutral rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-primary mb-6">Who this is for</h3>
                  <div className="space-y-5">
                    {audience.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                          <item.icon size={22} />
                        </div>
                        <div>
                          <div className="font-bold text-primary">{item.title}</div>
                          <div className="text-sm text-gray-600">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="use-cases" className="py-20 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">Industry-specific use cases</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                These are the high-value scenarios that should replace generic AI examples when speaking to finance and accounting teams.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="curriculum" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">Refined syllabus for finance & accounting</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  The technical stack remains the same, but the labs are rewritten around financial workflows, ERP data, reconciliation, standards lookup, and deterministic outputs.
                </p>
                <div className="bg-neutral p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold text-primary mb-4">Learning objectives</h3>
                  <ul className="space-y-4">
                    {learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                        <CheckCircle size={18} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid sm:grid-cols-2 gap-6">
                  {modules.map((module, index) => (
                    <div key={index} className="bg-neutral p-6 rounded-2xl border-l-4 border-transparent hover:border-accent shadow-sm hover:shadow-lg transition-all">
                      <div className="text-accent mb-4">
                        <module.icon size={24} />
                      </div>
                      <h3 className="font-bold text-primary text-lg mb-2">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">The Nexius Lab edge for finance teams</h2>
                  <p className="text-blue-50/90 leading-relaxed mb-6">
                    Because finance needs determinism, not creativity, the methodology should emphasise structured outputs, JSON schemas, SQL logic, and explicit audit trails. This is also where privacy controls, data residency considerations, and PII masking become part of the design conversation.
                  </p>
                  <ul className="space-y-3 text-sm text-blue-50/90">
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />Structured outputs for repeatable, inspectable workflow results</li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />SQL and schema thinking for reconciliation, control, and reporting pipelines</li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />Privacy, PII masking, and secure data handling for finance-grade implementations</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-2xl p-8 border border-white/10">
                  <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Outcome-led messaging</div>
                  <h3 className="text-2xl font-bold mb-4">Suggested LinkedIn angle</h3>
                  <p className="text-blue-50/90 leading-relaxed mb-6">
                    Replace “build AI agents” with clear operational outcomes, for example:
                  </p>
                  <div className="bg-white/10 rounded-xl p-5 font-semibold text-white leading-relaxed">
                    “Reduce month-end closing time by 70% with autonomous agents that reconcile, verify, and draft finance reports under human oversight.”
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Instructors />

        <section id="faq" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">Programme FAQs</h2>
              <p className="text-gray-500">Draft answers for the finance/accounting vertical version.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 bg-neutral">
                  <h3 className="font-bold text-primary text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default FinanceAccountingCoursePage;
