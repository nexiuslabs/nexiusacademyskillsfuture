import React from 'react';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const WORKSHOP_PATH = '/workshops/build-your-first-ai-agent/';

const CoursePreviewCTA: React.FC = () => {
  return (
    <section aria-labelledby="home-workshop-title" className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="overflow-hidden rounded-[1.75rem] bg-[#0d1f3d] shadow-2xl">
          <div className="grid items-center lg:grid-cols-[minmax(0,0.8fr),minmax(0,1.2fr)]">
            <div className="bg-[#06141e] p-5 md:p-8">
              <img
                src="/images/workshops/first-ai-agent-20261017.jpg"
                width={1024}
                height={1536}
                alt="Build your first AI agent in 2 hours — Nexius Academy workshop poster"
                loading="lazy"
                decoding="async"
                className="mx-auto h-auto w-full max-w-sm rounded-xl object-contain"
              />
            </div>

            <div className="px-6 py-8 text-white md:px-10 md:py-10 lg:px-12">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-300">
                Hands-on AI workshop
              </div>
              <h2 id="home-workshop-title" className="text-3xl font-bold leading-tight md:text-4xl">
                Build your first AI agent <span className="text-teal-300">in 2 hours</span>
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-200 md:text-lg">
                Turn an everyday work task into a useful AI workflow. Learn to organise information and streamline repetitive work with your first AI agent.
              </p>
              <p className="mt-4 font-semibold text-white">No coding background required.</p>
              <div className="mt-6 space-y-4 text-sm leading-6 text-slate-200">
                <div className="flex gap-3">
                  <CalendarDays aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-teal-300" />
                  <div>
                    <time dateTime="2026-10-17" className="font-bold text-white">17 October 2026</time>
                    <div>10am–12pm (Singapore time)</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-teal-300" />
                  <div>
                    <div className="font-bold text-white">Devan Nair Institute</div>
                    <div>80 Jurong East Street 21, Singapore</div>
                  </div>
                </div>
              </div>
              <Link
                to={WORKSHOP_PATH}
                className="academy-button-inverse mt-7 w-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d1f3d] sm:w-auto"
              >
                REGISTER NOW <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePreviewCTA;
