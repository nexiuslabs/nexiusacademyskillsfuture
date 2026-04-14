import React, { useEffect, useMemo, useState } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Jacky Wong',
    title: 'Chief Librarian, NIE',
    image: 'https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Headshots/jacky_wong.jpeg',
    quote: 'We are grateful for the highly insightful learnings that will be instrumental in our effective adoption of AI tools.',
  },
  {
    id: 2,
    name: 'Jean Foo',
    title: 'CEO, Forte Law',
    image: 'https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Headshots/jean_foo.jpeg',
    quote: 'We never knew ChatGPT can do all these before the course. It was indeed an eye-opener.',
  },
  {
    id: 3,
    name: 'Kenji',
    title: 'Senior Member, Hokkien Association',
    image: '/images/testimonials/kenji.jpg',
    quote: 'The custom AI workshop by Nexius Academy was really good. Our clan, youths, seniors really enjoyed it. Very, very relevant and practical. I would definitely recommend everyone to take it.',
  },
  {
    id: 4,
    name: 'Thomas Lee',
    title: 'Program Lead, Temasek Poly',
    image: '/images/testimonials/thomas-lee.jpg',
    quote: 'Nexius Labs taught our startups how to build AI agents that help us grow and operate our business more effectively.',
  },
];

const TESTIMONIALS_PER_PAGE = 3;

const Testimonials: React.FC = () => {
  const pages = useMemo(() => {
    const result = [] as typeof testimonials[];
    for (let i = 0; i < testimonials.length; i += TESTIMONIALS_PER_PAGE) {
      const chunk = testimonials.slice(i, i + TESTIMONIALS_PER_PAGE);
      while (chunk.length < TESTIMONIALS_PER_PAGE) {
        chunk.push(testimonials[chunk.length % testimonials.length]);
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
