import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  X,
  ArrowRight,
  Building2,
  CheckCircle,
  ChevronLeft,
  CreditCard,
  Mail,
  ShieldCheck,
} from 'lucide-react';
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
  trackRegistrationPathSelected,
} from '../../services/analytics';
import { getVisitorContext } from '../../services/visitorSession';

declare global {
  interface WindowEventMap {
    'open-lead-modal': CustomEvent<{
      sourceTag?: LeadSourceTag;
      intent?: LeadCapturePayload['intent'];
      redirectUrl?: string;
      payerType?: LeadCapturePayload['payerType'];
    }>;
  }
}

type CohortOption = { label: string; code: string };
type LeadIntent = LeadCapturePayload['intent'];

const COHORTS_BY_COURSE: Record<string, CohortOption[]> = {
  'agentic-ai': [{ label: '26 Jun 2026 & 03 Jul 2026 (9am-6pm)', code: '2026-06-26' }],
  'agentic-ai-accountants': [{ label: '06-07 May 2026', code: '2026-05-06' }],
  'agentic-ai-company-class': [{ label: 'Private class schedule by arrangement', code: 'corporate-custom' }],
};
const ACCOUNTANTS_SELF_REGISTRATION_URL =
  'https://stms.polite.edu.sg/identity/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DStudent%26redirect_uri%3Dhttps%253A%252F%252Fstms.polite.edu.sg%252Fsignin-student%26response_type%3Dcode%26scope%3Dopenid%2520profile%26code_challenge%3DE_QgKHQVqjJlxFGerdkqw-CVtB-r2B4RdhgYFtBulIg%26code_challenge_method%3DS256%26response_mode%3Dform_post%26nonce%3D639124957031034808.NDQzYmQwOTYtOWY5Ni00OTM5LTkwMDgtYTBiMzk1NjVjOGQzZjFmMWM5YWYtYmRjYS00NWM1LTkxNmItOThkOTA5MGVhNTQx%26state%3DE6QlwbfBI3OA11ZwIH4Ce3Hy1zQSg-TlR9ATT08PgcDZpzYcK6Hlnu7JhAzoSqzcviv-hCEO-K0WzQqqJ6BMKJRFlmWyH-xHA3nc04SezmEcoiwp6IinEGRjRL8p1l3t6DTM32RcTGSLk4Ic9tuN3uQzK30xsOv5ofLW5nXy3Rsq5FJ_pwLHx680-VeNfDmEw6kTwtTFgvIkkxc8HHa80_hXIT_s9ce9z_9X_NbHJ935xIUquP9iuh_uIKmQNfupYVgc32kCr6I9EsBzyuC3APFjPcoOCuIX84yq8-rGRqHnKXcOzVCND5n_Ssn5rH-JaNOgNuFppkA1c8LVzOvdaJ5pJI-mkj3rW2nFKpt3v8g9EG4uHe8tPjV04bncLHH8o8ydsxcgOQy9sBUPIYTVxcpyAbw8ywMmo_yJMRuvr2T4ZbH0_q3ZoMsK-cA-qhuZrtpMA-nMLcIVV7Vx7MAfQLBb-C3hh9Wp2ICoTnmKJKk8ahBCRZdFmtyO3XWJEWOAVlJz07Uv33KeKJZqIHlZxQ%26x-client-SKU%3DID_NET8_0%26x-client-ver%3D7.1.2.0';

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
  const isAccountantsRegistration = location.pathname.includes('/courses/agentic-ai-accountants');

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const [registrationStep, setRegistrationStep] = useState<1 | 2>(1);
  const [isPayerTypeLocked, setIsPayerTypeLocked] = useState(false);
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
    payerType: 'self',
    sponsorContactName: '',
    sponsorContactEmail: '',
    sponsorStatus: 'not_applicable',
  });

  const estimate = useMemo(() => estimateNetFee(formState.ageBand), [formState.ageBand]);
  const cohortOptions = useMemo(() => {
    const options = COHORTS_BY_COURSE[getCourseSlugFromPath(location.pathname)] || [];
    return options.length > 0 ? options : [{ label: 'TBD', code: 'tbd' }];
  }, [location.pathname]);

  const isReserveFlow = formState.intent === 'reserve_seat';
  const isAdvisoryFlow = formState.intent === 'advisory_call';
  const isChecklistFlow = formState.intent === 'download_checklist';
  const isCompanySponsored = isReserveFlow && isAccountantsRegistration && formState.payerType === 'company_sponsored';
  const effectiveRedirectUrl =
    redirectUrl ||
    (isReserveFlow && isAccountantsRegistration && formState.payerType === 'self'
      ? ACCOUNTANTS_SELF_REGISTRATION_URL
      : null);
  const shouldSkipPayerStep =
    isReserveFlow &&
    isAccountantsRegistration &&
    isPayerTypeLocked &&
    formState.payerType === 'self' &&
    Boolean(effectiveRedirectUrl);

  const canContinueToPayerStep =
    formState.fullName.trim() &&
    formState.email.trim() &&
    formState.phone.trim() &&
    formState.role.trim() &&
    formState.cohortCode.trim();

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

  const selectRegistrationPath = (payerType: LeadCapturePayload['payerType']) => {
    setFormState((prev) => ({
      ...prev,
      payerType,
      leadFlow: payerType === 'company_sponsored' ? 'company_sponsorship' : 'apply_now',
      companyName: payerType === 'company_sponsored' ? prev.companyName : '',
      departmentOrDesignation:
        payerType === 'company_sponsored'
          ? prev.departmentOrDesignation
          : prev.departmentOrDesignation || prev.role,
      sponsorContactName: payerType === 'company_sponsored' ? prev.sponsorContactName : '',
      sponsorContactEmail: payerType === 'company_sponsored' ? prev.sponsorContactEmail : '',
      sponsorStatus: payerType === 'company_sponsored' ? 'pending_hr_approval' : 'not_applicable',
    }));

    trackRegistrationPathSelected({
      pagePath: location.pathname,
      payerType,
      sourceTag,
    });
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
      setIsPayerTypeLocked(false);
      setFormState((prev) => ({
        ...prev,
        intent: nextIntent,
        leadFlow:
          nextIntent === 'reserve_seat'
            ? 'apply_now'
            : nextIntent === 'download_checklist'
              ? 'checklist_download'
              : 'subsidy_fit',
        payerType: 'self',
        sponsorContactName: '',
        sponsorContactEmail: '',
        sponsorStatus: 'not_applicable',
      }));
      resetCourseFields();
      setIsSubmitted(false);
      setHasStartedForm(false);
      setRegistrationStep(1);
      setIsOpen(true);
    }
  }, [location.search]);

  useEffect(() => {
    const handler = (event: WindowEventMap['open-lead-modal']) => {
      const nextIntent = event.detail?.intent || 'subsidy_fit';
      const nextPayerType = event.detail?.payerType || 'self';

      setSourceTag(event.detail?.sourceTag || 'unknown');
      setOpenMethod('cta_click');
      setRedirectUrl(event.detail?.redirectUrl || null);
      setIsPayerTypeLocked(Boolean(event.detail?.payerType));
      setFormState((prev) => ({
        ...prev,
        intent: nextIntent,
        leadFlow:
          nextIntent === 'reserve_seat'
            ? nextPayerType === 'company_sponsored'
              ? 'company_sponsorship'
              : 'apply_now'
            : nextIntent === 'advisory_call'
              ? 'advisory_call'
              : nextIntent === 'download_checklist'
                ? 'checklist_download'
                : 'subsidy_fit',
        payerType: nextPayerType,
        sponsorContactName: '',
        sponsorContactEmail: '',
        sponsorStatus: nextPayerType === 'company_sponsored' ? 'pending_hr_approval' : 'not_applicable',
      }));
      resetCourseFields();
      setIsSubmitted(false);
      setHasStartedForm(false);
      setRegistrationStep(1);
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

    if (isReserveFlow && isAccountantsRegistration && registrationStep === 1 && !shouldSkipPayerStep) {
      if (canContinueToPayerStep) {
        setRegistrationStep(2);
      }
      return;
    }

    setIsSubmitting(true);
    const visitorContext = getVisitorContext();

    try {
      await submitLeadCapture({
        ...formState,
        phone: isChecklistFlow ? '' : formState.phone,
        role: isChecklistFlow ? 'Checklist download lead' : formState.role,
        companyName: isChecklistFlow
          ? ''
          : formState.companyName || (formState.intent === 'reserve_seat' ? 'Self-sponsored learner' : ''),
        departmentOrDesignation: isChecklistFlow ? '' : formState.departmentOrDesignation || formState.role,
        leadFlow: isChecklistFlow ? 'subsidy_fit' : formState.leadFlow,
        ageBand: isChecklistFlow ? 'below_40' : formState.ageBand,
        preferredIntake: isChecklistFlow ? 'Checklist download' : formState.preferredIntake,
        cohortCode: isChecklistFlow ? 'checklist-download' : formState.cohortCode,
        courseSlug: isChecklistFlow ? 'agentic-ai' : formState.courseSlug,
        intent: isChecklistFlow ? 'subsidy_fit' : formState.intent,
        payerType: isChecklistFlow ? 'self' : formState.payerType,
        sponsorContactName: isChecklistFlow ? '' : formState.sponsorContactName,
        sponsorContactEmail: isChecklistFlow ? '' : formState.sponsorContactEmail,
        sponsorStatus: isChecklistFlow ? 'not_applicable' : formState.sponsorStatus,
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

      if (isReserveFlow && effectiveRedirectUrl && formState.payerType !== 'company_sponsored') {
        window.location.href = effectiveRedirectUrl;
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
    } catch (error) {
      trackLeadFormSubmit({
        sourceTag,
        intent: formState.intent,
        pagePath: location.pathname,
        status: 'failed',
      });
      const message =
        error instanceof Error && error.message
          ? `Could not submit right now. ${error.message}`
          : 'Could not submit right now. Please try again, or message Melverick on WhatsApp.';
      alert(message);
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
    ? isAccountantsRegistration && registrationStep === 1
      ? 'Registration Details'
      : isAccountantsRegistration
        ? 'Who Is Paying?'
        : 'Registration'
    : isAdvisoryFlow
      ? 'Team Training Enquiry'
      : isChecklistFlow
        ? 'Get the Checklist'
        : 'Check Subsidy & Fit';

  const submitLabel = isReserveFlow
    ? isCompanySponsored
      ? 'Submit Sponsorship Request'
      : 'Continue with Registration'
    : isAdvisoryFlow
      ? 'Request Proposal'
      : isChecklistFlow
        ? 'Send My Checklist'
        : 'Get My Estimate & Next Step';

  const stepOneButtonLabel = shouldSkipPayerStep
    ? 'Continue with Registration'
    : isPayerTypeLocked && formState.payerType === 'company_sponsored'
      ? 'Continue to Sponsor Details'
      : 'Continue to Payer Mode';

  const whatsappHref = isAdvisoryFlow
    ? 'https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%20just%20submitted%20a%20team%20training%20enquiry%20and%20want%20to%20discuss%20a%20dedicated%20company%20class.'
    : 'https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%20just%20submitted%20the%20subsidy%20form%20and%20want%20to%20confirm%20my%20best%20intake.';

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-xl font-bold text-primary">{modalTitle}</h3>
          <button onClick={closeModal} className="text-gray-500 hover:text-primary" aria-label="Close lead form">
            <X size={20} />
          </button>
        </div>

        {!isSubmitted ? (
          <form className="space-y-4 p-6" onSubmit={onSubmit}>
            {isReserveFlow && isAccountantsRegistration ? (
              <>
                <div className="rounded-2xl border border-primary/10 bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_58%,#f1f7ff_100%)] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-1 items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${registrationStep === 1 ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                        1
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary">Your details</div>
                        <div className="text-xs text-gray-500">Common registration information</div>
                      </div>
                    </div>
                    <div className="h-px flex-1 bg-primary/15" />
                    <div className="flex flex-1 items-center gap-3 justify-end">
                      <div>
                        <div className="text-right text-sm font-semibold text-primary">Payer mode</div>
                        <div className="text-right text-xs text-gray-500">Choose the right path</div>
                      </div>
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${registrationStep === 2 ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                        2
                      </div>
                    </div>
                  </div>
                </div>

                {registrationStep === 1 ? (
                  <>
                    <div className="rounded-xl border border-[#d8e8ff] bg-[#f6faff] px-4 py-3 text-sm text-primary">
                      Start with your registration details first. In the next step, choose whether you are paying yourself or submitting a company-sponsored request.
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <input
                        required
                        placeholder="Your full name"
                        className="rounded-lg border px-4 py-3"
                        value={formState.fullName}
                        onChange={(e) => setFormState((s) => ({ ...s, fullName: e.target.value }))}
                        onFocus={onFieldFocus}
                      />
                      <input
                        required
                        type="email"
                        placeholder="Your work email"
                        className="rounded-lg border px-4 py-3"
                        value={formState.email}
                        onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                        onFocus={onFieldFocus}
                        onBlur={(e) => onFieldCompleted('email', e.target.value)}
                      />
                      <input
                        required
                        placeholder="Mobile number"
                        className="rounded-lg border px-4 py-3"
                        value={formState.phone}
                        onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                        onFocus={onFieldFocus}
                        onBlur={(e) => onFieldCompleted('phone', e.target.value)}
                      />
                      <input
                        required
                        placeholder="Your role or designation"
                        className="rounded-lg border px-4 py-3"
                        value={formState.role}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            role: e.target.value,
                            departmentOrDesignation: s.departmentOrDesignation || e.target.value,
                          }))
                        }
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
                        <option value="below_40">Learner age below 40</option>
                        <option value="40_and_above">Learner age 40 and above</option>
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
                ) : (
                  <>
                    <div className="rounded-2xl border border-primary/10 bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_58%,#f1f7ff_100%)] p-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">Step 2</p>
                      <h4 className="mb-2 text-2xl font-bold text-primary">
                        {isPayerTypeLocked
                          ? formState.payerType === 'company_sponsored'
                            ? 'Company-sponsored registration'
                            : 'Self-sponsored registration'
                          : 'Who is paying?'}
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {isPayerTypeLocked
                          ? formState.payerType === 'company_sponsored'
                            ? 'You already chose the company-sponsored path. Add the sponsor details below to continue.'
                            : 'You already chose the self-sponsored path. Review the next step below and continue.'
                          : 'Choose the path that matches your situation so you do not end up stuck mid-registration.'}
                      </p>

                      {!isPayerTypeLocked ? (
                        <div className="mt-5 grid gap-3 md:grid-cols-2">
                          <button
                            type="button"
                            onClick={() => selectRegistrationPath('self')}
                            className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                              formState.payerType === 'self'
                                ? 'border-primary bg-white shadow-sm'
                                : 'border-gray-200 bg-white/70 hover:border-primary/40'
                            }`}
                          >
                            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <CreditCard size={18} />
                            </div>
                            <div className="font-bold text-primary">I'm paying myself</div>
                            <div className="mt-1 text-sm text-gray-600">
                              Complete registration directly and confirm your intake.
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => selectRegistrationPath('company_sponsored')}
                            className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                              formState.payerType === 'company_sponsored'
                                ? 'border-primary bg-white shadow-sm'
                                : 'border-gray-200 bg-white/70 hover:border-primary/40'
                            }`}
                          >
                            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <Building2 size={18} />
                            </div>
                            <div className="font-bold text-primary">My company is sponsoring me</div>
                            <div className="mt-1 text-sm text-gray-600">
                              Start a guided sponsorship request with your HR, finance, or admin contact.
                            </div>
                          </button>
                        </div>
                      ) : null}
                    </div>

                    {isCompanySponsored ? (
                      <>
                        <div className="grid gap-3 rounded-2xl border border-gray-200 bg-neutral p-4 md:grid-cols-3">
                          <div className="rounded-xl bg-white px-4 py-3">
                            <div className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Step 1</div>
                            <div className="mt-1 text-sm font-semibold text-primary">You submit the request</div>
                          </div>
                          <div className="rounded-xl bg-white px-4 py-3">
                            <div className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Step 2</div>
                            <div className="mt-1 text-sm font-semibold text-primary">Sponsor contact reviews</div>
                          </div>
                          <div className="rounded-xl bg-white px-4 py-3">
                            <div className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Step 3</div>
                            <div className="mt-1 text-sm font-semibold text-primary">Registration completes</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                            placeholder="Sponsor contact name"
                            className="rounded-lg border px-4 py-3"
                            value={formState.sponsorContactName}
                            onChange={(e) => setFormState((s) => ({ ...s, sponsorContactName: e.target.value }))}
                            onFocus={onFieldFocus}
                          />
                          <input
                            required
                            type="email"
                            placeholder="Sponsor contact email"
                            className="rounded-lg border px-4 py-3"
                            value={formState.sponsorContactEmail}
                            onChange={(e) => setFormState((s) => ({ ...s, sponsorContactEmail: e.target.value }))}
                            onFocus={onFieldFocus}
                          />
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm">
                          <div className="mb-2 flex items-center gap-2 font-semibold text-primary">
                            <ShieldCheck size={16} className="text-accent" />
                            Common blocker to avoid
                          </div>
                          <p className="text-gray-600">
                            Not sure who should handle the approval? It is usually your HR manager, finance contact, or an admin lead with Corppass access.
                          </p>
                          <a href="/skillsfuture-funding-guide" className="mt-3 inline-flex items-center gap-2 font-semibold text-accent hover:underline">
                            View the SkillsFuture funding guide <ArrowRight size={14} />
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="rounded-xl border border-[#d8e8ff] bg-[#f6faff] px-4 py-3 text-sm text-primary">
                        Self-sponsored path selected. We will confirm your intake and payment step based on the details you already provided.
                      </div>
                    )}
                  </>
                )}
              </>
            ) : isReserveFlow ? (
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
                    onChange={(e) => setFormState((s) => ({ ...s, departmentOrDesignation: e.target.value }))}
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

            {isReserveFlow && isAccountantsRegistration && registrationStep === 1 ? (
              <button
                type={shouldSkipPayerStep ? 'submit' : 'button'}
                onClick={
                  shouldSkipPayerStep
                    ? undefined
                    : (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setRegistrationStep(2);
                      }
                }
                disabled={!canContinueToPayerStep || isSubmitting}
                className="w-full rounded-lg bg-accent py-3 font-bold text-white hover:bg-opacity-90 disabled:opacity-50"
              >
                {isSubmitting && shouldSkipPayerStep ? 'Submitting...' : stepOneButtonLabel}
              </button>
            ) : isReserveFlow && isAccountantsRegistration && isCompanySponsored ? (
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setRegistrationStep(1)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-primary hover:bg-gray-50"
                >
                  <ChevronLeft size={16} />
                  Back to details
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg bg-accent py-3 font-bold text-white hover:bg-opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : submitLabel}
                </button>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-accent py-3 font-bold text-white hover:bg-opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : submitLabel}
              </button>
            )}
          </form>
        ) : (
          <div className="p-6">
            <h4 className="mb-2 text-xl font-bold text-primary">You're all set</h4>
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
            ) : isCompanySponsored ? (
              <>
                <p className="mb-4 text-gray-700">
                  Your sponsorship request has been submitted successfully and is now recorded as <strong>Pending sponsor review</strong>.
                </p>
                <div className="mb-5 space-y-3 rounded-2xl border border-gray-200 bg-neutral p-5 text-sm">
                  <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
                    <CheckCircle size={16} className="text-accent" />
                    <span className="text-gray-700">Request submitted for {formState.fullName}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
                    <Mail size={16} className="text-accent" />
                    <span className="text-gray-700">
                      Sponsor contact: {formState.sponsorContactName} ({formState.sponsorContactEmail})
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
                    <ShieldCheck size={16} className="text-accent" />
                    <span className="text-gray-700">Current status: Pending HR approval</span>
                  </div>
                </div>
                <div className="mb-5 rounded-xl border border-[#d8e8ff] bg-[#f6faff] px-4 py-4 text-sm text-primary">
                  <p className="font-semibold mb-2">What happens next</p>
                  <p className="text-gray-700 mb-2">
                    We have emailed the sponsor contact you provided and copied you in the same email.
                  </p>
                  <p className="text-gray-700 mb-2">
                    The next expected step is for your HR, finance, or admin contact to review the request and complete the company-side approval.
                  </p>
                  <p className="text-gray-700">
                    Once that is done, our team will follow up with the next registration step. You do not need to forward the registration link yourself.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/6589002130"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white"
                  >
                    WhatsApp Melverick <ArrowRight size={16} />
                  </a>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-primary hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-4 text-gray-700">
                  Your registration request is in. Your estimated net fee is <strong>{estimate.amount}</strong>, and our team will contact you with the best intake and eligibility guidance.
                </p>
                <p className="mb-5 text-sm text-gray-600">
                  Next best action: message Melverick directly for immediate advice.
                </p>
              </>
            )}

            {!isChecklistFlow && !isCompanySponsored ? (
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
