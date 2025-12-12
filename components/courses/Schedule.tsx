import React from 'react';
import { SCHEDULES } from '../../constants';
import { MapPin, Monitor, Clock } from 'lucide-react';

const Schedule: React.FC = () => {
  const APPLY_LINK = "https://www.myskillsfuture.gov.sg/content/portal/en/training-exchange/course-directory/course-detail.html?courseReferenceNumber=TGS-2025059915#courseDetailsSection01";

  return (
    <section id="schedule" className="py-20 bg-neutral">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Upcoming Course Schedules
        </h2>
        <p className="text-gray-600 mb-10">
            Choose from our flexible schedules. Weekday evenings or weekends available.
        </p>

        {/* Tab-like Visual */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap">Dec 2025</button>
            <button className="bg-white text-gray-500 hover:text-primary hover:bg-gray-100 px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors">Jan 2026</button>
            <button className="bg-white text-gray-500 hover:text-primary hover:bg-gray-100 px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors">Feb 2026</button>
        </div>

        <div className="space-y-6">
            {SCHEDULES.map((schedule, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-accent hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    <div className="space-y-3">
                        <div className="font-bold text-primary text-lg flex items-center gap-2">
                            {schedule.dates}
                            {schedule.slotsLeft < 5 && (
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded font-bold uppercase">
                                    {schedule.slotsLeft} Slots Left!
                                </span>
                            )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-600">
                             <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-accent" />
                                <span>{schedule.time}</span>
                             </div>
                             <div className="flex items-center gap-1.5">
                                {schedule.format.includes('Online') ? <Monitor size={16} className="text-accent" /> : <MapPin size={16} className="text-accent" />}
                                <span>{schedule.format}</span>
                             </div>
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <a 
                            href={APPLY_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-center w-full md:w-auto bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                        >
                            Apply Now
                        </a>
                    </div>

                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Schedule;