import React, { useState, useEffect } from 'react';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchBucketImages, getRandomImages } from '../../services/imageService';
import { BLOG_POSTS } from '../../constants';

const BottomSection: React.FC = () => {
  const [images, setImages] = useState<string[]>([
    'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]);

  useEffect(() => {
    const loadImages = async () => {
      const bucketImages = await fetchBucketImages();
      if (bucketImages.length > 0) {
        setImages(getRandomImages(bucketImages, 4));
      }
    };

    loadImages();
  }, []);

  return (
    <>
      {/* Partners */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <h4 className="text-lg font-bold text-primary mb-2">100+ Trusted Companies</h4>
          <p className="text-xs text-gray-500 mb-8 max-w-md">Upskilling your workforce with AI training Singapore companies trust. Our hands-on agentic AI courses enable rapid product development and no-code AI automation across your enterprise.</p>

          <div className="relative overflow-hidden">
            <style>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-100% / 3)); }
              }
              .animate-scroll {
                animation: scroll 30s linear infinite;
                display: flex;
                width: max-content;
              }
              .animate-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="animate-scroll">
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-12 items-center shrink-0">
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/ntu_logo.png" alt="NTU" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/nie_logo.jpeg" alt="NIE" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/SIM-GE-Pri-logo-4C-1024x754.webp" alt="SIM" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/HH_grp_logo.jpeg" alt="HH Group" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/forte_law_llc_logo.jpeg" alt="Forte Law" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/autom8e_logo.png" alt="Automa8e" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/cropped-Logo_Final_black_font-e1557929387960-1024x341.png" alt="Peachypixx" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/jetdata_logo.jpeg" alt="Jetdata" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/Lookeesan-creatives-logo.png" alt="Lookeesan" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/ouch-logo.jpg" alt="Ouch" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/tncp_logo.jpeg" alt="TNCP" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/veraops_logo.png" alt="Veraops" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0" />
                  <img src="https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/yesccap_logo.webp" alt="Yescapp" className="h-12 w-32 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all shrink-0 mr-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest News — pulls from BLOG_POSTS, shows 3 most recent featured */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Latest AI Training Insights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS
              .filter(p => p.featured)
              .sort((a, b) => b.id - a.id)
              .slice(0, 3)
              .map((post, idx) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-xl mb-4 h-56">
                    <img src={images[idx] || images[0]} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                    <span className="flex items-center gap-1"><Eye size={12}/> {post.views} Views</span>
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="text-secondary text-xs font-bold uppercase tracking-wide flex items-center gap-1">Read More <ArrowRight size={12}/></span>
                </Link>
              ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-bold transition-all"
            >
              View All Articles
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BottomSection;