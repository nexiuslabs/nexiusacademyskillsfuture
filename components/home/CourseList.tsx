import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Course } from '../../types';

const COURSE_HERO_IMAGE = 'https://tueprsmyrebrfwrdlagk.supabase.co/storage/v1/object/public/website-images/nexiushomehero.png';

const AVAILABLE_COURSES: Course[] = [
  {
    id: 1,
    title: 'Agentic AI Foundations for Non-Technical Professionals',
    category: 'AI',
    price: 67,
    rating: 5.0,
    students: 223,
    image: COURSE_HERO_IMAGE,
    author: 'Melverick Ng',
    authorImage: 'https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Headshots/melverick%20studio.jpg'
  }
];

const CourseList: React.FC = () => {

  return (
    <section id="courses" className="py-24 bg-white scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-3">Our Current Course</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We currently offer one flagship programme. New courses are launching in <span className="font-semibold text-primary">Q2 2026</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 max-w-sm mx-auto gap-8">
          {AVAILABLE_COURSES.map((course) => (
            <Link
              key={course.id}
              to="/courses/agentic-ai"
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
                  <div className="flex items-center text-yellow-500 text-xs font-bold gap-1">
                    <Star size={14} fill="currentColor" />
                    {course.rating}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseList;