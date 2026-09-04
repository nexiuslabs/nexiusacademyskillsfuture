import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SCHEDULES } from '../../constants';
import { MapPin, Clock, Users } from 'lucide-react';
import { openLeadModal } from '../../services/leadModal';

const Schedule: React.FC = () => {
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
            const isFull = typeof schedule.slotsLeft === 'number' && schedule.slotsLeft <= 0 && !schedule.interestOnly;

            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-accent hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="font-bold text-primary text-lg flex flex-wrap items-center gap-2">
                    {schedule.dates}
                    {isFull ? (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-red-600 ring-1 ring-red-100">
                        Full
                      </span>
                    ) : schedule.interestOnly ? (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-amber-700 ring-1 ring-amber-200">
                        Registration of interest only
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-accent" />
                      <span>{schedule.time}</span>
                    </div>
                    {schedule.venue ? (
                      <div className="flex items-start gap-1.5">
                        <MapPin size={16} className="mt-0.5 text-accent" />
                        <span>{schedule.venue}</span>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
                    <div className="inline-flex items-center gap-1.5 text-gray-700">
                      <Users size={16} className="text-accent" />
                      {isFull
                        ? 'Join waitlist to secure next intake'
                        : schedule.interestOnly
                          ? 'We will follow up when the cohort details are confirmed'
                          : schedule.registrationCloses && schedule.registrationCloses !== 'TBC'
                            ? `Registration closes ${schedule.registrationCloses}`
                            : 'Registration open'}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {schedule.interestOnly ? (
                    <button
                      type="button"
                      onClick={() =>
                        openLeadModal('course_page_cta', 'reserve_seat', {
                          page: '/courses/agentic-ai',
                          position: `schedule_${schedule.month.toLowerCase().replace(' ', '_')}_register_interest_button`,
                          ctaLabel: `register_interest_${schedule.cohortCode}`,
                          preferredIntake: `${schedule.dates} (${schedule.time.replace(/:00/g, '').replace(' - ', '-')}) — Registration of interest (venue TBC)`,
                          cohortCode: schedule.cohortCode,
                          courseSlug: 'agentic-ai',
                        })
                      }
                      className="inline-block w-full rounded-lg bg-primary px-6 py-3 text-center font-bold text-white transition-colors hover:bg-blue-900 md:w-auto"
                    >
                      Register Interest
                    </button>
                  ) : isFull ? (
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
                    <button
                      type="button"
                      onClick={() =>
                        openLeadModal('course_page_cta', 'reserve_seat', {
                          page: '/courses/agentic-ai',
                          position: `schedule_${schedule.month.toLowerCase().replace(' ', '_')}_apply_now_button`,
                          ctaLabel: `apply_now_${schedule.cohortCode || schedule.month.toLowerCase().replace(' ', '_')}`,
                          preferredIntake: `${schedule.dates} (${schedule.time.replace(/:00/g, '').replace(' - ', '-')})`,
                          cohortCode: schedule.cohortCode,
                          courseSlug: 'agentic-ai',
                          redirectUrl: schedule.registrationUrl,
                          skipPayerStep: Boolean(schedule.registrationUrl),
                        })
                      }
                      className="inline-block text-center w-full md:w-auto bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}

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

export default Schedule;
