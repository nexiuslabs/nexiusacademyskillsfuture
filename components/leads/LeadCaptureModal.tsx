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
  trackLeadFormSubmit,
  trackLeadModalOpen,
  trackOutboundClick,
} from '../../services/analytics';

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

const COHORTS_BY_COURSE: Record<string, CohortOption[]> = {
  'agentic-ai': [
    { label: '18–19 May 2026 (9am–6pm)', code: '2026-05-18' },
    { label: '08–09 Jun 2026 (9am–6pm)', code: '2026-06-08' },
    { label: '26 Jun 2026 & 03 Jul 2026 (9am–6pm)', code: '2026-06-26' },
  ],
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

  const closeModal = () => {
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
      setSourceTag(source);
      setOpenMethod('query_auto_open');
      setRedirectUrl(search.get('redirect_url'));
      setFormState((prev) => ({
        ...prev,
        intent: lead === 'join-next-cohort' ? 'reserve_seat' : 'subsidy_fit',
        leadFlow: lead === 'join-next-cohort' ? 'apply_now' : 'subsidy_fit',
      }));
      resetCourseFields();
      setIsSubmitted(false);
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
              : 'subsidy_fit',
      }));
      resetCourseFields();
      setIsSubmitted(false);
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

    try {
      await submitLeadCapture({
        ...formState,
        sourceTag,
        pagePath: location.pathname,
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

  const modalTitle = isReserveFlow
    ? 'Registration'
    : isAdvisoryFlow
      ? 'Team Training Enquiry'
      : 'Check Subsidy & Fit';

  const submitLabel = isReserveFlow
    ? 'Continue'
    : isAdvisoryFlow
      ? 'Request Proposal'
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
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="rounded-lg border px-4 py-3"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  />
                  <input
                    required
                    placeholder="Company name"
                    className="rounded-lg border px-4 py-3"
                    value={formState.companyName}
                    onChange={(e) => setFormState((s) => ({ ...s, companyName: e.target.value }))}
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
                  />
                  <input
                    placeholder="Mobile number (optional)"
                    className="rounded-lg border px-4 py-3 md:col-span-2"
                    value={formState.phone}
                    onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
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
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="rounded-lg border px-4 py-3"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  />
                  <input
                    required
                    placeholder="Phone"
                    className="rounded-lg border px-4 py-3"
                    value={formState.phone}
                    onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                  />
                  <input
                    required
                    placeholder="Company name"
                    className="rounded-lg border px-4 py-3"
                    value={formState.companyName}
                    onChange={(e) => setFormState((s) => ({ ...s, companyName: e.target.value }))}
                  />
                  <input
                    required
                    placeholder="Role"
                    className="rounded-lg border px-4 py-3"
                    value={formState.role}
                    onChange={(e) => setFormState((s) => ({ ...s, role: e.target.value }))}
                  />
                  <input
                    required
                    placeholder="Department or designation"
                    className="rounded-lg border px-4 py-3"
                    value={formState.departmentOrDesignation}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, departmentOrDesignation: e.target.value }))
                    }
                  />
                </div>
                <div className="rounded-lg border border-[#d8e8ff] bg-[#f6faff] px-4 py-3 text-sm text-primary">
                  We will use this enquiry to advise on schedule options, venue setup, and the best next step for your company cohort.
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
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="rounded-lg border px-4 py-3"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  />
                  <input
                    required
                    placeholder="Phone"
                    className="rounded-lg border px-4 py-3"
                    value={formState.phone}
                    onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                  />
                  <input
                    required
                    placeholder="Role"
                    className="rounded-lg border px-4 py-3"
                    value={formState.role}
                    onChange={(e) => setFormState((s) => ({ ...s, role: e.target.value }))}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadCaptureModal;
