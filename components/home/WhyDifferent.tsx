import React from 'react';
import { Bot, Clock3, UsersRound, WalletCards } from 'lucide-react';

const differentiators = [
  {
    icon: Bot,
    title: 'Focused exclusively on Agentic AI',
    description:
      'A specialist curriculum centred on designing, governing, and deploying AI agents—not a generic overview of AI tools.',
  },
  {
    icon: Clock3,
    title: 'Build a working automation in our 16-hour course',
    description:
      'Our Agentic AI Foundations course turns concepts into a functioning automation you can adapt to a real business workflow.',
  },
  {
    icon: UsersRound,
    title: 'Two practising trainers in every Foundations cohort',
    description:
      'Two trainers guide each Foundations cohort with feedback, troubleshooting and hands-on attention. Both build and deploy AI solutions in practice, grounding lessons in current workplace application.',
  },
  {
    icon: WalletCards,
    title: 'Up to 90% course fee subsidy',
    description:
      'Eligible participants and employers may receive up to 90% course fee subsidy, subject to prevailing funding criteria.',
  },
];

const WhyDifferent: React.FC = () => {
  return (
    <section id="why-different" className="scroll-mt-32 bg-neutral py-20 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">Why learn with Nexius Academy</h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Focused expertise, practical outcomes, and more trainer support—so you leave ready to apply Agentic AI at work.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {differentiators.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="flex flex-col border-t border-primary/15 pt-6"
            >
              <div className="mb-4 flex items-center">
                <div className="text-primary">
                  <Icon size={24} aria-hidden="true" />
                </div>

              </div>
              <h3 className="text-xl font-bold leading-snug text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferent;
