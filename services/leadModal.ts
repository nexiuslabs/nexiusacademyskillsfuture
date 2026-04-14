import { LeadCapturePayload, LeadSourceTag } from './leadCaptureService';
import { trackCtaClick } from './analytics';

export const openLeadModal = (
  sourceTag: LeadSourceTag,
  intent: LeadCapturePayload['intent'] = 'subsidy_fit',
  ctaMeta?: {
    page?: string;
    position?: string;
    ctaLabel?: string;
    redirectUrl?: string;
  }
) => {
  trackCtaClick({
    page: ctaMeta?.page || (typeof window !== 'undefined' ? window.location.pathname : 'unknown'),
    position: ctaMeta?.position || 'unspecified',
    ctaLabel: ctaMeta?.ctaLabel || 'open_lead_modal',
    destinationType: 'modal',
    destination: 'lead_capture_modal',
  });

  window.dispatchEvent(
    new CustomEvent('open-lead-modal', {
      detail: { sourceTag, intent, redirectUrl: ctaMeta?.redirectUrl },
    })
  );
};
