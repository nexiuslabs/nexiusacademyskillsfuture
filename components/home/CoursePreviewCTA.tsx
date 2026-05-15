import React from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const COURSE_PREVIEW_REGISTER_URL = 'https://event.e2i.com.sg/view-event/agentic-ai-foundations-for-non-technical-professionals';

const CoursePreviewCTA: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="overflow-hidden rounded-[1.75rem] bg-primary shadow-2xl">
          <div className="grid lg:grid-cols-[minmax(0,1fr),360px]">
            <Link to="/course-preview" className="group block aspect-square bg-primary md:aspect-auto md:min-h-[360px]">
              <picture>
                <source media="(max-width: 767px)" srcSet="/images/home/course-preview-cta-mobile.jpg" />
                <img
                  src="/images/home/course-preview-cta.jpg"
                  alt="Agentic AI Foundations for Non-Technical Professionals 3-hour hands-on workshop"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </picture>
            </Link>

            <div className="flex flex-col justify-center bg-[#0d1f3d] px-6 py-8 text-white md:px-8">
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-secondary">
                Course Preview
              </div>
              <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                Join the next Agentic AI preview session
              </h2>
              <div className="mt-6 space-y-4 text-sm text-white/80">
                <div className="flex gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 flex-none text-secondary" />
                  <div>
                    <div className="font-bold text-white">17 June 2026</div>
                    <div>Wednesday, 2:00pm to 5:00pm</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-none text-secondary" />
                  <div>
                    <div className="font-bold text-white">Devan Nair Institute</div>
                    <div>80 Jurong East St 21, Singapore 609607</div>
                  </div>
                </div>
              </div>
              <a
                href={COURSE_PREVIEW_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-teal-400 px-6 py-4 text-base font-bold text-black shadow-lg transition-colors hover:bg-teal-300"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePreviewCTA;
