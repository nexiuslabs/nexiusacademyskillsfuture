import React from 'react';
import { CheckCircle, Wallet, CreditCard, Receipt } from 'lucide-react';
import { advancedFeeRows as frontierFeeRows } from './advancedFeeRows';

const pricingPlans = [
  {
    title: 'Singapore Citizen 40+ / eligible SME-sponsored',
    total: 'S$190.50',
    detail: 'Official payable amount incl. 9% GST',
    note: 'For Singapore Citizens aged 40 and above and eligible SME-sponsored learner categories.',
    highlight: true,
  },
  {
    title: 'Singapore Citizen below 40 / PR / LTVP+',
    total: 'S$490.50',
    detail: 'Official payable amount incl. 9% GST',
    note: 'For Singapore Citizens aged 39 and below, Singapore Permanent Residents, and LTVP+ learners.',
    highlight: false,
  },
  {
    title: 'Full Course Fee',
    total: 'S$1,635.00',
    detail: 'Full fee incl. 9% GST',
    note: 'Published full course fee before applicable SkillsFuture or sponsorship funding.',
    highlight: false,
  },
];
const frontierAcceptedPayments = ['SkillsFuture Credits (where applicable)', 'Credit card', 'Debit card', 'PayNow'];

const AdvancedCoursePricing: React.FC<{ onApply: () => void; actionLabel?: string }> = ({onApply, actionLabel = 'Apply Now'}) => (
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">Course fees, including GST</h2>
              <p className="text-gray-600 mb-2">
                This is a <span className="font-bold text-primary">3-day advanced Agentic AI course</span> with a full course fee of{' '}
                <span className="font-bold text-primary">S$1,635.00 incl. GST</span>.
              </p>
              <p className="mx-auto mb-3 flex max-w-3xl items-center justify-center gap-2 text-sm font-semibold text-primary">
                <CheckCircle size={16} className="text-accent" />
                Participants who meet at least 75% attendance and attempt the assessment will be awarded a Certificate of Completion.
              </p>
              <p className="text-xs text-gray-400 font-mono">
                Advanced course
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-10">
              {pricingPlans.map((plan) => (
                <div key={plan.title} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  <div className={`h-2 ${plan.highlight ? 'bg-primary' : plan.title.startsWith('Singapore Citizen below') ? 'bg-accent' : 'bg-slate-400'}`} />
                  <div className="p-7">
                    <div className="text-4xl font-heading font-extrabold text-primary mb-3">{plan.total}</div>
                    <h3 className="text-lg font-bold text-primary mb-2">{plan.title}</h3>
                    <p className="text-sm text-gray-600">{plan.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mb-8 text-sm leading-relaxed text-gray-600">Amounts include 9% GST and are subject to final learner eligibility, funding approval and registration confirmation. S$190.50 is the lowest published payable amount for the eligible category shown above.</p>
            <div className="space-y-4 mb-12">
              <details className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="cursor-pointer list-none text-lg font-bold text-primary">Funding details by learner category</summary>
                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-gray-500">
                        <th className="pb-3 pr-6 font-semibold">Learner Category</th>
                        <th className="pb-3 font-semibold">Course Fee Payable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {frontierFeeRows.map((row) => (
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
                    <p className="text-sm text-gray-600">Payment details will be confirmed during registration.</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-neutral p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                      <CreditCard size={18} />
                    </div>
                    <h4 className="font-bold text-primary mb-2">Accepted methods</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {frontierAcceptedPayments.map((method) => (
                        <li key={method} className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-accent" />
                          {method}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>

              <details className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="cursor-pointer list-none text-lg font-bold text-primary">Funding and eligibility note</summary>
                <div className="mt-5 rounded-2xl border border-gray-100 bg-neutral p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                    <Receipt size={18} />
                  </div>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-1 text-accent" />
                      <span>Amounts are inclusive of 9% GST and subject to final eligibility, funding approval, and registration confirmation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-1 text-accent" />
                      <span>Official payable amounts are S$190.50, S$490.50, or S$1,635.00 depending on learner category and sponsorship pathway.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-1 text-accent" />
                      <span>For company-sponsored groups, request an advisory call so we can confirm the most suitable registration pathway.</span>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={onApply}
                className="academy-button-primary w-full sm:w-auto"
              >
                {actionLabel}
              </button>
              <p className="mt-3 text-sm text-gray-600">Request help with official registration. An enquiry does not reserve a place.</p>
            </div>
          </div>
        </section>
);
export default AdvancedCoursePricing;
