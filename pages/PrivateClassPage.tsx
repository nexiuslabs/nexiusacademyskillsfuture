import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Mail,
  Menu,
  Play,
  Star,
  Target,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import Pricing from '../components/courses/Pricing';
import { openLeadModal } from '../services/leadModal';
import { trackOutboundClick } from '../services/analytics';

const PAGE_PATH = '/private-class';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Benefits', href: '#formats' },
  { label: 'Teams', href: '#teams' },
  { label: 'Delivery', href: '#delivery' },
];

const programCards = [
  {
    title: 'Focus on real use cases',
    description: 'Examples, exercises, and workflows can be built around the exact work your teams already do.',
    mode: 'RELEVANCE',
    image: '/images/private-class/workflow-demo.jpeg',
  },
  {
    title: 'Solve real pain points',
    description: 'Instructors help teams structure practical AI workflows around bottlenecks, repetitive work, and review-heavy tasks.',
    mode: 'PRACTICAL',
    image: '/images/private-class/custom-gpt.jpg',
  },
  {
    title: 'Privacy for internal sharing',
    description: 'Sensitive workflows can be discussed in a closed company setting instead of a public mixed cohort.',
    mode: 'PRIVATE',
    image: '/images/private-class/speaker-audience.jpg',
  },
  {
    title: 'Stronger governance alignment',
    description: 'Leaders can set clear boundaries for approved use, review controls, and escalation rules from day one.',
    mode: 'ALIGNMENT',
    image: '/images/private-class/lecture-hall.jpeg',
  },
];

