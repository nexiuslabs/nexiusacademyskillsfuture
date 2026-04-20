import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import {
  estimateNetFee,
  LeadCapturePayload,
  LeadSourceTag,
  submitLeadCapture,
} from '../../services/leadCaptureService';
import {
  trackLeadFormFieldCompleted,
  trackLeadFormStarted,
  trackLeadFormSubmit,
  trackLeadModalClose,
  trackLeadModalOpen,
  trackOutboundClick,
} from '../../services/analytics';
import { getVisitorContext } from '../../services/visitorSession';

declare global {
  interface WindowEventMap {
    'open-lead-modal': CustomEvent<{
      sourceTag?: LeadSourceTag;
      intent?: LeadCapturePayload['intent'];
      redirectUrl?: string;
    }>;
  }
}

type CohortOption = { label: string; code: string };
type LeadIntent = LeadCapturePayload['intent'];

const COHORTS_BY_COURSE: Record<string, CohortOption[]> = {
  'agentic-ai': [{ label: '26 Jun 2026 & 03 Jul 2026 (9am–6pm)', code: '2026-06-26' }],
  'agentic-ai-accountants': [{ label: '06–07 May 2026', code: '2026-05-06' }],
  'agentic-ai-company-class': [
    { label: 'Private class schedule by arrangement', code: 'corporate-custom' },
  ],
};

const getCourseSlugFromPath = (path: string) => {
  if (path.includes('/courses/agentic-ai-company-class')) return 'agentic-ai-company-class';
  if (path.includes('/courses/agentic-ai-accountants')) return 'agentic-ai-accountants';
  if (path.includes('/courses/agentic-ai')) return 'agentic-ai';
  return 'general';
};

const defaultCohortForPath = (path: string): CohortOption => {
  const slug = getCourseSlugFromPath(path);
  const cohorts = COHORTS_BY_COURSE[slug] || [];
  return cohorts[0] || { label: 'TBD', code: 'tbd' };
};

