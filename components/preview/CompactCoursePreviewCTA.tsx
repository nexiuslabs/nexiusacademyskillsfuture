import React from 'react';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { openLeadModal } from '../../services/leadModal';

interface CompactCoursePreviewCTAProps {
  pagePath: string;
  position: string;
  className?: string;
}

const CompactCoursePreviewCTA: React.FC<CompactCoursePreviewCTAProps> = ({
  pagePath,
  position,
  className = '',
}) => {
  const reserveSeat = () =>
    openLeadModal('free_preview', 'reserve_seat', {
      page: pagePath,
      position,
      ctaLabel: 'reserve_22_aug_free_preview',
      preferredIntake: '22 Aug 2026 preview session (10am-1pm)',
      cohortCode: 'free-preview-2026-08-22',
      courseSlug: 'free-preview',
    });

  return (
    <aside className={`my-10 overflow-hidden rounded-2xl bg-[#0d1f3d] p-6 text-white shadow-lg sm:p-8 ${className}`}>
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">Free Agentic AI Preview</div>
      <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">Try the course experience before you enrol</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-white/75">
        Join a practical 3-hour introduction to Agentic AI for non-technical professionals.
      </p>
      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
          <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
          <div>
            <div className="font-bold">Saturday, 22 August 2026</div>
            <div className="mt-0.5 text-white/70">10:00am to 1:00pm</div>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
          <div>
            <div className="font-bold">Singapore Institute of Management</div>
            <div className="mt-0.5 text-white/70">461 Clementi Road, Singapore 599491</div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={reserveSeat}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-teal-400 px-5 py-3 font-bold text-black transition-colors hover:bg-teal-300"
      >
        Reserve Your Seat <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </aside>
  );
};

export default CompactCoursePreviewCTA;
