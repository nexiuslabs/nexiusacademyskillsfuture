import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle,
  ClipboardList,
  FileText,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import Instructors from '../components/courses/Instructors';
import { openLeadModal } from '../services/leadModal';
import { trackOutboundClick } from '../services/analytics';

const APPLY_LINK = 'https://stms.polite.edu.sg/cetapi/api/v1/custom/extendauthorize?id_token=rHHqe3GLYxhIYwh82qTpAKuHaXtejYUMXXcX5m42t14MVbIM54f%2BJo2weFWoM7%2Fu';

const proofChips = [
  'Built for accountants, CSPs, and firm owners',
  'No coding required',
  'Human review and governance built in',
  'Use cases across drafting, reporting, and compliance',
  'SkillsFuture-supported',
];

const personas = [
  {
    title: 'Accounting Firm Owners',
    description: 'Need more delivery capacity, stronger margins, and less partner-level review bottleneck.',
    icon: Building2,
  },
  {
    title: 'Audit / Tax / Advisory Leaders',
    description: 'Want better team efficiency, more consistency, and safer adoption across service lines.',
    icon: ShieldCheck,
  },
  {
    title: 'Senior Accountants & Managers',
    description: 'Need faster first drafts, less repetitive admin, and practical tools they can use quickly.',
    icon: Briefcase,
  },
  {
    title: 'Corporate Service Providers',
    description: 'Need higher throughput, cleaner documentation, and more consistent compliance and client-delivery workflows.',
    icon: Users,
  },
];

const outcomes = [
  'Create better first drafts faster',
  'Speed up repetitive reporting work',
  'Improve internal summaries and documentation',
  'Reduce time spent on recurring admin',
  'Apply AI more safely in client-service contexts',
  'Bring back practical workflows your team can adapt immediately after the workshop',
];

const workflows = [
  {
    title: 'Month-end commentary and management summaries',
    description: 'Use AI to produce faster first drafts from financial inputs while managers and partners keep final review and sign-off.',
    icon: FileText,
  },
  {
    title: 'Client update emails and follow-ups',
    description: 'Draft clearer client communications faster while keeping context, judgement, and relationship management with the team.',
    icon: MessageSquare,
  },
  {
    title: 'SOPs, checklists, and internal documentation',
    description: 'Standardise recurring internal documents so teams spend less time rewriting the same materials from scratch.',
    icon: ClipboardList,
  },
  {
    title: 'Recurring admin and compliance support work',
    description: 'Spot repetitive internal tasks that can be handled more consistently with structured prompting and workflow discipline.',
    icon: CheckCircle,
  },
  {
    title: 'Research and information synthesis',
    description: 'Turn policy material, source documents, and internal notes into more usable summaries for delivery teams and client preparation.',
    icon: Sparkles,
  },
  {
    title: 'Reusable prompt workflows',
    description: 'Build repeatable prompting patterns for common firm tasks instead of relying on ad hoc experimentation.',
    icon: Wallet,
  },
];

const ownerReasons = [
  'Reduce low-value repetitive work across the team',
  'Create capacity before increasing headcount',
  'Improve consistency across reporting, drafting, and internal support work',
  'Modernise service delivery without needing technical staff',
  'Help managers and partners spend less time fixing weak first drafts',
];

const governancePoints = [
  'Human-in-the-loop review remains essential',
  'AI should support professional judgement, not replace it',
  'Confidential information must be handled carefully with clear boundaries',
  'Teams should know what AI is appropriate for and what requires human review',
  'Safer adoption comes from structured workflows, not uncontrolled experimentation',
];

const curriculumThemes = [
  'Foundations of practical AI use for professional-services teams',
  'Prompting and structured workflow design',
  'Identifying repetitive task automation opportunities',
  'Review and quality-control habits for safer usage',
  'Applying AI to non-technical accounting, compliance, and client-service workflows',
];

