import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  Briefcase,
  CalendarRange,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  Lightbulb,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import ResponsiveImage from '../components/ResponsiveImage';
import { openLeadModal } from '../services/leadModal';
import { trackOutboundClick } from '../services/analytics';

type PartnerKey = 'e2i' | 'sim' | 'nexius';

const partnerConfigs: Record<
  PartnerKey,
  {
    pagePath: string;
    bodyClass: string;
    schedules: Array<{ date: string; time: string; cohortCode: string; cohortLabel: string }>;
    partnerName: string;
    logoSrc: string;
    logoAlt: string;
    logoClassName: string;
    eventName?: string;
    venue?: string;
    nearestMrt?: string;
    theme?: 'light' | 'dark';
    showPartnerBadge?: boolean;
  }
> = {
  nexius: {
    pagePath: '/course-preview',
    bodyClass: 'course-preview-page',
    schedules: [
      {
        date: '17 June 2026',
        time: 'Wednesday, 2:00pm to 5:00pm',
        cohortCode: 'course-preview-2026-06-17',
        cohortLabel: '17 Jun 2026 course preview (2pm-5pm)',
      },
    ],
    partnerName: 'e2i',
    logoSrc: '/images/partners/new-e2i-logo-transparent.png',
    logoAlt: 'e2i collaboration logo',
    logoClassName: 'h-10 w-auto object-contain sm:h-12',
    eventName: 'Agentic AI Foundations for Non-Technical Professionals',
    venue: 'Devan Nair Institute for Employment and Employability\n80 Jurong East St 21, #01-01/02/03, Singapore 609607',
    nearestMrt: 'Jurong East',
    theme: 'dark',
    showPartnerBadge: false,
  },
  e2i: {
    pagePath: '/e2i-preview',
    bodyClass: 'partner-preview-page',
    schedules: [
      {
        date: '26 June 2026',
        time: 'Friday, 2:00pm to 6:00pm',
        cohortCode: 'e2i-preview-2026-06-26',
        cohortLabel: '26 Jun 2026 preview session (2pm-6pm)',
      },
    ],
    partnerName: 'e2i',
    logoSrc: '/images/partners/new-e2i-logo-transparent.png',
    logoAlt: 'e2i partnership logo',
    logoClassName: 'h-10 w-auto object-contain sm:h-12',
    showPartnerBadge: false,
  },
  sim: {
    pagePath: '/sim-preview',
    bodyClass: 'partner-preview-page',
    schedules: [
      {
        date: '04 July 2026',
        time: 'Saturday, 9:00am to 1:00pm',
        cohortCode: 'sim-preview-2026-07-04',
        cohortLabel: '04 Jul 2026 preview session (9am-1pm)',
      },
      {
        date: '11 July 2026',
        time: 'Saturday, 9:00am to 1:00pm',
        cohortCode: 'sim-preview-2026-07-11',
        cohortLabel: '11 Jul 2026 preview session (9am-1pm)',
      },
      {
        date: '18 July 2026',
        time: 'Saturday, 9:00am to 1:00pm',
        cohortCode: 'sim-preview-2026-07-18',
        cohortLabel: '18 Jul 2026 preview session (9am-1pm)',
      },
    ],
    partnerName: 'SIM Global Education and SIM Alumni',
    logoSrc: '/images/partners/sim-ge-alumni-logo-transparent.png',
    logoAlt: 'SIM Global Education and SIM Alumni partnership logo',
    logoClassName: 'h-14 w-auto object-contain sm:h-16',
    showPartnerBadge: true,
  },
};

const audience = [
  'SME owners and entrepreneurs',
  'Managers and team leads',
  'Admin, HR, finance, operations, sales, and support teams',
  'Working professionals who want to use AI more confidently at work',
];

