import React from 'react';
import { BookOpen, Award, Users } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="overview" className="bg-primary py-10 scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          
          <div className="flex items-start gap-4 py-4">
            <div className="bg-secondary/20 p-3 rounded-lg text-secondary">
              <BookOpen size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Learn AI Skills</h2>
              <p className="text-blue-100 text-sm">Our AI training in Singapore equips you with the essential skills needed to thrive in an AI-driven economy.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 py-4">
            <div className="bg-secondary/20 p-3 rounded-lg text-secondary">
              <Award size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Increase Efficiency</h2>
              <p className="text-blue-100 text-sm">Use AI agents to support repetitive tasks and improve everyday workflows.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 py-4">
            <div className="bg-secondary/20 p-3 rounded-lg text-secondary">
              <Users size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Business Scalability</h2>
              <p className="text-blue-100 text-sm">With no-code AI automation training, build adaptive, automated systems to support rapid business growth.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;