import React from 'react';
import { ArrowRight, CheckCircle, Building2, Wallet, FileText, Users } from 'lucide-react';
import SEO from '../components/SEO';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';

const highlights = [
  'Training support depends on the course, trainee profile, employer profile, and prevailing SkillsFuture / SSG rules.',
  'Employers may be eligible for course fee support for approved training, with higher support available for selected schemes and eligible participants.',
  'Absentee payroll support may apply for eligible employer-sponsored training in accordance with current official rules.',
  'The official SkillsFuture employer funding page should always be treated as the latest source of truth.',
];

const sections = [
  {
    icon: Wallet,
    title: 'Course fee support',
    points: [
      'Approved courses may qualify for course fee subsidies under prevailing SkillsFuture funding rules.',
      'Support levels can vary based on employer type, trainee eligibility, and whether the course falls under specific support schemes.',
      'If you are sponsoring staff, it is worth checking the official page before enrolment so expectations are clear upfront.',
    ],
  },
  {
    icon: Building2,
    title: 'Employer considerations',
    points: [
      'Funding for employers is usually assessed in the context of the sponsoring entity, the selected course, and the trainee profile.',
      'SMEs and selected employer groups may be eligible for stronger support under certain schemes, subject to official criteria.',
      'Where relevant, companies should review whether the training is aligned to current workforce development and funding policies.',
    ],
  },
  {
    icon: Users,
    title: 'Trainee profile matters',
    points: [
      'Support may differ depending on who the learner is and whether they fall within specific SkillsFuture-supported categories.',
      'For Nexius Academy courses, individual learner pathways and employer-sponsored pathways may not always be identical.',
      'If you are enrolling multiple staff, it is useful to confirm likely support before committing the cohort.',
    ],
  },
  {
    icon: FileText,
    title: 'What to prepare',
    points: [
      'Company and learner details for the intended registration.',
      'A quick review of the official funding guidance before enrolment.',
      'Internal confirmation on whether the enrolment is self-sponsored or employer-sponsored.',
    ],
  },
];

const faqs = [
  {
    question: 'Does every course automatically qualify for the same subsidy level?',
    answer:
      'No. Funding depends on the approved course, the learner profile, the employer context, and the prevailing official SkillsFuture rules.',
  },
  {
    question: 'Should employers rely on this page alone?',
    answer:
      'No. This page is a practical guide for Nexius Academy visitors. The official SkillsFuture employer funding page should be checked for the latest criteria and support details.',
  },
  {
    question: 'Can employers sponsor staff for Nexius Academy courses?',
    answer:
      'Yes, where the course and trainee profile align with the relevant funding rules. The exact support level should be verified against the official guidance before registration.',
  },
  {
    question: 'What if we want to send a team?',
    answer:
      'If you plan to sponsor multiple staff or discuss a private cohort, it is usually best to confirm likely funding and team structure before enrolling the group.',
  },
];

const SkillsFutureFundingGuidePage: React.FC = () => {
  return (
    <div className="font-body text-charcoal bg-white min-h-screen flex flex-col">
      <SEO
        title="SkillsFuture Funding Guide for Employers | Nexius Academy"
        description="A practical SkillsFuture employer funding guide for Nexius Academy visitors, with key considerations for course fee support, employer-sponsored training, and official verification steps."
        canonical="/skillsfuture-funding-guide"
      />
      <Navbar />

      <main className="flex-grow">
        <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#0F1829] opacity-95" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-bold text-accent tracking-wide uppercase mb-6">
                SkillsFuture Funding Guide
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                A practical funding guide for employers exploring SkillsFuture-supported training
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Use this page as a simple starting point to understand how employer-sponsored training support may work, then verify the latest details on the official SkillsFuture employer funding page.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://skillsfuture.gobusiness.gov.sg/support-and-programmes/funding/training-subsidies-for-employers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-accent/90 transition-all"
                >
                  View Official Funding Page <ArrowRight size={18} />
                </a>
                <a
                  href="https://wa.me/6596615284?text=Hi%20Nexius%20Academy%2C%20I%20want%20help%20understanding%20SkillsFuture%20funding%20for%20employer-sponsored%20training."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all"
                >
                  Ask About Course Fit
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {highlights.map((item) => (
                <div key={item} className="bg-neutral rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-3">
                  <CheckCircle size={20} className="text-accent mt-1 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">What employers should understand first</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Funding support is not one-size-fits-all. These are the main areas employers usually need to clarify before sending staff for training.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <div key={section.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-5">
                    <section.icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle size={18} className="text-accent mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Important note</div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Always verify the latest details on the official page</h2>
              <p className="text-blue-50/90 max-w-3xl leading-relaxed mb-8">
                SkillsFuture funding criteria, support levels, and employer guidance can change over time. This page is designed to help Nexius Academy visitors orient themselves quickly — not replace the official source.
              </p>
              <a
                href="https://skillsfuture.gobusiness.gov.sg/support-and-programmes/funding/training-subsidies-for-employers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors"
              >
                Go to Official SkillsFuture Employer Funding Page <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">FAQ</h2>
              <p className="text-gray-500">Quick answers for employers considering sponsored training.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="border border-gray-200 rounded-xl p-6 bg-white">
                  <h3 className="font-bold text-primary text-lg mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SkillsFutureFundingGuidePage;
