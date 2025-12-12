import React from 'react';
import { Briefcase, User, Users, Rocket, TrendingUp, Clock, ShieldCheck } from 'lucide-react';

const Overview: React.FC = () => {
  return (
    <section id="overview" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">
            Agentic AI Foundations for Business Automations: for Non-Technical Professionals
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Why Learn Grid */}
        <div className="bg-neutral rounded-2xl p-8 lg:p-12 mb-20">
          <h3 className="text-2xl font-bold text-primary mb-6">Why Attend This Course?</h3>
          <p className="text-gray-600 mb-6 italic border-l-4 border-accent pl-4">
            "We do not think this (AI's emergence) will mean a jobless future. But it does mean significant changes in job roles, and more training for humans to harness AI effectively." — Prime Minister Lawrence Wong
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
             <div className="flex flex-col items-start">
                <div className="p-3 bg-white rounded-lg shadow-sm mb-4">
                  <TrendingUp className="text-accent" size={32} />
                </div>
                <h4 className="font-bold text-primary text-lg mb-2">Future-Proof Skills</h4>
                <p className="text-sm text-gray-600">Acquire the essential skills needed to thrive in an AI-driven economy.</p>
             </div>
             <div className="flex flex-col items-start">
                <div className="p-3 bg-white rounded-lg shadow-sm mb-4">
                  <Clock className="text-accent" size={32} />
                </div>
                <h4 className="font-bold text-primary text-lg mb-2">Increase Efficiency</h4>
                <p className="text-sm text-gray-600">Leverage autonomous agents to eliminate manual tasks and accelerate outcomes.</p>
             </div>
             <div className="flex flex-col items-start">
                <div className="p-3 bg-white rounded-lg shadow-sm mb-4">
                  <ShieldCheck className="text-accent" size={32} />
                </div>
                <h4 className="font-bold text-primary text-lg mb-2">Business Scalability</h4>
                <p className="text-sm text-gray-600">Build adaptive, automated systems to support rapid business growth.</p>
             </div>
          </div>
        </div>

        {/* Who is this for */}
        <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary mb-10 text-center">Ideal For</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {[
                  { title: "Working Professionals", icon: Briefcase, desc: "Structured, job-specific application." },
                  { title: "Entrepreneurs", icon: User, desc: "Build, test, iterate quickly." },
                  { title: "Business Leaders", icon: Users, desc: "Outcome-focused, governance, impact." },
                  { title: "Startup Founders", icon: Rocket, desc: "Strategy, scale, network-driven." }
                ].map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-card hover:border-accent transition-all duration-300 group">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors text-primary">
                            <item.icon size={24} />
                        </div>
                        <h4 className="font-bold text-primary text-lg mb-2">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                ))}

            </div>
        </div>

      </div>
    </section>
  );
};

export default Overview;