import AdvancedCoursePricing from '../components/courses/AdvancedCoursePricing';
import React from 'react';
import AdvancedPreviewHeader from '../components/courses/AdvancedPreviewHeader';
import AdvancedPreviewHero from '../components/courses/AdvancedPreviewHero';
import { Briefcase, Building2, ShieldCheck, Users, CheckCircle, Layers, GitBranch, Lock, ClipboardList } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import Instructors from '../components/courses/Instructors';
import CourseTestimonials from '../components/courses/CourseTestimonials';
import CourseScheduleSection from '../components/courses/CourseScheduleSection';
import { openLeadModal } from '../services/leadModal';
import AIAnswerBlocks from '../components/courses/AIAnswerBlocks';

const learningObjectives = [
  'Understand advanced Agentic AI concepts using the Frontier Firm model and a structured 3-phase roadmap toward an Agentic Company.',
  'Map multi-agent orchestration across functions such as HR, Finance, Operations, Customer Support, and personal productivity workflows.',
  'Adopt the Agent Boss mindset, where humans supervise, direct, and improve teams of AI assistants for higher-value work.',
  'Design hybrid human-agent workflows with clear roles, accountability, handoffs, and performance expectations.',
  'Apply practical governance, compliance, data, and security controls for safe and responsible Agentic AI use.',
  'Develop an executable Agentic AI action roadmap that can support personal upskilling, team adoption, or enterprise-level transformation planning.',
];

const transformationModules = [
  {
    title: 'Frontier Firm Foundations',
    description: 'Understand how the Frontier Firm concept changes work design, decision-making, and operating models.',
    icon: Building2,
  },
  {
    title: 'Transformation Roadmapping',
    description: 'Build a phased roadmap that moves from isolated AI use cases to coordinated agentic execution.',
    icon: GitBranch,
  },
  {
    title: 'Cross-Functional Agent Orchestration',
    description: 'Design collaboration models where people and agentic systems operate with clear ownership and workflow boundaries.',
    icon: Layers,
  },
  {
    title: 'Agent Boss Operating Model',
    description: 'Define how humans supervise, direct, evaluate, and govern AI agents in real work.',
    icon: Users,
  },
  {
    title: 'Governance, Risk, and Security',
    description: 'Put the right controls in place for responsible use, accountability, and safe scale-up.',
    icon: Lock,
  },
  {
    title: 'Implementation Action Planning',
    description: 'Translate advanced Agentic AI concepts into a practical action plan for adoption, sequencing, and operating discipline.',
    icon: ClipboardList,
  },
];







const faqs = [
  {
    question: 'Who should attend this course?',
    answer: 'This programme is suitable for anyone who wants to learn advanced Agentic AI knowledge, including professionals, builders, managers, business owners, educators, consultants, and transformation teams.',
  },
  {
    question: 'What is the main outcome of the programme?',
    answer: 'Participants will learn how to move from isolated AI use cases to coordinated, secure, and scalable agentic workflows through Frontier Firm and Agent Boss frameworks.',
  },
  {
    question: 'Is this a technical builder programme?',
    answer: 'No. The emphasis is on advanced Agentic AI concepts, workflow design, governance, orchestration, and practical implementation planning rather than coding.',
  },
  {
    question: 'What is the course duration and fee?',
    answer: 'The course runs over 3 days. The official TP/STMS payable amounts are S$190.50 for Singaporean aged 40 and above or eligible SME-sponsored learners, S$490.50 for Singaporean aged 39 and below, Singapore Permanent Residents, and LTVP+ learners, and S$1,635.00 for the full course fee. Amounts are inclusive of 9% GST and subject to final eligibility confirmation.',
  },
  {
    question: 'Will participants receive a certificate?',
    answer: 'Participants who meet at least 75% attendance and attempt the assessment will be awarded a Certificate of Completion.',
  },
];

const FrontierFirmCoursePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Agentic AI-Driven Innovation | Nexius Academy"
        description="An advanced Agentic AI course for learners who want to understand Frontier Firm strategy, agent orchestration, AI governance, and practical implementation."
        canonical="/courses/advanced-agentic-ai"
        ogType="course"
      />

      <div className="academy-refresh academy-advanced min-h-screen bg-white">
        <AdvancedPreviewHeader />
        <main>
        <AdvancedPreviewHero />

        <section className="academy-course-focus bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 rounded-3xl border border-gray-100 bg-neutral p-8 shadow-sm lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Course Focus</div>
                <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">Master advanced Agentic AI transformation</h2>
                <p className="text-gray-600 leading-relaxed">
                  Build the strategy, operating model, orchestration, and governance knowledge needed to move from scattered AI use cases to coordinated agentic execution.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <CheckCircle size={20} className="text-accent mb-3" />
                  <h3 className="font-bold text-primary mb-2">Transformation Roadmap</h3>
                  <p className="text-sm text-gray-600">Define the phases required to shift toward agentic ways of working.</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <CheckCircle size={20} className="text-accent mb-3" />
                  <h3 className="font-bold text-primary mb-2">Agent Boss Model</h3>
                  <p className="text-sm text-gray-600">Clarify human accountability in hybrid human-agent workflows.</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <CheckCircle size={20} className="text-accent mb-3" />
                  <h3 className="font-bold text-primary mb-2">Enterprise Governance</h3>
                  <p className="text-sm text-gray-600">Set controls for risk, security, supervision, and responsible scale-up.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AIAnswerBlocks
          className="academy-summary py-16 bg-neutral"
          title="Advanced Agentic AI course summary"
          summary="A concise overview of the learner audience, advanced Agentic AI outcomes, and governance context for this course."
          blocks={[
            {
              question: 'What is Agentic AI-Driven Business Innovation for Productivity?',
              answer:
                'Agentic AI-Driven Business Innovation for Productivity is an advanced Agentic AI course for learners who want to move from basic AI tool use to coordinated agentic workflows. It covers Frontier Firm strategy, Agent Boss operating models, cross-functional agent orchestration, governance, risk, and implementation roadmapping.',
            },
            {
              question: 'Who should attend this advanced Agentic AI course?',
              answer:
                'The course is suitable for professionals, builders, managers, educators, consultants, business owners, and curious learners who want advanced Agentic AI knowledge. It is not a coding programme; it focuses on how people structure, supervise, and scale human-agent work across real workflows.',
            },
            {
              question: 'What business outcome does the course support?',
              answer:
                'Participants learn to define practical transformation phases, clarify human accountability, set controls for data and security, and design an action plan for Agentic AI adoption. The intended outcome is a more coordinated, governed, and scalable approach to AI-enabled productivity.',
            },
          ]}
          citationsPlacement="left"
          citations={[
            {
              label: 'Singapore National AI Strategy update',
              href: 'https://www.mddi.gov.sg/newsroom/update-to-singapore-s-national-ai-strategy--refreshed-priorities-to-harness-ai-for-the-public-good-factsheet/',
            },
            {
              label: 'IMDA AI Verify',
              href: 'https://www.imda.gov.sg/how-we-can-help/ai-verify',
            },
            {
              label: 'National AI Impact Programme',
              href: 'https://www.imda.gov.sg/how-we-can-help/techskills-accelerator-tesa/national-ai-impact-programme',
            },
            {
              label: 'SkillsFuture employer initiatives',
              href: 'https://www.skillsfuture.gov.sg/initiatives/employers',
            },
          ]}
        />

        <section id="overview" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">Course Introduction</h2>
              <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p>
                    This programme is suitable for anyone who wants to learn advanced Agentic AI knowledge, including professionals, builders, managers, business owners, educators, consultants, and transformation teams.
                  </p>
                  <p>
                    The programme provides a structured framework for understanding and applying Agentic AI through the Frontier Firm concept. It equips participants with the capability to design advanced human-agent workflows, cross-functional agent orchestration, operating model redesign, and governance for responsible scale-up.
                  </p>
                  <p>
                    A key feature of the programme is the introduction of the Agent Boss concept, where people learn to supervise, direct, and govern agentic AI systems across functions. The programme adopts a practical and implementation-oriented approach to help participants transition from isolated AI use cases to coordinated, secure, and scalable agentic execution.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-neutral rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-primary mb-6">Suitable for</h3>
                  <div className="space-y-5">
                    {[
                      { icon: Briefcase, title: 'Professionals & Managers', desc: 'Wanting to understand advanced Agentic AI workflows and productivity models.' },
                      { icon: Building2, title: 'Builders & Consultants', desc: 'Designing agentic systems, operating models, and adoption roadmaps.' },
                      { icon: Users, title: 'Business Owners & Teams', desc: 'Exploring practical AI adoption, governance, and scale-up decisions.' },
                      { icon: ShieldCheck, title: 'Educators & Curious Learners', desc: 'Building deeper fluency in Frontier Firm, Agent Boss, and AI governance concepts.' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                          <item.icon size={22} />
                        </div>
                        <div>
                          <div className="font-bold text-primary">{item.title}</div>
                          <div className="text-sm text-gray-600">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="curriculum" className="py-20 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">What participants will learn</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  This programme is designed to help learners move beyond basic AI experimentation and define how agentic workflows can be structured, governed, and implemented across functions.
                </p>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-primary mb-4">Learning objectives</h3>
                  <ul className="space-y-4">
                    {learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                        <CheckCircle size={18} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid sm:grid-cols-2 gap-6">
                  {transformationModules.map((module, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                      <div className="text-accent mb-4">
                        <module.icon size={24} />
                      </div>
                      <h3 className="font-bold text-primary text-lg mb-2">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdvancedCoursePricing onApply={() => openLeadModal('course_page_cta', 'reserve_seat', {
          page: '/courses/advanced-agentic-ai', position: 'frontier_firm_pricing_register_interest', ctaLabel: 'register_interest',
        })} />

        <CourseScheduleSection page="/courses/advanced-agentic-ai" positionPrefix="frontier_firm" />

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Ready to learn advanced Agentic AI?</h2>
              <p className="text-blue-50/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Apply now if you want programme details, intake timing, or an advisory conversation on whether this course fits your learning goals or team needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'reserve_seat', {
                      page: '/courses/advanced-agentic-ai',
                      position: 'frontier_firm_midpage_register_interest',
                      ctaLabel: 'register_interest',
                    })
                  }
                  className="academy-button-inverse "
                >
                  Apply Now
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'advisory_call', {
                      page: '/courses/advanced-agentic-ai',
                      position: 'frontier_firm_midpage_advisory',
                      ctaLabel: 'request_advisory_call',
                    })
                  }
                  className="border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                >
                  Request Advisory Call
                </button>
              </div>
            </div>
          </div>
        </section>

        <Instructors />
        <CourseTestimonials />

        <section id="faq" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">Programme FAQs</h2>
              <p className="text-gray-500">A few quick answers for learners evaluating this course.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 bg-neutral">
                  <h3 className="font-bold text-primary text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        </main>
        <Footer />
      </div>
    </>
  );
};

export default FrontierFirmCoursePage;
