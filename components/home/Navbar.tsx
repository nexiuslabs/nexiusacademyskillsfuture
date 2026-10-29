import AcademyBrand from '../AcademyBrand';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { openLeadModal } from '../../services/leadModal';

const COURSE_MENU_LINKS = [
  { to: '/courses/agentic-ai/', label: 'Agentic AI Foundations (2-Day)' },
  {
    to: '/courses/advanced-agentic-ai/',
    label: 'Business Innovation (3-Day)',
    ariaLabel: 'Agentic AI-Driven Business Innovation for Productivity',
  },
];

const closeParentDetails = (event: { currentTarget: EventTarget & Element }) => {
  event.currentTarget.closest('details')?.removeAttribute('open');
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('courses');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sections = [
    { id: 'courses', label: 'Courses', isHomeLink: true },
    { id: 'reviews', label: 'Reviews', isHomeLink: true },
    { id: 'blog', label: 'Blog', isLink: true },
    { id: 'about', label: 'About', isLink: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (id: string) => {
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      navigate('/#' + id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-3'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center" aria-label="Nexius Academy home">
            <AcademyBrand />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {sections.map((section) => (
              section.id === 'courses' ? (
                <details key={section.id} className="group relative">
                  <summary
                    className={`flex cursor-pointer list-none items-center gap-1 text-sm font-semibold transition-colors [&::-webkit-details-marker]:hidden ${
                      activeSection === section.id ? 'text-secondary' : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    Courses
                    <ChevronDown size={16} aria-hidden="true" className="transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="absolute left-0 top-full z-50 mt-2 flex w-80 flex-col rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                    <button
                      type="button"
                      onClick={(event) => {
                        closeParentDetails(event);
                        handleSectionClick('courses');
                      }}
                      className="block w-full rounded px-3 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Compare courses
                    </button>
                    {COURSE_MENU_LINKS.map((course) => (
                      <Link
                        key={course.to}
                        to={course.to}
                        aria-label={'ariaLabel' in course ? course.ariaLabel : undefined}
                        onClick={closeParentDetails}
                        className="block rounded px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        {course.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : section.isLink ? (
                <Link
                  key={section.id}
                  to={`/${section.id}/`}
                  className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
                >
                  {section.label}
                </Link>
              ) : (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`text-sm font-semibold transition-colors ${
                    activeSection === section.id
                      ? 'text-secondary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {section.label}
                </button>
              )
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                openLeadModal('navbar_check_subsidy', 'subsidy_fit', {
                  page: location.pathname,
                  position: 'navbar_desktop',
                  ctaLabel: 'check_subsidy',
                })
              }
              className="academy-button-primary hidden md:inline-flex"
            >
              Check Subsidy
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-primary p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-4 pt-4">
              {sections.map((section) => (
                section.id === 'courses' ? (
                  <details key={section.id} className="group">
                    <summary
                      className={`flex cursor-pointer list-none items-center gap-1 py-2 text-left text-base font-semibold [&::-webkit-details-marker]:hidden ${
                        activeSection === section.id ? 'text-secondary' : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      Courses
                      <ChevronDown size={16} aria-hidden="true" className="transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="flex flex-col pl-3">
                      <button
                        type="button"
                        onClick={(event) => {
                          closeParentDetails(event);
                          handleSectionClick('courses');
                        }}
                        className="py-2 text-left text-base font-semibold text-gray-600 hover:text-primary"
                      >
                        Compare courses
                      </button>
                      {COURSE_MENU_LINKS.map((course) => (
                        <Link
                          key={course.to}
                          to={course.to}
                          aria-label={'ariaLabel' in course ? course.ariaLabel : undefined}
                          onClick={(event) => {
                            closeParentDetails(event);
                            setIsMobileMenuOpen(false);
                          }}
                          className="py-2 text-left text-base font-semibold text-gray-600 hover:text-primary"
                        >
                          {course.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : section.isLink ? (
                  <Link
                    key={section.id}
                    to={`/${section.id}/`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-left text-base font-semibold text-gray-600 hover:text-primary transition-colors py-2"
                  >
                    {section.label}
                  </Link>
                ) : (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`text-left text-base font-semibold transition-colors py-2 ${
                      activeSection === section.id
                        ? 'text-secondary'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    {section.label}
                  </button>
                )
              ))}
              <button
                type="button"
                onClick={() => {
                  openLeadModal('navbar_check_subsidy', 'subsidy_fit', {
                    page: location.pathname,
                    position: 'navbar_mobile',
                    ctaLabel: 'check_subsidy',
                  });
                  setIsMobileMenuOpen(false);
                }}
                className="academy-button-primary "
              >
                Check Subsidy
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
