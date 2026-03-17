import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Award, TrendingUp, Brain, Lightbulb, ArrowRight, CheckCircle, Mail, MessageCircle, Quote } from 'lucide-react';
import SEO from '../components/SEO';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { fetchBucketImages, getRandomImages } from '../services/imageService';

type TabType = 'mission' | 'values' | 'story';

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('mission');
  const [images, setImages] = useState<string[]>([
    'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]);

  useEffect(() => {
    const loadImages = async () => {
      const bucketImages = await fetchBucketImages();
      if (bucketImages.length > 0) {
        setImages(getRandomImages(bucketImages, 3));
      }
    };

    loadImages();
  }, []);

  const tabs = [
    { id: 'mission' as TabType, label: 'Our Mission' },
    { id: 'values' as TabType, label: 'Our Values' },
    { id: 'story' as TabType, label: 'Our Story' },
  ];

  const whyLearnersChooseUs = [
    {
      title: 'Business-first teaching',
      description: 'We translate AI into practical business decisions, KPIs, and workflows—not just tools or theory.'
    },
    {
      title: 'Non-technical friendly',
      description: 'Designed for managers and operators with zero coding background, with step-by-step guidance throughout.'
    },
    {
      title: 'Outcome-driven workshops',
      description: 'Every cohort builds real, deployable workflow outputs you can bring back to your team immediately.'
    },
  ];

  const partners = [
    {
      name: 'NTU',
      logo: 'https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/ntu_logo.png',
      href: 'https://www.ntu.edu.sg/'
    },
    {
      name: 'NIE',
      logo: 'https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/nie_logo.jpeg',
      href: 'https://www.ntu.edu.sg/nie'
    },
    {
      name: 'SIM',
      logo: 'https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/SIM-GE-Pri-logo-4C-1024x754.webp',
      href: 'https://www.sim.edu.sg/'
    },
    {
      name: 'Forte Law',
      logo: 'https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/forte_law_llc_logo.jpeg',
      href: 'https://www.fortelawllc.com/'
    },
    {
      name: 'Automa8e',
      logo: 'https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/autom8e_logo.png',
      href: 'https://automa8e.com/'
    },
    {
      name: 'Jetdata',
      logo: 'https://nvuzklxegzsfziorfkvd.supabase.co/storage/v1/object/public/Company%20Logo/jetdata_logo.jpeg',
      href: 'https://jetdata.io/'
    },
  ];

  const learnerTestimonials = [
    {
      quote: 'Very practical and actionable. I left with an automation blueprint we implemented the same week.',
      name: 'Kenji Chia',
      role: 'Founder, Digify Team'
    },
    {
      quote: 'As a non-technical manager, I finally understood how to use AI in day-to-day ops without coding.',
      name: 'SME Operations Lead',
      role: 'Course Participant'
    },
  ];

  return (
    <div className="font-body text-charcoal bg-white min-h-screen flex flex-col">
      <SEO
        title="About Nexius Academy | AI Training Experts in Singapore"
        description="Nexius Academy empowers business professionals with hands-on agentic AI skills. Founded by builders of Agentic ERP systems, we bridge the gap between AI technology and practical business application."
        canonical="/about"
      />
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#0F1829] opacity-95"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-bold text-accent tracking-wide uppercase mb-6">
                About Nexius Academy
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Empowering Professionals with <span className="text-accent">Agentic AI Skills</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We bridge the gap between cutting-edge AI technology and practical business application, making autonomous AI accessible to non-technical professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Combined Tabbed Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                What Drives Us Forward
              </h2>
              <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Discover our mission, values, and the story behind Nexius Academy
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-3 rounded-lg font-semibold text-base transition-all ${
                    activeTab === tab.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-neutral text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="max-w-6xl mx-auto">
              {/* Mission Tab */}
              {activeTab === 'mission' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="relative h-[500px] hidden md:block">
                    <img
                      src={images[0]}
                      alt="Our mission"
                      className="absolute top-0 left-0 w-72 h-80 object-cover rounded-2xl shadow-xl z-10"
                    />
                    <img
                      src={images[1]}
                      alt="Team collaboration"
                      className="absolute bottom-0 right-0 w-80 h-72 object-cover rounded-2xl shadow-xl z-20 border-8 border-white"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
                  </div>

                  <div className="md:hidden w-full h-72 overflow-hidden rounded-2xl shadow-lg mb-8">
                    <img src={images[0]} className="w-full h-full object-cover" alt="Our mission" />
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                      Democratizing AI Automation for Business Leaders
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                      At Nexius Academy, we believe that the power of Agentic AI should be accessible to everyone, not just technical experts. Our mission is to equip business professionals with the knowledge and skills to leverage autonomous AI systems that transform operations and drive measurable results.
                    </p>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      We focus on practical, hands-on learning that bridges the gap between theoretical AI concepts and real-world business applications. Our courses are designed to help you automate workflows, increase efficiency, and unlock new opportunities without requiring a technical background.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle size={24} className="text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-primary mb-1">Practical Focus</h4>
                          <p className="text-gray-600 text-sm">Real-world applications you can implement immediately</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle size={24} className="text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-primary mb-1">No Code Required</h4>
                          <p className="text-gray-600 text-sm">Accessible platforms designed for non-technical users</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Values Tab */}
              {activeTab === 'values' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-neutral p-8 rounded-xl shadow-card hover:shadow-xl transition-all">
                      <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                        <Brain className="text-accent" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">Innovation First</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We stay at the forefront of AI technology, continuously updating our curriculum to reflect the latest advancements in autonomous systems.
                      </p>
                    </div>

                    <div className="bg-neutral p-8 rounded-xl shadow-card hover:shadow-xl transition-all">
                      <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                        <Users className="text-accent" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">Accessibility</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We make complex AI concepts understandable and actionable for professionals at all levels, regardless of technical background.
                      </p>
                    </div>

                    <div className="bg-neutral p-8 rounded-xl shadow-card hover:shadow-xl transition-all">
                      <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                        <TrendingUp className="text-accent" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">Results Driven</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Every course is designed with measurable outcomes in mind, focusing on practical skills that deliver immediate business value.
                      </p>
                    </div>

                    <div className="bg-neutral p-8 rounded-xl shadow-card hover:shadow-xl transition-all">
                      <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                        <Lightbulb className="text-accent" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">Continuous Learning</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We foster a culture of lifelong learning, providing ongoing support and resources to help you stay ahead in the AI revolution.
                      </p>
                    </div>

                    <div className="bg-neutral p-8 rounded-xl shadow-card hover:shadow-xl transition-all">
                      <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                        <Award className="text-accent" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">Excellence</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We maintain the highest standards in curriculum design, instructor expertise, and student support to ensure exceptional outcomes.
                      </p>
                    </div>

                    <div className="bg-neutral p-8 rounded-xl shadow-card hover:shadow-xl transition-all">
                      <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                        <Target className="text-accent" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">Business Impact</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We prioritize teaching AI applications that directly translate to improved efficiency, reduced costs, and enhanced decision-making.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Story Tab */}
              {activeTab === 'story' && (
                <div className="max-w-4xl mx-auto">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      Nexius Academy was founded on a simple observation: while AI technology was advancing at an unprecedented pace, most business professionals were being left behind. The tools needed to leverage autonomous systems were locked away in technical jargon and complex frameworks.
                    </p>

                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      At our core, we are actively engineering the future of work by building a proprietary Agentic ERP for SMEs. We live in the code, designing workflows where AI agents think, decide, and act. This hands-on experience sparked an obsession with the concept of the 'Frontier Firm'—a vision coined by Microsoft where companies operate with a fluid human-agent arrangement, having intelligence 'on-tap' to solve problems instantly..
                    </p>

                    <div className="bg-neutral p-8 rounded-xl my-8">
                      <p className="text-primary text-xl font-semibold italic leading-relaxed">
                        "But we didn't learn this from reading headlines. We are builders first, trainers second."
                      </p>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      We realized that for SMEs to reach this frontier, they didn't just need software; they needed the capability to wield it. We set out to bridge this gap by creating a learning platform that makes Agentic AI accessible, practical, and immediately applicable.
                    </p>

                    <p className="text-gray-600 leading-relaxed text-lg">
                      Today, Nexius Academy helps professionals harness the power of autonomous AI. We don't just teach theory; we empower managers and executives to build the 'Frontier Firm' of tomorrow, today."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">500+</div>
                <p className="text-gray-300 font-medium">Students Trained</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">95%</div>
                <p className="text-gray-300 font-medium">Satisfaction Rate</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">20+</div>
                <p className="text-gray-300 font-medium">Corporate Partners</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">40+</div>
                <p className="text-gray-300 font-medium">Years of Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Learners Choose Us */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Learners Choose Us</h2>
              <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We design every cohort around business outcomes, not theory slides.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {whyLearnersChooseUs.map((item) => (
                <div key={item.title} className="bg-neutral rounded-xl p-8 shadow-card hover:shadow-xl transition-all">
                  <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Post-stats Conversion CTA */}
        <section className="py-16 bg-neutral border-y border-gray-100">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-card p-8 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm font-bold tracking-wider text-accent uppercase mb-2">Ready for the next step?</p>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">Find the right cohort for your role and goals</h3>
                <p className="text-gray-600">Get your intake options fast, or speak with an advisor to confirm fit.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/courses/agentic-ai?lead=join-next-cohort&lead_source=about_cta"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  See Upcoming Cohorts
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="https://wa.me/6596615284?text=Hi%20Nexius%20Academy%2C%20I%20want%20to%20check%20which%20cohort%20fits%20me."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
                >
                  <MessageCircle size={18} />
                  Talk to Advisor
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Partners + Testimonials */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Trusted by Learners and Partner Organizations</h2>
              <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center mb-14">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral rounded-xl p-4 h-24 flex items-center justify-center hover:shadow-card transition-all"
                  aria-label={`Visit ${partner.name}`}
                >
                  <img src={partner.logo} alt={`${partner.name} logo`} className="max-h-12 w-full object-contain" />
                </a>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {learnerTestimonials.map((item) => (
                <div key={item.name} className="bg-neutral rounded-xl p-8 shadow-card">
                  <Quote className="text-accent mb-4" size={28} />
                  <p className="text-gray-700 leading-relaxed mb-5">“{item.quote}”</p>
                  <div>
                    <p className="font-bold text-primary">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-24 bg-neutral">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Core Expertise</h2>
              <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We help organizations move from AI curiosity to real execution with practical, business-first capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-card p-8 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Brain className="text-accent" size={28} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Agentic AI Strategy</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Build a clear roadmap for adopting agentic AI across teams, with use-case prioritization tied to measurable business outcomes.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-card p-8 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="text-accent" size={28} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Workflow Automation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Design and implement no-code and low-code automation workflows that reduce manual effort, increase speed, and improve consistency.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-card p-8 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Target className="text-accent" size={28} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Capability Building</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Equip managers and teams with hands-on skills, governance practices, and implementation playbooks to sustain long-term AI adoption.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-[#0F1829] rounded-2xl p-12 md:p-16 text-center shadow-xl">
              <Mail className="w-16 h-16 text-accent mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Career with AI?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join hundreds of professionals who have already mastered Agentic AI and are driving real business impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/courses/agentic-ai"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-opacity-90 transition-all"
                >
                  Explore Our Courses
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-50 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
