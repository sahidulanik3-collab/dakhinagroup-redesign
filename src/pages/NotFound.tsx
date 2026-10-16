import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { Home, Compass, PhoneCall } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { isBn } = useLanguage();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-6 shadow-sm border border-primary/20">
          <span className="text-3xl font-black font-mono">404</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4 font-display">
          {isBn ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Page Not Found'}
        </h1>

        <p className="text-base text-neutral-600 mb-8 font-body leading-relaxed">
          {isBn
            ? 'দুঃখিত, আপনি যে লিংকটি অনুসরণ করেছেন তা হয়তো সরানো হয়েছে বা মুছে ফেলা হয়েছে। অনুগ্রহ করে মূল পাতায় ফিরে যান অথবা প্রকল্প তালিকা দেখুন।'
            : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>{isBn ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}</span>
          </Link>

          <Link
            to="/properties"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-neutral-50 active:scale-95 transition-all shadow-sm min-h-[44px]"
          >
            <Compass className="w-4 h-4" />
            <span>{isBn ? 'ভিলা ও প্লটসমূহ' : 'Browse Properties'}</span>
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-100 text-neutral-700 font-semibold text-sm hover:bg-neutral-200 active:scale-95 transition-all min-h-[44px]"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{isBn ? 'যোগাযোগ' : 'Contact Support'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
