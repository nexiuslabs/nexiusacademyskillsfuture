import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Building2, CheckCircle, ClipboardList, CreditCard, GitBranch, Layers, Lock, Receipt, ShieldCheck, Users } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import AIAnswerBlocks from '../components/courses/AIAnswerBlocks';
import { openLeadModal } from '../services/leadModal';

const tpCourseUrl = 'https://www.tp.edu.sg/schools-and-courses/adult-learners/all-courses/short-courses/agentic-ai-driven-business-innovation-for-productivity--strategies-for-the-frontier-firm.html';
const stmsUrl = 'https://stms.polite.edu.sg/student/ihlcourse/detail/63b27e4c-e2ec-47f3-baeb-caff5fbaa641';

const attendItems = [
  'SME Owners and Founders',
  'Business Managers and C-Suite Executives',
  'Entrepreneurs and Intrapreneurs',
];

const learnItems = [
  {
    title: 'Drive Organizational Transformation',
    text: 'Understand and implement the Frontier Firm concept using a structured 3-phase roadmap to transform a traditional organization into a fully integrated Agentic Company.',
    icon: Building2,
  },
  {
    title: 'Master Multi-Department Agent Orchestration',
    text: 'Move beyond individual AI productivity to design and orchestrate complex AI agent systems operating across Human Resource, Finance, Operations, and other departments.',
    icon: Layers,
  },
  {
    title: 'Adopt the Agent Boss Paradigm Shift',
    text: 'Facilitate the mindset change required for business leaders to manage a hybrid workforce, where every human employee becomes an Agent Boss managing a team of AI assistants.',
    icon: Users,
  },
  {
    title: 'Manage the New Hybrid Workforce',
    text: 'Acquire the executive leadership skills required to evaluate, lead, and manage teams of human Agent Bosses at scale.',
    icon: GitBranch,
  },
  {
    title: 'Establish Enterprise-Grade Governance and Security',
    text: 'Develop data foundations, compliance protocols, and structural security frameworks for safe company-wide agentic system deployment.',
    icon: Lock,
  },
  {
    title: 'Develop an Executable Transformation Roadmap',
    text: 'Walk away with a Digital Innovation Transformation Roadmap structured to support enterprise-level grant applications such as the Enterprise Development Grant.',
    icon: ClipboardList,
  },
];

const feeRows = [
  { label: 'Full course fee', value: 'S$1,635.00' },
  { label: 'Singaporean aged 40 & above', value: 'S$190.50' },
  { label: 'SME-sponsored LTVP+', value: 'S$190.50' },
  { label: 'SME-sponsored Singaporean aged 39 & below', value: 'S$190.50' },
  { label: 'SME-sponsored Singaporean aged 40 & above', value: 'S$190.50' },
  { label: 'SME-sponsored Singapore Permanent Resident', value: 'S$190.50' },
  { label: 'Long Term Visit Pass+ (LTVP+)', value: 'S$490.50' },
  { label: 'Singaporean aged 39 & below', value: 'S$490.50' },
  { label: 'Singapore Permanent Resident', value: 'S$490.50' },
];

const paymentMethods = ['SkillsFuture Credits, where applicable', 'Credit card', 'Debit card', 'PayNow'];