const LeadCaptureModal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCohort = defaultCohortForPath(location.pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const [sourceTag, setSourceTag] = useState<LeadSourceTag>('unknown');
  const [openMethod, setOpenMethod] = useState<'cta_click' | 'query_auto_open'>('cta_click');
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [formState, setFormState] = useState<Omit<LeadCapturePayload, 'sourceTag' | 'pagePath'>>({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    companyName: '',
    departmentOrDesignation: '',
    leadFlow: 'subsidy_fit',
    ageBand: 'below_40',
    preferredIntake: initialCohort.label,
    cohortCode: initialCohort.code,
    courseSlug: getCourseSlugFromPath(location.pathname),
    intent: 'subsidy_fit',
  });

  const estimate = useMemo(() => estimateNetFee(formState.ageBand), [formState.ageBand]);
  const cohortOptions = useMemo(() => {
    const options = COHORTS_BY_COURSE[getCourseSlugFromPath(location.pathname)] || [];
    return options.length > 0 ? options : [{ label: 'TBD', code: 'tbd' }];
  }, [location.pathname]);

  const isReserveFlow = formState.intent === 'reserve_seat';
  const isAdvisoryFlow = formState.intent === 'advisory_call';
  const isChecklistFlow = formState.intent === 'download_checklist';

  const triggerDownload = (url: string) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const closeModal = () => {
    trackLeadModalClose({
      sourceTag,
      intent: formState.intent,
      pagePath: location.pathname,
    });
    setIsOpen(false);
    setIsSubmitting(false);
  };

  const resetCourseFields = () => {
    const first = defaultCohortForPath(location.pathname);
    setFormState((prev) => ({
      ...prev,
      courseSlug: getCourseSlugFromPath(location.pathname),
      preferredIntake: first.label,
      cohortCode: first.code,
    }));
  };

  useEffect(() => {
    resetCourseFields();
  }, [location.pathname]);

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const lead = search.get('lead');
    const source = (search.get('lead_source') as LeadSourceTag | null) || 'unknown';

    if (lead) {
      const nextIntent: LeadIntent =
        lead === 'join-next-cohort'
          ? 'reserve_seat'
          : lead === 'workflow-checklist'
            ? 'download_checklist'
            : 'subsidy_fit';
      setSourceTag(source);
      setOpenMethod('query_auto_open');
      setRedirectUrl(search.get('redirect_url'));
      setFormState((prev) => ({
        ...prev,
        intent: nextIntent,
        leadFlow:
          nextIntent === 'reserve_seat'
            ? 'apply_now'
            : nextIntent === 'download_checklist'
              ? 'checklist_download'
              : 'subsidy_fit',
      }));
      resetCourseFields();
      setIsSubmitted(false);
      setHasStartedForm(false);
      setIsOpen(true);
    }
  }, [location.search]);

  useEffect(() => {
    const handler = (event: WindowEventMap['open-lead-modal']) => {
      const nextIntent = event.detail?.intent || 'subsidy_fit';

      setSourceTag(event.detail?.sourceTag || 'unknown');
      setOpenMethod('cta_click');
      setRedirectUrl(event.detail?.redirectUrl || null);
      setFormState((prev) => ({
        ...prev,
        intent: nextIntent,
        leadFlow:
          nextIntent === 'reserve_seat'
            ? 'apply_now'
            : nextIntent === 'advisory_call'
              ? 'advisory_call'
              : nextIntent === 'download_checklist'
                ? 'checklist_download'
              : 'subsidy_fit',
      }));
      resetCourseFields();
      setIsSubmitted(false);
      setHasStartedForm(false);
      setIsOpen(true);
    };

    window.addEventListener('open-lead-modal', handler);
    return () => window.removeEventListener('open-lead-modal', handler);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;

    trackLeadModalOpen({
      sourceTag,
      intent: formState.intent,
      pagePath: location.pathname,
      openMethod,
    });
  }, [formState.intent, isOpen, location.pathname, openMethod, sourceTag]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const visitorContext = getVisitorContext();

    try {
      await submitLeadCapture({
        ...formState,
        phone: isChecklistFlow ? '' : formState.phone,
        role: isChecklistFlow ? 'Checklist download lead' : formState.role,
        companyName: isChecklistFlow ? '' : formState.companyName,
        departmentOrDesignation: isChecklistFlow ? '' : formState.departmentOrDesignation,
        leadFlow: isChecklistFlow ? 'subsidy_fit' : formState.leadFlow,
        ageBand: isChecklistFlow ? 'below_40' : formState.ageBand,
        preferredIntake: isChecklistFlow ? 'Checklist download' : formState.preferredIntake,
        cohortCode: isChecklistFlow ? 'checklist-download' : formState.cohortCode,
        courseSlug: isChecklistFlow ? 'agentic-ai' : formState.courseSlug,
        intent: isChecklistFlow ? 'subsidy_fit' : formState.intent,
        sourceTag,
        pagePath: location.pathname,
        visitorId: visitorContext?.visitorId,
        sessionId: visitorContext?.sessionId,
      });

      trackLeadFormSubmit({
        sourceTag,
        intent: formState.intent,
        pagePath: location.pathname,
        status: 'success',
      });

      if (isReserveFlow && redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      if (isChecklistFlow && redirectUrl) {
        triggerDownload(redirectUrl);
      }

      setIsSubmitted(true);

      const params = new URLSearchParams(location.search);
      if (params.has('lead') || params.has('lead_source')) {
        params.delete('lead');
        params.delete('lead_source');
        navigate(
          { pathname: location.pathname, search: params.toString() ? `?${params.toString()}` : '' },
          { replace: true }
        );
      }
    } catch (_error) {
      trackLeadFormSubmit({
        sourceTag,
        intent: formState.intent,
        pagePath: location.pathname,
        status: 'failed',
      });
      alert('Could not submit right now. Please try again, or message Melverick on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const onFieldFocus = () => {
    if (hasStartedForm) return;

    setHasStartedForm(true);
    trackLeadFormStarted({
      sourceTag,
      intent: formState.intent,
      pagePath: location.pathname,
    });
  };

  const onFieldCompleted = (fieldName: string, value: string) => {
    if (!value.trim()) return;

    trackLeadFormFieldCompleted({
      pagePath: location.pathname,
      fieldName,
      intent: formState.intent,
    });
  };

  const modalTitle = isReserveFlow
    ? 'Registration'
    : isAdvisoryFlow
      ? 'Team Training Enquiry'
      : isChecklistFlow
        ? 'Get the Checklist'
        : 'Check Subsidy & Fit';

  const submitLabel = isReserveFlow
    ? 'Continue'
    : isAdvisoryFlow
      ? 'Request Proposal'
      : isChecklistFlow
        ? 'Send My Checklist'
        : 'Get My Estimate & Next Step';

  const whatsappHref = isAdvisoryFlow
    ? 'https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%20just%20submitted%20a%20team%20training%20enquiry%20and%20want%20to%20discuss%20a%20dedicated%20company%20class.'
    : 'https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%20just%20submitted%20the%20subsidy%20form%20and%20want%20to%20confirm%20my%20best%20intake.';

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-xl font-bold text-primary">{modalTitle}</h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-primary"
            aria-label="Close lead form"
          >
            <X size={20} />
          </button>
        </div>

        {!isSubmitted ? (
          <form className="space-y-4 p-6" onSubmit={onSubmit}>
            {isReserveFlow ? (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    required
                    placeholder="Full name"
                    className="rounded-lg border px-4 py-3"
                    value={formState.fullName}
                    onChange={(e) => setFormState((s) => ({ ...s, fullName: e.target.value }))}
                    onFocus={onFieldFocus}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="rounded-lg border px-4 py-3"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    onFocus={onFieldFocus}
                    onBlur={(e) => onFieldCompleted('email', e.target.value)}
                  />
                  <input
                    required
                    placeholder="Company name"
                    className="rounded-lg border px-4 py-3"
                    value={formState.companyName}
                    onChange={(e) => setFormState((s) => ({ ...s, companyName: e.target.value }))}
                    onFocus={onFieldFocus}
                  />
                  <input
                    required
                    placeholder="Department or designation"
                    className="rounded-lg border px-4 py-3"
                    value={formState.departmentOrDesignation}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        departmentOrDesignation: e.target.value,
                        role: e.target.value,
                        }))
                    }
                    onFocus={onFieldFocus}
                  />
                  <input
                    placeholder="Mobile number (optional)"
                    className="rounded-lg border px-4 py-3 md:col-span-2"
                    value={formState.phone}
                    onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                    onFocus={onFieldFocus}
                    onBlur={(e) => onFieldCompleted('phone', e.target.value)}
                  />
                </div>
              </>
            ) : isAdvisoryFlow ? (
              <>
                <p className="text-sm text-gray-600">
                  Tell us about your team and we will advise on the most suitable private-company class setup.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    required
                    placeholder="Full name"
                    className="rounded-lg border px-4 py-3"
                    value={formState.fullName}
                    onChange={(e) => setFormState((s) => ({ ...s, fullName: e.target.value }))}
                    onFocus={onFieldFocus}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="rounded-lg border px-4 py-3"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    onFocus={onFieldFocus}
                    onBlur={(e) => onFieldCompleted('email', e.target.value)}
                  />
                  <input
                    required
                    placeholder="Phone"
                    className="rounded-lg border px-4 py-3"
                    value={formState.phone}
                    onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                    onFocus={onFieldFocus}
                    onBlur={(e) => onFieldCompleted('phone', e.target.value)}
                  />
                  <input
                    required
                    placeholder="Company name"
                    className="rounded-lg border px-4 py-3"
                    value={formState.companyName}
                    onChange={(e) => setFormState((s) => ({ ...s, companyName: e.target.value }))}
                    onFocus={onFieldFocus}
                  />
                  <input
                    required
                    placeholder="Role"
                    className="rounded-lg border px-4 py-3"
                    value={formState.role}
                    onChange={(e) => setFormState((s) => ({ ...s, role: e.target.value }))}
                    onFocus={onFieldFocus}
                  />
                  <input
                    required
                    placeholder="Department or designation"
                    className="rounded-lg border px-4 py-3"
                    value={formState.departmentOrDesignation}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, departmentOrDesignation: e.target.value }))
                    }
                    onFocus={onFieldFocus}
                  />
                </div>
                <div className="rounded-lg border border-[#d8e8ff] bg-[#f6faff] px-4 py-3 text-sm text-primary">
                  We will use this enquiry to advise on schedule options, venue setup, and the best next step for your company cohort.
                </div>
              </>
            ) : isChecklistFlow ? (
              <>
                <p className="text-sm text-gray-600">
                  Enter your name and email to download the SME AI workflow checklist.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    required
                    placeholder="Full name"
                    className="rounded-lg border px-4 py-3"
                    value={formState.fullName}
                    onChange={(e) => setFormState((s) => ({ ...s, fullName: e.target.value }))}
                    onFocus={onFieldFocus}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="rounded-lg border px-4 py-3"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    onFocus={onFieldFocus}
                    onBlur={(e) => onFieldCompleted('email', e.target.value)}
                  />
                </div>

                <div className="rounded-lg border border-[#d8e8ff] bg-[#f6faff] px-4 py-3 text-sm text-primary">
                  You will get the checklist PDF immediately after submitting. We will also save your details in our lead table for follow-up.
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    required
                    placeholder="Full name"
                    className="rounded-lg border px-4 py-3"
                    value={formState.fullName}
                    onChange={(e) => setFormState((s) => ({ ...s, fullName: e.target.value }))}
                    onFocus={onFieldFocus}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="rounded-lg border px-4 py-3"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    onFocus={onFieldFocus}
                    onBlur={(e) => onFieldCompleted('email', e.target.value)}
                  />
                  <input
                    required
                    placeholder="Phone"
                    className="rounded-lg border px-4 py-3"
                    value={formState.phone}
                    onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                    onFocus={onFieldFocus}
                    onBlur={(e) => onFieldCompleted('phone', e.target.value)}
                  />
                  <input
                    required
                    placeholder="Role"
                    className="rounded-lg border px-4 py-3"
                    value={formState.role}
                    onChange={(e) => setFormState((s) => ({ ...s, role: e.target.value }))}
                    onFocus={onFieldFocus}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <select
                    className="rounded-lg border px-4 py-3"
                    value={formState.ageBand}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        ageBand: e.target.value as LeadCapturePayload['ageBand'],
                      }))
                    }
                    onFocus={onFieldFocus}
                  >
                    <option value="below_40">Age below 40</option>
                    <option value="40_and_above">Age 40 and above</option>
                  </select>

                  <select
                    required
                    className="rounded-lg border px-4 py-3"
                    value={formState.cohortCode}
                    onChange={(e) => {
                      const selected = cohortOptions.find((c) => c.code === e.target.value) || cohortOptions[0];
                      setFormState((s) => ({
                        ...s,
                        cohortCode: selected.code,
                        preferredIntake: selected.label,
                      }));
                    }}
                    onFocus={onFieldFocus}
                  >
                    {cohortOptions.map((cohort) => (
                      <option key={cohort.code} value={cohort.code}>
                        {cohort.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-lg border border-[#d8e8ff] bg-[#f6faff] px-4 py-3 text-sm text-primary">
                  <p className="font-semibold">Estimated net payable: {estimate.amount}</p>
                  <p className="text-gray-600">{estimate.note}</p>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-accent py-3 font-bold text-white hover:bg-opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : submitLabel}
            </button>
          </form>
        ) : (
          <div className="p-6">
            <h4 className="mb-2 text-xl font-bold text-primary">You’re all set</h4>
            {isAdvisoryFlow ? (
              <>
                <p className="mb-4 text-gray-700">
                  Your enquiry has been submitted. Our team will contact you to discuss the most suitable dedicated-company class setup.
                </p>
                <p className="mb-5 text-sm text-gray-600">
                  If you want to move faster, message Melverick directly on WhatsApp.
                </p>
              </>
            ) : isChecklistFlow ? (
              <>
                <p className="mb-4 text-gray-700">
                  Your checklist is ready. The download should start automatically.
                </p>
                <p className="mb-5 text-sm text-gray-600">
                  If it did not start, use the button below to download it manually.
                </p>
                {redirectUrl ? (
                  <a
                    href={redirectUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white"
                  >
                    Download the Checklist <ArrowRight size={16} />
                  </a>
                ) : null}
              </>
            ) : (
              <>
                <p className="mb-4 text-gray-700">
                  Your estimated net fee is <strong>{estimate.amount}</strong>. Our team will contact you with the best intake and eligibility guidance.
                </p>
                <p className="mb-5 text-sm text-gray-600">
                  Next best action: message Melverick directly for immediate advice.
                </p>
              </>
            )}

            {!isChecklistFlow ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackOutboundClick({
                    channel: 'whatsapp',
                    pagePath: location.pathname,
                    position: 'lead_modal_thank_you',
                  })
                }
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white"
              >
                Continue on WhatsApp <ArrowRight size={16} />
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadCaptureModal;

