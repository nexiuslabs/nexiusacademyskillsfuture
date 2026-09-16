import React, { useEffect, useState } from 'react';
import { openRegisterInterestModal } from '../../services/leadModal';
import { trackOutboundClick } from '../../services/analytics';

const StickyConversionRail: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(true);
  useEffect(() => {
    const hero = document.getElementById('foundation-hero-register');
    if (!hero) { setHeroVisible(false); return; }
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return (
  <aside aria-label="Registration help" className={`fixed bottom-0 inset-x-0 z-50 border-t border-gray-200 bg-white p-3 shadow-lg ${heroVisible ? 'lg:hidden' : ''}`}>
    <div className="mx-auto flex max-w-3xl items-center justify-center gap-3">
      <button type="button" onClick={() => openRegisterInterestModal('course_sticky', {
        page: '/courses/agentic-ai', position: 'course_sticky_registration_help', ctaLabel: 'get_help_registering',
      })} className="academy-button-primary flex-1 !px-4 !text-sm">
        Sign Me Up
      </button>
      <a href="https://wa.me/6596615284?text=Hi%20Cariah%2C%20I%20need%20help%20registering%20for%20Agentic%20AI%20Foundations."
        target="_blank" rel="noopener noreferrer"
        onClick={() => trackOutboundClick({ channel: 'whatsapp', pagePath: '/courses/agentic-ai', position: 'course_sticky_whatsapp' })}
        className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-primary">WhatsApp</a>
    </div>
  </aside>
);
};
export default StickyConversionRail;
