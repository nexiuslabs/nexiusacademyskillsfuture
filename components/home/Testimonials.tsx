import React, { useEffect, useMemo, useState } from 'react';
import { Quote } from 'lucide-react';
import { sharedTestimonials } from '../sharedTestimonials';

const TESTIMONIALS_PER_PAGE = 3;

const Testimonials: React.FC = () => {
  const pages = useMemo(() => {
    const result = [] as typeof sharedTestimonials[];
    for (let i = 0; i < sharedTestimonials.length; i += TESTIMONIALS_PER_PAGE) {
      const chunk = [...sharedTestimonials.slice(i, i + TESTIMONIALS_PER_PAGE)];
      while (chunk.length < TESTIMONIALS_PER_PAGE) {
        chunk.push(sharedTestimonials[chunk.length % sharedTestimonials.length]);
      }
      result.push(chunk);
    }
    return result;
  }, []);

  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePage((current) => (current + 1) % pages.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [pages.length]);

  return (
    <section id="reviews" className="py-24 bg-neutral scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary">
            Hear How Our Learners Have
            <br /> Benefitted From Our AI Certification Courses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pages[activePage].map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-primary">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.title}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">"{testimonial.quote}"</p>

              <div className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-100 transition-opacity text-secondary">
                <Quote size={40} fill="currentColor" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 gap-2">
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to testimonial page ${index + 1}`}
              onClick={() => setActivePage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${activePage === index ? 'bg-secondary' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
