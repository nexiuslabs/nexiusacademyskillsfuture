import React from 'react';
import { openLeadModal } from '../../services/leadModal';
import { trackOutboundClick } from '../../services/analytics';

const APPLY_LINK = 'https://stms.polite.edu.sg/cetapi/api/v1/custom/extendauthorize?id_token=rHHqe3GLYxhIYwh82qTpAKuHaXtejYUMXXcX5m42t14MVbIM54f%2BJo2weFWoM7%2Fu';

const StickyConversionRail: React.FC = () => {
  return (
    <>
      <aside className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-3 w-56 space-y-2">
          <div className="px-1 pb-1 text-[11px] uppercase tracking-wide text-gray-500 font-semibold">Next step</div>
          <button
            type="button"
            onClick={() =>
              openLeadModal('course_sticky', 'subsidy_fit', {
                page: '/courses/agentic-ai',
                position: 'course_sticky_desktop_check_subsidy',
                ctaLabel: 'check_subsidy',
              })
            }
            className="w-full bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-900"
          >
            Check Subsidy & Fit
          </button>

          <a
            href="https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%20want%20to%20check%20my%20subsidy%20and%20course%20fit."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackOutboundClick({
                channel: 'whatsapp',
                pagePath: '/courses/agentic-ai',
                position: 'course_sticky_desktop_whatsapp',
              })
            }
            className="block text-center w-full bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-emerald-600"
          >
            WhatsApp Advisor
          </a>

          <button
            type="button"
            onClick={() =>
              openLeadModal('course_sticky', 'reserve_seat', {
                page: '/courses/agentic-ai',
                position: 'course_sticky_desktop_apply_now',
                ctaLabel: 'apply_now',
                redirectUrl: APPLY_LINK,
              })
            }
            className="block text-center w-full border border-primary text-primary px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-primary hover:text-white"
          >
            Apply Now
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 p-3 shadow-[0_-8px_20px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() =>
              openLeadModal('course_sticky', 'subsidy_fit', {
                page: '/courses/agentic-ai',
                position: 'course_sticky_mobile_check_subsidy',
                ctaLabel: 'check_subsidy',
              })
            }
            className="bg-primary text-white py-2 rounded-md text-xs font-bold"
          >
            Check Subsidy
          </button>
          <a
            href="https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%20want%20to%20check%20my%20subsidy%20and%20course%20fit."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackOutboundClick({
                channel: 'whatsapp',
                pagePath: '/courses/agentic-ai',
                position: 'course_sticky_mobile_whatsapp',
              })
            }
            className="bg-emerald-500 text-white py-2 rounded-md text-xs font-bold text-center"
          >
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() =>
              openLeadModal('course_sticky', 'reserve_seat', {
                page: '/courses/agentic-ai',
                position: 'course_sticky_mobile_apply_now',
                ctaLabel: 'apply_now',
                redirectUrl: APPLY_LINK,
              })
            }
            className="border border-primary text-primary py-2 rounded-md text-xs font-bold text-center"
          >
            Apply Now
          </button>
        </div>
      </div>
    </>
  );
};

export default StickyConversionRail;
