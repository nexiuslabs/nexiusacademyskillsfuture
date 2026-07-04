import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Building2, CheckCircle, ClipboardList, CreditCard, GitBranch, Layers, Lock, Receipt, ShieldCheck, Users, Wallet } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import AIAnswerBlocks from '../components/courses/AIAnswerBlocks';
import Instructors from '../components/courses/Instructors';
import CourseTestimonials from '../components/courses/CourseTestimonials';
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

const pricingPlans = [
  {
    title: 'Singapore Citizen 40+ / eligible SME-sponsored',
    total: 'S$190.50',
    detail: 'Official payable amount incl. 9% GST',
    note: 'For Singapore Citizens aged 40 and above and eligible SME-sponsored learner categories.',
    highlight: true,
  },
  {
    title: 'Singapore Citizen below 40 / PR / LTVP+',
    total: 'S$490.50',
    detail: 'Official payable amount incl. 9% GST',
    note: 'For Singapore Citizens aged 39 and below, Singapore Permanent Residents, and LTVP+ learners.',
    highlight: false,
  },
  {
    title: 'Full Course Fee',
    total: 'S$1,635.00',
    detail: 'Full fee incl. 9% GST',
    note: 'Published full course fee before applicable SkillsFuture or sponsorship funding.',
    highlight: false,
  },
];

