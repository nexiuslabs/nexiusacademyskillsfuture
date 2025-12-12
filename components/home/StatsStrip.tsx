import React from 'react';
import { Laptop, BookOpen, Calendar, ShieldCheck } from 'lucide-react';

const StatsStrip: React.FC = () => {
  return (
    <section className="bg-white py-12 border-y border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Item 1 */}
          <div className="flex items-center gap-4 lg:justify-center px-4 lg:border-r border-gray-200">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-110">
              <Laptop className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg leading-tight">Business Leaders</h3>
              <p className="text-gray-500 text-sm mt-1">Outcome-focused, governance, impact</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-4 lg:justify-center px-4 lg:border-r border-gray-200">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-110">
              <BookOpen className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg leading-tight">Startup Founders</h3>
              <p className="text-gray-500 text-sm mt-1">Strategy, scale, network-driven</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-4 lg:justify-center px-4 lg:border-r border-gray-200">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-110">
              <Calendar className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg leading-tight">Working Professionals</h3>
              <p className="text-gray-500 text-sm mt-1">Structured, job-specific application</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-4 lg:justify-center px-4">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-110">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg leading-tight">Entrepreneurs</h3>
              <p className="text-gray-500 text-sm mt-1">Build, test, iterate quickly</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsStrip;