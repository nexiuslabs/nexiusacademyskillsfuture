import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/subscribe-newsletter`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Successfully subscribed!' });
        e.currentTarget.reset();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to subscribe' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">N</div>
            <span className="text-2xl font-bold font-sans">NexiusAcademy</span>
          </div>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Nexius Academy offers hands-on AI training in Singapore for business professionals. Master agentic AI courses, no-code AI workshops, and generative AI masterclasses designed for non-technical teams.
          </p>
          <div className="flex space-x-3">
             <a href="#" className="w-8 h-8 bg-[#2A3B66] flex items-center justify-center rounded hover:bg-secondary transition-colors"><Facebook size={16} /></a>
             <a href="#" className="w-8 h-8 bg-[#2A3B66] flex items-center justify-center rounded hover:bg-secondary transition-colors"><Instagram size={16} /></a>
             <a href="https://www.linkedin.com/company/105886234/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#2A3B66] flex items-center justify-center rounded hover:bg-secondary transition-colors"><Linkedin size={16} /></a>
             <a href="#" className="w-8 h-8 bg-[#2A3B66] flex items-center justify-center rounded hover:bg-secondary transition-colors"><Twitter size={16} /></a>
             <a href="#" className="w-8 h-8 bg-[#2A3B66] flex items-center justify-center rounded hover:bg-secondary transition-colors"><Youtube size={16} /></a>
          </div>
        </div>

        {/* Top 4 Category */}
        <div>
          <h4 className="font-bold text-lg mb-6">TOP 3 CATEGORY</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-secondary">Agentic AI</a></li>
            <li><a href="#" className="hover:text-secondary">AI Agents</a></li>
            <li><a href="#" className="hover:text-secondary">AI Automation</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-6">QUICK LINKS</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-secondary">About</a></li>
            <li><a href="#" className="hover:text-secondary flex items-center gap-2">Browse Courses <span className="text-secondary">→</span></a></li>
            <li><a href="#" className="hover:text-secondary">Contact</a></li>
            <li><a href="#" className="hover:text-secondary">Career</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
           <h4 className="font-bold text-lg mb-6">SUBSCRIBE</h4>
           <p className="text-gray-400 text-sm mb-4">Subscribe to receive latest AI trends.</p>
           <form onSubmit={handleSubscribe} className="space-y-3">
             <input
               type="email"
               name="email"
               placeholder="Email Address"
               required
               disabled={isSubmitting}
               className="w-full px-4 py-3 bg-[#2A3B66] border border-gray-700 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-secondary transition-colors disabled:opacity-50"
             />
             <button
               type="submit"
               disabled={isSubmitting}
               className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-secondary/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
             >
               {isSubmitting ? 'Subscribing...' : 'Subscribe'}
             </button>
             {message && (
               <div className={`p-3 rounded-lg text-xs ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                 {message.text}
               </div>
             )}
           </form>
        </div>

      </div>

      <div className="container mx-auto px-6 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2025 - Nexius Academy. All rights reserved</p>
        <div className="mt-4 md:mt-0">
          <select className="bg-transparent border border-gray-700 text-gray-400 rounded px-2 py-1 outline-none">
            <option>English</option>
            <option>Chinese</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;