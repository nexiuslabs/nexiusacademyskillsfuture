import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Jacky Wong",
    title: "Chief Librarian, NIE",
    image: "https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Headshots/jacky_wong.jpeg",
    quote: "We are grateful for the highly insightful learnings that will be instrumental in our effective adoption of AI tools."
  },
  {
    id: 2,
    name: "Jean Foo",
    title: "CEO, Forte Law",
    image: "https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Headshots/jean_foo.jpeg",
    quote: "We never knew ChatGPT can do all these before the course. It was indeed an eye-opener."
  },
  {
    id: 3,
    name: "Kenji",
    title: "Senior Member, Hokkien Association",
    image: "https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Headshots/kenji.png",
    quote: "The custom AI workshop by Nexius Academy was really good. Our clan, youths, seniors really enjoyed it. Very, very relevant and practical. I would definitely recommend everyone to take it."
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-neutral scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary">Hear How Our Learners Have<br/> Benefitted From Our AI Certification Courses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-primary">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.title}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              <div className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-100 transition-opacity text-secondary">
                <Quote size={40} fill="currentColor" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Dots */}
        <div className="flex justify-center mt-10 gap-2">
           <div className="w-3 h-3 rounded-full bg-secondary cursor-pointer"></div>
           <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"></div>
           <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;