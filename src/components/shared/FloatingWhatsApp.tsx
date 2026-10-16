import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { isBn, content } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const phoneClean = content.company.phone.replace(/[^0-9]/g, '');

  const openWhatsApp = (customMsg?: string) => {
    const text = encodeURIComponent(
      customMsg ||
        (isBn
          ? 'আসসালামু আলাইকুম, আমি দখিনা গ্রুপ ও দখিনা সিটির প্লট সম্পর্কে জানতে চাই।'
          : 'Hello Dakhina Group, I would like to inquire about residential villas and plots in Dakhina City.')
    );
    window.open(`https://wa.me/${phoneClean}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Floating Widget Container (Right Bottom) */}
      <div className="fixed bottom-6 right-5 z-[90] flex flex-col items-end gap-2.5">
        {/* Quick Chat Popup Card */}
        {isOpen && (
          <div className="w-80 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden text-gray-900 animate-fade-in mb-1">
            {/* Header */}
            <div className="bg-[#128341] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#128341]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-tight">Dakhina Group VIP Desk</h4>
                  <p className="text-[11px] text-emerald-100">
                    {isBn ? 'সাধারণত ১ মিনিটে উত্তর দেয়' : 'Replies typically in 1 min'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-white/80 hover:bg-white/20 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Greeting */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 text-xs text-gray-600 space-y-2">
              <p>
                {isBn
                  ? 'স্বাগতম! দখিনা সিটির প্লট সাইজ, বুকিং পলিসি বা সাইট ভিজিট সম্পর্কে জানতে এখনই মেসেজ দিন।'
                  : 'Welcome! How may we assist you today regarding Dakhina City plots, booking schedules, or VIP tours?'}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() =>
                    openWhatsApp(
                      isBn
                        ? 'আমি দখিনা সিটির প্রজেক্ট ভিজিট করতে চাই'
                        : 'I would like to schedule a site visit'
                    )
                  }
                  className="px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-medium text-gray-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {isBn ? 'সাইট ভিজিট' : 'Site Visit Tour'}
                </button>
                <button
                  onClick={() =>
                    openWhatsApp(
                      isBn
                        ? 'দয়া করে প্লট প্রাইস লিস্ট পাঠান'
                        : 'Please share the price list and payment terms'
                    )
                  }
                  className="px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-medium text-gray-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {isBn ? 'প্রাইস লিস্ট' : 'Price Catalog'}
                </button>
              </div>
            </div>

            {/* Direct Input */}
            <div className="p-3 bg-white flex items-center gap-2">
              <input
                type="text"
                value={quickMsg}
                onChange={(e) => setQuickMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    openWhatsApp(quickMsg);
                    setQuickMsg('');
                    setIsOpen(false);
                  }
                }}
                placeholder={isBn ? 'আপনার বার্তা লিখুন...' : 'Type message here...'}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600"
              />
              <button
                onClick={() => {
                  openWhatsApp(quickMsg);
                  setQuickMsg('');
                  setIsOpen(false);
                }}
                className="p-2 rounded-lg bg-[#128341] text-white hover:bg-emerald-700 transition-colors"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ONLY WhatsApp Main Button (as requested by user) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#128341] hover:bg-[#0c6b34] text-white shadow-xl shadow-emerald-950/30 font-semibold text-xs tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/80"
          aria-label="Open WhatsApp Chat"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]" />
          </span>
          <MessageCircle className="h-5 w-5 fill-current text-white" />
          <span className="font-bold font-sans">
            {isBn ? 'হোয়াটসঅ্যাপে যোগাযোগ' : 'Need Help?'}
          </span>
        </button>
      </div>
    </>
  );
};

export default FloatingWhatsApp;
