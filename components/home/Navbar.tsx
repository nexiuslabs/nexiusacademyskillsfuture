import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-accent font-bold text-xl">
              N
            </div>
            <span className="font-heading font-bold text-xl text-primary tracking-tight">
              Nexius<span className="text-accent">Academy</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {sections.map((section) => (
              section.isLink ? (
                <Link
                  key={section.id}
                  to={`/${section.id}`}
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
            <Link to="/courses/agentic-ai" className="hidden md:inline-block bg-primary text-white px-6 py-2.5 rounded-md text-base font-semibold hover:bg-opacity-90 transition-all shadow-md">
              Get Started
            </Link>

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
                section.isLink ? (
                  <Link
                    key={section.id}
                    to={`/${section.id}`}
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
              <Link
                to="/courses/agentic-ai"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-primary text-white px-6 py-3 rounded-md text-base font-semibold hover:bg-opacity-90 transition-all shadow-md text-center mt-2"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;