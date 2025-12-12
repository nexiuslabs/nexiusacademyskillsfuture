import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-primary font-bold">N</div>
                    <span className="font-heading font-bold text-xl">Nexius<span className="text-accent">Academy</span></span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                    Nexius Academy is the leading tech bootcamp in Singapore, empowering individuals with in-demand digital skills for the future of work.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"><Facebook size={16} /></a>
                    <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"><Instagram size={16} /></a>
                    <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"><Linkedin size={16} /></a>
                </div>
            </div>

            {/* Links */}
            <div>
                <h4 className="font-bold text-lg mb-6 text-accent">Top Categories</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                    <li><a href="#" className="hover:text-white hover:pl-1 transition-all">Data Science</a></li>
                    <li><a href="#" className="hover:text-white hover:pl-1 transition-all">Generative AI</a></li>
                    <li><a href="#" className="hover:text-white hover:pl-1 transition-all">Digital Marketing</a></li>
                    <li><a href="#" className="hover:text-white hover:pl-1 transition-all">UX Design</a></li>
                </ul>
            </div>

             <div>
                <h4 className="font-bold text-lg mb-6 text-accent">Quick Links</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                    <li><a href="#" className="hover:text-white hover:pl-1 transition-all">About Us</a></li>
                    <li><a href="#" className="hover:text-white hover:pl-1 transition-all">Success Stories</a></li>
                    <li><a href="#" className="hover:text-white hover:pl-1 transition-all">Contact</a></li>
                    <li><a href="#" className="hover:text-white hover:pl-1 transition-all">Corporate Training</a></li>
                </ul>
            </div>

            {/* App CTA */}
            <div>
                 <h4 className="font-bold text-lg mb-6 text-accent">Contact</h4>
                 <p className="text-sm text-gray-300 mb-2">admissions@nexiusacademy.com</p>
                 <p className="text-sm text-gray-300 mb-6">+65 1234 5678</p>
                 <button className="bg-white/10 border border-white/20 hover:bg-white hover:text-primary text-white w-full py-2 rounded mb-2 transition-all">
                    Sign Up for Newsletter
                 </button>
            </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>&copy; 2025 Nexius Academy. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;