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
import AIAdvisor from '../components/courses/AIAdvisor';
import StickyConversionRail from '../components/courses/StickyConversionRail';
import AIAnswerBlocks from '../components/courses/AIAnswerBlocks';
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
    <div className="min-h-screen bg-neutral font-sans text-textDark pb-20 lg:pb-0">
      <SEO
        title="Agentic AI & AI Agent Course Singapore | Nexius Academy"
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
        <Pricing />
        <Schedule />
        <Instructors />
        <WorkshopGallery />
        <AIAnswerBlocks
          title="Agentic AI Foundations in one page"
          summary="A concise summary of the course, intended audience, learning outcomes, fees, and official funding context."
          citationsPlacement="left"
          blocks={[
            {
              question: 'Which AI agent course in Singapore is designed for non-technical professionals?',
              answer:
                'Agentic AI Foundations for Non-Technical Professionals is a 16-hour in-person AI agent course in Singapore for business users who want practical workflows without learning software engineering. Learners apply AI agents, no-code tools, reusable instructions, and human review habits to workplace tasks.',
            },
            {
              question: 'Who is this course for?',
              answer:
                'The course is for non-technical professionals, SME owners, managers, operations teams, finance teams, HR teams, sales teams, and customer-support teams that want to reduce repetitive drafting, reporting, follow-up, and coordination work while keeping human judgement in the loop.',
            },
            {
              question: 'What will learners be able to do?',
              answer:
                'Learners practise turning common business tasks into structured AI-assisted workflows. They learn to write better instructions, review AI output, protect sensitive information, and identify which tasks are suitable for automation, drafting, synthesis, and internal process support.',
            },
          ]}
          citations={[
            {
              label: 'SkillsFuture employer funding guidance',
              href: 'https://www.skillsfuture.gov.sg/initiatives/employers',
            },
            {
              label: 'Enhanced Training Support for SMEs',
              href: 'https://www.skillsfuture.gov.sg/initiatives/employers/enhanced-training-support-for-smes',
            },
            {
              label: 'IMDA AI Verify and AI governance',
              href: 'https://www.imda.gov.sg/how-we-can-help/ai-verify',
            },
            {
              label: 'Singapore National AI Strategy update',
              href: 'https://www.mddi.gov.sg/newsroom/update-to-singapore-s-national-ai-strategy--refreshed-priorities-to-harness-ai-for-the-public-good-factsheet/',
            },
          ]}
        />
        <section className="bg-white py-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-7 sm:p-9">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">Compare before you enrol</p>
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
      <AIAdvisor />
    </div>
  );
};

export default CoursePage;
