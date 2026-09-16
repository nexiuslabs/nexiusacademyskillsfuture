import React from 'react';
import { Link } from 'react-router-dom';
import { SCHEDULES } from '../../constants';
import { ADVANCED_COURSE_SCHEDULES } from '../courses/CourseScheduleSection';
import { Course } from '../../types';
import ResponsiveImage from '../ResponsiveImage';

const MELVERICK_COURSE_IMAGE = '/images/courses/agentic-ai-foundations-card.jpg';

const AVAILABLE_COURSES: Course[] = [
  {
    id: 1,
    title: 'Agentic AI Foundations for Non-Technical Professionals',
    category: 'Foundation',
    price: 67,
    rating: 5.0,
    students: 0,
    image: MELVERICK_COURSE_IMAGE,
    author: 'Melverick Ng',
    authorImage: '/images/authors/melverick-ng-selected.jpg',
    path: '/courses/agentic-ai',
  },
  {
    id: 2,
    title: 'Advanced Agentic AI',
    category: 'Advanced',
    price: 0,
    rating: 5.0,
    students: 0,
    image: '/images/courses/frontier-firm-card.jpg',
    author: 'Melverick Ng',
    authorImage: '/images/authors/melverick-ng-selected.jpg',
    path: '/courses/advanced-agentic-ai',
  }
];

const CourseList: React.FC = () => {
  const nextFoundation = SCHEDULES.find((schedule) => !schedule.registrationClosed && !schedule.interestOnly && (schedule.slotsLeft === undefined || schedule.slotsLeft > 0));
  return (
    <section id="courses" className="py-24 bg-white scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-3">Our Current Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start with Foundation to build practical no-code workflows. Choose Advanced to develop AI-driven business innovation and productivity initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
          {AVAILABLE_COURSES.map((course) => (
            <Link
              key={course.id}
              to={`${course.path}/`}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-primary">
                <ResponsiveImage src={course.image} alt={course.title} widths={[480, 768]} sizes="(max-width: 768px) 100vw, 25vw" fit="contain" className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]" />
                <span className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                  {course.category}
                </span>
                <span className="absolute top-4 right-4 bg-white/90 text-primary text-sm font-bold px-2 py-1 rounded">
                  {course.id === 1 ? 'Popular' : 'New'}
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
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-semibold text-primary">{course.id === 1 ? '16 hours · In person' : '3 days · In person'}</p>
                  <p>{course.id === 1 ? nextFoundation?.dates || 'Next intake: register interest' : ADVANCED_COURSE_SCHEDULES[0]?.dates}</p>
                  <p>From {course.id === 1 ? 'S$113.03' : 'S$190.50'} including GST*</p>
                  <p className="text-xs">*For eligible enhanced-funded learners. See course page for eligibility and full fees.</p>
                  <span className="inline-block pt-2 font-bold text-accent">View course, fees and dates →</span>
                </div>

              </div>
            </Link>
          ))}

          <div className="flex min-h-full rounded-[1.75rem] border border-primary/10 bg-neutral px-6 py-8 shadow-sm md:col-span-2 md:px-10 lg:col-span-2">
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
                className="academy-button-primary "
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