const learningOutcomes = [
  'Understand what Agentic AI is and how it differs from ordinary chatbot use',
  'Use basic prompting techniques for clearer and more useful AI outputs',
  'Create a simple reusable AI instruction for a recurring workplace task',
  'Identify one practical workflow that could benefit from AI assistance',
  'Recognise basic safeguards around accuracy, privacy, and human review',
];

const leaveWith = [
  'One improved workplace prompt',
  'One reusable AI instruction template',
  'One practical AI use-case idea for your own work',
  'Greater confidence in using AI safely and effectively',
];

const sessionFlow = [
  {
    time: '00:00',
    title: 'Agentic AI in plain business language',
    description: 'See what makes an AI assistant more useful than a normal chatbot, without technical jargon.',
    icon: Bot,
  },
  {
    time: '00:50',
    title: 'Better prompts for workplace output',
    description: 'Improve weak requests into clearer instructions for emails, summaries, planning, and analysis.',
    icon: MessageSquareText,
  },
  {
    time: '01:55',
    title: 'Reusable instructions',
    description: 'Turn a recurring task into a simple instruction template that can be used again after class.',
    icon: FileText,
  },
  {
    time: '03:00',
    title: 'Use-case mapping and safeguards',
    description: 'Choose one practical workflow and apply basic checks for accuracy, privacy, and human review.',
    icon: ShieldCheck,
  },
];

const COURSE_PREVIEW_REGISTER_URL =
  'https://event.e2i.com.sg/view-event/agentic-ai-foundations-for-non-technical-professionals';

const trainers = [
  {
    name: 'Melverick Ng',
    role: 'Master Trainer',
    image: '/images/authors/melverick-ng.jpg',
    bio: 'Non-technical business consultant with over 30 years of professional experience, bringing practical business and training insights to workplace AI adoption.',
  },
  {
    name: 'Darryl Wong',
    role: 'AI Practitioner | CPA (Aust.) | ISCA Associate',
    image: '/images/authors/darryl-wong.jpg',
    bio: 'AI enthusiast and business practitioner with over 20 years of professional experience, helping SMEs and professionals apply AI to real workplace workflows.',
  },
];

const openPreviewLeadModal = (
  position: string,
  pagePath: string,
  schedule?: { cohortCode: string; cohortLabel: string }
) =>
  openLeadModal('course_page_cta', 'reserve_seat', {
    page: pagePath,
    position,
    ctaLabel: 'register_preview_interest',
    preferredIntake: schedule?.cohortLabel,
    cohortCode: schedule?.cohortCode,
  });

interface PreviewSessionPageProps {
  partner?: PartnerKey;
}

