import React from 'react';
import { Layout, Briefcase, DollarSign, Monitor, User, FileText, Megaphone, Camera } from 'lucide-react';

const categories = [
  { icon: <Layout />, name: 'AI Fluency', courses: 'Understand, evaluate, and use AI tools effectively.', color: 'bg-indigo-100 text-indigo-600' },
  { icon: <Briefcase />, name: 'AI Tool Proficiency', courses: 'Quickly adopt and integrate best AI platforms.', color: 'bg-green-100 text-green-600' },
  { icon: <DollarSign />, name: 'Prompt Engineering', courses: 'Communicate precisely; get reliable AI results.', color: 'bg-orange-100 text-orange-600' },
  { icon: <Monitor />, name: 'Agentic Workflow Design', courses: 'Build autonomous systems that manage your processes.', color: 'bg-red-100 text-red-600' },
  { icon: <User />, name: 'Business Process Automation (BPA)', courses: 'Automate core tasks: finance, sales, and HR.', color: 'bg-teal-100 text-teal-600' },
  { icon: <FileText />, name: 'AI Project Management', courses: 'Plan, deploy, and scale AI initiatives successfully.', color: 'bg-gray-100 text-gray-600' },
  { icon: <Megaphone />, name: 'Agentic AI Principles', courses: 'Grasp how autonomous agents think and act.', color: 'bg-blue-100 text-blue-600' },
  { icon: <Camera />, name: 'Ethical Use of AI', courses: 'Manage risks; deploy AI systems confidently.', color: 'bg-pink-100 text-pink-600' },
];

const Categories: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-neutral scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Skills You Will Learn</h2>
          <p className="text-gray-500 mt-2">Upgrade Yourself with these Future-ready Skills</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 cursor-pointer group">
              <div className={`p-4 rounded-lg ${cat.color} group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <div>
                <h4 className="font-bold text-primary">{cat.name}</h4>
                <p className="text-xs text-gray-500">{cat.courses}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;