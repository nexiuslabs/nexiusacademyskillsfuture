import React, { useState } from 'react';
import { X } from 'lucide-react';
import { openLeadModal } from '../../services/leadModal';
import { trackOutboundClick } from '../../services/analytics';

const TEAM_TRAINING_URL =
  'https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%27m%20from%20an%20accounting%20or%20CSP%20team%20and%20want%20to%20enquire%20about%20team%20training.';

const AccountantStickyConversionRail: React.FC = () => {
  const [desktopVisible, setDesktopVisible] = useState(true);

  return (
    <>
      {desktopVisible && (
        <aside className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-40">
          <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-3 w-56 space-y-2 relative">
            <button
              type="button"
              aria-label="Close next steps box"
              onClick={() => setDesktopVisible(false)}
              className="absolute top-2 right-2 text-gray-400 transition-colors hover:text-primary"
            >
              <X size={16} />
            </button>

            <div className="px-1 pb-1 pr-6 text-[11px] uppercase tracking-wide text-gray-500 font-semibold">Next step</div>
            <button
              type="button"
              onClick={() =>
                openLeadModal('course_sticky', 'subsidy_fit', {
                  page: '/courses/agentic-ai-accountants',
                  position: 'accountants_sticky_desktop_check_fit',
                  ctaLabel: 'check_subsidy_fit',
                })
              }
              className="w-full bg-primary px-4 py-2.5 rounded-lg text-sm font-bold text-white transition-colors hover:bg-blue-900"
            >
              Check Subsidy & Fit
            </button>

            <a
              href={TEAM_TRAINING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackOutboundClick({
                  channel: 'whatsapp',
                  pagePath: '/courses/agentic-ai-accountants',
                  position: 'accountants_sticky_desktop_team_training',
                })
              }
              className="block w-full border border-primary px-4 py-2.5 rounded-lg text-center text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Enquire for Team Training
            </a>
          </div>
        </aside>
      )}

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white p-3 shadow-[0_-8px_20px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() =>
              openLeadModal('course_sticky', 'subsidy_fit', {
                page: '/courses/agentic-ai-accountants',
                position: 'accountants_sticky_mobile_check_fit',
                ctaLabel: 'check_subsidy_fit',
              })
            }
            className="rounded-md bg-primary py-3 text-center text-xs font-bold text-white"
          >
            Check Subsidy & Fit
          </button>
          <a
            href={TEAM_TRAINING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackOutboundClick({
                channel: 'whatsapp',
                pagePath: '/courses/agentic-ai-accountants',
                position: 'accountants_sticky_mobile_team_training',
              })
            }
            className="rounded-md border border-primary py-3 text-center text-xs font-bold text-primary"
          >
            Team Training
          </a>
        </div>
      </div>
    </>
  );
};

export default AccountantStickyConversionRail;
