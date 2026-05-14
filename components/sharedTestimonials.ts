export type SharedTestimonial = {
  id: number;
  name: string;
  title: string;
  image: string;
  quote: string;
};

export const sharedTestimonials: SharedTestimonial[] = [
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
  {
    id: 5,
    name: 'Pheng Soon',
    title: 'Consultant, Biz Square',
    image: '/images/testimonials/pheng-soon.jpeg',
    quote:
      "Practical two-day workshop with valuable sharing on real-world AI applications for professional firms. Trainers' CSP experience and project sharing made the sessions engaging and relevant. Enjoyed the case-based collaboration and networking with fellow participants.",
  },
  {
    id: 6,
    name: 'Audrey Ng',
    title: 'Director, Corporate Secretariat',
    image: '/images/testimonials/audrey-ng.jpeg',
    quote:
      'Really enjoyed the Nexius AI Agentic course by Daryl and Melverick. Practical, engaging, and easy to follow with hands-on activities and real-world examples. Highly recommended for everyone, regardless of experience level, exploring AI applications at work.',
  },
  {
    id: 7,
    name: 'Melanie Lee',
    title: 'Director, Corporate Secretariat',
    image: '/images/testimonials/melanie-lee.jpeg',
    quote:
      'Nexius AI Agentic course was practical and engaging. I appreciated the clear explanations, hands-on exercises, and real-world examples, which made AI concepts easier to understand and apply confidently professionally.',
  },
];
