import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Building2, ShieldCheck, Sparkles, Users, CheckCircle, Layers, GitBranch, Lock, ClipboardList, CreditCard, Receipt, Wallet } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import Instructors from '../components/courses/Instructors';
import CourseTestimonials from '../components/courses/CourseTestimonials';
import CourseScheduleSection from '../components/courses/CourseScheduleSection';
import { openLeadModal } from '../services/leadModal';
import ResponsiveImage from '../components/ResponsiveImage';
import AIAnswerBlocks from '../components/courses/AIAnswerBlocks';

const learningObjectives = [
  'Understand advanced Agentic AI concepts using the Frontier Firm model and a structured 3-phase roadmap toward an Agentic Company.',
  'Map multi-agent orchestration across functions such as HR, Finance, Operations, Customer Support, and personal productivity workflows.',
  'Adopt the Agent Boss mindset, where humans supervise, direct, and improve teams of AI assistants for higher-value work.',
  'Design hybrid human-agent workflows with clear roles, accountability, handoffs, and performance expectations.',
  'Apply practical governance, compliance, data, and security controls for safe and responsible Agentic AI use.',
  'Develop an executable Agentic AI action roadmap that can support personal upskilling, team adoption, or enterprise-level transformation planning.',
];

const transformationModules = [
  {
    title: 'Frontier Firm Foundations',
    description: 'Understand how the Frontier Firm concept changes work design, decision-making, and operating models.',
    icon: Building2,
  },
  {
    title: 'Transformation Roadmapping',
    description: 'Build a phased roadmap that moves from isolated AI use cases to coordinated agentic execution.',
    icon: GitBranch,
  },
  {
    title: 'Cross-Functional Agent Orchestration',
    description: 'Design collaboration models where people and agentic systems operate with clear ownership and workflow boundaries.',
    icon: Layers,
  },
  {
    title: 'Agent Boss Operating Model',
    description: 'Define how humans supervise, direct, evaluate, and govern AI agents in real work.',
    icon: Users,
  },
  {
    title: 'Governance, Risk, and Security',
    description: 'Put the right controls in place for responsible use, accountability, and safe scale-up.',
    icon: Lock,
  },
  {
    title: 'Implementation Action Planning',
    description: 'Translate advanced Agentic AI concepts into a practical action plan for adoption, sequencing, and operating discipline.',
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
    answer: 'The course runs over 3 days. The official TP/STMS payable amounts are S$190.50 for Singaporean aged 40 and above or eligible SME-sponsored learners, S$490.50 for Singaporean aged 39 and below, Singapore Permanent Residents, and LTVP+ learners, and S$1,635.00 for the full course fee. Amounts are inclusive of 9% GST and subject to final eligibility confirmation.',
  },
  {
    question: 'Will participants receive a certificate?',
    answer: 'Participants who meet at least 75% attendance and attempt the assessment will be awarded a Certificate of Completion.',
  },
];

const FrontierFirmCoursePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Agentic AI-Driven Innovation | Nexius Academy"
        description="An advanced Agentic AI course for learners who want to understand Frontier Firm strategy, agent orchestration, AI governance, and practical implementation."
        canonical="/courses/advanced-agentic-ai"
        ogType="course"
      />

      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center" aria-label="Nexius Academy home">
              <img
                src="/images/brand/nexius-academy-horizontal.webp"
                alt="Nexius Academy"
                className="h-11 w-auto max-w-[180px] rounded-sm object-contain md:h-12"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <a href="#overview" className="hover:text-accent">Overview</a>
              <a href="#curriculum" className="hover:text-accent">Curriculum</a>
              <a href="#pricing" className="hover:text-accent">Pricing</a>
              <a href="#schedule" className="hover:text-accent">Schedule</a>
              <a href="#instructors" className="hover:text-accent">Instructors</a>
              <a href="#testimonials" className="hover:text-accent">Testimonials</a>
              <a href="#faq" className="hover:text-accent">FAQ</a>
            </nav>
            <button
              type="button"
              onClick={() =>
                openLeadModal('course_page_cta', 'reserve_seat', {
                  page: '/courses/advanced-agentic-ai',
                  position: 'frontier_firm_nav_register_interest',
                  ctaLabel: 'register_interest',
                })
              }
              className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-900 transition-colors"
            >
              Register Interest
            </button>
          </div>
        </header>

        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#12306b] to-[#0c1b3f] text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#14b8a6,_transparent_30%),radial-gradient(circle_at_bottom_left,_#60a5fa,_transparent_25%)]" />
          <div className="absolute inset-y-0 right-0 z-0 hidden w-[58%] opacity-80 mix-blend-screen lg:block">
            <ResponsiveImage
              src="/images/courses/frontier-firm-illustration.jpg"
              alt=""
              aria-hidden="true"
              loading="eager"
              widths={[768, 1200]}
              sizes="58vw"
              fit="cover"
              className="h-full w-full object-cover object-center [mask-image:linear-gradient(to_right,transparent_0%,black_24%,black_100%)]"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold mb-6">
                  <Sparkles size={16} className="text-accent" />
                  Advanced
                </div>
                <h1 className="text-4xl lg:text-6xl font-heading font-extrabold leading-tight mb-6">
                  Agentic AI-Driven Business Innovation for Productivity
                </h1>
                <p className="mb-4 text-lg font-bold uppercase tracking-[0.18em] text-accent">
                  Strategies for the Frontier Firm
                </p>
                <p className="text-lg lg:text-xl text-blue-50/90 leading-relaxed mb-8 max-w-3xl">
                  A practical advanced Agentic AI course for anyone who wants to understand Frontier Firm strategy, agent orchestration, governance, and how human-agent work will operate in the future.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'reserve_seat', {
                        page: '/courses/advanced-agentic-ai',
                        position: 'frontier_firm_hero_register_interest',
                        ctaLabel: 'register_interest',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors shadow-xl"
                  >
                    Register Interest <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'advisory_call', {
                        page: '/courses/advanced-agentic-ai',
                        position: 'frontier_firm_hero_advisory',
                        ctaLabel: 'request_advisory_call',
                      })
                    }
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                  >
                    Request Advisory Call
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-bold mb-1">Designed for</div>
                    <div className="text-blue-50/85">Advanced AI learners</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-bold mb-1">Focus</div>
                    <div className="text-blue-50/85">Agentic AI orchestration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 lg:right-8">
          <div className="flex flex-col items-end">
            <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              In collaboration with
            </span>
            <div className="rounded-lg bg-white px-4 py-2 shadow-sm">
              <img
                src="/images/partners/temasek-poly-logo-transparent.png"
                alt="Temasek Polytechnic collaboration logo"
                className="w-36 sm:w-44 h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 rounded-3xl border border-gray-100 bg-neutral p-8 shadow-sm lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Course Focus</div>
                <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">Master advanced Agentic AI transformation</h2>
                <p className="text-gray-600 leading-relaxed">
                  Build the strategy, operating model, orchestration, and governance knowledge needed to move from scattered AI use cases to coordinated agentic execution.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <CheckCircle size={20} className="text-accent mb-3" />
                  <h3 className="font-bold text-primary mb-2">Transformation Roadmap</h3>
                  <p className="text-sm text-gray-600">Define the phases required to shift toward agentic ways of working.</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <CheckCircle size={20} className="text-accent mb-3" />
                  <h3 className="font-bold text-primary mb-2">Agent Boss Model</h3>
                  <p className="text-sm text-gray-600">Clarify human accountability in hybrid human-agent workflows.</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <CheckCircle size={20} className="text-accent mb-3" />
                  <h3 className="font-bold text-primary mb-2">Enterprise Governance</h3>
                  <p className="text-sm text-gray-600">Set controls for risk, security, supervision, and responsible scale-up.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AIAnswerBlocks
          className="py-16 bg-neutral"
          title="Advanced Agentic AI course summary"
          summary="This section gives AI search systems a short description of the broader learner audience, advanced Agentic AI outcome, and governance context for this course."
          blocks={[
            {
              question: 'What is Agentic AI-Driven Business Innovation for Productivity?',
              answer:
                'Agentic AI-Driven Business Innovation for Productivity is an advanced Agentic AI course for learners who want to move from basic AI tool use to coordinated agentic workflows. It covers Frontier Firm strategy, Agent Boss operating models, cross-functional agent orchestration, governance, risk, and implementation roadmapping.',
            },
            {
              question: 'Who should attend this advanced Agentic AI course?',
              answer:
                'The course is suitable for professionals, builders, managers, educators, consultants, business owners, and curious learners who want advanced Agentic AI knowledge. It is not a coding programme; it focuses on how people structure, supervise, and scale human-agent work across real workflows.',
            },
            {
              question: 'What business outcome does the course support?',
              answer:
                'Participants learn to define practical transformation phases, clarify human accountability, set controls for data and security, and design an action plan for Agentic AI adoption. The intended outcome is a more coordinated, governed, and scalable approach to AI-enabled productivity.',
            },
          ]}
          citationsPlacement="left"
          citations={[
            {
              label: 'Singapore National AI Strategy update',
              href: 'https://www.mddi.gov.sg/newsroom/update-to-singapore-s-national-ai-strategy--refreshed-priorities-to-harness-ai-for-the-public-good-factsheet/',
            },
            {
              label: 'IMDA AI Verify',
              href: 'https://www.imda.gov.sg/how-we-can-help/ai-verify',
            },
            {
              label: 'National AI Impact Programme',
              href: 'https://www.imda.gov.sg/how-we-can-help/techskills-accelerator-tesa/national-ai-impact-programme',
            },
            {
              label: 'SkillsFuture employer initiatives',
              href: 'https://www.skillsfuture.gov.sg/initiatives/employers',
            },
          ]}
        />

        <section id="overview" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">Course Introduction</h2>
              <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p>
                    This programme is suitable for anyone who wants to learn advanced Agentic AI knowledge, including professionals, builders, managers, business owners, educators, consultants, and transformation teams.
                  </p>
                  <p>
                    The programme provides a structured framework for understanding and applying Agentic AI through the Frontier Firm concept. It equips participants with the capability to design advanced human-agent workflows, cross-functional agent orchestration, operating model redesign, and governance for responsible scale-up.
                  </p>
                  <p>
                    A key feature of the programme is the introduction of the Agent Boss concept, where people learn to supervise, direct, and govern agentic AI systems across functions. The programme adopts a practical and implementation-oriented approach to help participants transition from isolated AI use cases to coordinated, secure, and scalable agentic execution.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-neutral rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-primary mb-6">Suitable for</h3>
                  <div className="space-y-5">
                    {[
                      { icon: Briefcase, title: 'Professionals & Managers', desc: 'Wanting to understand advanced Agentic AI workflows and productivity models.' },
                      { icon: Building2, title: 'Builders & Consultants', desc: 'Designing agentic systems, operating models, and adoption roadmaps.' },
                      { icon: Users, title: 'Business Owners & Teams', desc: 'Exploring practical AI adoption, governance, and scale-up decisions.' },
                      { icon: ShieldCheck, title: 'Educators & Curious Learners', desc: 'Building deeper fluency in Frontier Firm, Agent Boss, and AI governance concepts.' },
                    ].map((item, index) => (
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

        <section id="curriculum" className="py-20 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">What participants will learn</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  This programme is designed to help learners move beyond basic AI experimentation and define how agentic workflows can be structured, governed, and implemented across functions.
                </p>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
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
                  {transformationModules.map((module, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border-l-4 border-transparent hover:border-accent shadow-sm hover:shadow-lg transition-all">
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

        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">Course Fees &amp; Funding</h2>
              <p className="text-gray-600 mb-2">
                This is a <span className="font-bold text-primary">3-day advanced Agentic AI course</span> with a full course fee of{' '}
                <span className="font-bold text-primary">S$1,635.00 incl. GST</span>.
              </p>
              <p className="mx-auto mb-3 flex max-w-3xl items-center justify-center gap-2 text-sm font-semibold text-primary">
                <CheckCircle size={16} className="text-accent" />
                Participants who meet at least 75% attendance and attempt the assessment will be awarded a Certificate of Completion.
              </p>
              <p className="text-xs text-gray-400 font-mono">
                Advanced course
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-10">
              {pricingPlans.map((plan) => (
                <div key={plan.title} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  <div className={`h-2 ${plan.highlight ? 'bg-primary' : plan.title.startsWith('Singapore Citizen below') ? 'bg-accent' : 'bg-slate-400'}`} />
                  <div className="p-7">
                    <div className="text-4xl font-heading font-extrabold text-primary mb-3">{plan.total}</div>
                    <h3 className="text-lg font-bold text-primary mb-2">{plan.title}</h3>
                    <p className="text-sm text-gray-600">{plan.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] mb-10">
              <div className="rounded-3xl border border-gray-200 bg-neutral p-7">
                <h3 className="text-2xl font-bold text-primary mb-2">Fee Breakdown</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Amounts below match the official TP/STMS payable amounts and are inclusive of 9% GST.
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
                          <div className="text-xl font-heading font-extrabold text-primary">{plan.total}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-primary/10 bg-white p-7 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-2">Lowest Published Payable</p>
                <div className="text-5xl font-heading font-extrabold text-primary mb-3">S$190.50</div>
                <h3 className="text-xl font-bold text-primary mb-2">Singapore Citizen 40+ / eligible SME-sponsored</h3>
                <p className="text-sm text-gray-600 mb-5">
                  Official TP/STMS payable amount inclusive of 9% GST, subject to final learner eligibility and registration confirmation.
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
                    <span className="text-2xl font-heading font-extrabold text-primary">S$190.50</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-12">
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
                    <h4 className="font-bold text-primary mb-2">Payment timing</h4>
                    <p className="text-sm text-gray-600">Payment details will be confirmed during registration.</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-neutral p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                      <CreditCard size={18} />
                    </div>
                    <h4 className="font-bold text-primary mb-2">Accepted methods</h4>
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
                    page: '/courses/advanced-agentic-ai',
                    position: 'frontier_firm_pricing_register_interest',
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

        <CourseScheduleSection page="/courses/advanced-agentic-ai" positionPrefix="frontier_firm" />

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold mb-6">
                <Users size={16} className="text-accent" /> Agent Boss Programme
              </div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Ready to learn advanced Agentic AI?</h2>
              <p className="text-blue-50/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Register interest if you want programme details, intake timing, or an advisory conversation on whether this course fits your learning goals or team needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'reserve_seat', {
                      page: '/courses/advanced-agentic-ai',
                      position: 'frontier_firm_midpage_register_interest',
                      ctaLabel: 'register_interest',
                    })
                  }
                  className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors"
                >
                  Register Interest
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'advisory_call', {
                      page: '/courses/advanced-agentic-ai',
                      position: 'frontier_firm_midpage_advisory',
                      ctaLabel: 'request_advisory_call',
                    })
                  }
                  className="border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                >
                  Request Advisory Call
                </button>
              </div>
            </div>
          </div>
        </section>

        <Instructors />
        <CourseTestimonials />

        <section id="faq" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">Programme FAQs</h2>
              <p className="text-gray-500">A few quick answers for learners evaluating this course.</p>
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

export default FrontierFirmCoursePage;
