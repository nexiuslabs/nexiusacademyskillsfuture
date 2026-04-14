import React, { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { openLeadModal } from '../../services/leadModal';

const Pricing: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'individual' | 'corporate'>('individual');
  const [citizenship, setCitizenship] = useState<'sg_citizen' | 'pr_ltvp'>('sg_citizen');
  const [ageBand, setAgeBand] = useState<'40_and_above' | '39_and_below'>('40_and_above');

  const APPLY_LINK =
    'https://stms.polite.edu.sg/cetapi/api/v1/custom/extendauthorize?id_token=rHHqe3GLYxhIYwh82qTpAKuHaXtejYUMXXcX5m42t14MVbIM54f%2BJo2weFWoM7%2Fu';

  const individualPricing = {
    tier1: {
      title: 'Singapore Citizens (40 years & above)',
      courseFee: 890.0,
      gst: 970.1,
      subsidyAmount: 859.07,
      nettFee: 111.03,
    },
    tier2: {
      title: 'Singapore Citizens (39 & below) & PR',
      courseFee: 890.0,
      gst: 970.1,
      subsidyAmount: 679.07,
      nettFee: 291.03,
    },
  };

  const corporatePricing = {
    tier1: {
      title: 'Singapore Citizens (40 years & above)',
      courseFee: 890.0,
      gst: 970.1,
      subsidyAmount: 859.07,
      nettFee: 111.03,
    },
    tier2: {
      title: 'Singapore Citizens (39 & below), PR & LTVP+',
      courseFee: 890.0,
      gst: 970.1,
      subsidyAmount: 679.07,
      nettFee: 291.03,
    },
  };

  const currentPricing = selectedTab === 'individual' ? individualPricing : corporatePricing;

  const estimator = useMemo(() => {
    const isCitizen40Plus = citizenship === 'sg_citizen' && ageBand === '40_and_above';
    const estimate = isCitizen40Plus ? 111.03 : 291.03;
    const supportRate = isCitizen40Plus ? 'up to 90%' : 'up to 70%';

    return {
      estimate,
      supportRate,
      note:
        citizenship === 'sg_citizen'
          ? 'You may also use SkillsFuture Credits to offset out-of-pocket fees.'
          : 'PR/LTVP+ subsidy eligibility is subject to current SSG funding rules and employer sponsorship (where required).',
    };
  }, [citizenship, ageBand]);

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">Course Fee & Government Subsidies</h2>
          <p className="text-gray-500 mb-2">Pay even less or $0 cash with government subsidies.</p>
          <p className="text-xs text-gray-400 font-mono">Course Ref No: TGS-2025059915</p>
        </div>

        <div className="max-w-4xl mx-auto mb-10 bg-neutral border border-gray-200 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-primary mb-4">Estimate Your Net Payable</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <label className="text-sm text-gray-700">
              Citizenship Status
              <select
                value={citizenship}
                onChange={(e) => setCitizenship(e.target.value as 'sg_citizen' | 'pr_ltvp')}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="sg_citizen">Singapore Citizen</option>
                <option value="pr_ltvp">PR / LTVP+</option>
              </select>
            </label>

            <label className="text-sm text-gray-700">
              Age Band
              <select
                value={ageBand}
                onChange={(e) => setAgeBand(e.target.value as '40_and_above' | '39_and_below')}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="40_and_above">40 years and above</option>
                <option value="39_and_below">39 years and below</option>
              </select>
            </label>
          </div>

          <div className="bg-white border border-blue-100 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Estimated net payable</p>
            <p className="text-3xl font-heading font-extrabold text-primary">S${estimator.estimate.toFixed(2)}</p>
            <p className="text-sm text-accent font-semibold mt-1">Based on {estimator.supportRate} subsidy support</p>
            <p className="text-xs text-gray-500 mt-2">{estimator.note}</p>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            *Final payable amount depends on official SSG/SkillsFuture eligibility, company sponsorship pathway,
            and approved funding at time of registration.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setSelectedTab('individual')}
              className={`px-8 py-2 rounded-md font-bold transition-colors ${
                selectedTab === 'individual' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:text-primary'
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setSelectedTab('corporate')}
              className={`px-8 py-2 rounded-md font-bold transition-colors ${
                selectedTab === 'corporate' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:text-primary'
              }`}
            >
              Corporate
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="border border-gray-200 rounded-2xl p-8 hover:border-primary transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
            <h3 className="text-xl font-bold text-primary mb-4">{currentPricing.tier1.title}</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-gray-500 text-sm"><span>Course Fee</span><span>S${currentPricing.tier1.courseFee.toFixed(2)}</span></div>
              <div className="flex justify-between items-center text-gray-500 text-sm"><span>w/GST (9%)</span><span>S${currentPricing.tier1.gst.toFixed(2)}</span></div>
              <div className="flex justify-between items-center text-accent font-bold"><span>Subsidy</span><span>-S${currentPricing.tier1.subsidyAmount.toFixed(2)}</span></div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between items-end">
                <span className="font-bold text-primary text-lg">Nett Course Fee</span>
                <div className="text-right">
                  <div className="text-3xl font-heading font-extrabold text-primary">S${currentPricing.tier1.nettFee.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">Use SkillsFuture Credits where applicable</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-primary mb-6">
              <p className="font-bold mb-1">Applicable Funding:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-1"><Check size={14} className="text-accent" /> SkillsFuture Funding</li>
                <li className="flex items-center gap-1"><Check size={14} className="text-accent" /> SkillsFuture Credits</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-8 hover:border-primary transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>
            <h3 className="text-xl font-bold text-primary mb-4">{currentPricing.tier2.title}</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-gray-500 text-sm"><span>Course Fee</span><span>S${currentPricing.tier2.courseFee.toFixed(2)}</span></div>
              <div className="flex justify-between items-center text-gray-500 text-sm"><span>w/GST (9%)</span><span>S${currentPricing.tier2.gst.toFixed(2)}</span></div>
              <div className="flex justify-between items-center text-accent font-bold"><span>Subsidy</span><span>-S${currentPricing.tier2.subsidyAmount.toFixed(2)}</span></div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between items-end">
                <span className="font-bold text-primary text-lg">Nett Course Fee</span>
                <div className="text-right">
                  <div className="text-3xl font-heading font-extrabold text-primary">S${currentPricing.tier2.nettFee.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">Estimated; final subsidy approval applies</div>
                </div>
              </div>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg text-sm text-primary mb-6">
              <p className="font-bold mb-1">Applicable Funding:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-1"><Check size={14} className="text-accent" /> SkillsFuture Funding</li>
                <li className="flex items-center gap-1"><Check size={14} className="text-accent" /> Employer-sponsored pathways (where eligible)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            type="button"
            onClick={() =>
              openLeadModal('course_page_cta', 'reserve_seat', {
                page: '/courses/agentic-ai',
                position: 'pricing_apply_button',
                ctaLabel: 'apply_now_to_secure_funding',
                redirectUrl: APPLY_LINK,
              })
            }
            className="inline-block text-center bg-primary hover:bg-blue-900 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-xl shadow-blue-900/20 w-full sm:w-auto"
          >
            Apply Now to Secure Funding
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
