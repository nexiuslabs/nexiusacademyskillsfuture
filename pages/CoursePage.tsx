import React, { useEffect } from 'react';
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
