import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CalendarRange,
  CheckCircle,
  FileLock2,
  GraduationCap,
  MapPinned,
  MessagesSquare,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import Instructors from '../components/courses/Instructors';
import { openLeadModal } from '../services/leadModal';
import { trackOutboundClick } from '../services/analytics';

const PAGE_PATH = '/courses/agentic-ai-company-class';

const benefitCards = [
  {
    title: 'Focus on real use cases',
    description: 'Examples, exercises, and workflows can be built around the exact work your teams already do.',
    icon: Target,
  },
  {
    title: 'Solve real pain points',
    description: 'Instructors help teams structure practical AI workflows around bottlenecks, repetitive work, and review-heavy tasks.',
    icon: Wrench,
  },
  {
    title: 'Privacy for internal sharing',
    description: 'Sensitive workflows can be discussed in a closed company setting instead of a public mixed cohort.',
    icon: FileLock2,
  },
  {
    title: 'Stronger governance alignment',
    description: 'Leaders can set clear boundaries for approved use, review controls, and escalation rules from day one.',
    icon: ShieldCheck,
  },
];

const fitSignals = [
  {
    title: 'One aligned internal cohort',
    description: 'Useful when managers, team leads, and frontline staff need a shared vocabulary and standard for AI usage.',
  },
  {
    title: 'Non-technical adoption',
    description: 'Built for business teams that want practical no-code workflows instead of technical retraining.',
  },
  {
    title: 'Operational relevance',
    description: 'Better when the class should reflect your documentation, reporting, review loops, and service workflows.',
  },
];

const comparisonRows = [
  {
    label: 'Examples used in class',
    publicClass: 'General examples designed for mixed learners',
    privateClass: 'Can be anchored around your own business processes',
  },
  {
    label: 'Room to discuss internal workflows',
    publicClass: 'Usually limited because the cohort is mixed',
    privateClass: 'Stronger because the discussion stays within your own company setting',
  },
  {
    label: 'Schedule flexibility',
    publicClass: 'Fixed to public intake dates',
    privateClass: 'Planned around your team availability and operations',
  },
  {
    label: 'Adoption after training',
    publicClass: 'Often depends on individuals driving change back internally',
    privateClass: 'Easier to align on next steps across the full team at once',
  },
];

const idealFor = [
  'Operations, finance, HR, compliance, service, and support teams with repetitive workflows',
  'Departments that need practical AI adoption without coding or technical retraining',
  'Companies that want a safer, more private environment for discussing internal processes',
  'Leadership teams that want one aligned rollout instead of sending individuals separately',
];

const useCases = [
  {
    team: 'Operations and admin',
    outcome: 'Reduce repetitive drafting, handoffs, and routine updates.',
  },
  {
    team: 'Finance and compliance',
    outcome: 'Improve review-heavy work, documentation quality, and process consistency.',
  },
  {
    team: 'HR and people teams',
    outcome: 'Speed up internal communication, policy support, and recurring coordination tasks.',
  },
  {
    team: 'Sales and service',
    outcome: 'Shorten response prep, follow-up drafting, and customer-facing workflow execution.',
  },
];

const deliveryPoints = [
  {
    step: '01',
    title: 'Align on team profile',
    description: 'We clarify your team mix, business context, and where AI should create useful leverage first.',
  },
  {
    step: '02',
    title: 'Shape the delivery setup',
    description: 'We plan the most suitable format around class size, venue preference, and scheduling constraints.',
  },
  {
    step: '03',
    title: 'Run the private workshop',
    description: 'Your team learns together in a dedicated company setting with space for practical discussion.',
  },
  {
    step: '04',
    title: 'Turn training into action',
    description: 'The session ends with clearer next steps so adoption does not stall after the class.',
  },
];

const pricingCards = [
  {
    title: 'Minimum Class Size',
    value: '12 pax',
    description: 'Private runs are designed for a single company cohort with at least 12 participants.',
  },
  {
    title: 'Pricing Approach',
    value: 'Custom quote',
    description: 'Pricing depends on learner profile, venue, schedule preference, and delivery scope.',
  },
  {
    title: 'Delivery Format',
    value: 'Onsite or venue',
    description: 'Choose your office, an external venue, or discuss the most suitable setup with us.',
  },
];

