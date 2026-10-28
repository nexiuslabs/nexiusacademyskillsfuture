import React from 'react';
import ResponsiveImage from '../ResponsiveImage';

export const aboutTrainerFaqs = [
  {
    question: 'Who is the Master Trainer at Nexius Academy?',
    answer:
      'Melverick Ng is Co-Founder and Master Trainer at Nexius Academy, and Co-Founder and Director of Nexius Labs. He has 30+ years of business and enterprise workflow experience, including former SAP consulting across ERP, CRM, logistics, supply chain, and finance operations, and he operates a live production AI agent workforce. He leads public SkillsFuture-supported cohorts with Temasek Polytechnic — Agentic AI Foundations for Non-Technical Professionals (TP-NC-C0021-F / TGS-2025059915) and Agentic AI-Driven Business Innovation for Productivity (TGS-2026063558) — and corporate or institutional classes for organisations including Forvis Mazars, Glomar, Temasek Polytechnic, NTUC e2i, and SIM.',
  },
  {
    question: 'Who is Darryl Wong at Nexius Academy?',
    answer:
      'Darryl Wong is Co-Founder and AI Workflow Trainer at Nexius Academy. He is a CPA Australia and an ISCA Associate with 20+ years of accounting, finance, and enterprise systems experience. He co-trains hands-on workflow automation, agent orchestration, and finance and professional-services AI adoption alongside Melverick Ng.',
  },
];

type TrainerAuthorityProps = {
  showFaqs?: boolean;
};

const profileLinks = [
  { href: 'https://melverick.com/', label: 'melverick.com' },
  { href: 'https://nexiuslabs.com/authors/melverick-ng', label: 'Nexius Labs author profile' },
  { href: 'https://www.linkedin.com/in/melverick', label: 'LinkedIn' },
];

const TrainerAuthority: React.FC<TrainerAuthorityProps> = ({ showFaqs = false }) => (
  <section aria-labelledby="trainer-authority-heading" className="bg-white py-20 md:py-28">
    <div className="container-page">
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Trainer authority</p>
        <h2 id="trainer-authority-heading" className="text-3xl font-bold leading-tight text-primary sm:text-4xl">
          Meet Your Trainers: Practitioners Who Build and Run Agentic AI in Production
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
          Nexius Academy classes are led by practitioners who design, run, and govern agentic workflows in real operations.
        </p>
      </div>

      <div className="grid gap-6">
        <article id="melverick-ng" className="scroll-mt-28 overflow-hidden rounded-3xl border border-primary/10 bg-neutral shadow-soft">
          <div className="grid gap-6 p-6 md:grid-cols-[160px,1fr] md:p-8">
            <ResponsiveImage
              src="/images/authors/melverick-ng-selected.jpg"
              alt="Melverick Ng, Co-Founder and Master Trainer at Nexius Academy"
              widths={[320, 480]}
              sizes="160px"
              optimize={false}
              className="h-40 w-40 rounded-2xl object-cover"
            />
            <div>
              <h3 className="text-2xl font-bold text-primary">Melverick Ng — Co-Founder &amp; Master Trainer, Nexius Academy</h3>
              <p className="mt-4 leading-relaxed text-gray-700">
                Melverick brings 30+ years of business and enterprise process experience, including former SAP consulting across ERP, CRM, logistics, supply chain, and finance operations. He operates a live production AI agent workforce and trains non-technical professionals to do the same with human review in place.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                He leads public SkillsFuture-supported cohorts with Temasek Polytechnic — <em>Agentic AI Foundations for Non-Technical Professionals</em> (TP-NC-C0021-F / TGS-2025059915) and <em>Agentic AI-Driven Business Innovation for Productivity</em> (TGS-2026063558) — and corporate or institutional classes for organisations including Forvis Mazars, Glomar, Temasek Polytechnic, NTUC e2i, and SIM.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                {profileLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <article id="darryl-wong" className="scroll-mt-28 overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-soft">
          <div className="grid gap-6 p-6 md:grid-cols-[160px,1fr] md:p-8">
            <ResponsiveImage
              src="/images/authors/darryl-wong-selected.jpeg"
              alt="Darryl Wong, Co-Founder and AI Workflow Trainer at Nexius Academy"
              widths={[320, 480]}
              sizes="160px"
              optimize={false}
              className="h-40 w-40 rounded-2xl object-cover"
            />
            <div>
              <h3 className="text-2xl font-bold text-primary">Darryl Wong — Co-Founder &amp; AI Workflow Trainer, Nexius Academy</h3>
              <p className="mt-4 leading-relaxed text-gray-700">
                Darryl is a CPA Australia and an ISCA Associate with 20+ years of accounting, finance, and enterprise systems experience. He co-trains hands-on workflow automation, agent orchestration, and finance and professional-services AI adoption alongside Melverick Ng.
              </p>
            </div>
          </div>
        </article>
      </div>

      {showFaqs && (
        <div className="mt-10 space-y-4">
          {aboutTrainerFaqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-soft">
              <h3 className="text-lg font-bold text-primary">{faq.question}</h3>
              <p className="mt-3 leading-relaxed text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

export default TrainerAuthority;
