import React from 'react';
import { Briefcase, Building2, Headset, Network, Plug, Settings2, ShieldCheck } from 'lucide-react';

const overviewCards = [
  {
    title: 'Work With AI Agents',
    description: 'Understand how agents can reason through tasks, use context, and support multi-step workplace outcomes.',
    icon: Network,
  },
  {
    title: 'Use No-Code Tools',
    description: 'Apply the Codex App, plugins, and reusable agent skills without needing to write software code.',
    icon: Plug,
  },
  {
    title: 'Apply Safe Review Habits',
    description: 'Learn how to review AI output, protect sensitive information, and keep human judgement in the loop.',
    icon: ShieldCheck,
  },
];

const audienceCards = [
  {
    title: 'Business Teams',
    description: 'Improve planning, drafting, research, and recurring coordination work.',
    icon: Briefcase,
  },
  {
    title: 'Admin, HR & Operations',
    description: 'Use AI assistance for process documentation, internal updates, and routine workflows.',
    icon: Settings2,
  },
  {
    title: 'Logistics & Customer Support',
    description: 'Structure service responses, reporting, handovers, and customer-facing follow-up.',
    icon: Headset,
  },
  {
    title: 'Managers & SMEs',
    description: 'Identify practical AI use cases and guide safer adoption across teams.',
    icon: Building2,
  },
];

const Overview: React.FC = () => {
  return (
    <section id="overview" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 bg-neutral px-6 py-10 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.88fr,1.12fr] lg:items-start">
            <div className="max-w-xl">
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">
                Agentic AI in workplace terms
              </div>
              <h3 className="text-2xl font-bold leading-tight text-primary lg:text-3xl">
                Learn to use AI as a practical work partner, not just a chatbot
              </h3>

              <div className="mt-9 space-y-5">
                {overviewCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="grid grid-cols-[3.5rem,1fr] gap-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-accent shadow-sm">
                        <Icon size={30} />
                      </div>
                      <div>
                        <h4 className="mb-2 text-lg font-bold text-primary">{item.title}</h4>
                        <p className="text-sm leading-relaxed text-gray-700">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5 text-base leading-relaxed text-gray-700">
              <p>
                Agentic AI is transforming how we work - imagine having a digital partner that can organize, plan, make decisions, and even take action on your behalf. From handling routine tasks to automating entire workflows, AI agents can boost productivity, simplify operations, and support smarter context-aware decision-making. Whether you are in business, administration, human resources, logistics or customer support, these intelligent agents are quickly becoming essential in today's workplace.
              </p>
              <p>
                This hands-on 2-day course is designed for professionals with no coding background. You will gain hands-on experience and practical knowledge to harness Agentic AI - no coding needed. You will learn to use Codex app, plugins and agent skills to automate workflows. You will explore how AI agents can assist with reporting and customer interactions. You will learn how to apply it to real-world tasks and discover how it can make your work faster, smarter, and more efficient.
              </p>
              <p>
                The course will break down the key concepts of autonomous agents and show how they differ from traditional automation tools. Using simple and relatable real-world examples, you will discover how these smart agents can improve everyday tasks across various roles and industries.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="mb-10 text-center text-2xl font-bold text-primary">Who This Helps</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {audienceCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:border-accent hover:shadow-card"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon size={24} />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-primary">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
