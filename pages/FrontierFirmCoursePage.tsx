import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Building2, ShieldCheck, Sparkles, Users, CheckCircle, Layers, GitBranch, Lock, ClipboardList } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import Instructors from '../components/courses/Instructors';
import { openLeadModal } from '../services/leadModal';

const learningObjectives = [
  'Explain the principles and strategic implications of the Frontier Firm concept for enterprise transformation.',
  'Formulate a three-phase organisational transformation roadmap towards an agentic operating model.',
  'Design cross-functional agent orchestration models for multi-department business operations.',
  'Evaluate organisational readiness and leadership requirements for adopting an agentic enterprise model.',
  'Apply the Agent Boss concept to define human roles, responsibilities, and accountability in hybrid human-agent teams.',
  'Develop leadership and management approaches for supervising and scaling teams of human Agent Bosses and agentic systems.',
  'Establish enterprise governance, risk management, and security controls for organisation-wide deployment of agentic AI systems.',
  'Produce an implementation action plan that supports progressive adoption from pilot initiatives to enterprise-wide transformation.',
];

const transformationModules = [
  {
    title: 'Frontier Firm Strategy',
    description: 'Understand how the Frontier Firm concept changes enterprise structure, decision-making, and operating models.',
    icon: Building2,
  },
  {
    title: 'Transformation Roadmapping',
    description: 'Build a phased roadmap that moves the organisation from isolated AI pilots to coordinated enterprise execution.',
    icon: GitBranch,
  },
  {
    title: 'Cross-Functional Agent Orchestration',
    description: 'Design collaboration models across departments where agentic systems operate with clear ownership and workflow boundaries.',
    icon: Layers,
  },
  {
    title: 'Agent Boss Leadership Model',
    description: 'Define how human leaders supervise, direct, and govern AI agents and teams of human Agent Bosses.',
    icon: Users,
  },
  {
    title: 'Governance, Risk, and Security',
    description: 'Put the right controls in place for enterprise-wide deployment, accountability, and safe scale-up.',
    icon: Lock,
  },
  {
    title: 'Implementation Action Planning',
    description: 'Translate strategy into a practical enterprise action plan for adoption, sequencing, and operating discipline.',
    icon: ClipboardList,
  },
];

const faqs = [
  {
    question: 'Is this course already open for registration?',
    answer: 'Not yet. This page is currently set up as a waitlist page so interested leaders and business owners can register interest before launch.',
  },
  {
    question: 'Who is this programme designed for?',
    answer: 'It is designed for business managers, organisational leaders, and business owners responsible for enterprise strategy, transformation, and operational performance.',
  },
  {
    question: 'Is this a technical builder programme?',
    answer: 'No. The emphasis is on enterprise leadership, operating model redesign, governance, and practical implementation planning rather than coding.',
  },
  {
    question: 'What happens after I join the waitlist?',
    answer: 'You will be contacted when intake timing, schedule, and launch details are confirmed. You may also be invited to an advisory conversation if needed.',
  },
];

const FrontierFirmCoursePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Frontier Firm & Agent Boss Programme | Waitlist | Nexius Academy"
        description="Join the waitlist for our upcoming programme on Frontier Firm transformation, Agent Boss leadership, cross-functional agent orchestration, and enterprise governance for agentic AI."
        canonical="/courses/frontier-firm-agent-boss"
        ogType="website"
      />

      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-accent font-bold text-xl">N</div>
              <span className="font-heading font-bold text-xl text-primary tracking-tight">
                Nexius<span className="text-accent">Academy</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <a href="#overview" className="hover:text-accent">Overview</a>
              <a href="#curriculum" className="hover:text-accent">Curriculum</a>
              <a href="#instructors" className="hover:text-accent">Instructors</a>
              <a href="#faq" className="hover:text-accent">FAQ</a>
            </nav>
            <button
              type="button"
              onClick={() =>
                openLeadModal('course_page_cta', 'reserve_seat', {
                  page: '/courses/frontier-firm-agent-boss',
                  position: 'frontier_firm_nav_waitlist',
                  ctaLabel: 'join_waitlist',
                })
              }
              className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-900 transition-colors"
            >
              Join Waitlist
            </button>
          </div>
        </header>

        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#12306b] to-[#0c1b3f] text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#14b8a6,_transparent_30%),radial-gradient(circle_at_bottom_left,_#60a5fa,_transparent_25%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold mb-6">
                  <Sparkles size={16} className="text-accent" />
                  New Programme · Waitlist Open
                </div>
                <h1 className="text-4xl lg:text-6xl font-heading font-extrabold leading-tight mb-6">
                  Frontier Firm Transformation & Agent Boss Leadership
                </h1>
                <p className="text-lg lg:text-xl text-blue-50/90 leading-relaxed mb-8 max-w-3xl">
                  A new executive-level programme for business managers, organisational leaders, and business owners who need to design and lead the shift from isolated AI use cases to coordinated, secure, and scalable agentic enterprise execution.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'reserve_seat', {
                        page: '/courses/frontier-firm-agent-boss',
                        position: 'frontier_firm_hero_waitlist',
                        ctaLabel: 'join_waitlist',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors shadow-xl"
                  >
                    Join Waitlist <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'advisory_call', {
                        page: '/courses/frontier-firm-agent-boss',
                        position: 'frontier_firm_hero_advisory',
                        ctaLabel: 'request_advisory_call',
                      })
                    }
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                  >
                    Request Advisory Call
                  </button>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-bold mb-1">Designed for</div>
                    <div className="text-blue-50/85">Business leaders & owners</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-bold mb-1">Focus</div>
                    <div className="text-blue-50/85">Agentic enterprise transformation</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="font-bold mb-1">Status</div>
                    <div className="text-blue-50/85">Waitlist now open</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-8">
                  <div className="text-sm font-bold uppercase tracking-[0.16em] text-accent mb-3">Waitlist</div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Be first to know when this programme launches</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    This course is being prepared for leaders who need a practical framework for enterprise-wide agent orchestration, leadership redesign, and governance.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 mb-8">
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />Priority access to intake announcement</li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />Early advisory conversation if needed</li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-accent mt-0.5" />First update when schedule and fees are finalised</li>
                  </ul>
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal('course_page_cta', 'reserve_seat', {
                        page: '/courses/frontier-firm-agent-boss',
                        position: 'frontier_firm_waitlist_card',
                        ctaLabel: 'join_waitlist',
                      })
                    }
                    className="w-full bg-primary hover:bg-blue-900 text-white px-6 py-4 rounded-xl font-bold transition-colors"
                  >
                    Join Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    This programme is intended for business managers, organisational leaders, and business owners who are responsible for enterprise strategy, transformation, and operational performance.
                  </p>
                  <p>
                    The programme provides a structured framework for transforming organisations into agentic enterprises through the Frontier Firm concept. It equips participants with the capability to design and lead organisation-wide transformation, including cross-functional agent orchestration, leadership operating model redesign, and enterprise governance for large-scale deployment.
                  </p>
                  <p>
                    A key feature of the programme is the introduction of the Agent Boss concept, where human employees are developed to supervise, direct, and govern agentic AI systems across functions. The programme adopts a practical and implementation-oriented approach to enable participants to transition from isolated AI use cases to coordinated, secure, and scalable enterprise execution.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-neutral rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-primary mb-6">Ideal for</h3>
                  <div className="space-y-5">
                    {[
                      { icon: Briefcase, title: 'Business Managers', desc: 'Responsible for transformation, performance, and implementation outcomes.' },
                      { icon: Building2, title: 'Organisational Leaders', desc: 'Driving operating model redesign and enterprise coordination.' },
                      { icon: Users, title: 'Business Owners', desc: 'Leading strategic adoption, governance, and scale-up decisions.' },
                      { icon: ShieldCheck, title: 'Transformation Sponsors', desc: 'Balancing innovation, security, accountability, and execution discipline.' },
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
                  This programme is designed to help leaders move beyond experimentation and define how an agentic enterprise can be structured, governed, and implemented across functions.
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
                    <div key={index} className="bg-white p-6 rounded-2xl border-l-4 border-transparent hover:border-accent shadow-sm hover:shadow-lg transition-all">
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

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold mb-6">
                <Users size={16} className="text-accent" /> Agent Boss Waitlist
              </div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Want early access to this new programme?</h2>
              <p className="text-blue-50/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Join the waitlist if you want to be contacted when this programme is ready for launch, including intake timing, advisory calls, and first release details.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'reserve_seat', {
                      page: '/courses/frontier-firm-agent-boss',
                      position: 'frontier_firm_midpage_waitlist',
                      ctaLabel: 'join_waitlist',
                    })
                  }
                  className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-500 transition-colors"
                >
                  Join Waitlist
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal('course_page_cta', 'advisory_call', {
                      page: '/courses/frontier-firm-agent-boss',
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

        <section id="faq" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">Programme FAQs</h2>
              <p className="text-gray-500">A few quick answers for the first waitlist version of this page.</p>
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

        <Footer />
      </div>
    </>
  );
};

export default FrontierFirmCoursePage;
