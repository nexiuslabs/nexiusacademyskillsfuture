import React from 'react';
import { INSTRUCTORS } from '../../constants';
import ResponsiveImage from '../ResponsiveImage';

const profileLinks = [
  { href: 'https://melverick.com/', label: 'melverick.com' },
  { href: 'https://nexiuslabs.com/authors/melverick-ng', label: 'Nexius Labs author profile' },
  { href: 'https://www.linkedin.com/in/melverick', label: 'LinkedIn' },
];

type FaqItem = {
  question: string;
  answer: string;
};

type TrainerAuthorityProps = {
  faqs?: FaqItem[];
};

const TrainerAuthority: React.FC<TrainerAuthorityProps> = ({ faqs = [] }) => (
  <section id="trainers" className="py-20 bg-white" aria-labelledby="trainers-heading">
    <div className="container-page">
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">Trainer authority</p>
        <h2 id="trainers-heading" className="text-3xl font-bold leading-tight text-primary sm:text-4xl">
          Meet Your Trainers: Practitioners Running Live AI Agent Workforces in Singapore
        </h2>
      </div>

      <div className="grid gap-6">
        {INSTRUCTORS.map((instructor) => (
          <article id={instructor.id} key={instructor.id} className="scroll-mt-28 overflow-hidden rounded-3xl border border-primary/10 bg-neutral shadow-soft">
            <div className="grid gap-6 p-6 md:grid-cols-[160px,1fr] md:p-8">
              <ResponsiveImage
                src={instructor.image}
                alt={`${instructor.name}, ${instructor.role}`}
                widths={[320, 480]}
                sizes="160px"
                optimize={false}
                className="h-40 w-40 rounded-2xl object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold text-primary">{instructor.name}</h3>
                <p className="mt-2 text-sm font-semibold leading-snug text-accent">{instructor.role}</p>
                {instructor.credentials && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {instructor.credentials.map((credential) => (
                      <li key={credential} className="rounded-full border border-primary/10 bg-white px-3 py-1 text-xs font-semibold text-primary">
                        {credential}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 leading-relaxed text-gray-700">{instructor.bio}</p>
                {instructor.id === 'melverick-ng' && (
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                    {profileLinks.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {faqs.length > 0 && (
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
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