const pricingFactors = [
  'Number of participants and whether you plan a single cohort or multiple runs',
  'Eligible learner profile and funding pathway discussion where applicable',
  'Preferred venue, room setup, and delivery logistics',
  'Schedule preference for weekdays, split sessions, or concentrated runs',
  'Whether you want stronger tailoring around specific internal workflows',
];

const proposalChecklist = [
  'Approximate team size and which functions are attending',
  'Your preferred timing window or internal scheduling constraints',
  'Whether you want delivery at your office or another venue',
  'Any important workflows, pain points, or governance concerns to keep in view',
];

const faqs = [
  {
    question: 'Who is this private class for?',
    answer:
      'It is for companies that want to train one internal team or multiple departments together in a dedicated cohort instead of joining a public class.',
  },
  {
    question: 'What is the minimum class size?',
    answer: 'The minimum class size is 12 pax for a dedicated company run.',
  },
  {
    question: 'Can the workshop focus on our real internal workflows?',
    answer:
      "Yes. The company-run format is specifically designed to make the workshop more relevant to your team's actual use cases, recurring tasks, and process pain points.",
  },
  {
    question: 'Can you run the training at our office?',
    answer:
      'Yes. We can discuss delivery at your own office or at an external venue depending on privacy, convenience, and room setup.',
  },
  {
    question: 'Is this suitable for non-technical teams?',
    answer:
      'Yes. The course is designed for non-technical professionals and focuses on practical workflow use, not coding.',
  },
  {
    question: 'How is pricing handled for a company class?',
    answer:
      'We prepare a custom quotation based on your team size, learner profile, venue preference, and scheduling requirements.',
  },
  {
    question: 'Can leaders and frontline staff attend together?',
    answer:
      'Yes. In many cases that works well because it helps the organisation align on use cases, governance, and realistic implementation steps.',
  },
  {
    question: 'What if we have fewer than 12 pax?',
    answer:
      'You can still contact us. We can advise whether a public intake, a later internal run, or a combined team option makes more sense.',
  },
];

const openProposalModal = (position: string) =>
  openLeadModal('course_page_cta', 'advisory_call', {
    page: PAGE_PATH,
    position,
    ctaLabel: 'request_company_proposal',
  });

const CorporateClassLandingPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Dedicated Company AI Class | Nexius Academy"
        description="Private company-run Agentic AI training for teams of 12 pax or more. Tailor the workshop to real workflows, train in a private setting, and align teams on practical AI adoption."
        canonical="/private-class"
        robots="noindex,follow"
        ogType="course"
      />

      <div className="min-h-screen bg-neutral">
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-accent">
                N
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-primary">
                Nexius<span className="text-accent">Academy</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
              <a href="#comparison" className="transition-colors hover:text-accent">Why private</a>
              <a href="#benefits" className="transition-colors hover:text-accent">Benefits</a>
              <a href="#how-it-works" className="transition-colors hover:text-accent">How it works</a>
              <a href="#pricing" className="transition-colors hover:text-accent">Pricing</a>
              <a href="#faq" className="transition-colors hover:text-accent">FAQ</a>
            </nav>

            <button
              type="button"
              onClick={() => openProposalModal('corporate_nav_request_proposal')}
              className="rounded-lg bg-primary px-5 py-2.5 font-bold text-white transition-colors hover:bg-blue-900"
            >
              Request Proposal
            </button>
          </div>
        </header>

        <section className="relative overflow-hidden bg-neutral text-primary">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(29,42,77,0.06),_transparent_26%),radial-gradient(circle_at_86%_14%,_rgba(0,202,186,0.12),_transparent_16%)]" />
          <div className="absolute left-0 top-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
            <div className="lg:col-span-7 lg:pr-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                <Building2 size={16} className="text-accent" />
                Dedicated company class for teams of 12 pax and above
              </div>

              <h1 className="mb-6 max-w-4xl font-heading text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
                Train your team on AI in a format built for real company work
              </h1>
              <p className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 lg:text-xl">
                Instead of sending staff into a general public intake, run the course as a private company cohort shaped around your workflows, decision-making context, and internal operating constraints.
              </p>

              <div className="mb-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-primary/10 bg-white px-4 py-4 shadow-sm">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Best for</div>
                  <div className="font-semibold">One company, one aligned cohort</div>
                </div>
                <div className="rounded-3xl border border-primary/10 bg-white px-4 py-4 shadow-sm">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Minimum size</div>
                  <div className="font-semibold">12 pax</div>
                </div>
                <div className="rounded-3xl border border-primary/10 bg-white px-4 py-4 shadow-sm">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Delivery</div>
                  <div className="font-semibold">Office or external venue</div>
                </div>
              </div>

              <div className="mb-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => openProposalModal('corporate_hero_request_proposal')}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 font-bold text-white shadow-lg transition-colors hover:bg-teal-500"
                >
                  Request Proposal <ArrowRight size={18} />
                </button>
                <a
                  href="https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%20want%20to%20explore%20a%20dedicated%20company%20class%20for%20our%20team%20of%2012%2B."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackOutboundClick({
                      channel: 'whatsapp',
                      pagePath: PAGE_PATH,
                      position: 'corporate_hero_whatsapp',
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white px-8 py-4 font-bold text-primary transition-colors hover:bg-primary/5"
                >
                  Talk on WhatsApp
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  'Tailored to your workflows',
                  'Private company-only setting',
                  'Flexible scheduling',
                  'Non-technical friendly',
                ].map((chip) => (
                  <div key={chip} className="rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                    {chip}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[2.4rem] border border-primary/10 bg-white p-8 text-gray-900 shadow-[0_24px_70px_rgba(29,42,77,0.12)] lg:rotate-[-3deg]">
                <div className="absolute inset-x-0 top-0 h-1 bg-accent" />
                <div className="absolute -left-6 top-16 h-24 w-24 rounded-[2rem] border border-primary/6 bg-neutral" />
                <div className="absolute right-6 top-24 hidden h-28 w-28 rounded-[2rem] border border-primary/6 bg-neutral lg:block" />

                <div className="mb-6">
                  <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Why companies choose this format</div>
                  <h2 className="mb-3 text-2xl font-bold text-primary">Less generic theory. More internal relevance.</h2>
                  <p className="leading-relaxed text-gray-600">
                    A dedicated run gives your team room to discuss real work, set clearer boundaries, and move faster after training.
                  </p>
                </div>

                <div className="mb-8 grid gap-4">
                  {fitSignals.map((signal, index) => (
                    <div
                      key={signal.title}
                      className={`rounded-2xl border px-5 py-4 shadow-sm ${index === 1 ? 'border-accent/20 bg-accent/5' : 'border-primary/10 bg-neutral'}`}
                    >
                      <div className="mb-2 font-semibold text-primary">{signal.title}</div>
                      <p className="text-sm leading-relaxed text-gray-600">{signal.description}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-primary/10 bg-neutral p-6 text-primary">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Private class brief</div>
                  <div className="mb-5 text-2xl font-bold leading-tight">For teams that want aligned adoption, not scattered experimentation.</div>
                  <ul className="mb-6 space-y-3 text-sm text-gray-700">
                    {[
                      'More relevant examples than a mixed public cohort',
                      'Safer environment for internal workflow discussion',
                      'Easier alignment across managers, team leads, and staff',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => openProposalModal('corporate_hero_card_request_proposal')}
                    className="w-full rounded-xl bg-accent px-6 py-4 text-center font-bold text-white transition-colors hover:bg-teal-500"
                  >
                    Request a Company Proposal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="comparison" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 grid gap-10 lg:grid-cols-[0.85fr,1.15fr] lg:items-end">
              <div>
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Decision support</div>
                <h2 className="mb-4 font-heading text-3xl font-bold text-primary lg:text-5xl">When a private run makes more sense than a public class</h2>
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-gray-600 lg:text-lg">
                Public intakes work when individual staff want exposure. A dedicated company run works better when relevance, privacy, internal alignment, and implementation follow-through matter more.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-card">
              <div className="grid border-b border-primary/10 bg-neutral text-sm font-semibold text-gray-500 md:grid-cols-[0.78fr,1fr,1fr]">
                <div className="px-6 py-4">Decision area</div>
                <div className="border-t border-slate-200 px-6 py-4 md:border-l md:border-t-0">Public class</div>
                <div className="border-t border-slate-200 px-6 py-4 md:border-l md:border-t-0">Dedicated company class</div>
              </div>
              {comparisonRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid md:grid-cols-[0.78fr,1fr,1fr] ${index !== comparisonRows.length - 1 ? 'border-b border-primary/10' : ''}`}
                >
                  <div className="px-6 py-5 font-semibold text-primary">{row.label}</div>
                  <div className="border-t border-primary/10 px-6 py-5 text-sm leading-relaxed text-gray-600 md:border-l md:border-t-0">
                    {row.publicClass}
                  </div>
                  <div className="border-t border-primary/10 bg-accent/5 px-6 py-5 text-sm leading-relaxed text-gray-700 md:border-l md:border-t-0">
                    {row.privateClass}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Fit check</div>
                <h2 className="mb-6 font-heading text-3xl font-bold text-primary lg:text-4xl">Who this dedicated class is for</h2>
                <p className="mb-8 leading-relaxed text-slate-600">
                  Best for companies that want one internal cohort to build shared capability, governance discipline, and immediate implementation momentum.
                </p>
                <div className="rounded-[2rem] border border-slate-200 bg-neutral p-7 shadow-sm">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                    <GraduationCap size={22} />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-primary">Good fit if you want</h3>
                  <ul className="space-y-4">
                    {idealFor.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div id="benefits" className="lg:col-span-8">
              <div className="mb-10">
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Benefits</div>
                <h2 className="mb-4 font-heading text-3xl font-bold text-primary lg:text-4xl">What a company-only class does better</h2>
                <p className="max-w-3xl text-slate-600">
                  The dedicated format performs better when relevance, privacy, scheduling flexibility, and aligned execution matter.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[2rem] bg-primary p-8 text-white shadow-2xl md:row-span-2">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent">
                    <Users size={24} />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Train the whole team with the same standard</h3>
                  <p className="mb-8 leading-relaxed text-blue-50/90">
                    The strongest value is not only that individuals learn new tools. It is that your team leaves with the same prompting habits, review expectations, workflow language, and governance understanding.
                  </p>
                  <div className="grid gap-4">
                    {[
                      'Shared internal language for AI use',
                      'More consistent review and approval habits',
                      'Less fragmentation after the workshop',
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-blue-50/95">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {benefitCards.map((benefit) => (
                  <div key={benefit.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral text-primary shadow-sm">
                      <benefit.icon size={22} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-primary">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Use-case lens</div>
                <h2 className="font-heading text-3xl font-bold text-primary lg:text-4xl">Common team contexts this format supports well</h2>
              </div>
              <p className="max-w-2xl text-slate-600">
                The workshop is strongest when your people handle documentation, coordination, review, reporting, or repetitive communication work every week.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {useCases.map((useCase) => (
                <div key={useCase.team} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{useCase.team}</div>
                  <p className="text-lg font-semibold leading-snug text-primary">{useCase.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr,1.2fr] lg:items-end">
              <div>
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">How it works</div>
                <h2 className="font-heading text-3xl font-bold text-primary lg:text-4xl">A dedicated company run with a cleaner path from enquiry to action</h2>
              </div>
              <p className="max-w-3xl text-slate-600">
                We keep the core course outcome-driven, while shaping the delivery around your team structure, timing, and the kind of practical adoption you want after the workshop.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-4">
              {deliveryPoints.map((point) => (
                <div key={point.step} className="rounded-[2rem] border border-slate-200 bg-neutral p-7 shadow-sm">
                  <div className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-accent">{point.step}</div>
                  <h3 className="mb-3 text-xl font-bold text-primary">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{point.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] bg-primary px-8 py-10 text-white shadow-2xl lg:px-12">
              <div className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
                <div>
                  <h3 className="mb-4 font-heading text-3xl font-bold">Train around the work your team actually does</h3>
                  <p className="max-w-3xl leading-relaxed text-blue-50/90">
                    Instead of generic examples, the class can be anchored around the reporting, documentation, coordination, review, and repetitive operational work your people handle every week.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-accent">
                    <MessagesSquare size={22} />
                  </div>
                  <p className="text-sm leading-relaxed text-blue-50/95">
                    Useful for teams that need practical adoption, clearer internal standards, and a stronger path from training to execution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[#f5f7fb] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 grid gap-8 lg:grid-cols-[0.85fr,1.15fr] lg:items-end">
              <div>
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Pricing</div>
                <h2 className="font-heading text-3xl font-bold text-primary lg:text-4xl">Pricing for dedicated company classes</h2>
              </div>
              <p className="max-w-3xl text-slate-600">
                We do not force a one-size-fits-all company package. Private-run pricing is quoted based on your actual team setup and delivery requirements.
              </p>
            </div>

            <div className="mb-10 grid gap-6 md:grid-cols-3">
              {pricingCards.map((card) => (
                <div key={card.title} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                  <div className="h-2 bg-primary" />
                  <div className="p-7">
                    <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">{card.title}</div>
                    <div className="mb-3 font-heading text-4xl font-extrabold text-primary">{card.value}</div>
                    <p className="text-sm leading-relaxed text-slate-600">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.02fr,0.98fr]">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="mb-4 text-2xl font-bold text-primary">What affects your quotation</h3>
                <p className="mb-6 text-sm text-slate-600">
                  The final proposal is shaped around what your company actually needs.
                </p>
                <ul className="mb-8 space-y-4">
                  {pricingFactors.map((factor) => (
                    <li key={factor} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-3xl bg-neutral p-6">
                  <h4 className="mb-4 text-lg font-bold text-primary">Useful details to prepare before you enquire</h4>
                  <ul className="space-y-3">
                    {proposalChecklist.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-[2rem] bg-primary p-8 text-white shadow-2xl">
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Company enquiry</div>
                <h3 className="mb-4 font-heading text-3xl font-bold">Request a private-class proposal</h3>
                <p className="mb-8 leading-relaxed text-blue-50/90">
                  Tell us your approximate team size, preferred schedule, and whether you want onsite delivery. We will advise the best structure for your company run.
                </p>

                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
                    <Users size={20} className="mb-3 text-accent" />
                    <div className="text-sm font-semibold">Team size</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
                    <CalendarRange size={20} className="mb-3 text-accent" />
                    <div className="text-sm font-semibold">Schedule preference</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
                    <MapPinned size={20} className="mb-3 text-accent" />
                    <div className="text-sm font-semibold">Venue setup</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => openProposalModal('corporate_pricing_request_proposal')}
                    className="w-full rounded-xl bg-accent px-6 py-4 text-center font-bold text-white transition-colors hover:bg-teal-500"
                  >
                    Request Proposal
                  </button>
                  <a
                    href="mailto:hello@nexiuslabs.com?subject=Dedicated%20Company%20Class%20Enquiry"
                    className="block rounded-xl border border-white/25 px-6 py-4 text-center font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Email Us Instead
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Instructors />

        <section id="faq" className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">FAQ</div>
              <h2 className="mb-4 font-heading text-3xl font-bold text-primary">Answers to common questions</h2>
              <p className="text-slate-500">Answers to common questions about dedicated company runs.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-[1.75rem] border border-slate-200 bg-neutral p-6 transition-colors hover:border-primary/20">
                  <h3 className="mb-3 text-lg font-bold text-primary">{faq.question}</h3>
                  <p className="leading-relaxed text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-white shadow-2xl lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.22),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.08),_transparent_28%)]" />
              <div className="relative">
                <h2 className="mb-4 font-heading text-3xl font-bold lg:text-4xl">Want a private AI class for your company?</h2>
                <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-blue-50/90">
                  If you have 12 pax or more and want a more relevant, private, and operationally practical format, we can scope a dedicated run for your team.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => openProposalModal('corporate_final_request_proposal')}
                    className="rounded-xl bg-accent px-8 py-4 font-bold text-white transition-colors hover:bg-teal-500"
                  >
                    Request Proposal
                  </button>
                  <a
                    href="https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%20want%20to%20discuss%20a%20dedicated%20company%20class%20for%20our%20team."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackOutboundClick({
                        channel: 'whatsapp',
                        pagePath: PAGE_PATH,
                        position: 'corporate_final_whatsapp',
                      })
                    }
                    className="rounded-xl border border-white/30 px-8 py-4 font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Talk to Us on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CorporateClassLandingPage;
