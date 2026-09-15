import React, { useEffect, useState } from 'react';
import { Star, CheckCircle, CalendarDays, Clock3, ArrowRight } from 'lucide-react';
import { openRegisterInterestModal } from '../../services/leadModal';
import { SCHEDULES } from '../../constants';
import ResponsiveImage from '../ResponsiveImage';
import { sharedTestimonials } from '../sharedTestimonials';

const TESTIMONIAL_ROTATION_MS = 6500;

const Hero: React.FC = () => {
  const nextCohort = SCHEDULES.find((schedule) => !schedule.registrationClosed && !schedule.interestOnly && (schedule.slotsLeft === undefined || schedule.slotsLeft > 0));
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonial = sharedTestimonials[activeTestimonial];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % sharedTestimonials.length);
    }, TESTIMONIAL_ROTATION_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 pb-12 lg:pt-28 lg:pb-20 overflow-hidden bg-neutral">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
              <Star size={14} className="fill-accent text-accent" />
              Foundation
            </div>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-extrabold text-primary leading-tight max-w-4xl">
              Agentic AI Foundations for Non-Technical Professionals
            </h1>
            <p className="text-base font-semibold leading-relaxed text-primary">Enhancing Productivity and Business Process Automation</p>
            <p className="max-w-2xl text-base leading-relaxed text-gray-700">
              Turn one everyday work task into an AI workflow, with guided practice and human review. No coding background required.
            </p>
            <div className="space-y-2 rounded-xl border border-blue-100 bg-white p-4 text-sm text-gray-700">
              <p className="flex gap-2"><CalendarDays size={18} className="shrink-0 text-accent" /><strong>{nextCohort?.dates ?? 'Next intake to be confirmed'}</strong></p>
              <p className="flex gap-2"><Clock3 size={18} className="shrink-0 text-accent" />{nextCohort?.time ?? '16 hours over two days'} · In person</p>
              {nextCohort && <p>{nextCohort.venue}</p>}
              <p className="font-semibold text-primary">From S$113.03 incl. GST, subject to eligibility.</p>
              <a href="#pricing" className="inline-block text-accent underline">Check your fee — no contact details needed</a>
              {nextCohort?.registrationCloses && <p>Registration closes {nextCohort.registrationCloses}.</p>}
            </div>
            <button type="button" onClick={() => openRegisterInterestModal('course_page_cta', {
              page: '/courses/agentic-ai', position: 'course_hero_registration_help', ctaLabel: 'get_help_registering',
            })} className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 font-bold text-white hover:bg-blue-900">
              Get help registering
            </button>
            <p className="text-sm text-gray-600">Share your name and email. Our team will guide you through official registration with Temasek Polytechnic. An enquiry does not confirm a place.</p>
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
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="shrink-0 text-accent" /> SkillsFuture Eligible
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="shrink-0 text-accent" /> No coding required
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="shrink-0 text-accent" /> Up to 90% Subsidy
              </div>
            </div>
            <a href="#schedule" className="inline-block text-sm font-semibold text-accent underline">Ready to apply? View intake and registration steps</a>
          </div>
          <div className="ml-auto grid w-[124px] shrink-0 justify-items-stretch text-gray-400 sm:w-[180px]">
            <div className="mb-1 whitespace-nowrap text-center text-[8px] font-bold uppercase tracking-[0.12em] sm:text-[10px] sm:tracking-[0.18em]">
              In collaboration with
            </div>
            <div className="overflow-hidden rounded-lg bg-white p-[5%] shadow-sm">
              <img
                src="/images/partners/temasek-poly-full-color-right-align.png"
                alt="Temasek Polytechnic collaboration logo"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
  </section>
  );
};

export default Hero;
