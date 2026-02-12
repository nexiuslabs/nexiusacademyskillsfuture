import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { fetchBucketImages, getRandomImage, StorageImage } from '../../services/imageService';

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>('https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800');
  const [images, setImages] = useState<StorageImage[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const bucketImages = await fetchBucketImages();
      setImages(bucketImages);
      if (bucketImages.length > 0) {
        setCurrentImage(getRandomImage(bucketImages));
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImage(getRandomImage(images));
    }, 30000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 bg-neutral overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E6F0F9] rounded-bl-[200px] -z-10 hidden lg:block"></div>
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 z-10">
          <div className="inline-block px-3 py-1 bg-white rounded-full shadow-sm text-xs font-bold text-secondary tracking-wide uppercase mb-2">
            🚀 Build Your AI Advantage
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Agentic AI Courses <br />
            <span className="text-secondary">for Non-Technical Professionals</span>
          </h1>
          <p className="text-charcoal text-lg md:text-xl max-w-lg leading-relaxed">
            Learn Agentic AI hands-on to automate entire business workflows, boost productivity, and simplify operations, specifically designed for non-technical professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
            
            {/* Subsidy Badge (SVG Implementation for scaling) */}
            <div className="select-none transform transition-transform hover:scale-105 duration-300 origin-left cursor-pointer">
              <svg 
                viewBox="0 0 350 160" 
                className="w-40 md:w-48 h-auto drop-shadow-md" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Up to 70% Course Subsidy + SkillsFuture Balance Fees Claimable"
              >
                {/* Circle 1: Subsidy */}
                <circle cx="80" cy="80" r="78" fill="#EAF4FF" stroke="#8EB6F7" strokeWidth="3" />
                <text x="80" y="52" textAnchor="middle" fill="#1D2A4D" fontSize="14" fontWeight="bold" fontFamily="sans-serif">Up to</text>
                <text x="80" y="102" textAnchor="middle" fill="#1D2A4D" fontSize="60" fontWeight="800" fontFamily="sans-serif">70%</text>
                <text x="80" y="126" textAnchor="middle" fill="#1D2A4D" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Course Subsidy</text>

                {/* Plus Sign */}
                <text x="175" y="95" textAnchor="middle" fill="#1D2A4D" fontSize="40" fontWeight="bold" fontFamily="sans-serif">+</text>

                {/* Circle 2: SkillsFuture */}
                <circle cx="270" cy="80" r="78" fill="#FFFFFF" stroke="#C8DBF9" strokeWidth="3" />
                <text x="270" y="55" textAnchor="middle" fill="#1D2A4D" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.2">Balance Fees Claimable</text>
                
                {/* Logo Graphic */}
                <g transform="translate(225, 75)">
                   {/* Logo Squares */}
                   <rect x="0" y="0" width="8" height="8" rx="2" fill="#D71E28" />
                   <rect x="0" y="9" width="8" height="8" rx="2" fill="#4F2D7F" />
                   <rect x="9" y="9" width="8" height="8" rx="2" fill="#4F2D7F" />
                   
                   {/* Logo Text */}
                   <text x="20" y="15" fill="#4F2D7F" fontSize="19" fontWeight="bold" fontFamily="sans-serif">skills</text>
                   <text x="65" y="15" fill="#4F2D7F" fontSize="19" fontFamily="serif" fontStyle="italic">future</text>
                </g>
              </svg>
            </div>

            {/* Browse Courses Button */}
            <a
              href="#courses"
              className="flex items-center gap-3 px-6 py-3 rounded-lg font-bold bg-secondary text-white hover:bg-opacity-90 transition-all group shadow-lg"
            >
              <div className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <BookOpen size={24} className="text-secondary" />
              </div>
              <span className="text-base md:text-lg">Browse Courses</span>
            </a>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative z-10 flex justify-center lg:justify-end">
          <div className="relative">
             {/* Abstract circle decoration behind */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            
            <img
              src={currentImage}
              alt="AI training Singapore — business professionals learning agentic AI at Nexius Academy"
              className="relative rounded-3xl shadow-2xl z-10 w-full max-w-md object-cover h-[500px] lg:h-[600px] transition-opacity duration-1000"
              key={currentImage}
            />
            
            {/* Floating Badge */}
            <div className="absolute top-20 -left-10 bg-white p-4 rounded-xl shadow-lg z-20 animate-bounce" style={{ animationDuration: '3s' }}>
               <div className="flex items-center gap-3">
                 <div className="bg-yellow-100 p-2 rounded-full">
                   <span className="text-2xl">🎓</span>
                 </div>
                 <div>
                   <p className="font-bold text-primary text-lg">500+</p>
                   <p className="text-xs text-gray-500">Learners</p>
                 </div>
               </div>
            </div>

             {/* Floating Badge 2 */}
             <div className="absolute bottom-20 -right-5 bg-white p-4 rounded-xl shadow-lg z-20 hidden md:block">
               <div className="flex items-center gap-3">
                 <div className="bg-green-100 p-2 rounded-full text-green-600 font-bold">
                   95%
                 </div>
                 <div>
                   <p className="font-bold text-primary text-sm">Satisfaction Rate</p>
                   <p className="text-xs text-gray-500">Based on reviews</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;