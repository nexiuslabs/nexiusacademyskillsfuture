import React, { useState } from 'react';
import { FAQS } from '../../constants';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">Course FAQs</h2>
            <p className="text-gray-500">Have questions? Check our most asked questions below.</p>
        </div>

        <div className="space-y-4">
            {FAQS.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
                    <button 
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className={`w-full flex items-center justify-between p-5 text-left font-bold text-lg transition-colors ${openIndex === index ? 'bg-neutral text-primary' : 'bg-white text-gray-700 hover:text-primary'}`}
                    >
                        {faq.question}
                        {openIndex === index ? <ChevronUp className="text-accent" /> : <ChevronDown className="text-gray-400" />}
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-5 text-gray-600 border-t border-gray-100 bg-white leading-relaxed">
                            {faq.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
            <h4 className="text-xl font-bold text-primary mb-2">Still have questions?</h4>
            <p className="text-gray-600 mb-6">Our course consultants are here to help you.</p>
            <button className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-bold transition-all">
                <MessageCircle size={20} />
                Contact Us
            </button>
        </div>

      </div>
    </section>
  );
};

export default FAQ;