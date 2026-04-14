import React, { useState } from 'react';
import { X, MessageCircle, Sparkles } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/6589002130?text=Hi%20Wendy%2C%20I%20need%20help%20with%20a%20Nexius%20Academy%20course.';

const AIAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[9999] bg-accent hover:bg-teal-400 text-white rounded-full p-4 shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center ${isOpen ? 'hidden' : 'block'}`}
      >
        <Sparkles size={28} className="animate-pulse" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">1</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={16} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Wendy</h3>
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Human support on WhatsApp
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 bg-white space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Need help with course details, subsidy questions, or the right next step? Message Wendy directly on WhatsApp for human support.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-3 rounded-full hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={16} /> Ask Wendy on WhatsApp
            </a>

            <p className="text-[11px] text-center text-gray-400">
              You’ll be taken to WhatsApp to continue with Wendy directly.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAdvisor;
