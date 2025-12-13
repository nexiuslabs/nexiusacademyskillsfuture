import React from 'react';
import { Star, Quote } from 'lucide-react';

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
    <section className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
          Recommended By Many Working Professionals
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-accent"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <h4 className="font-bold text-primary text-lg">{testimonial.name}</h4>
                             <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                             </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">{testimonial.title}</p>
                        <p className="text-gray-700 italic text-sm leading-relaxed relative">
                            <Quote size={20} className="text-gray-200 absolute -top-2 -left-2 transform -scale-x-100" />
                            {testimonial.quote}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;