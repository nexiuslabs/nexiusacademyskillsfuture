import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Course } from '../../types';
import ResponsiveImage from '../ResponsiveImage';

const MELVERICK_COURSE_IMAGE = '/images/courses/agentic-ai-foundations-card.jpg';
const DISPLAY_RATING = 4.8;

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
    title: 'Agentic AI Foundations for Accounting & CSP Professionals',
    category: 'AI',
    price: 67,
    rating: 5.0,
    students: 0,
    image: MELVERICK_COURSE_IMAGE,
    author: 'Darryl Wong',
    authorImage: '/images/authors/darryl-wong.jpg',
    path: '/courses/agentic-ai-accountants',
  },
  {
    id: 3,
    title: 'Agentic AI-Driven Innovation for Productivity',
    category: 'Leadership',
    price: 0,
    rating: 5.0,
    students: 0,
    image: '/images/courses/frontier-firm-card.jpg',
    author: 'Darryl Wong',
    authorImage: '/images/authors/darryl-wong.jpg',
    path: '/courses/frontier-firm-agent-boss',
  }
];

const CourseList: React.FC = () => {
  const fullStars = Math.floor(DISPLAY_RATING);
  const partialStarWidth = `${Math.round((DISPLAY_RATING % 1) * 100)}%`;
  const hasPartialStar = DISPLAY_RATING % 1 !== 0;

  return (
    <section id="courses" className="py-24 bg-white scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-3">Our Current Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We currently offer segment-specific variants of our flagship programme for different audiences, plus a dedicated company-class option for internal team training.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {AVAILABLE_COURSES.map((course) => (
            <Link
              key={course.id}
              to={`${course.path}/`}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-primary">
                <ResponsiveImage src={course.image} alt={course.title} widths={[480, 768]} sizes="(max-width: 768px) 100vw, 33vw" fit="contain" className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]" />
                <span className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                  {course.category}
                </span>
                <span className="absolute top-4 right-4 bg-white/90 text-primary text-sm font-bold px-2 py-1 rounded">
                  {course.id === 1 ? 'Hot' : course.id === 2 ? 'Accounting/CSP-Focused' : 'New'}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                   <span className="block h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100">
                     <ResponsiveImage src={course.authorImage} alt={course.author} optimize={false} className="h-full w-full object-cover object-top" />
                   </span>
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
                        const isPartialStar = index === fullStars && hasPartialStar;

                        if (isPartialStar) {
                          return (
                            <span key={index} className="relative inline-flex h-[14px] w-[14px]">
                              <Star size={14} className="absolute inset-0 text-gray-300" fill="currentColor" />
                              <span className="absolute inset-0 overflow-hidden" style={{ width: partialStarWidth }}>
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
                    <span className="text-primary">{DISPLAY_RATING.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          <div className="flex min-h-full rounded-[1.75rem] border border-primary/10 bg-neutral px-6 py-8 shadow-sm md:col-span-2 md:px-10 lg:col-span-3">
            <div className="grid w-full gap-6 md:grid-cols-[1fr,auto] md:items-center">
              <div>
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">For Company Teams</div>
                <h3 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">Need a private class for your team instead?</h3>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600">
                  If you are planning an internal company cohort, view the dedicated private-class page for the team-focused format.
                </p>
              </div>
              <Link
                to="/private-class/"
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
