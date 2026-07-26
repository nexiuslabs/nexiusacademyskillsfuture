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

        <div className="grid items-stretch gap-8 lg:grid-cols-2">
            {INSTRUCTORS.map((instructor) => (
                <article key={instructor.name} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="grid grid-cols-[112px,1fr] items-center gap-5 border-b border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 sm:grid-cols-[144px,1fr] lg:min-h-[244px]">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f0f0f0] shadow-sm">
                        <ResponsiveImage
                            src={instructor.image}
                            alt={instructor.name}
                            optimize={false}
                            className="h-full w-full object-cover object-[center_18%] bg-[#f0f0f0] transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-500">Nexius Academy trainer</p>
                      <h3 className="text-2xl font-bold leading-tight text-primary sm:text-3xl">{instructor.name}</h3>
                      <p className="mt-2 text-sm font-semibold uppercase leading-snug tracking-wider text-accent">{instructor.role}</p>
                      {instructor.credentials && instructor.credentials.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {instructor.credentials.map((credential) => (
                            <span key={credential} className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                              {credential}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="text-gray-700 leading-relaxed">{instructor.bio}</p>

                      {instructor.focusAreas && instructor.focusAreas.length > 0 && (
                        <div className="mt-6 border-t border-gray-100 pt-5">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Focus areas</p>
                          <ul className="mt-4 grid gap-x-5 gap-y-3 text-sm text-gray-700 sm:grid-cols-2">
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
                </article>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Instructors;
