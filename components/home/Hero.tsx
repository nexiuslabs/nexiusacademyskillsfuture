import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
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
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 bg-neutral overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E6F0F9] rounded-bl-[200px] -z-10 hidden lg:block"></div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 z-10">
          <div className="inline-block px-3 py-1 bg-white rounded-full shadow-sm text-xs font-bold text-secondary tracking-wide uppercase mb-2">
            SkillsFuture-supported practical AI training
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight max-w-3xl">
            Practical agentic AI training for non-technical teams
          </h1>
          <p className="text-charcoal text-lg md:text-xl max-w-2xl leading-relaxed">
            Learn no-code AI workflows to draft faster, automate repetitive work, and improve team productivity.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 pt-2 max-w-3xl">
            <div className="bg-white/90 border border-blue-100 rounded-2xl px-4 py-4 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Best for</div>
              <div className="font-semibold text-primary">Ops, finance, sales, admin</div>
            </div>
            <div className="bg-white/90 border border-blue-100 rounded-2xl px-4 py-4 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Outcome</div>
              <div className="font-semibold text-primary">Faster drafts, fewer repetitive tasks</div>
            </div>
            <div className="bg-white/90 border border-blue-100 rounded-2xl px-4 py-4 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Approach</div>
              <div className="font-semibold text-primary">No-code, hands-on</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
            <div className="select-none transform transition-transform hover:scale-105 duration-300 origin-left cursor-pointer">
              <svg
                viewBox="0 0 350 160"
                className="w-40 md:w-48 h-auto drop-shadow-md"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Up to 70% Course Subsidy + SkillsFuture Balance Fees Claimable"
              >
                <circle cx="80" cy="80" r="78" fill="#EAF4FF" stroke="#8EB6F7" strokeWidth="3" />
                <text x="80" y="52" textAnchor="middle" fill="#1D2A4D" fontSize="14" fontWeight="bold" fontFamily="sans-serif">Up to</text>
                <text x="80" y="102" textAnchor="middle" fill="#1D2A4D" fontSize="60" fontWeight="800" fontFamily="sans-serif">70%</text>
                <text x="80" y="126" textAnchor="middle" fill="#1D2A4D" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Course Subsidy</text>
                <text x="175" y="95" textAnchor="middle" fill="#1D2A4D" fontSize="40" fontWeight="bold" fontFamily="sans-serif">+</text>
                <circle cx="270" cy="80" r="78" fill="#FFFFFF" stroke="#C8DBF9" strokeWidth="3" />
                <text x="270" y="55" textAnchor="middle" fill="#1D2A4D" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.2">Balance Fees Claimable</text>
                <g transform="translate(225, 75)">
                  <rect x="0" y="0" width="8" height="8" rx="2" fill="#D71E28" />
                  <rect x="0" y="9" width="8" height="8" rx="2" fill="#4F2D7F" />
                  <rect x="9" y="9" width="8" height="8" rx="2" fill="#4F2D7F" />
                  <text x="20" y="15" fill="#4F2D7F" fontSize="19" fontWeight="bold" fontFamily="sans-serif">skills</text>
                  <text x="65" y="15" fill="#4F2D7F" fontSize="19" fontFamily="serif" fontStyle="italic">future</text>
                </g>
              </svg>
            </div>

            <a
              href="#courses"
              className="flex items-center gap-3 px-6 py-3 rounded-lg font-bold bg-secondary text-white hover:bg-opacity-90 transition-all group shadow-lg"
            >
              <div className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <BookOpen size={24} className="text-secondary" />
              </div>
              <span className="text-base md:text-lg">Browse Courses</span>
            </a>
          </div>
        </div>

        <div className="relative z-10 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

            <ResponsiveImage
              src="/images/homepage-hero.jpg"
              alt="Large classroom audience at a Nexius Academy workshop"
              loading="eager"
              fetchPriority="high"
              widths={[480, 768, 960]}
              sizes="(max-width: 1024px) 100vw, 448px"
              fit="cover"
              className="relative rounded-3xl shadow-2xl z-10 w-full max-w-md object-cover h-[500px] lg:h-[600px]"
            />

            <div className="absolute top-20 -left-10 bg-white p-4 rounded-xl shadow-lg z-20 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <p className="font-bold text-primary text-lg">500+</p>
                  <p className="text-xs text-gray-500">Learners</p>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-4 bottom-5 z-20 rounded-2xl bg-white/95 p-5 shadow-2xl ring-1 ring-primary/10 backdrop-blur-md md:inset-x-6 lg:left-8 lg:right-6">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-3xl leading-none text-secondary" aria-hidden="true">“</span>
                <div className="min-h-[142px] flex-1">
                  <p className="line-clamp-4 text-sm font-medium leading-relaxed text-primary md:text-base" aria-live="polite">
                    {testimonial.quote}
                  </p>
                  <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-secondary">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.title}</p>
                    </div>
                    <a
                      href="#reviews"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-secondary hover:text-primary"
                    >
                      More testimonials
                      <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
