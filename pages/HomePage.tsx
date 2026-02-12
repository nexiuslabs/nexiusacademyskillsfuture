import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import About from '../components/home/About';
import Categories from '../components/home/Categories';
import StatsStrip from '../components/home/StatsStrip';
import CourseList from '../components/home/CourseList';
import InstructorCTA from '../components/home/InstructorCTA';
import Testimonials from '../components/home/Testimonials';
import BottomSection from '../components/home/BottomSection';
import Footer from '../components/home/Footer';
import AIAdvisor from '../components/courses/AIAdvisor';

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="font-body text-charcoal bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <About />
        <Categories />

        <section id="audience" className="bg-white py-12 md:py-16 text-center scroll-mt-32">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">AI Training Singapore: The People We've Empowered</h2>
            <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full mb-8"></div>
            <p className="text-gray-500 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Our AI workshops for business professionals are designed for non-coders, managers, and SME leaders ready to harness agentic AI to automate workflows and drive efficiency — no coding required.
            </p>
          </div>
        </section>

        <StatsStrip />
        <InstructorCTA />
        <CourseList />
        <Testimonials />
        <BottomSection />
      </main>
      <Footer />
      <AIAdvisor />
    </div>
  );
};

export default HomePage;
