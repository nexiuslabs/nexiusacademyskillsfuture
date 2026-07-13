import React, { useEffect, useState } from 'react';
import { Star, CheckCircle, CalendarDays, Clock3, Presentation, Wallet, ArrowRight } from 'lucide-react';
import { openLeadModal, openRegisterInterestModal } from '../../services/leadModal';
import ResponsiveImage from '../ResponsiveImage';
import { sharedTestimonials } from '../sharedTestimonials';

const TESTIMONIAL_ROTATION_MS = 6500;

const Hero: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonial = sharedTestimonials[activeTestimonial];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % sharedTestimonials.length);
    }, TESTIMONIAL_ROTATION_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-neutral">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
              <Star size={14} className="fill-accent text-accent" />
              Foundation
            </div>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-extrabold text-primary leading-tight max-w-4xl">
              Agentic AI Foundations for Non-technical Professionals
            </h1>
            <p className="text-lg font-bold uppercase tracking-[0.18em]">
              <a
                href="https://academy.nexiuslabs.com/courses/agentic-ai/"
                className="text-accent hover:text-primary transition-colors"
              >
                Enhancing Productivity and Business Process Automation
              </a>
            </p>

            <div className="grid sm:grid-cols-2 gap-3 bg-white/90 border border-blue-100 rounded-xl p-5">
              <div className="flex min-h-[96px] items-start gap-3 rounded-xl bg-white px-4 py-4 text-sm text-gray-700 shadow-sm">
                <CalendarDays size={16} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-primary mb-1">Next Cohort</div>
                  <div className="text-gray-600">14 Aug &amp; 21 Aug 2026</div>
                  <a href="#schedule" className="inline-flex items-center mt-2 text-sm font-semibold text-accent hover:underline">
                    More
                  </a>
                </div>
              </div>
              <div className="flex min-h-[96px] items-start gap-3 rounded-xl bg-white px-4 py-4 text-sm text-gray-700 shadow-sm">
                <Presentation size={16} className="text-accent mt-0.5 shrink-0" />
                <div className="font-medium leading-6 text-gray-700">Format: In-Person</div>
              </div>
              <div className="flex min-h-[64px] items-start gap-3 rounded-xl bg-white px-4 py-4 text-sm text-gray-700 shadow-sm">
                <Clock3 size={16} className="text-accent mt-0.5 shrink-0" />
                <div className="font-medium leading-6 text-gray-700">Duration: 16 Hours</div>
              </div>
              <div className="flex min-h-[64px] items-start gap-3 rounded-xl bg-white px-4 py-4 text-sm text-gray-700 shadow-sm">
                <Wallet size={16} className="text-accent mt-0.5 shrink-0" />
                <div className="font-medium leading-6 text-gray-700">Net Fee: from S$113.03*</div>
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
                <div className="font-semibold text-primary text-sm">Register interest for the next cohort</div>
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
                  openRegisterInterestModal('course_page_cta', {
                    page: '/courses/agentic-ai',
                    position: 'course_hero_secondary_register_interest',
                  })
                }
                className="bg-white border-2 border-primary text-primary hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg transition-all text-center"
              >
                Register Interest
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl shadow-blue-900/20">
              <ResponsiveImage
                src="/images/courses/agentic-ai-class-photo.jpg"
                alt="Classroom participants at a Nexius Academy AI workshop"
                loading="eager"
                fetchPriority="high"
                widths={[640, 960, 1200]}
                sizes="(max-width: 1024px) 100vw, 50vw"
                fit="contain"
                className="absolute inset-0 h-full w-full object-contain object-center"
              />
            </div>
            <div className="relative z-10 mx-4 -mt-4 rounded-xl bg-white p-6 shadow-lg sm:mx-8">
              <p className="line-clamp-4 font-heading text-lg font-bold text-primary" aria-live="polite">
                “{testimonial.quote}”
              </p>
              <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-accent">
                  {testimonial.name}, {testimonial.title}
                </p>
                <a
                  href="#testimonials"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-accent hover:text-primary"
                >
                  More testimonials
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="absolute -z-10 top-10 -right-10 w-4/5 h-4/5 bg-accent/10 rounded-3xl transform rotate-3"></div>
          </div>
        </div>
        <div className="mt-4 text-right sm:pr-6 lg:pr-8">
          <div className="inline-flex flex-col items-end text-gray-400">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em]">
              In collaboration with
            </div>
            <ResponsiveImage
              src="/images/partners/temasek-poly-logo-transparent.png"
              alt="Temasek Polytechnic collaboration logo"
              widths={[128, 256]}
              sizes="224px"
              fit="contain"
              className="h-10 w-auto object-contain sm:h-12"
            />
          </div>
        </div>
      </div>
  </section>
  );
};

export default Hero;

