import React from 'react';
import { openLeadModal } from '../../services/leadModal';

const InstructorCTA: React.FC = () => {
  return (
    <section id="join" className="relative py-28 bg-primary overflow-hidden scroll-mt-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://picsum.photos/1920/600?grayscale" 
          alt="Office Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent z-10"></div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-2xl text-white">
          <div className="text-sm font-bold uppercase tracking-[0.16em] text-blue-100 mb-3">Ready to get started?</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Train for practical AI adoption</h2>
          <p className="text-gray-300 mb-8 leading-relaxed max-w-xl">
            Join a hands-on workshop built to help non-technical professionals automate repetitive work and improve draft quality.
          </p>
          <button
            type="button"
            onClick={() =>
              openLeadModal('home_cta', 'reserve_seat', {
                page: '/',
                position: 'home_instructor_cta',
                ctaLabel: 'register_today',
                redirectUrl: 'https://stms.polite.edu.sg/cetapi/api/v1/custom/extendauthorize?id_token=rHHqe3GLYxhIYwh82qTpAKuHaXtejYUMXXcX5m42t14MVbIM54f%2BJo2weFWoM7%2Fu',
              })
            }
            className="inline-block bg-secondary text-white px-8 py-3 rounded-md font-bold shadow-lg hover:bg-white hover:text-secondary transition-colors"
          >
            Register Now
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default InstructorCTA;
