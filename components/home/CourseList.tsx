import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Course } from '../../types';

const COURSE_HERO_IMAGE = 'https://tueprsmyrebrfwrdlagk.supabase.co/storage/v1/object/public/website-images/nexiushomehero.png';
const MELVERICK_COURSE_IMAGE = '/images/courses/agentic-ai-foundations-card.jpg';

const AVAILABLE_COURSES: Course[] = [
  {
    id: 1,
    title: 'Agentic AI Foundations for Non-Technical Professionals',
    category: 'AI',
    price: 67,
    rating: 5.0,
    students: 223,
    image: MELVERICK_COURSE_IMAGE,
    author: 'Melverick Ng',
    authorImage: '/images/authors/melverick-ng.jpg',
    path: '/courses/agentic-ai',
  },
  {
    id: 2,
    title: 'Agentic AI for Accountants & Corporate Service Providers',
    category: 'AI for Professional Services',
    price: 67,
    rating: 5.0,
    students: 0,
    image: COURSE_HERO_IMAGE,
    author: 'Darryl Wong',
    authorImage: '/images/authors/darryl-wong.jpg',
    path: '/courses/agentic-ai-accountants',
  }
];

const CourseList: React.FC = () => {
  const fullStars = Math.floor(4.5);
  const hasHalfStar = 4.5 % 1 !== 0;

  return (
    <section id="courses" className="py-24 bg-white scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-3">Our Current Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We currently offer segment-specific variants of our flagship programme for different audiences, plus a dedicated company-class option for internal team training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto gap-8">
          {AVAILABLE_COURSES.map((course) => (
            <Link
              key={course.id}
              to={course.path}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                  {course.category}
                </span>
                <span className="absolute top-4 right-4 bg-white/90 text-primary text-sm font-bold px-2 py-1 rounded">
                  Hot
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                   <img src={course.authorImage} alt={course.author} className="w-8 h-8 rounded-full" />
                   <span className="text-xs text-gray-500">{course.author}</span>
                </div>
                <h3 className="font-bold text-primary text-base mb-3 line-clamp-2 h-12">
                  {course.title}
                </h3>

                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <div className="flex items-center gap-0.5 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const isFullStar = index < fullStars;
                        const isHalfStar = index === fullStars && hasHalfStar;

                        if (isHalfStar) {
                          return (
                            <span key={index} className="relative inline-flex h-[14px] w-[14px]">
                              <Star size={14} className="absolute inset-0 text-gray-300" fill="currentColor" />
                              <span className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                                <Star size={14} className="text-yellow-500" fill="currentColor" />
                              </span>
                            </span>
                          );
                        }

                        return (
                          <Star
                            key={index}
                            size={14}
                            className={isFullStar ? 'text-yellow-500' : 'text-gray-300'}
                            fill="currentColor"
                          />
                        );
                      })}
                    </div>
                    <span className="text-primary">4.5</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <div className="rounded-[1.75rem] border border-primary/10 bg-neutral px-6 py-8 shadow-sm md:px-10">
            <div className="grid gap-6 md:grid-cols-[1fr,auto] md:items-center">
              <div>
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">For Company Teams</div>
                <h3 className="text-3xl font-bold tracking-tight text-primary">Need a private class for your team instead?</h3>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600">
                  If you are planning an internal company cohort, view the dedicated private-class page for the team-focused format.
                </p>
              </div>
              <Link
                to="/private-class"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-base font-bold text-white transition-colors hover:bg-blue-900"
              >
                View Private Class
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseList;
