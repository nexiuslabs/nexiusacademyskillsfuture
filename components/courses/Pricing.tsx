import React, { useMemo, useState } from 'react';
import { Check, CreditCard, Receipt, Wallet } from 'lucide-react';
import { openLeadModal } from '../../services/leadModal';

type PricingProps = {
  pagePath?: string;
  reserveLabel?: string;
  reserveButtonText?: string;
  reserveRedirectUrl?: string;
  sectionClassName?: string;
  variant?: 'public' | 'private_company';
};

type LearnerType = 'sg_citizen' | 'pr' | 'ltvp' | 'full_fee';
type AgeBand = '40_and_above' | '39_and_below';
type BreakdownLine = {
  label: string;
  amount: number;
  negative?: boolean;
};

const baseFee = 890.0;
const gst = 80.1;
const fullFee = 970.1;
const grant = 623.0;
const additionalSubsidy = 178.0;

const learnerSummary = [
  {
    title: 'S$113.03',
    subtitle: 'Singaporeans 40+ or SME-sponsored',
    note: 'Best subsidized outcome including GST.',
    accent: 'bg-primary',
  },
  {
    title: 'S$291.03',
    subtitle: 'PR, LTVP+, or Singaporeans 39 and below',
    note: 'Standard funded rate including GST.',
    accent: 'bg-accent',
  },
  {
    title: 'S$970.10',
    subtitle: 'Full fee with no subsidy',
    note: 'For learners outside subsidy pathways.',
    accent: 'bg-slate-400',
  },
];

const fullBreakdownRows = [
  { label: 'Full Course Fee', value: 'S$970.10' },
  { label: 'Singapore Permanent Resident', value: 'S$291.03' },
  { label: 'Long Term Visit Pass+ (LTVP+)', value: 'S$291.03' },
  { label: 'Singaporean aged 39 & below', value: 'S$291.03' },
  { label: 'Singaporean aged 40 & above', value: 'S$113.03' },
  { label: 'SME-sponsored (Singapore PR)', value: 'S$113.03' },
  { label: 'SME-sponsored (LTVP+)', value: 'S$113.03' },
  { label: 'SME-sponsored (Singaporean aged 39 & below)', value: 'S$113.03' },
  { label: 'SME-sponsored (Singaporean aged 40 & above)', value: 'S$113.03' },
];

const acceptedPayments = ['SkillsFuture Credits (SFC)', 'Credit card', 'Debit card', 'PayNow'];
const ACCOUNTANTS_SELF_REGISTRATION_URL =
  'https://stms.polite.edu.sg/identity/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DStudent%26redirect_uri%3Dhttps%253A%252F%252Fstms.polite.edu.sg%252Fsignin-student%26response_type%3Dcode%26scope%3Dopenid%2520profile%26code_challenge%3DE_QgKHQVqjJlxFGerdkqw-CVtB-r2B4RdhgYFtBulIg%26code_challenge_method%3DS256%26response_mode%3Dform_post%26nonce%3D639124957031034808.NDQzYmQwOTYtOWY5Ni00OTM5LTkwMDgtYTBiMzk1NjVjOGQzZjFmMWM5YWYtYmRjYS00NWM1LTkxNmItOThkOTA5MGVhNTQx%26state%3DE6QlwbfBI3OA11ZwIH4Ce3Hy1zQSg-TlR9ATT08PgcDZpzYcK6Hlnu7JhAzoSqzcviv-hCEO-K0WzQqqJ6BMKJRFlmWyH-xHA3nc04SezmEcoiwp6IinEGRjRL8p1l3t6DTM32RcTGSLk4Ic9tuN3uQzK30xsOv5ofLW5nXy3Rsq5FJ_pwLHx680-VeNfDmEw6kTwtTFgvIkkxc8HHa80_hXIT_s9ce9z_9X_NbHJ935xIUquP9iuh_uIKmQNfupYVgc32kCr6I9EsBzyuC3APFjPcoOCuIX84yq8-rGRqHnKXcOzVCND5n_Ssn5rH-JaNOgNuFppkA1c8LVzOvdaJ5pJI-mkj3rW2nFKpt3v8g9EG4uHe8tPjV04bncLHH8o8ydsxcgOQy9sBUPIYTVxcpyAbw8ywMmo_yJMRuvr2T4ZbH0_q3ZoMsK-cA-qhuZrtpMA-nMLcIVV7Vx7MAfQLBb-C3hh9Wp2ICoTnmKJKk8ahBCRZdFmtyO3XWJEWOAVlJz07Uv33KeKJZqIHlZxQ%26x-client-SKU%3DID_NET8_0%26x-client-ver%3D7.1.2.0';

