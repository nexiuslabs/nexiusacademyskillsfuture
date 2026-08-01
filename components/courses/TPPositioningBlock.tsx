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

        <div className="mt-10 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.82fr,1.18fr] lg:items-start">
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">Course at a glance</p>
                <h2 className="text-2xl font-heading font-bold text-primary lg:text-3xl">Agentic AI Foundations in one page</h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  A concise summary of the course, intended audience, learning outcomes, fees, and official funding context.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">Evidence you can verify</p>
                <h3 className="mb-3 text-xl font-heading font-bold text-primary">Check the course details before you enrol</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  A credible AI agent course should make its delivery, fees, trainers, learning environment, and official course information easy to inspect. Use these links to verify the current details for this programme.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-primary/10 bg-neutral p-5">
                <h3 className="mb-4 text-base font-bold text-primary">Official references</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href="https://www.skillsfuture.gov.sg/initiatives/employers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    <ExternalLink size={16} className="mt-0.5 shrink-0" />
                    <span>SkillsFuture employer funding guidance</span>
                  </a>
                  <a
                    href="https://www.skillsfuture.gov.sg/initiatives/employers/enhanced-training-support-for-smes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    <ExternalLink size={16} className="mt-0.5 shrink-0" />
                    <span>Enhanced Training Support for SMEs</span>
                  </a>
                  <a
                    href="https://www.imda.gov.sg/how-we-can-help/ai-verify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    <ExternalLink size={16} className="mt-0.5 shrink-0" />
                    <span>IMDA AI Verify and AI governance</span>
                  </a>
                  <a
                    href="https://www.mddi.gov.sg/newsroom/update-to-singapore-s-national-ai-strategy--refreshed-priorities-to-harness-ai-for-the-public-good-factsheet/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    <ExternalLink size={16} className="mt-0.5 shrink-0" />
                    <span>Singapore National AI Strategy update</span>
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <a href="#pricing" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent">
                  <div className="mb-2 font-bold text-primary">Published fees</div>
                  <p className="text-sm leading-relaxed text-gray-600">Review the full fee, subsidy tiers, GST and estimated payable amount.</p>
                </a>
                <a href="#schedule" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent">
                  <div className="mb-2 font-bold text-primary">Current schedule</div>
                  <p className="text-sm leading-relaxed text-gray-600">Check the published cohort dates, training hours and classroom location.</p>
                </a>
                <a href="#instructors" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent">
                  <div className="mb-2 font-bold text-primary">Trainer experience</div>
                  <p className="text-sm leading-relaxed text-gray-600">Review the trainers’ professional backgrounds and practical focus areas.</p>
                </a>
                <a
                  href="https://www.tp.edu.sg/schools-and-courses/adult-learners/all-courses/short-courses/agentic-ai-foundations-for-non-technical-professionals-enhancing-productivity-and-business-process-automation.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent"
                >
                  <div className="mb-2 font-bold text-primary">Official course information</div>
                  <p className="text-sm leading-relaxed text-gray-600">Open the Temasek Polytechnic course page and confirm the latest published details.</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TPPositioningBlock;
