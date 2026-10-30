import React from 'react';
import { FAQS } from '../../constants';
import { MessageCircle } from 'lucide-react';
import FaqAccordion from './FaqAccordion';

// Keep every published answer unchanged; grouping is presentation only.
const groups = [
  { title: 'Choosing your course', indices: [12, 5, 13, 14, 15], open: true },
  { title: 'Course fit', indices: [3, 4, 7, 9, 10, 11], open: false },
  { title: 'Fees and funding', indices: [0, 8], open: false },
  { title: 'Registration and support', indices: [1, 2, 6], open: false },
];

const FAQ: React.FC = () => (
  <section id="faq" className="py-20 bg-white scroll-mt-24">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-heading font-bold text-primary mb-10">Course FAQs</h2>
      <div className="space-y-10">
        {groups.map((group) => <section key={group.title} aria-label={group.title}>
          <h3 className="mb-4 text-xl font-bold text-primary">{group.title}</h3>
          <FaqAccordion items={group.indices.map((index) => FAQS[index])} open={group.open} />
        </section>)}
      </div>
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="text-xl font-bold text-primary mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-5">Our course consultants are here to help you.</p>
        <a href="mailto:hello@nexiuslabs.com?subject=Nexius%20Academy%20Course%20Enquiry" className="academy-button-secondary">
          <MessageCircle size={20} aria-hidden="true" /> Contact Us
        </a>
      </div>
    </div>
  </section>
);
export default FAQ;