const registrationPaths = [
  {
    title: "I'm paying myself",
    description: 'Best for individual learners who can complete registration directly after checking funding eligibility.',
    ctaLabel: 'Start self-sponsored registration',
    payerType: 'self' as const,
    redirectUrl: ACCOUNTANTS_SELF_REGISTRATION_URL,
  },
  {
    title: 'Company-sponsor',
    description: 'Best for employees who need HR, finance, or an admin lead with Corppass access to support the claim step.',
    ctaLabel: 'Start company-sponsored registration',
    payerType: 'company_sponsored' as const,
  },
];

const privateSummary = [
  {
    title: '12 pax',
    subtitle: 'Minimum class size',
    note: 'Private runs are designed for a single company cohort with at least 12 participants.',
    accent: 'bg-primary',
  },
  {
    title: 'Custom quote',
    subtitle: 'Pricing approach',
    note: 'Pricing depends on learner profile, venue, schedule preference, and delivery scope.',
    accent: 'bg-accent',
  },
  {
    title: 'Onsite or venue',
    subtitle: 'Delivery format',
    note: 'Choose your office, an external venue, or discuss the most suitable setup with us.',
    accent: 'bg-slate-400',
  },
];

const privatePricingFactors = [
  'Number of participants and whether you plan a single cohort or multiple runs',
  'Eligible learner profile and funding pathway discussion where applicable',
  'Preferred venue, room setup, and delivery logistics',
  'Schedule preference for weekdays, split sessions, or concentrated runs',
  'Whether you want stronger tailoring around specific internal workflows',
];

const privateProposalChecklist = [
  'Approximate team size and which functions are attending',
  'Your preferred timing window or internal scheduling constraints',
  'Whether you want delivery at your office or another venue',
  'Any important workflows, pain points, or governance concerns to keep in view',
];

const formatCurrency = (amount: number) => `S$${amount.toFixed(2)}`;

