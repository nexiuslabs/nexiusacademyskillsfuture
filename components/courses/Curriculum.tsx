import React from 'react';
import { MODULES, LEARNING_OUTCOMES } from '../../constants';
import { Brain, MessageSquare, Image, Code, Shield, Briefcase, CheckCircle } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={24} />,
  MessageSquare: <MessageSquare size={24} />,
  Image: <Image size={24} />,
  Code: <Code size={24} />,
  Shield: <Shield size={24} />,
  Briefcase: <Briefcase size={24} />,
};

const Curriculum: React.FC = () => {
  return (
    <section id="curriculum" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Description */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                Course Modules & Details
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Agentic AI is transforming how we work – imagine having a digital partner that can organize, plan, make decisions, and even take action on your behalf. From handling routine tasks to automating entire workflows, AI agents can boost productivity, simplify operations, and support smarter context-aware decision-making.
              </p>

              {/* What You'll Learn Sub-section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  What You'll Learn?
                </h3>
                <ul className="space-y-3">
                  {LEARNING_OUTCOMES.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="font-bold text-primary">Duration:</span>
                    <span className="text-gray-600">16 Hours (Including Assessment)</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="font-bold text-primary">Prerequisites:</span>
                    <span className="text-gray-600">No technical knowledge required.</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="font-bold text-primary">Certification:</span>
                    <span className="text-gray-600">Certificate of Attainment</span>
                </div>
            </div>

            <div className="mt-8">
                 <button className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-lg transition-colors">
                    Download Full Syllabus PDF
                 </button>
            </div>
          </div>

          {/* Right Column: Modules Grid */}
          <div className="lg:col-span-7">
             <div className="grid sm:grid-cols-2 gap-6 h-full content-start">
                {MODULES.map((module, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow border-l-4 border-transparent hover:border-accent">
                        <div className="text-accent mb-4">
                            {iconMap[module.iconName]}
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
  );
};

export default Curriculum;