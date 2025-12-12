import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const StickyNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const APPLY_LINK = "https://www.myskillsfuture.gov.sg/content/portal/en/training-exchange/course-directory/course-detail.html?courseReferenceNumber=TGS-2025059915#courseDetailsSection01";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-accent font-bold text-xl">
              N
            </div>
            <span className="font-heading font-bold text-xl text-primary tracking-tight">
              Nexius<span className="text-accent">Academy</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#overview" className="text-textDark hover:text-accent font-medium transition-colors">Overview</a>
            <a href="#curriculum" className="text-textDark hover:text-accent font-medium transition-colors">Curriculum</a>
            <a href="#pricing" className="text-textDark hover:text-accent font-medium transition-colors">Fees</a>
            <a href="#instructors" className="text-textDark hover:text-accent font-medium transition-colors">Instructors</a>
            <a href="#schedule" className="text-textDark hover:text-accent font-medium transition-colors">Schedule</a>
            <a 
              href={APPLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-2.5 rounded-md font-bold transition-all shadow-lg shadow-blue-900/20"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary hover:text-accent focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <a href="#overview" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Overview</a>
            <a href="#curriculum" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Curriculum</a>
            <a href="#pricing" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Fees</a>
            <a href="#schedule" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Schedule</a>
            <div className="pt-4 pb-2">
               <a 
                href={APPLY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full bg-accent text-white px-5 py-3 rounded-md font-bold"
               >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StickyNavbar;