const Pricing: React.FC<PricingProps> = ({
  pagePath = '/courses/agentic-ai',
  reserveLabel = 'reserve_a_seat',
  reserveButtonText = 'Reserve a Seat',
  reserveRedirectUrl,
  sectionClassName = 'py-20 bg-white',
  variant = 'public',
}) => {
  const isAccountantsRegistration = pagePath.includes('/courses/agentic-ai-accountants');
  const [learnerType, setLearnerType] = useState<LearnerType>('sg_citizen');
  const [ageBand, setAgeBand] = useState<AgeBand>('40_and_above');
  const [isSmeSponsored, setIsSmeSponsored] = useState(false);

  const estimator = useMemo(() => {
    if (learnerType === 'full_fee') {
      return {
        payable: fullFee,
        headline: 'Full fee applies',
        note: 'This path does not use SkillsFuture subsidy support.',
        lines: [
          { label: 'Course Fee', amount: baseFee },
          { label: 'GST (9%)', amount: gst },
        ] as BreakdownLine[],
      };
    }

    const isEnhancedRate =
      isSmeSponsored || (learnerType === 'sg_citizen' && ageBand === '40_and_above');

    const lines: BreakdownLine[] = [
      { label: 'Course Fee', amount: baseFee },
      { label: '[BG SSG] SkillsFuture Funding – Grant', amount: grant, negative: true },
      { label: 'Nett Course Fee', amount: 267.0 },
      { label: 'GST (9%)', amount: 24.03 },
    ];

    if (isEnhancedRate) {
      lines.push({
        label: '[BG SSG] SkillsFuture Funding – Subsidy',
        amount: additionalSubsidy,
        negative: true,
      });
    }

    return {
      payable: isEnhancedRate ? 113.03 : 291.03,
      headline: isEnhancedRate ? 'Enhanced subsidy rate' : 'Standard funded rate',
      note: isEnhancedRate
        ? 'Applies to Singaporeans aged 40+ and all SME-sponsored eligible learners.'
        : 'Applies to PR, LTVP+, and Singaporeans aged 39 and below.',
      lines,
    };
  }, [ageBand, isSmeSponsored, learnerType]);

  if (variant === 'private_company') {
    return (
      <section id="pricing" className={sectionClassName}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">Pricing for Dedicated Company Classes</h2>
            <p className="text-gray-600 mb-2">
              Private-run pricing is quoted based on your actual team setup and delivery requirements.
            </p>
            <p className="text-xs text-gray-400 font-mono">Dedicated company class for teams of 12 pax and above</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {privateSummary.map((card) => (
              <div key={card.title} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className={`h-2 ${card.accent}`} />
                <div className="p-7">
                  <div className="text-4xl font-heading font-extrabold text-primary mb-3">{card.title}</div>
                  <h3 className="text-lg font-bold text-primary mb-2">{card.subtitle}</h3>
                  <p className="text-sm text-gray-600">{card.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] mb-10">
            <div className="rounded-3xl border border-gray-200 bg-neutral p-7">
              <h3 className="text-2xl font-bold text-primary mb-2">What affects your quotation</h3>
              <p className="text-sm text-gray-600 mb-6">
                The final proposal is shaped around what your company actually needs.
              </p>
              <div className="space-y-4">
                {privatePricingFactors.map((factor) => (
                  <div key={factor} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4">
                    <Check size={16} className="mt-1 flex-shrink-0 text-accent" />
                    <span className="text-sm text-gray-700">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-2">Before you enquire</p>
              <div className="text-4xl font-heading font-extrabold text-primary mb-3">Prepare these details</div>
              <h3 className="text-xl font-bold text-primary mb-2">Useful information for a faster proposal</h3>
              <p className="text-sm text-gray-600 mb-5">
                Share these details and we can recommend the most suitable setup for your company run.
              </p>

              <div className="space-y-3 rounded-2xl border border-gray-100 bg-neutral p-5">
                {privateProposalChecklist.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm">
                    <Check size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <details className="group rounded-2xl border border-gray-200 bg-white p-6">
              <summary className="cursor-pointer list-none text-lg font-bold text-primary">Pricing approach</summary>
              <div className="mt-5 rounded-2xl border border-gray-100 bg-neutral p-5">
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-1 text-accent" />
                    <span>Private company classes are quoted based on cohort size, schedule, venue, and delivery scope.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-1 text-accent" />
                    <span>We can discuss onsite delivery, external venue options, or the most suitable setup for your team.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-1 text-accent" />
                    <span>Where relevant, we can also advise on learner profile and funding-pathway considerations.</span>
                  </li>
                </ul>
              </div>
            </details>

            <details className="group rounded-2xl border border-gray-200 bg-white p-6">
              <summary className="cursor-pointer list-none text-lg font-bold text-primary">What to prepare before contacting us</summary>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-neutral p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                    <Wallet size={18} />
                  </div>
                  <h4 className="font-bold text-primary mb-2">Team profile</h4>
                  <p className="text-sm text-gray-600">Approximate class size, functions attending, and whether you plan one cohort or multiple runs.</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-neutral p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                    <CreditCard size={18} />
                  </div>
                  <h4 className="font-bold text-primary mb-2">Delivery preferences</h4>
                  <p className="text-sm text-gray-600">Timing window, venue preference, and any important workflow or governance concerns to keep in view.</p>
                </div>
              </div>
            </details>

            <details className="group rounded-2xl border border-gray-200 bg-white p-6">
              <summary className="cursor-pointer list-none text-lg font-bold text-primary">Proposal and scheduling notes</summary>
              <div className="mt-5 rounded-2xl border border-gray-100 bg-neutral p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                  <Receipt size={18} />
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-1 text-accent" />
                    <span>Private runs are planned around your team availability and operational constraints.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-1 text-accent" />
                    <span>A proposal can be scoped more quickly when you share team size, preferred timing, and delivery location upfront.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-1 text-accent" />
                    <span>If you have fewer than 12 pax, contact us and we can advise whether a later internal run or public intake is a better fit.</span>
                  </li>
                </ul>
              </div>
            </details>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() =>
                openLeadModal('course_page_cta', 'advisory_call', {
                  page: pagePath,
                  position: 'pricing_apply_button',
                  ctaLabel: reserveLabel,
                })
              }
              className="inline-block w-full rounded-xl bg-primary px-10 py-4 text-center text-lg font-bold text-white shadow-xl shadow-blue-900/20 transition-colors hover:bg-blue-900 sm:w-auto"
            >
              {reserveButtonText}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className={sectionClassName}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">Course Fees & Funding</h2>
          <p className="text-gray-600 mb-2">
            Most learners pay either <span className="font-bold text-primary">S$113.03</span> or{' '}
            <span className="font-bold text-primary">S$291.03</span>, inclusive of GST.
          </p>
          <p className="text-xs text-gray-400 font-mono">Course Ref No: TP-NC-C0021-F</p>
        </div>

        {isAccountantsRegistration ? (
          <div className="mb-10 rounded-[2rem] border border-primary/10 bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_52%,#f2f7fd_100%)] p-7 shadow-sm lg:p-9">
            <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Start Here</p>
                <h3 className="mb-3 text-3xl font-heading font-bold text-primary">Choose your registration path first</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Self-sponsored learners can move straight into registration. Company-sponsored learners should start a guided sponsorship request so the company-side approval step does not get lost mid-process.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {registrationPaths.map((path) => (
                  <div key={path.title} className="rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-[0_18px_38px_rgba(15,23,42,0.06)]">
                    <h4 className="mb-2 text-xl font-bold text-primary">{path.title}</h4>
                    <p className="mb-5 text-sm leading-relaxed text-gray-600">{path.description}</p>
                    <button
                      type="button"
                      onClick={() =>
                        openLeadModal('course_page_cta', 'reserve_seat', {
                          page: pagePath,
                          position: `pricing_path_${path.payerType}`,
                          ctaLabel: path.ctaLabel,
                          payerType: path.payerType,
                          redirectUrl: path.redirectUrl,
                        })
                      }
                      className={`w-full rounded-xl px-5 py-3 text-sm font-bold transition-colors ${
                        path.payerType === 'self'
                          ? 'bg-primary text-white hover:bg-blue-900'
                          : 'border border-primary text-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      {path.ctaLabel}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {learnerSummary.map((card) => (
            <div key={card.title} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className={`h-2 ${card.accent}`} />
              <div className="p-7">
                <div className="text-4xl font-heading font-extrabold text-primary mb-3">{card.title}</div>
                <h3 className="text-lg font-bold text-primary mb-2">{card.subtitle}</h3>
                <p className="text-sm text-gray-600">{card.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] mb-10">
          <div className="rounded-3xl border border-gray-200 bg-neutral p-7">
            <h3 className="text-2xl font-bold text-primary mb-2">Check Your Payable Fee</h3>
            <p className="text-sm text-gray-600 mb-6">Select your learner profile to estimate the actual course fee payable.</p>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-gray-700">
                Learner Type
                <select
                  value={learnerType}
                  onChange={(e) => setLearnerType(e.target.value as LearnerType)}
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3"
                >
                  <option value="sg_citizen">Singapore Citizen</option>
                  <option value="pr">Singapore Permanent Resident</option>
                  <option value="ltvp">Long Term Visit Pass+ (LTVP+)</option>
                  <option value="full_fee">No subsidy / full fee</option>
                </select>
              </label>

              <label className="text-sm text-gray-700">
                Age Band
                <select
                  value={ageBand}
                  onChange={(e) => setAgeBand(e.target.value as AgeBand)}
                  disabled={learnerType !== 'sg_citizen'}
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="40_and_above">40 years and above</option>
                  <option value="39_and_below">39 years and below</option>
                </select>
              </label>
            </div>

            <label className="mt-4 flex items-start gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4">
              <input
                type="checkbox"
                checked={isSmeSponsored}
                onChange={(e) => setIsSmeSponsored(e.target.checked)}
                disabled={learnerType === 'full_fee'}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary"
              />
              <span>
                <span className="block font-semibold text-primary">SME-sponsored learner</span>
                <span className="block text-sm text-gray-500">If checked, eligible learners move to the S$113.03 payable tier.</span>
              </span>
            </label>
          </div>

          <div className="rounded-3xl border border-primary/10 bg-white p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-2">Estimated Payable</p>
            <div className="text-5xl font-heading font-extrabold text-primary mb-3">{formatCurrency(estimator.payable)}</div>
            <h3 className="text-xl font-bold text-primary mb-2">{estimator.headline}</h3>
            <p className="text-sm text-gray-600 mb-5">{estimator.note}</p>

            <div className="space-y-3 rounded-2xl border border-gray-100 bg-neutral p-5">
              {estimator.lines.map((line) => (
                <div key={line.label} className="flex items-start justify-between gap-4 text-sm">
                  <span className="text-gray-600">{line.label}</span>
                  <span className={`font-semibold ${line.negative ? 'text-accent' : 'text-primary'}`}>
                    {line.negative ? '-' : ''}
                    {formatCurrency(line.amount)}
                  </span>
                </div>
              ))}
              <div className="h-px bg-gray-200" />
              <div className="flex items-end justify-between gap-4">
                <span className="text-base font-bold text-primary">Course Fee Payable</span>
                <span className="text-2xl font-heading font-extrabold text-primary">{formatCurrency(estimator.payable)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          <details className="group rounded-2xl border border-gray-200 bg-white p-6">
            <summary className="cursor-pointer list-none text-lg font-bold text-primary">See full fee breakdown</summary>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="pb-3 pr-6 font-semibold">Learner Category</th>
                    <th className="pb-3 font-semibold">Course Fee Payable (incl. GST)</th>
                  </tr>
                </thead>
                <tbody>
                  {fullBreakdownRows.map((row) => (
                    <tr key={row.label} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-3 pr-6 text-gray-700">{row.label}</td>
                      <td className="py-3 font-semibold text-primary">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          <details className="group rounded-2xl border border-gray-200 bg-white p-6">
            <summary className="cursor-pointer list-none text-lg font-bold text-primary">Payment methods</summary>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-neutral p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                  <Wallet size={18} />
                </div>
                <h4 className="font-bold text-primary mb-2">Payment timing</h4>
                <p className="text-sm text-gray-600">Payment is required upon application submission.</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-neutral p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                  <CreditCard size={18} />
                </div>
                <h4 className="font-bold text-primary mb-2">Accepted methods</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {acceptedPayments.map((method) => (
                    <li key={method} className="flex items-center gap-2">
                      <Check size={14} className="text-accent" />
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>

          <details className="group rounded-2xl border border-gray-200 bg-white p-6">
            <summary className="cursor-pointer list-none text-lg font-bold text-primary">Refund policy</summary>
            <div className="mt-5 rounded-2xl border border-gray-100 bg-neutral p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                <Receipt size={18} />
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Check size={14} className="mt-1 text-accent" />
                  <span><strong className="text-primary">100% refund</strong> for withdrawals 14 days or more before course start.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="mt-1 text-accent" />
                  <span><strong className="text-primary">50% refund</strong> for withdrawals less than 14 days before course start.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="mt-1 text-accent" />
                  <span><strong className="text-primary">No refund</strong> on or after the course start date.</span>
                </li>
              </ul>
            </div>
          </details>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() =>
              openLeadModal('course_page_cta', 'reserve_seat', {
                page: pagePath,
                position: 'pricing_apply_button',
                ctaLabel: reserveLabel,
                redirectUrl: reserveRedirectUrl,
              })
            }
            className="inline-block w-full rounded-xl bg-primary px-10 py-4 text-center text-lg font-bold text-white shadow-xl shadow-blue-900/20 transition-colors hover:bg-blue-900 sm:w-auto"
          >
            {reserveButtonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