const frontierFeeRows = [
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

const frontierAcceptedPayments = ['SkillsFuture Credits (where applicable)', 'Credit card', 'Debit card', 'PayNow'];

const faqs = [
  {
    question: 'Who should attend this course?',
    answer: 'This programme is suitable for anyone who wants to learn advanced Agentic AI knowledge, including professionals, builders, managers, business owners, educators, consultants, and transformation teams.',
  },
  {
    question: 'What is the main outcome of the programme?',
    answer: 'Participants will learn how to move from isolated AI use cases to coordinated, secure, and scalable agentic workflows through Frontier Firm and Agent Boss frameworks.',
  },
  {
    question: 'Is this a technical builder programme?',
    answer: 'No. The emphasis is on advanced Agentic AI concepts, workflow design, governance, orchestration, and practical implementation planning rather than coding.',
  },
  {
    question: 'What is the course duration and fee?',
    answer: 'The course runs over 3 days. The official payable amounts are S$190.50 for Singaporean aged 40 and above or eligible SME-sponsored learners, S$490.50 for Singaporean aged 39 and below, Singapore Permanent Residents, and LTVP+ learners, and S$1,635.00 for the full course fee. Amounts are inclusive of 9% GST and subject to final eligibility confirmation.',
  },
  {
    question: 'Will participants receive a certificate?',
    answer: 'Participants who meet at least 75% attendance and attempt the assessment will be awarded a Certificate of Completion.',
  },
];

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

      <section className="relative overflow-hidden bg-primary text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: 'url(/images/courses/agentic-ai-business-innovation-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071327]/95 via-[#0b1f44]/85 to-[#071327]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071327]/80 via-transparent to-[#071327]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.35),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(96,165,250,0.22),_transparent_28%)]" />
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

        <section id="fees" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-primary">Course Fees &amp; Funding</h2>
              <p className="mb-2 text-gray-600">
                This is a <span className="font-bold text-primary">3-day advanced Agentic AI course</span> with a full course fee of{' '}
                <span className="font-bold text-primary">S$1,635.00 incl. GST</span>.
              </p>
              <p className="mx-auto mb-3 flex max-w-3xl items-center justify-center gap-2 text-sm font-semibold text-primary">
                <CheckCircle size={16} className="text-accent" />
                Participants who meet at least 75% attendance and attempt the assessment will be awarded a Certificate of Completion.
              </p>
              <p className="font-mono text-xs text-gray-400">
                Agentic AI-Driven Business Innovation for Productivity · Course Ref: TGS-2026063558
              </p>
            </div>

            <div className="mb-10 grid gap-6 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div key={plan.title} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  <div className={`h-2 ${plan.highlight ? 'bg-primary' : plan.title.startsWith('Singapore Citizen below') ? 'bg-accent' : 'bg-slate-400'}`} />
                  <div className="p-7">
                    <div className="mb-3 font-heading text-4xl font-extrabold text-primary">{plan.total}</div>
                    <h3 className="mb-2 text-lg font-bold text-primary">{plan.title}</h3>
                    <p className="text-sm text-gray-600">{plan.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-10 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="rounded-3xl border border-gray-200 bg-neutral p-7">
                <h3 className="mb-2 text-2xl font-bold text-primary">Fee Breakdown</h3>
                <p className="mb-6 text-sm text-gray-600">
                  Amounts below match the official payable amounts and are inclusive of 9% GST.
                </p>

                <div className="space-y-4">
                  {pricingPlans.map((plan) => (
                    <div key={plan.title} className="rounded-2xl border border-gray-200 bg-white px-5 py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-primary">{plan.title}</h4>
                          <p className="mt-1 text-sm text-gray-500">{plan.detail}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold uppercase tracking-wide text-gray-400">Total</div>
                          <div className="font-heading text-xl font-extrabold text-primary">{plan.total}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-primary/10 bg-white p-7 shadow-sm">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Lowest Published Payable</p>
                <div className="mb-3 font-heading text-5xl font-extrabold text-primary">S$190.50</div>
                <h3 className="mb-2 text-xl font-bold text-primary">Singapore Citizen 40+ / eligible SME-sponsored</h3>
                <p className="mb-5 text-sm text-gray-600">
                  Official payable amount inclusive of 9% GST, subject to final learner eligibility and registration confirmation.
                </p>

                <div className="space-y-3 rounded-2xl border border-gray-100 bg-neutral p-5">
                  <div className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-gray-600">Course fee payable incl. GST</span>
                    <span className="font-semibold text-primary">S$190.50</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-gray-600">Full course fee incl. GST</span>
                    <span className="font-semibold text-primary">S$1,635.00</span>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-base font-bold text-primary">Lowest Payable</span>
                    <span className="font-heading text-2xl font-extrabold text-primary">S$190.50</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12 space-y-4">
              <details className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="cursor-pointer list-none text-lg font-bold text-primary">See full fee breakdown</summary>
                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-gray-500">
                        <th className="pb-3 pr-6 font-semibold">Learner Category</th>
                        <th className="pb-3 font-semibold">Course Fee Payable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {frontierFeeRows.map((row) => (
                        <tr key={row.label} className="border-b border-gray-100 last:border-b-0">
                          <td className="py-3 pr-6 text-gray-700">{row.label}</td>
                          <td className="py-3 font-semibold text-primary">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>

              <details className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="cursor-pointer list-none text-lg font-bold text-primary">Payment methods</summary>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-neutral p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                      <Wallet size={18} />
                    </div>
                    <h4 className="mb-2 font-bold text-primary">Payment timing</h4>
                    <p className="text-sm text-gray-600">Payment details will be confirmed during registration.</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-neutral p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                      <CreditCard size={18} />
                    </div>
                    <h4 className="mb-2 font-bold text-primary">Accepted methods</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {frontierAcceptedPayments.map((method) => (
                        <li key={method} className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-accent" />
                          {method}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>

              <details className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="cursor-pointer list-none text-lg font-bold text-primary">Funding and eligibility note</summary>
                <div className="mt-5 rounded-2xl border border-gray-100 bg-neutral p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                    <Receipt size={18} />
                  </div>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-1 text-accent" />
                      <span>Amounts are inclusive of 9% GST and subject to final eligibility, funding approval, and registration confirmation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-1 text-accent" />
                      <span>Official payable amounts are S$190.50, S$490.50, or S$1,635.00 depending on learner category and sponsorship pathway.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-1 text-accent" />
                      <span>For company-sponsored groups, request an advisory call so we can confirm the most suitable registration pathway.</span>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() =>
                  openLeadModal('course_page_cta', 'reserve_seat', {
                    page: '/courses/agentic-ai-business-innovation',
                    position: 'business_innovation_pricing_register_interest',
                    ctaLabel: 'register_interest',
                  })
                }
                className="inline-block w-full rounded-xl bg-primary px-10 py-4 text-center text-lg font-bold text-white shadow-xl shadow-blue-900/20 transition-colors hover:bg-blue-900 sm:w-auto"
              >
                Register Interest
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-8 text-center text-white shadow-2xl lg:p-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold">
                <Users size={16} className="text-accent" /> Agent Boss Programme
              </div>
              <h2 className="mb-4 font-heading text-3xl font-bold lg:text-4xl">Ready to learn advanced Agentic AI?</h2>
              <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-blue-50/90">
                Register interest if you want programme details, intake timing, or an advisory conversation on whether this course fits your learning goals or team needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'reserve_seat', {
                      page: '/courses/agentic-ai-business-innovation',
                      position: 'business_innovation_midpage_register_interest',
                      ctaLabel: 'register_interest',
                    })
                  }
                  className="rounded-xl bg-accent px-8 py-4 font-bold text-white transition-colors hover:bg-teal-500"
                >
                  Register Interest
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'advisory_call', {
                      page: '/courses/agentic-ai-business-innovation',
                      position: 'business_innovation_midpage_advisory',
                      ctaLabel: 'request_advisory_call',
                    })
                  }
                  className="rounded-xl border border-white/30 px-8 py-4 font-bold text-white transition-colors hover:bg-white/10"
                >
                  Request Advisory Call
                </button>
              </div>
            </div>
          </div>
        </section>

        <Instructors />
        <CourseTestimonials />

        <section id="faq" className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-primary">Programme FAQs</h2>
              <p className="text-gray-500">A few quick answers for learners evaluating this course.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-xl border border-gray-200 bg-neutral p-6">
                  <h3 className="mb-2 text-lg font-bold text-primary">{faq.question}</h3>
                  <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  </>
);

export default AgenticAIBusinessInnovationPage;
