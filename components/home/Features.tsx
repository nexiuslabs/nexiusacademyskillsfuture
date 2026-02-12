import React from 'react';
import { BookOpen, Award, Users } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="overview" className="bg-primary py-16 scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          
          <div className="flex items-start gap-4 p-6 hover:bg-white/5 rounded-xl transition-colors">
            <div className="bg-secondary/20 p-3 rounded-lg text-secondary">
              <BookOpen size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Future-Proof AI Skills</h3>
              <p className="text-gray-300 text-sm">Our AI training in Singapore equips you with the essential skills needed to thrive in an AI-driven economy.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 hover:bg-white/5 rounded-xl transition-colors">
            <div className="bg-secondary/20 p-3 rounded-lg text-secondary">
              <Award size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Increase Efficiency</h3>
              <p className="text-gray-300 text-sm">Through our agentic AI course, leverage autonomous agents to eliminate manual tasks and accelerate outcomes.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 hover:bg-white/5 rounded-xl transition-colors">
            <div className="bg-secondary/20 p-3 rounded-lg text-secondary">
              <Users size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Business Scalability</h3>
              <p className="text-gray-300 text-sm">With no-code AI automation training, build adaptive, automated systems to support rapid business growth.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;