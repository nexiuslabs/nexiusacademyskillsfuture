import React, { useState, useEffect } from 'react';

const CourseNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'skills', label: 'Skills' },
    { id: 'audience', label: 'Audience' },
    { id: 'join', label: 'Join' },
    { id: 'courses', label: 'Courses' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const handleScroll = () => {
    // Logic to highlight active section based on scroll position
    // Add offset to trigger activation slightly before section hits top
    const scrollPosition = window.scrollY + 200; 

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed headers (Main Nav + This Nav)
      // Main nav ~70px, This nav ~56px -> ~126px total offset
      const y = element.getBoundingClientRect().top + window.scrollY - 130; 
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-[60px] md:top-[70px] z-40 bg-white border-b border-gray-200 shadow-sm hidden md:block">
      <div className="container mx-auto px-6">
        <ul className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`py-4 text-base md:text-lg font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeSection === section.id
                    ? 'border-secondary text-secondary'
                    : 'border-transparent text-gray-500 hover:text-primary'
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CourseNavigation;