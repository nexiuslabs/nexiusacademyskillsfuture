import React, { useState } from 'react';
import { SCHEDULES } from '../../constants';
import { MapPin, Monitor, Clock, CalendarClock, Users } from 'lucide-react';
import { trackOutboundClick } from '../../services/analytics';
import { openLeadModal } from '../../services/leadModal';

const Schedule: React.FC = () => {
  const APPLY_LINK =
    'https://stms.polite.edu.sg/cetapi/api/v1/custom/extendauthorize?id_token=rHHqe3GLYxhIYwh82qTpAKuHaXtejYUMXXcX5m42t14MVbIM54f%2BJo2weFWoM7%2Fu';
  const months = Array.from(new Set(SCHEDULES.map((schedule) => schedule.month)));
  const [selectedMonth, setSelectedMonth] = useState(months[0] ?? 'Apr 2026');

  const filteredSchedules = SCHEDULES.filter((schedule) => schedule.month === selectedMonth);

  return (
    <section id="schedule" className="py-20 bg-neutral">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">Upcoming Course Schedules</h2>
        <p className="text-gray-600 mb-10">Choose from our flexible schedules. Weekday evenings or weekends available.</p>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                selectedMonth === month
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-500 hover:text-primary hover:bg-gray-100'
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredSchedules.map((schedule, index) => {
            const isFull = schedule.slotsLeft <= 0;

            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-accent hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="font-bold text-primary text-lg flex flex-wrap items-center gap-2">
                    {schedule.dates}
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                        isFull ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {isFull ? 'Cohort Full' : `Seats left: ${schedule.slotsLeft}`}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-accent" />
                      <span>{schedule.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {schedule.format.includes('Online') ? (
                        <Monitor size={16} className="text-accent" />
                      ) : (
                        <MapPin size={16} className="text-accent" />
                      )}
                      <span>{schedule.format}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
                    <div className="inline-flex items-center gap-1.5 text-gray-700">
                      <CalendarClock size={16} className="text-accent" />
                      Registration closes: {schedule.registrationCloses ?? 'TBC'}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-gray-700">
                      <Users size={16} className="text-accent" />
                      {isFull ? 'Join waitlist to secure next intake' : 'Apply early to lock your seat'}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {isFull ? (
                    <button
                      type="button"
                      onClick={() =>
                        openLeadModal('course_page_cta', 'advisory_call', {
                          page: '/courses/agentic-ai',
                          position: 'schedule_join_waitlist_button',
                          ctaLabel: 'join_waitlist',
                        })
                      }
                      className="inline-block text-center w-full md:w-auto bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-bold transition-colors hover:bg-primary hover:text-white"
                    >
                      Join Waitlist
                    </button>
                  ) : (
                    <a
                      href={APPLY_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackOutboundClick({
                          channel: 'skillsfuture',
                          pagePath: '/courses/agentic-ai',
                          position: 'schedule_apply_button',
                        })
                      }
                      className="inline-block text-center w-full md:w-auto bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                      Apply Now
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