const faqs = [
  {
    question: 'Is this really relevant to accountants and CSPs?',
    answer:
      'Yes. Yes. It is built around real accounting, compliance, drafting, reporting, and client-service workflows.',
  },
  {
    question: 'Is this just generic AI theory?',
    answer:
      'No. It focuses on practical workflows, repeatable prompting habits, and examples teams can use immediately.',
  },
  {
    question: 'Do I need coding or technical knowledge?',
    answer:
      'No. It is designed for non-technical professionals and uses accessible no-code tools.',
  },
  {
    question: 'Is this suitable for firm owners as well as staff?',
    answer:
      'Yes. Owners, managers, and practitioners all benefit — from stronger drafts to better team capacity.',
  },
  {
    question: 'Can I send multiple team members or request a private cohort?',
    answer:
      'Yes. Private cohorts are available for companies with at least 12 SkillsFuture-eligible students, alongside team training and firm capability uplift conversations.',
  },
  {
    question: 'How is confidentiality handled?',
    answer:
      'It teaches governed, human-reviewed usage with clear boundaries and review controls.',
  },
  {
    question: 'Is there a subsidy or support pathway?',
    answer:
      'Yes. Individuals can apply directly, and firms can use the subsidy-fit or team-enquiry path.',
  },
  {
    question: 'Will the workshop be practical enough to use immediately?',
    answer:
      'Yes. The focus is immediate workplace usefulness: reusable workflows and stronger first drafts.',
  },
  {
    question: 'Is this workshop a Verifiable CPE activity?',
    answer:
      'Verifiable learning generally requires relevance to your work, clear learning outcomes, professional competency development, and evidence of participation. Typical supporting documents include a certificate of attendance, invoice or receipt, attendance list, meeting minutes where applicable, or employer endorsement. Refer to ISCA guidance: https://isca.org.sg/membership/member-obligations/verifiable-and-non-verifiable-learning',
  },
];

const AccountantCspLandingPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Agentic AI for Accountants & CSPs | Nexius Academy"
        description="A practical, no-code course page for accountants, corporate service providers, and firm owners who want safer, more useful AI workflows for drafting, reporting, compliance, and client-service work."
        canonical="/courses/agentic-ai-accountants"
        ogType="course"
      />

      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] aspect-square bg-primary rounded-lg flex items-center justify-center text-accent font-bold text-xl leading-none">N</div>
              <span className="font-heading font-bold text-xl text-primary tracking-tight leading-none">
                Nexius<span className="text-accent">Academy</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <a href="#who-for" className="hover:text-accent">Who It’s For</a>
              <a href="#outcomes" className="hover:text-accent">Outcomes</a>
              <a href="#governance" className="hover:text-accent">Governance</a>
              <a href="#faq" className="hover:text-accent">FAQ</a>
            </nav>
            <a
              href={APPLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackOutboundClick({
                  channel: 'skillsfuture',
                  pagePath: '/courses/agentic-ai-accountants',
                  position: 'accountants_nav_apply_now',
                })
              }
              className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-900 transition-colors"
            >
              Apply Now
            </a>
          </div>
        </header>

        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#12306b] to-[#0c1b3f] text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#14b8a6,_transparent_30%),radial-gradient(circle_at_bottom_left,_#60a5fa,_transparent_25%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50 mb-5">
                  <CheckCircle size={16} className="text-accent" />
                  Built for accountants, CSPs, and firm owners
                </div>
                <h1 className="text-4xl lg:text-6xl font-heading font-extrabold leading-tight mb-6 max-w-4xl">
                  Practical AI workflows for accountants and CSP teams
                </h1>
                <p className="text-lg lg:text-xl text-blue-50/90 leading-relaxed mb-6 max-w-3xl">
                  Help your team draft faster, work more consistently, and use AI safely in review-heavy workflows.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold">
                    <CheckCircle size={16} className="text-accent" />
                    Next Class: 06–07 May 2026
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold">
                    <CheckCircle size={16} className="text-accent" />
                    SkillsFuture-supported
                  </span>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-4xl"> 
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4">
                    <div className="text-sm text-blue-100/80 mb-1">Best for</div>
                    <div className="font-semibold">Accounting and CSP teams</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4">
                    <div className="text-sm text-blue-100/80 mb-1">Outcome</div>
                    <div className="font-semibold">Faster drafts, safer adoption</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4">
                    <div className="text-sm text-blue-100/80 mb-1">Approach</div>
                    <div className="font-semibold">No-code, human-reviewed</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mb-8">
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'reserve_seat', {
                        page: '/courses/agentic-ai-accountants',
                        position: 'accountants_hero_apply_now',
                        ctaLabel: 'apply_now',
                        redirectUrl: APPLY_LINK,
                      })
                    }
                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors shadow-xl"
                  >
                    Apply Now <ArrowRight size={18} />
                  </button>
                  <a
                    href="https://wa.me/6589002130?text=Hi%20Wendy%2C%20I%27m%20from%20an%20accounting%20or%20CSP%20team%20and%20want%20to%20enquire%20about%20team%20training."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackOutboundClick({
                        channel: 'whatsapp',
                        pagePath: '/courses/agentic-ai-accountants',
                        position: 'accountants_hero_team_training',
                      })
                    }
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                  >
                    Enquire for Team Training
                  </a>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  {proofChips.map((chip) => (
                    <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-blue-50/95">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-8">
                  <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Why firms choose this workshop</div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Useful AI adoption for drafting, reporting, and compliance</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Built for firms that want practical value, safer usage boundaries, and clearer commercial relevance.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 mb-8">
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />Directly relevant to reporting, compliance, documentation, and client-service workflows</li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />Governance-first framing for confidential, regulated work</li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />Commercially meaningful for owners, managers, and team leads</li>
                  </ul>
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'reserve_seat', {
                        page: '/courses/agentic-ai-accountants',
                        position: 'accountants_hero_card_apply_now',
                        ctaLabel: 'apply_now',
                        redirectUrl: APPLY_LINK,
                      })
                    }
                    className="w-full bg-primary hover:bg-blue-900 text-white px-6 py-4 rounded-xl font-bold transition-colors text-center"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="who-for" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">Who this is for</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                For firms and professionals who want useful workflows and safer AI adoption.
              </p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {personas.map((persona) => (
                <div key={persona.title} className="bg-neutral rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm mb-5">
                    <persona.icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{persona.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{persona.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="outcomes" className="py-20 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">What you’ll be able to do after the workshop</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Bring practical AI workflows back to work quickly, without relying on technical staff.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'reserve_seat', {
                      page: '/courses/agentic-ai-accountants',
                      position: 'accountants_outcomes_cta',
                      ctaLabel: 'check_subsidy_fit',
                    })
                  }
                  className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors"
                >
                  Check Subsidy & Fit
                </button>
              </div>
              <div className="lg:col-span-7 grid md:grid-cols-2 gap-5">
                {outcomes.map((outcome) => (
                  <div key={outcome} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-3">
                    <CheckCircle size={18} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">Example workflows for accounting and CSP teams</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Examples where AI helps with first drafts and synthesis while humans keep review and judgement.
              </p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {workflows.map((workflow) => (
                <div key={workflow.title} className="bg-neutral rounded-2xl p-7 border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm mb-5">
                    <workflow.icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{workflow.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{workflow.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">Why firm owners send teams</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Firm owners care about capacity, consistency, turnaround time, and margin protection.
                </p>
                <ul className="space-y-4">
                  {ownerReasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle size={18} className="text-accent mt-1 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div id="governance" className="lg:col-span-6 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Governance & confidentiality</div>
                <h3 className="text-2xl font-bold text-primary mb-4">Safe, governed usage for professional-services environments</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  AI should support drafting and research while professionals retain judgement and final review.
                </p>
                <ul className="space-y-4">
                  {governancePoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-gray-700">
                      <ShieldCheck size={18} className="text-accent mt-1 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">What the workshop covers</h2>
              <p className="text-blue-50/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                The workshop covers practical AI habits and review discipline for accounting and compliance-heavy environments.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
                {curriculumThemes.map((theme) => (
                  <div key={theme} className="bg-white/10 rounded-xl px-5 py-4 border border-white/10 flex items-start gap-3">
                    <CheckCircle size={18} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-blue-50/95">{theme}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'reserve_seat', {
                      page: '/courses/agentic-ai-accountants',
                      position: 'accountants_midpage_apply_now',
                      ctaLabel: 'apply_now',
                      redirectUrl: APPLY_LINK,
                    })
                  }
                  className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors"
                >
                  Apply Now
                </button>
                <a
                  href="https://wa.me/6589002130?text=Hi%20Wendy%2C%20I%27m%20from%20an%20accounting%20or%20CSP%20team%20and%20want%20to%20enquire%20about%20a%20private%20cohort."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackOutboundClick({
                      channel: 'whatsapp',
                      pagePath: '/courses/agentic-ai-accountants',
                      position: 'accountants_midpage_private_cohort',
                    })
                  }
                  className="border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors text-center"
                >
                  Talk to Us About a Private Cohort (Min. 12 SkillsFuture-Eligible Students)
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">Pricing, funding, and team options</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Choose direct enrolment or a team conversation around private cohorts.
                </p>
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-primary mb-2">Individual path</h3>
                    <p className="text-gray-600 text-sm">Apply now, check subsidy or fit, and confirm the next suitable intake.</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-primary mb-2">Team / private cohort path</h3>
                    <p className="text-gray-600 text-sm">Request a private cohort (minimum 12 SkillsFuture-eligible students), in-house run, or team capability uplift discussion for your firm.</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Next steps</div>
                <h3 className="text-2xl font-bold text-primary mb-4">Choose your next step</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Individuals can check subsidy and fit. Teams can move directly to WhatsApp.
                </p>
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'reserve_seat', {
                        page: '/courses/agentic-ai-accountants',
                        position: 'accountants_offer_check_fit',
                        ctaLabel: 'check_subsidy_fit',
                      })
                    }
                    className="w-full bg-primary hover:bg-blue-900 text-white px-6 py-4 rounded-xl font-bold transition-colors"
                  >
                    Check Subsidy & Fit
                  </button>
                  <a
                    href="https://wa.me/6589002130?text=Hi%20Wendy%2C%20I%27m%20from%20an%20accounting%20or%20CSP%20team%20and%20want%20to%20enquire%20about%20team%20training."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackOutboundClick({
                        channel: 'whatsapp',
                        pagePath: '/courses/agentic-ai-accountants',
                        position: 'accountants_offer_team_training',
                      })
                    }
                    className="w-full border border-primary text-primary px-6 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-colors text-center"
                  >
                    Enquire for Team Training
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Instructors />

        <section id="faq" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">FAQ</h2>
              <p className="text-gray-500">Clear answers to common questions.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="border border-gray-200 rounded-xl p-6 bg-neutral hover:border-primary/20 transition-colors">
                  <h3 className="font-bold text-primary text-lg mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Train your team to use AI safely and practically</h2>
              <p className="text-blue-50/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                For teams that want stronger first drafts, more consistent output, and safer AI usage.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'reserve_seat', {
                      page: '/courses/agentic-ai-accountants',
                      position: 'accountants_final_cta_apply_now',
                      ctaLabel: 'apply_now',
                      redirectUrl: APPLY_LINK,
                    })
                  }
                  className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors"
                >
                  Apply Now
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'advisory_call', {
                      page: '/courses/agentic-ai-accountants',
                      position: 'accountants_final_cta_outline',
                      ctaLabel: 'get_course_outline',
                    })
                  }
                  className="border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                >
                  Get the Course Outline
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AccountantCspLandingPage;