const AgenticAIBusinessInnovationPage: React.FC = () => (
  <>
    <SEO
      title="Agentic AI Business Innovation Course | Nexius Academy"
      description="Agentic AI-Driven Business Innovation for Productivity: Strategies for the Frontier Firm, including overview, audience, outcomes, certification, fees, and application guidance."
      canonical="/courses/agentic-ai-business-innovation"
      ogType="course"
    />

    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-accent">N</div>
            <span className="font-heading text-xl font-bold tracking-tight text-primary">
              Nexius<span className="text-accent">Academy</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
            <a href="#overview" className="hover:text-accent">Overview</a>
            <a href="#audience" className="hover:text-accent">Audience</a>
            <a href="#learn" className="hover:text-accent">What You'll Learn</a>
            <a href="#fees" className="hover:text-accent">Fees</a>
            <a href="#contact" className="hover:text-accent">Contact</a>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-bold text-white transition-colors hover:bg-blue-900"
          >
            Enquire <ArrowRight size={16} />
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#12306b] to-[#0c1b3f] text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#14b8a6,_transparent_30%),radial-gradient(circle_at_bottom_left,_#60a5fa,_transparent_25%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
              <ShieldCheck size={16} className="text-accent" />
              Course information · TGS-2026063558
            </div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">SkillsFuture Series</p>
            <h1 className="mb-6 font-heading text-4xl font-extrabold leading-tight lg:text-6xl">
              Agentic AI-Driven Business Innovation for Productivity: Strategies for the Frontier Firm
            </h1>
            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-blue-50/90 lg:text-xl">
              This page summarises the course overview, target audience, learning outcomes, certification requirement, fees, and enquiry path for learners evaluating advanced Agentic AI training.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 font-bold text-white shadow-xl transition-colors hover:bg-teal-500"
              >
                Register Interest <ArrowRight size={18} />
              </a>
              <button
                type="button"
                onClick={() =>
                  openLeadModal('course_page_cta', 'advisory_call', {
                    page: '/courses/agentic-ai-business-innovation',
                    position: 'agentic_ai_business_innovation_advisory',
                    ctaLabel: 'ask_nexius_about_course',
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 font-bold text-white transition-colors hover:bg-white/10"
              >
                Ask Nexius About This Course <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <AIAnswerBlocks
        className="bg-neutral py-16"
        title="Advanced Agentic AI course summary"
        summary="This AI-readable section summarises the course positioning, intended learner audience, Frontier Firm transformation outcome, and official source links."
        citationsPlacement="left"
        blocks={[
          {
            question: 'What is Agentic AI-Driven Business Innovation for Productivity?',
            answer:
              'It is an executive course that addresses the productivity paradox and teaches business leaders how to restructure an organisation into an Agentic Company using the Frontier Firm concept and a proprietary 3-phase roadmap for company-wide transformation.',
          },
          {
            question: 'Who should attend this advanced Agentic AI course?',
            answer:
              'The course is suitable for SME owners and founders, business managers and C-suite executives, entrepreneurs, intrapreneurs, and professionals who want advanced Agentic AI knowledge for organisation-wide productivity.',
          },
          {
            question: 'What outcome does the course support?',
            answer:
              'Participants are equipped to lead enterprise-wide AI adoption, orchestrate multi-department agent systems, manage human Agent Bosses at scale, establish enterprise-grade governance and security, and develop an executable Digital Innovation Transformation Roadmap.',
          },
        ]}
        citations={[
          { label: 'Official TP course page', href: tpCourseUrl },
          { label: 'Official TP/STMS application page', href: stmsUrl },
        ]}
      />

      <main>
        <section id="overview" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Course Overview</p>
                <h2 className="mb-6 font-heading text-3xl font-bold text-primary lg:text-4xl">Course positioning</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>
                    Many firms suffer from the “Productivity Paradox,” in which they invest more in technology but earn less per employee. While basic AI courses teach learners how to use tools for daily tasks, this executive course flips the script.
                  </p>
                  <p>
                    The course teaches business leaders how to fundamentally restructure their entire organization into an “Agentic Company”. Through the exclusive “Frontier Firm” concept, participants learn a proprietary 3-phase roadmap for company-wide organizational transformation.
                  </p>
                  <p>
                    Participants will build a strategic business model that adapts to the digital future and re-architects how the human workforce and AI systems operate together to dominate the market.
                  </p>
                </div>
              </div>
              <aside className="rounded-3xl border border-gray-100 bg-neutral p-8 lg:col-span-5">
                <h3 className="mb-6 text-2xl font-bold text-primary">Course facts</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span><strong>TGS reference:</strong> TGS-2026063558</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span><strong>Series:</strong> SkillsFuture Series</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span><strong>Duration:</strong> 3 days</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span><strong>Certification:</strong> Participants who meet at least 75% of the required course attendance and attempt the assessment will be awarded the Certificate of Completion.</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="audience" className="bg-neutral py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Who Should Attend</p>
              <h2 className="font-heading text-3xl font-bold text-primary lg:text-4xl">Who should attend</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {attendItems.map((item) => (
                <div key={item} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <Users size={24} className="mb-4 text-accent" />
                  <h3 className="text-lg font-bold text-primary">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="learn" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-4xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">What You'll Learn</p>
              <h2 className="mb-4 font-heading text-3xl font-bold text-primary lg:text-4xl">Enterprise-wide AI adoption outcomes</h2>
              <p className="text-lg leading-relaxed text-gray-600">
                By the end of this intensive program, participants will be equipped to lead enterprise-wide AI adoption and turn productivity gaps into scalable growth opportunities.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {learnItems.map((item) => (
                <article key={item.title} className="rounded-2xl border border-gray-100 bg-neutral p-6">
                  <item.icon size={24} className="mb-4 text-accent" />
                  <h3 className="mb-3 text-lg font-bold text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="fees" className="bg-neutral py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Course Fee / Schedule / Apply</p>
                <h2 className="mb-5 font-heading text-3xl font-bold text-primary lg:text-4xl">Course fee amounts</h2>
                <p className="mb-6 text-gray-600">
                  The fee amounts below are inclusive of 9% GST and subject to final funding eligibility and registration confirmation.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_fee_section', 'advisory_call', {
                      page: '/courses/agentic-ai-business-innovation',
                      position: 'fee_schedule_enquiry',
                      ctaLabel: 'ask_about_fees_and_schedule',
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-blue-900"
                >
                  Ask about fees and schedule <ArrowRight size={18} />
                </button>
              </div>
              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                  {feeRows.map((row, index) => (
                    <div key={row.label} className={`flex items-center justify-between gap-4 px-6 py-4 text-sm ${index !== feeRows.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <span className="font-medium text-gray-700">{row.label}</span>
                      <span className="shrink-0 font-bold text-primary">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <CreditCard size={22} className="mb-3 text-accent" />
                    <h3 className="mb-3 font-bold text-primary">Accepted payment methods</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {paymentMethods.map((method) => <li key={method}>• {method}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <Receipt size={22} className="mb-3 text-accent" />
                    <h3 className="mb-3 font-bold text-primary">Refund note</h3>
                    <p className="text-sm leading-relaxed text-gray-700">Confirm the latest refund policy, schedule, and registration details during application or enquiry.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-8 text-white lg:p-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Course Enquiry</p>
                  <h2 className="mb-4 font-heading text-3xl font-bold lg:text-4xl">Ask Nexius Academy about this course</h2>
                  <p className="max-w-2xl text-blue-50/90">
                    Share your learner profile, company sponsorship context, and preferred training timeline so the team can guide you on next steps.
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:col-span-4">
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_contact_section', 'advisory_call', {
                        page: '/courses/agentic-ai-business-innovation',
                        position: 'course_enquiry',
                        ctaLabel: 'ask_nexius_about_course',
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-bold text-white transition-colors hover:bg-teal-500"
                  >
                    Register Interest <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  </>
);

export default AgenticAIBusinessInnovationPage;
