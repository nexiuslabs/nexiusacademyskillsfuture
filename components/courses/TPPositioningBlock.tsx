import React from 'react';
import { ExternalLink } from 'lucide-react';

const TPPositioningBlock: React.FC = () => (
  <section className="bg-white py-14">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-primary/10 bg-neutral p-6 shadow-sm md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-accent">Course positioning</div>
            <h2 className="text-2xl font-heading font-bold text-primary lg:text-3xl">
              Practitioner-led delivery of a SkillsFuture-supported agentic AI programme
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600">
              This Nexius Academy page is the practitioner-led course and advisory page for learners who want hands-on help applying Agentic AI Foundations to real workplace tasks. Learners should verify final registration and funding details through official training and SkillsFuture channels.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h3 className="mb-2 text-lg font-bold text-primary">What Nexius adds</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Nexius Academy focuses on practical workplace examples, workflow mapping, reusable AI instructions, and human review habits for non-technical business teams.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h3 className="mb-2 text-lg font-bold text-primary">How to verify</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Confirm the latest course listing, dates, funding rules, and registration details with the official course owner and SkillsFuture sources before enrolment.
              </p>
            </div>
            <a
              href="https://www.tp.edu.sg/schools-and-courses/adult-learners/all-courses/short-courses/agentic-ai-foundations-for-non-technical-professionals-enhancing-productivity-and-business-process-automation.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-2 rounded-2xl border border-gray-100 bg-white p-5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent sm:col-span-2"
            >
              <ExternalLink size={16} className="mt-0.5 shrink-0" />
              <span>View the Temasek Polytechnic listing for Agentic AI Foundations for Non-Technical Professionals</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TPPositioningBlock;
