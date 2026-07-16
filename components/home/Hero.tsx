import React from 'react';
import { BookOpen } from 'lucide-react';
import ResponsiveImage from '../ResponsiveImage';

const Hero: React.FC = () => {
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
                  <p className="font-bold text-primary text-lg">Hands-on</p>
                  <p className="text-xs text-gray-500">Guided learning</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 -right-5 bg-white p-4 rounded-xl shadow-lg z-20 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600 font-bold">
                  AI
                </div>
                <div>
                  <p className="font-bold text-primary text-sm">Business-first</p>
                  <p className="text-xs text-gray-500">Applied outcomes</p>
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
