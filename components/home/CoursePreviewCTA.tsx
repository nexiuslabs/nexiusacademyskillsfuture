import React from 'react';
import { ArrowRight, CalendarDays, MailCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ResponsiveImage from '../ResponsiveImage';
import { openLeadModal } from '../../services/leadModal';

const openFreePreviewInterest = () =>
  openLeadModal('free_preview', 'reserve_seat', {
    page: '/',
    position: 'home_course_preview_cta',
    ctaLabel: 'register_interest_next_free_preview',
    preferredIntake: 'Free preview — register interest for the next session',
    cohortCode: 'free-preview-next-session',
    courseSlug: 'free-preview',
  });

const CoursePreviewCTA: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="overflow-hidden rounded-[1.75rem] bg-primary shadow-2xl">
          <div className="grid lg:grid-cols-[minmax(0,1fr),360px]">
            <Link to="/course-preview" className="group block aspect-square bg-primary md:aspect-auto">
              <picture className="block h-full">
                <source media="(max-width: 767px)" srcSet="/images/home/course-preview-cta-mobile.jpg" />
                <ResponsiveImage
                  src="/images/home/course-preview-cta.jpg"
                  alt="Agentic AI Foundations for Non-Technical Professionals 3-hour hands-on workshop"
                  widths={[768, 1200]}
                  sizes="(max-width: 1024px) 100vw, 360px"
                  fit="contain"
                  className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </picture>
            </Link>

            <div className="flex flex-col justify-center bg-[#0d1f3d] px-6 py-7 text-white md:px-8">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-secondary">
                Free Preview
              </div>
              <h2 className="text-2xl font-bold leading-tight md:text-3xl lg:text-[2rem]">
                Watch out for our next Agentic AI preview session
              </h2>
              <div className="mt-5 space-y-4 text-sm text-white/80">
                <div className="flex gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 flex-none text-secondary" />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white">Next date to be announced</span>
                      <span className="rounded-full bg-teal-400 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#0d1f3d] shadow-lg shadow-teal-950/20">
                        Apply Now
                      </span>
                    </div>
                    <div>Leave your details and we will notify you when the next free preview opens.</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MailCheck className="mt-0.5 h-5 w-5 flex-none text-secondary" />
                  <div>
                    <div className="font-bold text-white">Interested parties welcome</div>
                    <div>We will follow up with the next session details once confirmed.</div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={openFreePreviewInterest}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-teal-400 px-6 py-3.5 text-base font-bold text-black shadow-lg transition-colors hover:bg-teal-300"
              >
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePreviewCTA;