const PreviewSessionPage: React.FC<PreviewSessionPageProps> = ({ partner = 'e2i' }) => {
  const config = partnerConfigs[partner];
  const isDarkPreview = config.theme === 'dark';

  useEffect(() => {
    document.body.classList.add(config.bodyClass);
    return () => document.body.classList.remove(config.bodyClass);
  }, [config.bodyClass]);

  return (
    <div className={isDarkPreview ? 'min-h-screen bg-[#0b1527] text-white' : 'min-h-screen bg-white text-textDark'}>
      <SEO
        title={isDarkPreview ? 'Course Preview: Agentic AI Foundations | Nexius Academy' : '4-Hour Agentic AI Preview Session | Nexius Academy'}
        description={isDarkPreview ? 'Join the 17 June 2026 course preview for Agentic AI Foundations. A classroom session for non-technical professionals from 2pm to 5pm.' : 'A beginner-friendly 4-hour Agentic AI preview for non-technical professionals. Learn prompts, reusable instructions, and safe AI habits.'}
        canonical={config.pagePath}
        ogType="course"
        ogImage="https://academy.nexiuslabs.com/images/og/agentic-ai-course-og.jpg"
      />

      <header className={`sticky top-0 z-50 border-b backdrop-blur ${isDarkPreview ? 'border-white/10 bg-[#0b1527]/95' : 'border-primary/10 bg-white/95'}`}>
        <div className="container-page flex min-h-20 items-center justify-between gap-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-accent">
              N
            </span>
            <span className={`font-heading text-xl font-bold tracking-tight ${isDarkPreview ? 'text-white' : 'text-primary'}`}>
              Nexius<span className="text-accent">Academy</span>
            </span>
          </Link>

          <nav className={`hidden items-center gap-7 text-sm font-semibold md:flex ${isDarkPreview ? 'text-white/75' : 'text-gray-700'}`}>
            <a href="#schedule" className="hover:text-accent">Schedule</a>
            <a href="#outcomes" className="hover:text-accent">Outcomes</a>
            <a href="#session-flow" className="hover:text-accent">Session flow</a>
            <a href="#trainers" className="hover:text-accent">Trainers</a>
          </nav>

          {!isDarkPreview && (
            <button
              type="button"
              onClick={() => openPreviewLeadModal('preview_nav_register', config.pagePath)}
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-900"
            >
              Register Interest
            </button>
          )}
        </div>
      </header>

      <main>
        <section className={`relative overflow-hidden ${isDarkPreview ? 'bg-[#0b1527]' : 'bg-neutral'}`}>
          <div className={isDarkPreview ? 'absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(255,122,0,0.34),transparent_36%),radial-gradient(circle_at_35%_74%,rgba(0,200,150,0.12),transparent_28%)]' : 'absolute inset-0 grid-dots opacity-50'} />
          <div className="container-page relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.08fr,0.92fr] lg:items-center">
            <div>
              <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold shadow-soft ${isDarkPreview ? 'border-white/10 bg-white/5 text-white' : 'border-primary/10 bg-white text-primary'}`}>
                <Clock3 size={16} className="text-accent" />
                {isDarkPreview ? '3-hour course preview' : '4-hour hands-on preview workshop'}
              </div>

              <h1 className={`max-w-4xl text-balance font-heading text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-6xl ${isDarkPreview ? 'text-white' : 'text-primary'}`}>
                {config.eventName || 'Agentic AI Foundations for Non-Technical Professionals'}
              </h1>

              <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${isDarkPreview ? 'text-white/72' : 'text-gray-600'}`}>
                {isDarkPreview
                  ? 'A practical course preview for professionals who want to understand how Agentic AI can improve workplace productivity, automate routine work, and support better business execution.'
                  : 'A practical preview session for professionals who want to use AI more confidently at work before committing to a full paid class. Learn better prompts, reusable AI instructions, and safe workplace use cases.'}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {!isDarkPreview && (
                  <button
                    type="button"
                    onClick={() => openPreviewLeadModal('preview_hero_register', config.pagePath)}
                    className="inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3 font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-teal-500"
                  >
                    Register Interest <ArrowRight size={18} />
                  </button>
                )}
                <a
                  href={
                    isDarkPreview
                      ? COURSE_PREVIEW_REGISTER_URL
                      : 'https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%20am%20interested%20in%20the%204-hour%20Agentic%20AI%20preview%20session.'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackOutboundClick({
                      channel: isDarkPreview ? 'skillsfuture' : 'whatsapp',
                      pagePath: config.pagePath,
                      position: isDarkPreview ? 'preview_hero_register_e2i' : 'preview_hero_whatsapp',
                    })
                  }
                  className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl border border-primary/10 bg-white px-7 py-3 font-bold text-primary transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {isDarkPreview ? 'Register' : 'Ask on WhatsApp'}
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {['No coding required', 'Beginner-friendly', isDarkPreview ? 'Hands-on Workshop' : 'Paid class preview'].map((item) => (
                  <div key={item} className={`rounded-2xl border px-4 py-3 text-sm font-semibold shadow-soft ${isDarkPreview ? 'border-white/10 bg-white/5 text-white' : 'border-primary/10 bg-white text-primary'}`}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className={`overflow-hidden rounded-[2rem] shadow-card ${isDarkPreview ? 'bg-[#111f38]' : 'bg-primary'}`}>
                <ResponsiveImage
                  src={isDarkPreview ? '/images/courses/frontier-firm-illustration.jpg' : '/images/courses/agentic-ai-hero.jpg'}
                  alt={isDarkPreview ? 'Agentic AI business innovation illustration' : 'Professionals attending an AI workshop'}
                  loading="eager"
                  fetchPriority="high"
                  widths={[640, 960, 1200]}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  fit="cover"
                  className={`h-[420px] w-full ${isDarkPreview ? 'object-cover opacity-90' : 'object-cover opacity-90'}`}
                />
              </div>
              {config.showPartnerBadge !== false && (
                <div className={`mt-4 flex flex-col items-end ${isDarkPreview ? 'text-white/55' : 'text-gray-500'}`}>
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                    In collaboration with
                  </div>
                  <ResponsiveImage
                    src={config.logoSrc}
                    alt={config.logoAlt}
                    widths={[128, 256]}
                    sizes="256px"
                    fit="contain"
                    className={config.logoClassName}
                  />
                </div>
              )}
              {!isDarkPreview && (
                <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-primary/10 bg-white p-5 shadow-card">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Sparkles size={22} />
                    </span>
                    <div>
                      <p className="font-bold text-primary">Practical workplace AI, not theory-heavy AI talk.</p>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        Participants leave with a prompt, an instruction template, and one realistic use-case idea.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="schedule" className={isDarkPreview ? 'bg-[#0d1e35] py-14 md:py-16' : 'bg-white py-14 md:py-16'}>
          <div className="container-page">
            <div className={`rounded-3xl border p-6 shadow-soft md:p-8 ${isDarkPreview ? 'border-white/10 bg-[#111f38]' : 'border-primary/10 bg-neutral'}`}>
              <div className={`grid gap-6 ${isDarkPreview ? '' : 'md:grid-cols-[auto,1fr,auto] md:items-center'}`}>
                {!isDarkPreview && (
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <CalendarRange size={28} />
                  </div>
                )}
                <div className="space-y-4">
                  {!isDarkPreview && <div className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Preview session schedule</div>}
                  {isDarkPreview ? (
                    <div className="grid gap-5 md:grid-cols-3">
                      <div className="grid gap-4 md:grid-cols-[auto,1fr] md:border-r md:border-white/10 md:pr-8">
                        <div className="text-2xl" aria-hidden="true">🗓️</div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Date</div>
                          <div className="mt-2 text-lg font-extrabold text-white">17 June 2026</div>
                          <div className="mt-1 text-base font-semibold text-white/45">Wednesday</div>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-[auto,1fr] md:border-r md:border-white/10 md:px-8">
                        <div className="text-2xl" aria-hidden="true">⏱️</div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Time</div>
                          <div className="mt-2 text-lg font-extrabold text-white">2:00pm - 5:00pm</div>
                          <div className="mt-1 text-base font-semibold text-white/45">SGT (UTC+8)</div>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-[auto,1fr] md:pl-8">
                        <div className="text-2xl" aria-hidden="true">📍</div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Venue</div>
                          <div className="mt-2 text-lg font-extrabold text-white">Devan Nair Institute</div>
                          <div className="mt-1 text-base font-semibold leading-snug text-white/45">
                            80 Jurong East St 21,<br />
                            #01-01/02/03, Singapore 609607
                          </div>
                          <div className="mt-2 text-sm font-semibold text-white/45">Nearest MRT: {config.nearestMrt}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-3">
                      {config.schedules.map((schedule) => (
                        <div key={schedule.date} className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                          <h2 className="text-xl font-bold text-primary md:text-2xl">{schedule.date}</h2>
                          <p className="mt-1 text-sm font-semibold text-gray-600">{schedule.time}</p>
                          <button
                            type="button"
                            onClick={() => openPreviewLeadModal('preview_schedule_card_register', config.pagePath, schedule)}
                            className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-500"
                          >
                            Select this session
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {!isDarkPreview && (
                  <button
                    type="button"
                    onClick={() => openPreviewLeadModal('preview_schedule_register', config.pagePath)}
                    className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-blue-900"
                  >
                    Register Interest <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="outcomes" className="bg-white py-20 md:py-28">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[0.78fr,1.22fr] lg:items-start">
              <div>
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Who should attend</div>
                <h2 className="text-balance text-3xl font-bold leading-tight text-primary sm:text-4xl">
                  Built for business users who need useful AI habits first
                </h2>
                <p className="mt-5 text-base leading-relaxed text-gray-600">
                  This preview is suitable for non-technical professionals across leadership, operations, support, finance, HR, admin, sales, and SME owner roles.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {audience.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-neutral px-5 py-5">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-sm font-semibold leading-relaxed text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              <div className="rounded-3xl bg-primary p-7 text-white shadow-soft">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-accent">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-2xl font-bold">What you will learn</h3>
                <div className="mt-6 space-y-3">
                  {learningOutcomes.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm leading-relaxed text-white/85">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-primary/10 bg-neutral p-7 shadow-soft">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-2xl font-bold text-primary">What you will leave with</h3>
                <div className="mt-6 space-y-3">
                  {leaveWith.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold leading-relaxed text-primary">
                      <Lightbulb size={16} className="mt-0.5 shrink-0 text-accent" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="session-flow" className="bg-neutral py-20 md:py-28">
          <div className="container-page">
            <div className="mb-12 max-w-3xl">
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">4-hour workshop flow</div>
              <h2 className="text-balance text-3xl font-bold leading-tight text-primary sm:text-4xl">
                Guided demonstrations, short hands-on activities, and practical workplace examples
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {sessionFlow.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-soft">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="rounded-full bg-neutral px-3 py-1 text-xs font-bold tracking-[0.18em] text-primary">{item.time}</span>
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                        <Icon size={21} />
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="trainers" className="bg-white py-20 md:py-28">
          <div className="container-page">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.85fr,1.15fr] lg:items-end">
              <div>
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Trainers</div>
                <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl">
                  Practical business trainers, not a coding bootcamp
                </h2>
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-gray-600">
                The session is designed for professionals who want to understand how AI fits into everyday workplace tasks, with enough safeguards to use it responsibly.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {trainers.map((trainer) => (
                <div key={trainer.name} className="rounded-3xl border border-primary/10 bg-neutral p-6 shadow-soft">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <span className="block h-28 w-28 overflow-hidden rounded-full bg-white shadow-sm">
                      <ResponsiveImage
                        src={trainer.image}
                        alt={trainer.name}
                        widths={[160, 240]}
                        sizes="112px"
                        fit="cover"
                        className="h-full w-full scale-110 object-cover object-[center_58%]"
                      />
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{trainer.name}</h3>
                      <p className="mt-1 text-sm font-bold text-accent">{trainer.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-gray-600">{trainer.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {!isDarkPreview && (
        <section className="bg-primary py-16 text-white md:py-20">
          <div className="container-page grid gap-8 md:grid-cols-[1fr,auto] md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-accent">
                <Users size={16} />
                Practical. Beginner-friendly. No coding required.
              </div>
              <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
                Use the preview session to qualify interest before your paid class journey.
              </h2>
              <p className="mt-4 max-w-2xl text-white/75">
                Register interest and our team will follow up with session details and suitable next steps for the full programme.
              </p>
            </div>
            {!isDarkPreview && (
              <button
                type="button"
                onClick={() => openPreviewLeadModal('preview_footer_register', config.pagePath)}
                className="inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-500"
              >
                Register Interest <ArrowRight size={18} />
              </button>
            )}
          </div>
        </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PreviewSessionPage;
