import React from 'react';
import { Bot, Clock3, Handshake, UsersRound, WalletCards } from 'lucide-react';

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
    title: 'Two-trainer support in every Foundations cohort',
    description:
      'Two trainers guide each Foundations cohort, giving learners more feedback, troubleshooting support, and hands-on attention.',
  },
  {
    icon: Handshake,
    title: 'Learn from two active AI practitioners',
    description:
      'Both Foundations trainers build and deploy AI solutions in practice, grounding each lesson in current, real-world application.',
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
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent">
            The Nexius Academy difference
          </p>
          <h2 className="text-3xl font-bold text-primary md:text-4xl">Why We’re Different</h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Focused expertise, practical outcomes, and more trainer support—so you leave ready to apply Agentic AI at work.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
          {differentiators.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="group flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <span className="text-sm font-bold tracking-[0.14em] text-primary/30">
                  {String(index + 1).padStart(2, '0')}
                </span>
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
