import React from 'react';
import { INSTRUCTORS } from '../../constants';
import ResponsiveImage from '../ResponsiveImage';

const Instructors: React.FC = () => {
  return (
    <section id="instructors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent mb-3">Trainer profile</p>
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">Learn from practitioners who implement AI with real teams</h2>
            <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
              Nexius Academy trainers combine business transformation experience with practical AI workflow design, so learners can apply agentic AI safely in real workplace contexts.
            </p>
            <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
            {INSTRUCTORS.map((instructor, index) => (
                <article key={index} className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl">
                  <div className="grid gap-6 sm:grid-cols-[180px,1fr] sm:items-start">
                    <div className="relative overflow-hidden rounded-2xl bg-[#f0f0f0]">
                        <ResponsiveImage
                            src={instructor.image}
                            alt={instructor.name}
                            optimize={false}
                            className="h-60 w-full object-cover object-[center_18%] bg-[#f0f0f0] transition-transform duration-500 group-hover:scale-[1.03] sm:h-56"
                        />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{instructor.name}</h3>
                      <p className="mt-1 text-accent font-semibold text-sm uppercase tracking-wider">{instructor.role}</p>
                      <p className="mt-4 text-gray-700 leading-relaxed">{instructor.bio}</p>

                      {instructor.credentials && instructor.credentials.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {instructor.credentials.map((credential) => (
                            <span key={credential} className="rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                              {credential}
                            </span>
                          ))}
                        </div>
                      )}

                      {instructor.focusAreas && instructor.focusAreas.length > 0 && (
                        <div className="mt-5">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Focus areas</p>
                          <ul className="mt-3 grid gap-2 text-sm text-gray-700">
                            {instructor.focusAreas.map((area) => (
                              <li key={area} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                                <span>{area}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Instructors;
