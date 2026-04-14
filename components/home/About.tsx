import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { fetchBucketImages, getRandomImages } from '../../services/imageService';
import { openLeadModal } from '../../services/leadModal';

const About: React.FC = () => {
  const [images, setImages] = useState<string[]>([
    'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]);

  useEffect(() => {
    const loadImages = async () => {
      const bucketImages = await fetchBucketImages();
      if (bucketImages.length > 0) {
        setImages(getRandomImages(bucketImages, 2));
      }
    };

    loadImages();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Collage */}
        <div className="relative h-[500px] hidden md:block">
           <img
            src={images[0]}
            alt="Student working"
            className="absolute top-0 left-0 w-64 h-80 object-cover rounded-lg shadow-xl z-10"
           />
           <img
            src={images[1]}
            alt="Student smiling"
            className="absolute bottom-0 right-10 w-72 h-64 object-cover rounded-lg shadow-xl z-20 border-8 border-white"
           />
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Mobile View Image */}
        <div className="md:hidden w-full h-64 overflow-hidden rounded-xl shadow-lg">
             <img src={images[0]} className="w-full h-full object-cover" alt="Student" />
        </div>

        {/* Right Content */}
        <div>
          <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Why people sign up</div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 max-w-2xl">
            Learn practical AI workflows you can use immediately
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
            A hands-on no-code course for business professionals who want faster drafts, better processes, and useful automation.
          </p>

          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-charcoal font-medium">
              <CheckCircle size={20} className="text-secondary" />
              Map and deploy workflows that automate repetitive business tasks
            </li>
            <li className="flex items-center gap-3 text-charcoal font-medium">
              <CheckCircle size={20} className="text-secondary" />
              Use accessible no-code tools without writing code
            </li>
            <li className="flex items-center gap-3 text-charcoal font-medium">
              <CheckCircle size={20} className="text-secondary" />
              Apply AI to finance, HR, and customer service work
            </li>
          </ul>

          <button 
            type="button"
            onClick={() =>
              openLeadModal('home_cta', 'reserve_seat', {
                page: '/',
                position: 'home_about_register_now',
                ctaLabel: 'register_now',
                redirectUrl: 'https://stms.polite.edu.sg/cetapi/api/v1/custom/extendauthorize?id_token=rHHqe3GLYxhIYwh82qTpAKuHaXtejYUMXXcX5m42t14MVbIM54f%2BJo2weFWoM7%2Fu',
              })
            }
            className="inline-block bg-secondary text-white px-8 py-3 rounded-md font-bold shadow-lg hover:bg-opacity-90 transition-all"
          >
            Register Now
          </button>
        </div>

      </div>
    </section>
  );
};

export default About;