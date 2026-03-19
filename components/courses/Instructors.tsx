import React from 'react';
import { INSTRUCTORS } from '../../constants';

const Instructors: React.FC = () => {
  return (
    <section id="instructors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">Learn From the Best in the Industry</h2>
            <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
            {INSTRUCTORS.map((instructor, index) => (
                <div key={index} className="group w-full sm:w-40 md:w-36 lg:w-40">
                    <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-100">
                        <img
                            src={instructor.image}
                            alt={instructor.name}
                            className="w-full h-48 object-contain sm:object-cover object-top bg-gray-100 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                            <p className="text-white text-sm">{instructor.bio}</p>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-primary">{instructor.name}</h3>
                    <p className="text-accent font-medium text-sm uppercase tracking-wider">{instructor.role}</p>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Instructors;