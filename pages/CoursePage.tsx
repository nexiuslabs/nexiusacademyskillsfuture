import React from 'react';
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

const CoursePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral font-sans text-textDark">
      <SEO
        title="Agentic AI Course Singapore | SkillsFuture Eligible | Nexius Academy"
        description="Learn agentic AI hands-on in our 16-hour SkillsFuture-eligible course. No-code AI automation training designed for non-technical business professionals. Up to 90% subsidy."
        canonical="/courses/agentic-ai"
        ogType="course"
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
      <AIAdvisor />
    </div>
  );
};

export default CoursePage;
