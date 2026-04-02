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

const proofChips = [
  'No coding required',
  'Built for non-technical professionals',
  'Practical workflow training',
  'Suitable for accounting and compliance teams',
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
    description: 'Need higher throughput, cleaner documentation, and more consistent compliance workflows.',
    icon: Users,
  },
];

const outcomes = [
  'Create better first drafts faster',
  'Speed up repetitive reporting work',
  'Improve internal summaries and documentation',
  'Reduce time spent on recurring admin',
  'Apply AI more safely in client-service contexts',
  'Bring back practical workflows your team can adapt immediately',
];

const workflows = [
  {
    title: 'Month-end commentary and management summaries',
    description: 'Turn long financial inputs into clearer first drafts, internal notes, and structured commentary faster.',
    icon: FileText,
  },
  {
    title: 'Client update emails and follow-ups',
    description: 'Generate cleaner client communications while keeping judgement, review, and context with the team.',
    icon: MessageSquare,
  },
  {
    title: 'SOPs, checklists, and internal documentation',
    description: 'Standardise recurring process documentation so teams spend less time reinventing the same materials.',
    icon: ClipboardList,
  },
  {
    title: 'Recurring admin and compliance support work',
    description: 'Identify repetitive internal workflows that can be improved with structured prompting and no-code AI usage.',
    icon: CheckCircle,
  },
  {
    title: 'Research and information synthesis',
    description: 'Summarise policy material, source documents, and internal notes into more usable knowledge for delivery teams.',
    icon: Sparkles,
  },
  {
    title: 'Reusable prompt workflows',
    description: 'Build repeatable prompt patterns for common firm tasks instead of relying on ad hoc experimentation.',
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
      'Yes. This page is positioned specifically around accounting, compliance, drafting, reporting, documentation, and client-service workflows instead of broad SME productivity language.',
  },
  {
    question: 'Is this just generic AI theory?',
    answer:
      'No. The promise is practical workflow application, not abstract AI hype. The workshop is meant to feel immediately usable in a firm environment.',
  },
  {
    question: 'Do I need coding or technical knowledge?',
    answer:
      'No. The workshop is designed for non-technical professionals and uses accessible no-code workflow thinking rather than programming-heavy delivery.',
  },
  {
    question: 'Is this suitable for firm owners as well as staff?',
    answer:
      'Yes. The page is intentionally written for both strategic buyers and operational users, with owner-level value framed around capacity, consistency, and margin protection.',
  },
  {
    question: 'Can I send multiple team members or request a private cohort?',
    answer:
      'Yes. Team training, private cohort, and firm capability uplift conversations should be part of the offer path for this segment.',
  },
  {
    question: 'How is confidentiality handled?',
    answer:
      'The workshop should position AI as governed, reviewed, and human-led. Confidentiality, appropriate usage boundaries, and review controls are core trust messages for this segment.',
  },
  {
    question: 'Is there a subsidy or support pathway?',
    answer:
      'Yes — the page should support a Check Subsidy & Fit path as well as Reserve a Seat and team-enquiry actions.',
  },
  {
    question: 'Will the workshop be practical enough to use immediately?',
    answer:
      'That is the point of the landing page. It should emphasise immediate workplace usefulness, repeatable workflows, and implementation-ready thinking over theory.',
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
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-accent font-bold text-xl">N</div>
              <span className="font-heading font-bold text-xl text-primary tracking-tight">
                Nexius<span className="text-accent">Academy</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <a href="#who-for" className="hover:text-accent">Who It’s For</a>
              <a href="#outcomes" className="hover:text-accent">Outcomes</a>
              <a href="#governance" className="hover:text-accent">Governance</a>
              <a href="#faq" className="hover:text-accent">FAQ</a>
            </nav>
            <button
              type="button"
              onClick={() =>
                openLeadModal('course_page_cta', 'reserve_seat', {
                  page: '/courses/agentic-ai-accountants',
                  position: 'accountants_nav_reserve_seat',
                  ctaLabel: 'reserve_a_seat',
                })
              }
              className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-900 transition-colors"
            >
              Reserve a Seat
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
                  Course Variant · Accounting & CSP Segment
                </div>
                <h1 className="text-4xl lg:text-6xl font-heading font-extrabold leading-tight mb-6">
                  Agentic AI for Accountants & Corporate Service Providers
                </h1>
                <p className="text-lg lg:text-xl text-blue-50/90 leading-relaxed mb-8 max-w-3xl">
                  Learn practical, no-code AI workflows to speed up reporting, drafting, compliance, and client communication — while keeping human judgement and control firmly in place.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'reserve_seat', {
                        page: '/courses/agentic-ai-accountants',
                        position: 'accountants_hero_reserve_seat',
                        ctaLabel: 'reserve_a_seat',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors shadow-xl"
                  >
                    Check Eligibility / Reserve a Seat <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'advisory_call', {
                        page: '/courses/agentic-ai-accountants',
                        position: 'accountants_hero_team_training',
                        ctaLabel: 'enquire_team_training',
                      })
                    }
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                  >
                    Enquire for Team Training
                  </button>
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
                  <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Why this page exists</div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Built for firms that need practical AI, not generic hype</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    This workshop variant is positioned for accountants, CSPs, and firm owners who evaluate AI through workflow relevance, confidentiality, review controls, and owner-level ROI — not vague productivity claims.
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
                        position: 'accountants_hero_card_reserve',
                        ctaLabel: 'reserve_a_seat',
                      })
                    }
                    className="w-full bg-primary hover:bg-blue-900 text-white px-6 py-4 rounded-xl font-bold transition-colors"
                  >
                    Reserve a Seat
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
                This course variant is designed for firms and professionals who care about workflow usefulness, safer adoption, and commercial justification.
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
                  The page should make it obvious that attendees can take practical ideas back into the workplace quickly — without needing technical staff or reckless experimentation.
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
                Relevant, practical examples matter more than broad AI claims for this audience.
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
                  Strategic buyers care about capacity, consistency, responsiveness, and margin protection — not just whether staff find AI interesting.
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
                  This audience needs clear reassurance that AI is being positioned as assistive support, not unsupervised decision-making. Trust is a core conversion requirement here.
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
                The workshop is framed as practical AI enablement for accounting and compliance-heavy professional services — no coding, no fluff, and no exaggerated automation claims.
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
                      position: 'accountants_midpage_reserve_seat',
                      ctaLabel: 'reserve_a_seat',
                    })
                  }
                  className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors"
                >
                  Reserve a Seat
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'advisory_call', {
                      page: '/courses/agentic-ai-accountants',
                      position: 'accountants_midpage_private_cohort',
                      ctaLabel: 'private_cohort',
                    })
                  }
                  className="border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                >
                  Talk to Us About a Private Cohort
                </button>
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
                  This page should support both individual enrolment and owner-led team conversations. Commercial framing should focus on recovered time, faster drafting, improved consistency, and more scalable delivery.
                </p>
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-primary mb-2">Individual path</h3>
                    <p className="text-gray-600 text-sm">Reserve a seat, check subsidy or fit, and confirm the next suitable intake.</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-primary mb-2">Team / private cohort path</h3>
                    <p className="text-gray-600 text-sm">Request a private cohort, in-house run, or team capability uplift discussion for your firm.</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Offer design</div>
                <h3 className="text-2xl font-bold text-primary mb-4">Clear next steps for both individuals and firms</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Not every visitor is ready for a hard-sell purchase flow immediately. This segment often needs a lower-friction path to assess relevance, subsidy fit, and team applicability.
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
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'advisory_call', {
                        page: '/courses/agentic-ai-accountants',
                        position: 'accountants_offer_team_training',
                        ctaLabel: 'team_training',
                      })
                    }
                    className="w-full border border-primary text-primary px-6 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-colors"
                  >
                    Enquire for Team Training
                  </button>
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
              <p className="text-gray-500">Clear answers for the most likely accountant and CSP objections.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="border border-gray-200 rounded-xl p-6 bg-neutral">
                  <h3 className="font-bold text-primary text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Practical, governed AI workflows for accounting and compliance professionals</h2>
              <p className="text-blue-50/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                The sharper commercial angle is not “AI for everyone.” It’s practical, governed AI workflows that help accounting and compliance teams save time, improve consistency, and modernise safely.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'reserve_seat', {
                      page: '/courses/agentic-ai-accountants',
                      position: 'accountants_final_cta_reserve',
                      ctaLabel: 'reserve_a_seat',
                    })
                  }
                  className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors"
                >
                  Reserve a Seat
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
