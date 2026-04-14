import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import { trackOutboundClick } from '../../services/analytics';

const Footer: React.FC = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mjqucyoobkwvzcrordfg.supabase.co';
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qcXVjeW9vYmt3dnpjcm9yZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTU2NTEsImV4cCI6MjA2ODgzMTY1MX0.AvnG-ozOJ3TyZmD4nS9F9JHbod35nSAdERUbL_4yjts';

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/subscribe-newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({ email }),
      });

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
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-lg">N</div>
              <span className="text-2xl font-bold">Nexius<span className="text-accent">Academy</span></span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Hands-on AI training for non-technical professionals and SMEs. WSQ-aligned, SkillsFuture-eligible, and outcome-driven.
            </p>
            <a
              href="https://www.linkedin.com/company/105886234/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-accent"
            >
              <Linkedin size={16} /> Follow us on LinkedIn
            </a>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5">Courses</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/courses/agentic-ai" className="hover:text-accent">Agentic AI Foundations</Link></li>
              <li><Link to="/skillsfuture-funding-guide" className="hover:text-accent">SkillsFuture Funding Guide</Link></li>
              <li><Link to="/courses/agentic-ai" className="hover:text-accent">Upcoming Cohort</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-accent">About</Link></li>
              <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
              <li><a href="mailto:hello@nexiuslabs.com" className="hover:text-accent">Contact</a></li>
              <li><a href="https://wa.me/6596615284?text=Hi%20Wendy%2C%20I%20need%20help%20from%20a%20course%20advisor." target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundClick({ channel: 'whatsapp', pagePath: location.pathname, position: 'footer_whatsapp_advisor' })} className="hover:text-accent">WhatsApp Advisor</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5">Subscribe</h4>
            <p className="text-gray-300 text-sm mb-4">Get practical AI tips and new intake updates.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-[#2A3B66] border border-gray-700 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© 2026 Nexius Academy. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="https://www.nexiuslabs.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Privacy</a>
            <a href="https://www.nexiuslabs.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
