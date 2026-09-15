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
import WorkshopGallery from '../components/courses/WorkshopGallery';
import CourseTestimonials from '../components/courses/CourseTestimonials';
import FAQ from '../components/courses/FAQ';
import CourseFooter from '../components/courses/CourseFooter';
import StickyConversionRail from '../components/courses/StickyConversionRail';
import TPPositioningBlock from '../components/courses/TPPositioningBlock';
import { trackCourseScrollDepth, trackSectionView, trackTimeOnPage } from '../services/analytics';

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

  useEffect(() => {
    const timers = [15, 30, 60, 120].map((seconds) =>
      window.setTimeout(() => {
        trackTimeOnPage({
          pagePath: '/courses/agentic-ai',
          seconds,
        });
      }, seconds * 1000)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    const sectionEventMap = [
      { id: 'pricing', eventName: 'pricing_section_viewed' },
      { id: 'schedule', eventName: 'schedule_section_viewed' },
      { id: 'testimonials', eventName: 'testimonials_section_viewed' },
      { id: 'faq', eventName: 'faq_section_viewed' },
    ];

    const seenSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;
          if (!sectionId || seenSections.has(sectionId)) return;

          seenSections.add(sectionId);
          const eventConfig = sectionEventMap.find((section) => section.id === sectionId);
          if (!eventConfig) return;

          trackSectionView({
            eventName: eventConfig.eventName,
            pagePath: '/courses/agentic-ai',
            sectionId,
          });
        });
      },
      {
        threshold: 0.5,
      }
    );

    sectionEventMap.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-neutral font-sans text-textDark pb-24">
      <SEO
        title="Agentic AI Foundations for Non-Technical Professionals | Nexius Academy"
        description="Take a 16-hour agentic AI and AI agent course in Singapore for non-technical professionals. Build no-code workflows and check current SkillsFuture support."
        canonical="/courses/agentic-ai"
        ogType="course"
        ogImage="https://academy.nexiuslabs.com/images/og/agentic-ai-course-og.jpg"
      />
      <StickyNavbar />
      <main>
        <CourseHero />
        <Overview />
        <Curriculum />
        <Pricing reserveButtonText="Sign Me Up" />
        <Schedule />
        <Instructors />
        <WorkshopGallery />
        <section className="bg-white py-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-7 sm:p-9">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">Compare before you enrol</p>
              <div className="mb-8 border-b border-blue-100 pb-8" aria-labelledby="foundation-advanced-fit">
                <h2 id="foundation-advanced-fit" className="mb-3 text-2xl font-heading font-bold text-primary">Should I choose Foundation or Advanced?</h2>
                <div className="space-y-4 leading-relaxed text-gray-600">
                  <p>Choose <strong>Agentic AI Foundations</strong> if you want guided practice turning everyday workplace tasks into AI-assisted workflows. The two-day course is designed for non-technical professionals and covers context, no-code workflows and reviewing AI output.</p>
                  <p>Explore <strong>Advanced Agentic AI</strong> if your learning goal is to coordinate work across departments, define human accountability, and plan governance and organisational transformation. The three-day course focuses on orchestration and a transformation roadmap.</p>
                  <p>For example, preparing a single team's weekly report and designing a service-request workflow spanning several departments raise different learning needs. These are illustrative ways to think about course fit, not promised course exercises or completed project outcomes.</p>
                  <p>
                    Compare the <a href="#curriculum" className="font-bold text-accent underline hover:text-primary">Foundation curriculum</a> with the <Link to="/courses/advanced-agentic-ai/" className="font-bold text-accent underline hover:text-primary">Advanced course outline</Link>. Still unsure? Use <strong>Get help registering</strong> to tell us your role and the workflow you want to improve. An enquiry does not confirm a place.
                  </p>
                </div>
              </div>
              <h2 className="mb-3 text-2xl font-heading font-bold text-primary">Is this the best AI course in Singapore for your goal?</h2>
              <p className="mb-5 leading-relaxed text-gray-600">
                The right programme depends on your role, desired outcome, technical level, delivery format, funding eligibility, and the evidence you expect to leave with. If you are comparing an AI agent course in Singapore with SkillsFuture support, review the published subsidy tiers as well as the practical work product. Use our transparent comparison guide to assess those factors before choosing.
              </p>
              <Link
                to="/blog/best-ai-courses-singapore-2026"
                className="inline-flex items-center font-bold text-accent hover:text-primary hover:underline"
              >
                Compare the best AI and agentic AI course options in Singapore, including SkillsFuture →
              </Link>
            </div>
          </div>
        </section>
        <TPPositioningBlock />
        <CourseTestimonials />
        <FAQ />
      </main>
      <CourseFooter />
      <StickyConversionRail />
    </div>
  );
};

export default CoursePage;
