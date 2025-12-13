import React from 'react';
import { Link } from 'react-router-dom';

const BlogCTA: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Upskill Yourself?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            Master Agentic AI to eliminate manual work, automate your entire business processes, and achieve instant, measurable productivity gains.
          </p>
          <Link
            to="/courses/agentic-ai"
            className="inline-block bg-secondary text-white px-10 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-opacity-90 transition-all hover:shadow-xl"
          >
            Register Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCTA;
