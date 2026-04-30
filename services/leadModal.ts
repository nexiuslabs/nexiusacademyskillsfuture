import { LeadCapturePayload, LeadSourceTag } from './leadCaptureService';
import { trackCtaClick } from './analytics';

export const APPLY_NOW_BOOKING_URL =
  'https://outlook.office.com/bookwithme/user/1a3b3c1b65044d24b6cddcc6b42c8ecb@nexiuslabs.com/meetingtype/y-CFPYhh8kiqHLo04FVZTA2?bookingcode=38b8154a-8e20-49a4-9378-07ff08420eee&anonymous&ismsaljsauthenabled&ep=mLinkFromTile';

export const openLeadModal = (
  sourceTag: LeadSourceTag,
  intent: LeadCapturePayload['intent'] = 'subsidy_fit',
  ctaMeta?: {
    page?: string;
    position?: string;
    ctaLabel?: string;
    redirectUrl?: string;
    payerType?: LeadCapturePayload['payerType'];
    skipPayerStep?: boolean;
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
      detail: {
        sourceTag,
        intent,
        redirectUrl: ctaMeta?.redirectUrl,
        payerType: ctaMeta?.payerType,
        skipPayerStep: ctaMeta?.skipPayerStep,
      },
    })
  );
};

export const openApplyNowModal = (
  sourceTag: LeadSourceTag,
  ctaMeta?: {
    page?: string;
    position?: string;
    ctaLabel?: string;
  }
) =>
  openLeadModal(sourceTag, 'reserve_seat', {
    page: ctaMeta?.page,
    position: ctaMeta?.position,
    ctaLabel: ctaMeta?.ctaLabel || 'apply_now',
    redirectUrl: APPLY_NOW_BOOKING_URL,
    skipPayerStep: true,
  });
