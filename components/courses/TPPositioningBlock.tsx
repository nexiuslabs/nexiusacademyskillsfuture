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
              How Nexius Academy and Temasek Polytechnic work together
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600">
              Nexius Academy delivers the practitioner-led learning experience for professionals who want hands-on help applying Agentic AI Foundations to real workplace tasks. Temasek Polytechnic is the official course owner and administers registration, certification, schedules and funding information.
            </p>
            <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <p className="text-base leading-relaxed text-gray-700">
                <strong className="text-primary">Delivered by Nexius Academy</strong> in collaboration with Temasek Polytechnic.
                Official registration, certification and funding details are administered through Temasek Polytechnic and SkillsFuture.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
                <span><strong className="text-primary">TP course reference:</strong> TP-NC-C0021-F</span>
                <span><strong className="text-primary">SkillsFuture reference:</strong> TGS-2025059915</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h3 className="mb-2 text-lg font-bold text-primary">Nexius Academy&apos;s role</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Nexius Academy focuses on practical workplace examples, workflow mapping, reusable AI instructions, and human review habits for non-technical business teams.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h3 className="mb-2 text-lg font-bold text-primary">Official course administration</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Temasek Polytechnic publishes the official course listing and registration route. SkillsFuture provides the public funding reference. Verify the latest dates, fees and eligibility before enrolment.
              </p>
            </div>
            <a
              href="https://www.tp.edu.sg/schools-and-courses/adult-learners/all-courses/short-courses/agentic-ai-foundations-for-non-technical-professionals-enhancing-productivity-and-business-process-automation.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-2 rounded-2xl border border-gray-100 bg-white p-5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <ExternalLink size={16} className="mt-0.5 shrink-0" />
              <span>View the Temasek Polytechnic listing for Agentic AI Foundations for Non-Technical Professionals</span>
            </a>
            <a
              href="https://courses.myskillsfuture.gov.sg/courses/TGS-2025059915--Agentic-AI-Foundations-NonTechnical-Professionals-Enhancing-Productivity-Business-Process-Automation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-2 rounded-2xl border border-gray-100 bg-white p-5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <ExternalLink size={16} className="mt-0.5 shrink-0" />
              <span>Verify SkillsFuture course reference TGS-2025059915</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TPPositioningBlock;
