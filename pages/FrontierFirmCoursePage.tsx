import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Building2, ShieldCheck, Sparkles, Users, CheckCircle, Layers, GitBranch, Lock, ClipboardList, CreditCard, Receipt, Wallet } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import Instructors from '../components/courses/Instructors';
import CourseTestimonials from '../components/courses/CourseTestimonials';
import { openLeadModal } from '../services/leadModal';
import ResponsiveImage from '../components/ResponsiveImage';

const learningObjectives = [
  'Drive organisational transformation using the Frontier Firm concept and a structured 3-phase roadmap toward an Agentic Company.',
  'Design multi-department agent orchestration across functions such as HR, Finance, Operations, and Customer Support.',
  'Adopt the Agent Boss mindset shift, where human employees supervise and direct teams of AI assistants.',
  'Lead and manage hybrid human-agent teams at scale with clear roles, accountability, and performance expectations.',
  'Establish enterprise-grade governance, compliance, data, and security controls for safe company-wide AI deployment.',
  'Develop an executable Digital Innovation Transformation Roadmap that can support enterprise-level transformation planning and grant applications.',
];

const transformationModules = [
  {
    title: 'Frontier Firm Strategy',
    description: 'Understand how the Frontier Firm concept changes enterprise structure, decision-making, and operating models.',
    icon: Building2,
  },
  {
    title: 'Transformation Roadmapping',
    description: 'Build a phased roadmap that moves the organisation from isolated AI pilots to coordinated enterprise execution.',
    icon: GitBranch,
  },
  {
    title: 'Cross-Functional Agent Orchestration',
    description: 'Design collaboration models across departments where agentic systems operate with clear ownership and workflow boundaries.',
    icon: Layers,
  },
  {
    title: 'Agent Boss Leadership Model',
    description: 'Define how human leaders supervise, direct, and govern AI agents and teams of human Agent Bosses.',
    icon: Users,
  },
  {
    title: 'Governance, Risk, and Security',
    description: 'Put the right controls in place for enterprise-wide deployment, accountability, and safe scale-up.',
    icon: Lock,
  },
  {
    title: 'Implementation Action Planning',
    description: 'Translate strategy into a practical enterprise action plan for adoption, sequencing, and operating discipline.',
    icon: ClipboardList,
  },
];

const pricingPlans = [
  {
    title: 'Singapore Citizen 40+',
    fee: 'S$150',
    gst: 'S$94.50',
    total: 'S$244.50',
    note: 'Enhanced subsidy pathway for Singapore Citizens aged 40 and above.',
    highlight: true,
  },
  {
    title: 'Below 40',
    fee: 'S$450',
    gst: 'S$94.50',
    total: 'S$544.50',
    note: 'Subsidised payable fee for eligible learners below 40 years old.',
    highlight: false,
  },
  {
    title: 'Full Course Fee',
    fee: 'S$1,500',
    gst: 'TBC',
    total: 'S$1,500',
    note: 'Published course fee before applicable funding and final registration confirmation.',
    highlight: false,
  },
];

const frontierFeeRows = [
  { label: 'Full course fee', value: 'S$1,500' },
  { label: 'Singapore Citizen aged 40 & above', value: 'S$244.50' },
  { label: 'Below 40', value: 'S$544.50' },
];

const frontierAcceptedPayments = ['SkillsFuture Credits (where applicable)', 'Credit card', 'Debit card', 'PayNow'];

const faqs = [
  {
    question: 'Who should attend this course?',
    answer: 'This programme is intended for business managers, organisational leaders, and business owners responsible for enterprise strategy, transformation, and operational performance.',
  },
  {
    question: 'What is the main outcome of the programme?',
    answer: 'Participants will learn how to move from isolated AI use cases to coordinated, secure, and scalable enterprise execution through Frontier Firm and Agent Boss frameworks.',
  },
  {
    question: 'Is this a technical builder programme?',
    answer: 'No. The emphasis is on enterprise leadership, operating model redesign, governance, and practical implementation planning rather than coding.',
  },
  {
    question: 'What is the course duration and fee?',
    answer: 'The course runs over 3 days. The full course fee is S$1,500. Singapore Citizens aged 40 and above pay S$150 plus S$94.50 GST, while learners below 40 pay S$450 plus S$94.50 GST, subject to final eligibility confirmation.',
  },
];

const FrontierFirmCoursePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Agentic AI-Driven Innovation | Nexius Academy"
        description="A leadership course for managers and owners designing agentic enterprise transformation, orchestration, and AI governance."
        canonical="/courses/frontier-firm-agent-boss"
        ogType="course"
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
              <a href="#curriculum" className="hover:text-accent">Curriculum</a>
              <a href="#pricing" className="hover:text-accent">Pricing</a>
              <a href="#instructors" className="hover:text-accent">Instructors</a>
              <a href="#testimonials" className="hover:text-accent">Testimonials</a>
              <a href="#faq" className="hover:text-accent">FAQ</a>
            </nav>
            <button
              type="button"
              onClick={() =>
                openLeadModal('course_page_cta', 'reserve_seat', {
                  page: '/courses/frontier-firm-agent-boss',
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
                  TGS-2026063558
                </div>
                <h1 className="text-4xl lg:text-6xl font-heading font-extrabold leading-tight mb-6">
                  Agentic AI-Driven Business Innovation for Productivity
                </h1>
                <p className="mb-4 text-lg font-bold uppercase tracking-[0.18em] text-accent">
                  Strategies for the Frontier Firm
                </p>
                <p className="text-lg lg:text-xl text-blue-50/90 leading-relaxed mb-8 max-w-3xl">
                  A practical leadership course for business managers, organisational leaders, and business owners responsible for enterprise strategy, transformation, and operational performance.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'reserve_seat', {
                        page: '/courses/frontier-firm-agent-boss',
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
                        page: '/courses/frontier-firm-agent-boss',
                        position: 'frontier_firm_hero_advisory',
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
                    <div className="font-bold mb-1">Designed for</div>
                    <div className="text-blue-50/85">Business leaders & owners</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-bold mb-1">Focus</div>
                    <div className="text-blue-50/85">Agentic enterprise transformation</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-bold mb-1">Duration</div>
                    <div className="text-blue-50/85">3 days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 rounded-3xl border border-gray-100 bg-neutral p-8 shadow-sm lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Course Focus</div>
                <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">Lead agentic enterprise transformation</h2>
                <p className="text-gray-600 leading-relaxed">
                  Build the strategic, operating model, and governance capabilities needed to move from scattered AI pilots to coordinated enterprise execution.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <CheckCircle size={20} className="text-accent mb-3" />
                  <h3 className="font-bold text-primary mb-2">Transformation Roadmap</h3>
                  <p className="text-sm text-gray-600">Define the phases required to shift toward an agentic operating model.</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <CheckCircle size={20} className="text-accent mb-3" />
                  <h3 className="font-bold text-primary mb-2">Agent Boss Model</h3>
                  <p className="text-sm text-gray-600">Clarify human accountability in hybrid human-agent teams.</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <CheckCircle size={20} className="text-accent mb-3" />
                  <h3 className="font-bold text-primary mb-2">Enterprise Governance</h3>
                  <p className="text-sm text-gray-600">Set controls for risk, security, supervision, and scalable deployment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    This programme is intended for business managers, organisational leaders, and business owners who are responsible for enterprise strategy, transformation, and operational performance.
                  </p>
                  <p>
                    The programme provides a structured framework for transforming organisations into agentic enterprises through the Frontier Firm concept. It equips participants with the capability to design and lead organisation-wide transformation, including cross-functional agent orchestration, leadership operating model redesign, and enterprise governance for large-scale deployment.
                  </p>
                  <p>
                    A key feature of the programme is the introduction of the Agent Boss concept, where human employees are developed to supervise, direct, and govern agentic AI systems across functions. The programme adopts a practical and implementation-oriented approach to enable participants to transition from isolated AI use cases to coordinated, secure, and scalable enterprise execution.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-neutral rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-primary mb-6">Ideal for</h3>
                  <div className="space-y-5">
                    {[
                      { icon: Briefcase, title: 'Business Managers', desc: 'Responsible for transformation, performance, and implementation outcomes.' },
                      { icon: Building2, title: 'Organisational Leaders', desc: 'Driving operating model redesign and enterprise coordination.' },
                      { icon: Users, title: 'Business Owners', desc: 'Leading strategic adoption, governance, and scale-up decisions.' },
                      { icon: ShieldCheck, title: 'Transformation Sponsors', desc: 'Balancing innovation, security, accountability, and execution discipline.' },
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
                  This programme is designed to help leaders move beyond experimentation and define how an agentic enterprise can be structured, governed, and implemented across functions.
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
                This is a <span className="font-bold text-primary">3-day leadership course</span> with a full course fee of{' '}
                <span className="font-bold text-primary">S$1,500</span>.
              </p>
              <p className="text-xs text-gray-400 font-mono">
                Agentic AI-Driven Business Innovation for Productivity · Course Ref: TGS-2026063558
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-10">
              {pricingPlans.map((plan) => (
                <div key={plan.title} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  <div className={`h-2 ${plan.highlight ? 'bg-primary' : plan.title === 'Below 40' ? 'bg-accent' : 'bg-slate-400'}`} />
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
                  The GST amount is shown separately based on the figures provided for this new course.
                </p>

                <div className="space-y-4">
                  {pricingPlans.map((plan) => (
                    <div key={plan.title} className="rounded-2xl border border-gray-200 bg-white px-5 py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-primary">{plan.title}</h4>
                          <p className="mt-1 text-sm text-gray-500">{plan.fee} course fee + {plan.gst} GST</p>
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
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-2">Estimated Payable</p>
                <div className="text-5xl font-heading font-extrabold text-primary mb-3">S$244.50</div>
                <h3 className="text-xl font-bold text-primary mb-2">Singapore Citizen 40+</h3>
                <p className="text-sm text-gray-600 mb-5">
                  Enhanced pathway estimate for Singapore Citizens aged 40 and above, subject to eligibility confirmation.
                </p>

                <div className="space-y-3 rounded-2xl border border-gray-100 bg-neutral p-5">
                  <div className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-gray-600">Course fee payable</span>
                    <span className="font-semibold text-primary">S$150.00</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-gray-600">GST</span>
                    <span className="font-semibold text-primary">S$94.50</span>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-base font-bold text-primary">Course Fee Payable</span>
                    <span className="text-2xl font-heading font-extrabold text-primary">S$244.50</span>
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
                      <span>Final payable amount is subject to learner eligibility, funding approval, and registration confirmation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-1 text-accent" />
                      <span>GST is shown separately using the S$94.50 amount provided for this course.</span>
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
                    page: '/courses/frontier-firm-agent-boss',
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

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold mb-6">
                <Users size={16} className="text-accent" /> Agent Boss Programme
              </div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Planning enterprise-wide AI transformation?</h2>
              <p className="text-blue-50/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Register interest if you want programme details, intake timing, or an advisory conversation on whether this course fits your leadership team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'reserve_seat', {
                      page: '/courses/frontier-firm-agent-boss',
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
                      page: '/courses/frontier-firm-agent-boss',
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
              <p className="text-gray-500">A few quick answers for leaders evaluating this course.</p>
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
