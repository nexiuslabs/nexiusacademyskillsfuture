import React from 'react';
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { trackOutboundClick } from '../../services/analytics';

const EVENT_URL = 'https://luma.com/0g6j2m5c';

const CoursePreviewCTA: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="overflow-hidden rounded-[1.75rem] bg-[#0d1f3d] text-white shadow-2xl">
          <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[minmax(0,1fr),360px] lg:items-center lg:gap-12">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-secondary">
                Free live demo &amp; business networking
              </div>
              <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
                A Day at Work with My AI Workforce
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
                See how an AI-augmented owner-operator runs a real business day with a structured AI workforce, while keeping important decisions and approvals human-led.
              </p>

              <div className="mt-6 grid gap-4 text-sm text-white/80 sm:grid-cols-2">
                <div className="flex gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 flex-none text-secondary" aria-hidden="true" />
                  <div>
                    <div className="font-bold text-white">16 September 2026</div>
                    <div>2:00 PM–5:00 PM</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-none text-secondary" aria-hidden="true" />
                  <div>
                    <div className="font-bold text-white">Hotel Boss, Level 4</div>
                    <div>500 Jalan Sultan Road, Singapore</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm leading-relaxed text-white/75">
                Live demonstration, practical discussion and business networking for owners, leaders, consultants and professionals.
              </p>
              <a
                href={EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackOutboundClick({
                    channel: 'luma',
                    pagePath: '/',
                    position: 'home_ai_workforce_event_cta',
                  })
                }
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-teal-400 px-6 py-3.5 text-base font-bold text-black shadow-lg transition-all hover:-translate-y-0.5 hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Register free on Luma <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
              <p className="mt-3 text-center text-xs text-white/55">Registration opens in a new tab.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePreviewCTA;
