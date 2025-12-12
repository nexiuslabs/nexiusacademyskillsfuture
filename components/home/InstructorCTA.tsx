import React from 'react';

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
        <div className="max-w-xl text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Upskill Yourself?</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Master Agentic AI to eliminate manual work, automate your entire business processes, and achieve instant, measurable productivity gains.
          </p>
          <a
            href="https://www.myskillsfuture.gov.sg/content/portal/en/training-exchange/course-directory/course-detail.html?courseReferenceNumber=TGS-2025059915#courseDetailsSection01"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary text-white px-8 py-3 rounded-md font-bold shadow-lg hover:bg-white hover:text-secondary transition-colors"
          >
            Register Today
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default InstructorCTA;