const proofChips = [
  'Tailored to your workflows',
  'Private company-only setting',
  'Flexible scheduling',
  'Non-technical friendly',
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

const teamAlignmentPoints = [
  'Shared internal language for AI use',
  'More consistent review and approval habits',
  'Less fragmentation after the workshop',
];

const planningFactors = [
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
      'The page shows the standard pricing table used across our course pages. If you are planning a company run, contact us so we can advise the most suitable structure for your team setup.',
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

const fitSignals = [
  {
    title: 'One aligned internal cohort',
    description: 'Useful when managers, team leads, and frontline staff need a shared vocabulary and standard for AI usage.',
    icon: Users,
  },
  {
    title: 'Non-technical adoption',
    description: 'Built for business teams that want practical no-code workflows instead of technical retraining.',
    icon: Target,
  },
  {
    title: 'Operational relevance',
    description: 'Better when the class should reflect your documentation, reporting, review loops, and service workflows.',
    icon: Wrench,
  },
];

const teamCards = [
  {
    name: 'Operations and admin',
    accent: 'bg-neutral',
    badge: 'Use-case lens',
    desc: 'Reduce repetitive drafting, handoffs, and routine updates.',
  },
  {
    name: 'Finance and compliance',
    accent: 'bg-accent/10',
    badge: 'Use-case lens',
    desc: 'Improve review-heavy work, documentation quality, and process consistency.',
  },
  {
    name: 'HR and people teams',
    accent: 'bg-primary/5',
    badge: 'Use-case lens',
    desc: 'Speed up internal communication, policy support, and recurring coordination tasks.',
  },
  {
    name: 'Sales and service',
    accent: 'bg-accent/10',
    badge: 'Use-case lens',
    desc: 'Shorten response prep, follow-up drafting, and customer-facing workflow execution.',
  },
];

const deliverySteps = [
  {
    step: '01',
    description: 'We clarify your team mix, business context, and where AI should create useful leverage first.',
  },
  {
    step: '02',
    description: 'We plan the most suitable format around class size, venue preference, and scheduling constraints.',
  },
  {
    step: '03',
    description: 'Your team learns together in a dedicated company setting with space for practical discussion.',
  },
  {
    step: '04',
    description: 'The session ends with clearer next steps so adoption does not stall after the class.',
  },
];

const openProposalModal = (position: string) =>
  openLeadModal('course_page_cta', 'advisory_call', {
    page: PAGE_PATH,
    position,
    ctaLabel: 'request_company_proposal',
  });

const ModePill: React.FC<{ mode: string }> = ({ mode }) => {
  const tone =
    mode === 'PRIVATE'
      ? 'bg-primary/10 text-primary'
      : mode === 'PRACTICAL'
        ? 'bg-accent/15 text-primary'
        : 'bg-neutral text-primary';

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-widest ${tone}`}>
      {mode}
    </span>
  );
};

const PrivateClassNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container-page flex items-center justify-between py-5">
        <a href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-accent shadow-sm">
            N
          </span>
          <span className="text-xl font-bold tracking-tight text-primary">Nexius Academy</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative transition-colors hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:content-[''] hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => openProposalModal('private_class_nav_request_proposal')}
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-teal-500"
          >
            Request Proposal
          </button>
        </div>

        <button
          className="p-2 text-primary md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-page pb-5 md:hidden"
        >
          <ul className="flex flex-col gap-3 text-gray-700">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-neutral"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openProposalModal('private_class_nav_mobile_request_proposal');
                }}
                className="block w-full rounded-full bg-accent px-5 py-2.5 text-center font-semibold text-white"
              >
                Request Proposal
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
};

const PrivateClassHero: React.FC = () => {
  const avatars = [
    'https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Headshots/jacky_wong.jpeg',
    'https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Headshots/jean_foo.jpeg',
    '/images/testimonials/kenji.jpg',
    '/images/testimonials/thomas-lee.jpg',
  ];

  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-10 md:pb-32 md:pt-16">
      <div className="pointer-events-none absolute inset-0 grid-dots opacity-60" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/10 opacity-80 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-32 h-80 w-80 rounded-full bg-primary/10 opacity-70 blur-3xl" />

      <div className="container-page relative">
        <div className="grid grid-cols-12 items-center gap-6">
          <div className="relative col-span-12 h-72 md:col-span-3 md:h-[420px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="floaty absolute left-0 top-0 w-44 overflow-hidden rounded-2xl shadow-card md:w-52"
              style={{ ['--rot' as string]: '-4deg', transform: 'rotate(-4deg)' }}
            >
              <img src="/images/private-class/session-room.jpeg" alt="Workshop participants" className="h-44 w-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="floaty absolute bottom-0 left-6 w-40 overflow-hidden rounded-2xl shadow-card md:left-14 md:w-44"
              style={{ ['--rot' as string]: '5deg', animationDelay: '1.5s', transform: 'rotate(5deg)' }}
            >
              <img src="/images/private-class/speaker-audience.jpg" alt="Lead trainer" className="h-40 w-full object-cover" />
            </motion.div>
          </div>

          <div className="col-span-12 text-center md:col-span-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-balance text-4xl font-bold leading-[1.1] text-primary sm:text-5xl md:text-6xl"
            >
              Train your team on AI in a format built for real company <span className="font-serif font-normal italic text-gray-600">work</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="mx-auto mt-6 max-w-xl text-balance text-base text-gray-600 md:text-lg"
            >
              Instead of sending staff into a general public intake, run the course as a private company cohort shaped around your workflows, decision-making context, and internal operating constraints.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-8 flex flex-col items-center gap-5"
            >
              <div className="flex flex-wrap items-center justify-center gap-2 text-center text-lg text-gray-600 sm:text-xl">
                <span className="font-semibold text-primary">12 pax</span>
                <span className="text-gray-300">|</span>
                <span>Dedicated company class and above</span>
              </div>

              <div className="flex w-full max-w-2xl flex-col items-stretch justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openProposalModal('private_class_hero_request_proposal')}
                  className="group inline-flex min-h-[4.25rem] flex-1 items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-teal-500"
                >
                  <Play size={16} className="fill-white" />
                  Request Proposal
                </button>
                <a
                  href="https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%20want%20to%20explore%20a%20dedicated%20company%20class%20for%20our%20team%20of%2012%2B."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackOutboundClick({
                      channel: 'whatsapp',
                      pagePath: PAGE_PATH,
                      position: 'private_class_hero_whatsapp',
                    })
                  }
                  className="inline-flex min-h-[4.25rem] flex-1 items-center justify-center rounded-full border border-primary/10 bg-white px-8 py-4 text-lg font-semibold text-primary transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  Talk on WhatsApp
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center rounded-full bg-white/95 px-4 py-2 shadow-soft ring-1 ring-primary/5">
                  <div className="flex -space-x-2">
                    {avatars.map((avatar) => (
                      <img
                        key={avatar}
                        src={avatar}
                        alt=""
                        className="h-9 w-9 rounded-full border-2 border-white object-cover"
                        style={{ objectPosition: 'center' }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-base font-semibold text-primary">
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={16} className="fill-current" />
                    ))}
                  </div>
                  <span>4.5</span>
                </div>
              </div>

              <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                {proofChips.map((chip) => (
                  <div key={chip} className="rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm text-gray-700 shadow-soft">
                    {chip}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="relative col-span-12 h-72 md:col-span-3 md:h-[420px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="floaty absolute right-0 top-10 w-56 overflow-hidden rounded-2xl shadow-card md:w-64"
              style={{ ['--rot' as string]: '3deg', animationDelay: '0.8s', transform: 'rotate(3deg)' }}
            >
              <img src="/images/private-class/hall-room.jpg" alt="Nexius Academy classroom" className="h-72 w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PrivateClassPrograms: React.FC = () => (
  <section id="formats" className="py-20 md:py-28">
    <div className="container-page">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl"
      >
        What a company-only class does <span className="font-serif font-normal italic text-gray-600">better</span>
      </motion.h2>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {programCards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative rounded-3xl bg-white p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3 pt-4">
              <h3 className="text-lg font-bold leading-tight text-primary">{card.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{card.description}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <ModePill mode={card.mode} />
                <button
                  type="button"
                  aria-label={`Open ${card.title}`}
                  onClick={() => openProposalModal(`private_class_format_${index + 1}`)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-soft transition-all hover:rotate-45 hover:bg-teal-500"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const PrivateClassComparison: React.FC = () => (
  <section className="pb-20 md:pb-28">
    <div className="container-page">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr,1.1fr] lg:items-end">
        <div>
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Decision support</div>
          <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl">
            When a private run makes more sense than a public <span className="font-serif font-normal italic text-gray-600">class</span>
          </h2>
        </div>
        <p className="max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
          Public intakes work when individual staff want exposure. A dedicated company run works better when relevance, privacy, internal alignment, and implementation follow-through matter more.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft">
        <div className="grid border-b border-primary/10 bg-neutral text-sm font-semibold text-gray-500 md:grid-cols-[0.78fr,1fr,1fr]">
          <div className="px-6 py-4">Decision area</div>
          <div className="border-t border-primary/10 px-6 py-4 md:border-l md:border-t-0">Public class</div>
          <div className="border-t border-primary/10 px-6 py-4 md:border-l md:border-t-0">Dedicated company class</div>
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
);

const PrivateClassAbout: React.FC = () => (
  <section id="teams" className="py-20 md:py-28">
    <div className="container-page">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-4"
        >
          <div className="lg:sticky lg:top-28">
            <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Why companies choose this format</div>
            <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl">
              Why companies choose this <span className="font-serif font-normal italic">format</span>
            </h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              A dedicated run gives your team room to discuss real work, set clearer boundaries, and move faster after training.
            </p>
            <div className="mt-8 rounded-3xl border border-primary/10 bg-neutral p-6 shadow-soft">
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Fit check</div>
              <h3 className="text-xl font-bold text-primary">Good fit if you want</h3>
              <ul className="mt-4 space-y-3">
                {idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
                    <Check size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-8"
        >
          <div className="space-y-5">
            <div className="rounded-3xl bg-primary p-6 text-white shadow-card md:p-7">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-accent">
                <Users size={22} />
              </div>
              <h3 className="text-2xl font-bold">Train the whole team with the same standard</h3>
              <p className="mt-3 leading-relaxed text-blue-50/90">
                The strongest value is not only that individuals learn new tools. It is that your team leaves with the same prompting habits, review expectations, workflow language, and governance understanding.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {teamAlignmentPoints.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-blue-50/95">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {fitSignals.map((signal, index) => {
                const Icon = signal.icon;
                const isFeatured = index === 2;
                return (
                  <div
                    key={signal.title}
                    className={`rounded-3xl border px-5 py-5 shadow-soft ${
                      index === 1 ? 'border-accent/20 bg-accent/5' : 'border-primary/10 bg-white'
                    } ${isFeatured ? 'md:col-span-2' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral text-primary">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-primary">{signal.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">{signal.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const PrivateClassTeams: React.FC = () => (
  <section id="delivery" className="bg-neutral py-20 md:py-28">
    <div className="container-page">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl font-bold text-primary sm:text-4xl md:text-5xl"
      >
        Common team contexts this format supports <span className="font-serif font-normal italic">well</span>
      </motion.h2>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {teamCards.map((team, index) => (
          <motion.div
            key={team.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="rounded-3xl bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className={`rounded-2xl px-4 py-5 ${team.accent}`}>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">{team.badge}</div>
              <div className="mt-2 text-2xl font-bold tracking-tight text-primary">{team.name}</div>
            </div>
            <div className="mt-4 px-1">
              <p className="text-sm leading-relaxed text-gray-600">{team.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-primary px-6 py-8 text-white shadow-soft md:px-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr,0.9fr] md:items-center">
          <div>
            <h3 className="text-2xl font-bold">How delivery works</h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/80">
              {deliverySteps.map((step) => (
                <li key={step.step} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex min-w-[2.1rem] justify-center rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold tracking-[0.18em] text-accent">
                    {step.step}
                  </span>
                  <span>{step.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white/10 p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-accent">
              <Users size={22} />
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              Useful for teams that need practical adoption, clearer internal standards, and a stronger path from training to execution.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => openProposalModal('private_class_delivery_request_proposal')}
                className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-500"
              >
                Request Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PrivateClassPlanning: React.FC = () => (
  <section className="bg-white py-20 md:py-28">
    <div className="container-page">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr,1.1fr] lg:items-end">
        <div>
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Planning support</div>
          <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl">
            Planning a company run should feel <span className="font-serif font-normal italic text-gray-600">straightforward</span>
          </h2>
        </div>
        <p className="max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
          Tell us your approximate team size, preferred schedule, and whether you want onsite delivery. We will advise the best structure for your company run.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
        <div className="rounded-3xl border border-primary/10 bg-white p-7 shadow-soft">
          <h3 className="text-2xl font-bold text-primary">What to keep in view</h3>
          <p className="mt-2 text-sm text-gray-600">These factors usually shape how a company-run class is scoped and scheduled.</p>
          <div className="mt-6 space-y-3">
            {planningFactors.map((factor) => (
              <div key={factor} className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-neutral px-4 py-4 text-sm text-gray-700">
                <Check size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-primary p-7 text-white shadow-card">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Before you enquire</div>
          <h3 className="text-2xl font-bold">Useful details to prepare</h3>
          <p className="mt-2 text-sm leading-relaxed text-blue-50/90">
            Sharing these details upfront makes it easier to recommend the most suitable setup for your team.
          </p>
          <div className="mt-6 space-y-3">
            {proposalChecklist.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm text-blue-50/95">
                <Check size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openProposalModal('private_class_planning_request_proposal')}
              className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-500"
            >
              Request Proposal
            </button>
            <a
              href="mailto:hello@nexiuslabs.com?subject=Dedicated%20Company%20Class%20Enquiry"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Mail size={16} />
              Email Us Instead
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PrivateClassFaq: React.FC = () => (
  <section id="faq" className="bg-neutral py-20 md:py-28">
    <div className="container-page">
      <div className="mb-12 text-center">
        <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">FAQ</div>
        <h2 className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl">Answers to common questions</h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Answers to common questions about dedicated company runs.
        </p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-soft transition-colors hover:border-primary/20">
            <h3 className="text-lg font-bold text-primary">{faq.question}</h3>
            <p className="mt-3 leading-relaxed text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PrivateClassPage: React.FC = () => {
  useEffect(() => {
    if (window.location.hash === '#home') {
      window.location.replace('/');
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SEO
        title="Dedicated Company AI Class | Nexius Academy"
        description="Private company-run Agentic AI training for teams of 12 pax or more. Tailor the workshop to real workflows, train in a private setting, and align teams on practical AI adoption."
        canonical={PAGE_PATH}
        ogType="website"
      />
      <PrivateClassNavbar />
      <main>
        <PrivateClassHero />
        <PrivateClassPrograms />
        <PrivateClassComparison />
        <Pricing
          pagePath={PAGE_PATH}
          reserveLabel="request_company_proposal"
          reserveButtonText="Request Proposal"
          sectionClassName="pb-20 md:pb-28"
        />
        <PrivateClassAbout />
        <PrivateClassTeams />
        <PrivateClassPlanning />
        <PrivateClassFaq />
      </main>
      <Footer />
    </div>
  );
};

export default PrivateClassPage;
