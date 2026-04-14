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
];
