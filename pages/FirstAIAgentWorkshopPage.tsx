import React from 'react';
import { ArrowRight, CalendarDays, Clock3, MapPin, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

const PAGE_PATH = '/workshops/build-your-first-ai-agent';
const POSTER_PATH = '/images/workshops/first-ai-agent-20261017.jpg';

// NEX-1338: keep this candidate unpublished until the owner supplies the
// registration destination or confirms an event-specific on-page form.
// Never reuse a different workshop's registration or guess an external URL.
const REGISTRATION_URL: string | null = null;

const RegistrationCTA: React.FC = () => REGISTRATION_URL ? (
  <a href={REGISTRATION_URL} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-accent px-7 py-4 text-sm font-black tracking-wide text-slate-950 transition hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
    REGISTER NOW <ArrowRight aria-hidden="true" className="h-5 w-5" />
  </a>
) : (
  <div>
    <button type="button" disabled aria-describedby="registration-status" className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-slate-500 bg-slate-700 px-7 py-4 text-sm font-black tracking-wide text-white">
      REGISTER NOW <ArrowRight aria-hidden="true" className="h-5 w-5" />
    </button>
    <p id="registration-status" className="mt-3 text-sm leading-6 text-slate-300">Registration details coming soon.</p>
  </div>
);

const FirstAIAgentWorkshopPage: React.FC = () => (
  <>
    <SEO
      title="Build Your First AI Agent in 2 Hours | 17 October 2026 | Nexius Academy"
      description="Join Nexius Academy on 17 October 2026, 10am–12pm Singapore time, at Devan Nair Institute. Build your first AI agent around an everyday work task. No coding background required."
      canonical={PAGE_PATH}
      robots={REGISTRATION_URL ? 'index,follow' : 'noindex,nofollow'}
      ogImage={`https://academy.nexiuslabs.com${POSTER_PATH}`}
      ogImageWidth={1024}
      ogImageHeight={1536}
      ogImageAlt="Build your first AI agent in 2 hours — Nexius Academy workshop, 17 October 2026"
    />
    <div className="min-h-screen bg-[#06141e] text-white">
      <a href="#workshop" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-slate-950">Skip to workshop details</a>
      <header className="border-b border-white/10">
        <nav aria-label="Workshop navigation" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <a href="/" aria-label="Nexius Academy home" className="text-sm font-bold uppercase tracking-[0.22em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">Nexius Academy</a>
          <a href="#event-details" className="text-sm font-semibold text-slate-200 underline decoration-slate-500 underline-offset-4 hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">Event details</a>
        </nav>
      </header>

      <main id="workshop" tabIndex={-1} className="outline-none">
        <section className="mx-auto grid max-w-7xl items-start gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16" aria-labelledby="workshop-title">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-teal-300">A practical two-hour session</p>
            <h1 id="workshop-title" className="font-heading text-4xl font-black uppercase leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.45rem]">
              Build your first AI agent <span className="text-teal-300">in 2 hours</span>
            </h1>
            <p className="mt-7 text-xl font-semibold leading-8 text-white">Want to use AI for more than just asking questions?</p>
            <p className="mt-4 text-base leading-7 text-slate-300">Join Nexius Academy for a practical two-hour session where you’ll learn how to build your first AI agent around an everyday work task.</p>
            <p className="mt-4 text-base leading-7 text-slate-300">You’ll discover how an AI agent can help you organise information, streamline repetitive work and turn a simple idea into a useful workflow.</p>

            <section id="event-details" className="mt-8 scroll-mt-6 rounded-2xl border border-teal-300/30 bg-[#0b2230] p-5 sm:p-6" aria-labelledby="event-details-title">
              <h2 id="event-details-title" className="mb-5 text-lg font-bold">Event details</h2>
              <dl className="space-y-5 text-sm leading-6">
                <div className="flex gap-4">
                  <CalendarDays aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-teal-300" />
                  <div><dt className="text-slate-300">Date</dt><dd className="text-base font-bold"><time dateTime="2026-10-17">17 October 2026</time></dd></div>
                </div>
                <div className="flex gap-4">
                  <Clock3 aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-teal-300" />
                  <div><dt className="text-slate-300">Time</dt><dd className="text-base font-bold"><time dateTime="2026-10-17T10:00:00+08:00">10am</time> to <time dateTime="2026-10-17T12:00:00+08:00">12pm</time> <span className="font-normal text-slate-300">(Singapore time)</span></dd></div>
                </div>
                <div className="flex gap-4">
                  <MapPin aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-teal-300" />
                  <div><dt className="text-slate-300">Venue</dt><dd><span className="text-base font-bold">Devan Nair Institute</span><address className="mt-1 not-italic text-slate-200">80 Jurong East Street 21<br />#01-01/02/03, Singapore 609607</address></dd></div>
                </div>
              </dl>
            </section>

            <p className="mt-7 flex items-start gap-3 text-base font-semibold leading-7"><CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-teal-300" />No coding background is required.</p>
            <p className="mb-5 mt-4 leading-7 text-slate-300">Seats are limited, so secure your place early.</p>
            <RegistrationCTA />
            <p className="mt-6 text-sm leading-6 text-slate-300">We look forward to seeing you there.</p>
          </div>

          <figure className="mx-auto w-full max-w-xl lg:sticky lg:top-8">
            <img src={POSTER_PATH} width={1024} height={1536} alt="Nexius Academy: Build your first AI agent in 2 hours. 17 October 2026, 10am to 12pm, Devan Nair Institute, 80 Jurong East Street 21, #01-01/02/03, Singapore 609607. No coding background required." className="h-auto w-full rounded-2xl border border-teal-300/20 object-contain shadow-2xl" decoding="async" />
            <figcaption className="mt-3 text-center text-xs leading-5 text-slate-400">Nexius Academy · 17 October 2026</figcaption>
          </figure>
        </section>
      </main>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-300"><a href="/" className="underline underline-offset-4 hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">Nexius Academy</a> · Practical AI learning</footer>
    </div>
  </>
);

export default FirstAIAgentWorkshopPage;
