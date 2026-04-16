import React, { useMemo, useState } from 'react';
import { Check, CreditCard, Receipt, Wallet } from 'lucide-react';
import { openLeadModal } from '../../services/leadModal';

type PricingProps = {
  pagePath?: string;
  reserveLabel?: string;
  reserveButtonText?: string;
  reserveRedirectUrl?: string;
  sectionClassName?: string;
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

const formatCurrency = (amount: number) => `S$${amount.toFixed(2)}`;

const Pricing: React.FC<PricingProps> = ({
  pagePath = '/courses/agentic-ai',
  reserveLabel = 'reserve_a_seat',
  reserveButtonText = 'Reserve a Seat',
  reserveRedirectUrl,
  sectionClassName = 'py-20 bg-white',
}) => {
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
