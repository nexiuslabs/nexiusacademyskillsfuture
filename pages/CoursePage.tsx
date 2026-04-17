import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import StickyNavbar from '../components/courses/StickyNavbar';
import CourseHero from '../components/courses/CourseHero';
import Overview from '../components/courses/Overview';
import Curriculum from '../components/courses/Curriculum';
import Pricing from '../components/courses/Pricing';
import Schedule from '../components/courses/Schedule';
import Instructors from '../components/courses/Instructors';
import CourseTestimonials from '../components/courses/CourseTestimonials';
import FAQ from '../components/courses/FAQ';
import CourseFooter from '../components/courses/CourseFooter';
import AIAdvisor from '../components/courses/AIAdvisor';
import StickyConversionRail from '../components/courses/StickyConversionRail';
import { trackCourseScrollDepth } from '../services/analytics';

const CoursePage: React.FC = () => {
  useEffect(() => {
    const firedDepths = new Set<number>();
    const milestones = [25, 50, 75, 90];

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (pageHeight <= 0) return;

      const depth = Math.round((scrollTop / pageHeight) * 100);
      milestones.forEach((milestone) => {
        if (depth >= milestone && !firedDepths.has(milestone)) {
          firedDepths.add(milestone);
          trackCourseScrollDepth({ depthPercent: milestone, pagePath: '/courses/agentic-ai' });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral font-sans text-textDark pb-20 lg:pb-0">
      <SEO
        title="Agentic AI Course Singapore | SkillsFuture Eligible | Nexius Academy"
        description="Learn agentic AI hands-on in our 16-hour SkillsFuture-eligible course. No-code AI automation training designed for non-technical business professionals. Up to 90% subsidy."
        canonical="/courses/agentic-ai"
        ogType="course"
        ogImage="https://academy.nexiuslabs.com/images/og/agentic-ai-course-og.jpg"
      />
      <StickyNavbar />
      <main>
        <CourseHero />
        <Overview />
        <Curriculum />
        <Pricing />
        <section className="bg-white pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-primary/10 bg-neutral px-6 py-8 shadow-sm md:px-8">
              <div className="grid gap-5 md:grid-cols-[1fr,auto] md:items-center">
                <div>
                  <div className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">For Company Teams</div>
                  <h2 className="text-2xl font-bold text-primary">Need a private class for your team instead?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    If you are planning an internal company cohort, view the dedicated private-class page for the team-focused format.
                  </p>
                </div>
                <Link
                  to="/private-class"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-900"
                >
                  View Private Class
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Schedule />
        <Instructors />
        <CourseTestimonials />
        <FAQ />
      </main>
      <CourseFooter />
      <StickyConversionRail />
      <AIAdvisor />
    </div>
  );
};

export default CoursePage;
