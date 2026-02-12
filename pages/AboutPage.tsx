import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Award, TrendingUp, Brain, Lightbulb, ArrowRight, CheckCircle, Mail } from 'lucide-react';
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

        {/* Team Section */}
        <section className="py-24 bg-neutral">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Meet Our Experts</h2>
              <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Our team of industry veterans and AI specialists brings decades of combined experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-xl transition-all">
                <div className="h-64 bg-gradient-to-br from-accent/20 to-primary/20"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-1">Expert Instructors</h3>
                  <p className="text-accent font-semibold mb-3">Industry Leaders</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our instructors are seasoned professionals with proven track records in AI implementation and business transformation.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-xl transition-all">
                <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-1">Curriculum Designers</h3>
                  <p className="text-accent font-semibold mb-3">Education Specialists</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our design team crafts learning experiences that are engaging, practical, and tailored to adult learners.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-xl transition-all">
                <div className="h-64 bg-gradient-to-br from-accent/20 to-primary/30"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-1">Support Team</h3>
                  <p className="text-accent font-semibold mb-3">Student Success</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Dedicated support professionals ensuring every student achieves their learning goals and maximizes course value.
                  </p>
                </div>
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
