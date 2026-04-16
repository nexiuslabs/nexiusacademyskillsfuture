import React from 'react';
import { Star, CheckCircle, CalendarDays, Clock3, Presentation, Wallet } from 'lucide-react';
import { openLeadModal } from '../../services/leadModal';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-neutral">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
              <Star size={14} className="fill-accent text-accent" />
              TP-NC-C0021-F
            </div>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-extrabold text-primary leading-tight max-w-4xl">
              Practical agentic AI training for non-technical professionals
            </h1>

            <div className="grid sm:grid-cols-2 gap-3 bg-white/90 border border-blue-100 rounded-xl p-5">
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <CalendarDays size={16} className="text-accent mt-0.5" />
                <div>
                  <div>Next Cohorts:</div>
                  <div>• 18–19 May 2026</div>
                  <div>• 08–09 Jun 2026</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Presentation size={16} className="text-accent" />
                Format: In-Person
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock3 size={16} className="text-accent" />
                Duration: 16 Hours
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Wallet size={16} className="text-accent" />
                Net Fee: from S$113.03*
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Learn how to apply AI to repetitive work and internal drafting with a no-code approach for business teams.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 bg-white border border-blue-100 rounded-2xl p-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Best for</div>
                <div className="font-semibold text-primary text-sm">Non-technical teams, managers, SMEs</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Primary path</div>
                <div className="font-semibold text-primary text-sm">Reserve a Seat</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Need help first?</div>
                <div className="font-semibold text-primary text-sm">Check subsidy before applying</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() =>
                  openLeadModal('course_page_cta', 'subsidy_fit', {
                    page: '/courses/agentic-ai',
                    position: 'course_hero_primary',
                    ctaLabel: 'check_subsidy_eligibility',
                  })
                }
                className="bg-primary hover:bg-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl shadow-blue-900/20 transition-all transform hover:-translate-y-1"
              >
                Check Subsidy
              </button>
              <button
                type="button"
                onClick={() =>
                  openLeadModal('course_page_cta', 'reserve_seat', {
                    page: '/courses/agentic-ai',
                    position: 'course_hero_secondary_apply_now',
                    ctaLabel: 'reserve_a_seat',
                  })
                }
                className="bg-white border-2 border-primary text-primary hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg transition-all text-center"
              >
                Reserve a Seat
              </button>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="text-accent" /> SkillsFuture Eligible
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="text-accent" /> No coding required
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="text-accent" /> Up to 90% Subsidy
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border-4 border-white min-h-[400px]">
              <img
                src="/images/courses/agentic-ai-hero.jpg"
                alt="Classroom participants at a Nexius Academy AI workshop"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <p className="font-heading font-bold text-primary text-lg mb-2">
                  "We are grateful for the highly insightful learnings that will be instrumental in our effective adoption of AI tools."
                </p>
                <p className="text-sm font-medium text-accent">Jacky Wong, Chief Librarian of NIE</p>
              </div>
            </div>
            <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-accent/10 rounded-3xl transform rotate-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
