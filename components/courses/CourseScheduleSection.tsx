import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users } from 'lucide-react';
import { openLeadModal } from '../../services/leadModal';

type CourseScheduleSectionProps = {
  page: string;
  positionPrefix: string;
};

const ADVANCED_COURSE_SCHEDULES = [
  {
    month: 'Oct 2026',
    dates: '07 Oct 2026 (Wed), 08 Oct 2026 (Thu) & 15 Oct 2026 (Thu)',
    time: '9:00am - 6:00pm',
    venue: '60 Cecil St, ISCA House, Level 4, Room 4-2, S(049709)',
  },
];

const CourseScheduleSection: React.FC<CourseScheduleSectionProps> = ({ page, positionPrefix }) => {
  const months = Array.from(new Set(ADVANCED_COURSE_SCHEDULES.map((schedule) => schedule.month)));
  const [selectedMonth, setSelectedMonth] = useState(months[0] ?? 'Oct 2026');
  const filteredSchedules = ADVANCED_COURSE_SCHEDULES.filter((schedule) => schedule.month === selectedMonth);

  return (
    <section id="schedule" className="bg-neutral py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 font-heading text-3xl font-bold text-primary">Upcoming Course Schedules</h2>
        <p className="mb-10 text-gray-600">Choose from our upcoming weekday schedules, or ask us about a private class for your team.</p>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {months.map((month) => (
            <button
              key={month}
              type="button"
              onClick={() => setSelectedMonth(month)}
              aria-pressed={selectedMonth === month}
              className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-bold transition-colors ${
                selectedMonth === month
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-primary'
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredSchedules.map((schedule) => (
            <div
              key={`${schedule.month}-${schedule.dates}`}
              className="flex flex-col justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-accent hover:shadow-md md:flex-row md:items-center"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-lg font-bold text-primary">
                  {schedule.dates}
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-accent" />
                    <span>{schedule.time}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span>{schedule.venue}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-gray-700">
                    <Users size={16} className="text-accent" />
                    <span>Register interest early to lock your seat</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'reserve_seat', {
                      page,
                      position: `${positionPrefix}_schedule_register_interest`,
                      ctaLabel: 'register_interest',
                    })
                  }
                  className="inline-block w-full rounded-lg bg-primary px-6 py-3 text-center font-bold text-white transition-colors hover:bg-blue-900 md:w-auto"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}

          <div className="rounded-3xl border border-primary/10 bg-white px-6 py-8 shadow-sm md:px-8">
            <div className="grid gap-5 md:grid-cols-[1fr,auto] md:items-center">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">For Company Teams</div>
                <h3 className="text-2xl font-bold text-primary">Need a private class for your team instead?</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  If you are planning an internal company cohort, view the dedicated private-class page for the team-focused format.
                </p>
              </div>
              <Link
                to="/private-class"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-900"
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

export default CourseScheduleSection;
