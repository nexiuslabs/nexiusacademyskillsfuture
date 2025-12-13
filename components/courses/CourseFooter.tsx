import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

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

            {/* Subscribe */}
            <div>
                 <h4 className="font-bold text-lg mb-6 text-accent">Subscribe</h4>
                 <p className="text-sm text-gray-300 mb-4">Subscribe to receive latest AI trends.</p>
                 <form onSubmit={handleSubscribe} className="space-y-3">
                   <input
                     type="email"
                     name="email"
                     placeholder="Email Address"
                     required
                     disabled={isSubmitting}
                     className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                   />
                   <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full bg-accent text-white font-bold py-2.5 rounded hover:bg-accent/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                   >
                     {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                   </button>
                   {message && (
                     <div className={`p-2.5 rounded text-xs ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                       {message.text}
                     </div>
                   )}
                 </form>
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