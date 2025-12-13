import React from 'react';
import StickyNavbar from '../components/courses/StickyNavbar';
import CourseHero from '../components/courses/CourseHero';
import Overview from '../components/courses/Overview';
import Curriculum from '../components/courses/Curriculum';
import Pricing from '../components/courses/Pricing';
import Schedule from '../components/courses/Schedule';
import Instructors from '../components/courses/Instructors';
import CourseTestimonials from '../components/courses/CourseTestimonials';
import FAQ from '../components/courses/FAQ';
import AIAdvisor from '../components/courses/AIAdvisor';

const CoursePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral font-sans text-textDark">
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
      <AIAdvisor />
    </div>
  );
};

export default CoursePage;
