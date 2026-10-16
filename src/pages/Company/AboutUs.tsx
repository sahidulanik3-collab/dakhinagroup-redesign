import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { ShieldCheck, Target, Eye, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutUs: React.FC = () => {
  const { isBn, content } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
          {isBn ? 'কোম্পানি পরিচিতি' : 'Corporate Profile'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-gray-900">
          {content.about.title}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
          {content.about.subtitle}
        </p>
      </div>

      {/* Main Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-4 text-sm text-gray-700 leading-relaxed">
          <p className="font-semibold text-base text-gray-900">
            {content.about.intro}
          </p>
          <p>
            {isBn
              ? '২০০৪ সালে প্রতিষ্ঠিত হয়ে দখিনা গ্রুপ দেশের রিয়েল এস্টেট খাতে একটি অনন্য ও আস্থার নাম হিসেবে প্রতিষ্ঠিত হয়েছে। আমাদের মূল লক্ষ্য সাশ্রয়ী মূল্যে সহজ কিস্তিতে গ্রাহকের হাতে সম্পূর্ণ নির্ভেজাল জমির মালিকানা পৌঁছে দেওয়া।'
              : 'Dakhina Real Estate (Pvt.) Limited was incorporated as a private limited joint-stock company in 2004. With a multi-disciplinary portfolio spanning real estate, infrastructure, and technology, our flagship venture remains master-planned highland living.'}
          </p>
          <p>
            {isBn
              ? 'আমাদের গ্রাহক তালিকায় বাংলাদেশ সশস্ত্র বাহিনীর অবসরপ্রাপ্ত মেজর জেনারেল, ব্রিগেডিয়ার জেনারেল এবং সরকারি উচ্চপদস্থ কর্মকর্তাবৃন্দ রয়েছেন। ২০০ জনেরও বেশি অনাবাসী বাংলাদেশি (NRB) যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা ও অস্ট্রেলিয়া থেকে আমাদের প্রকল্পে বিনিয়োগ করেছেন।'
              : 'Our esteemed clientele comprises retired Major Generals, Brigadier Generals, senior civil servants, and over 200 non-resident Bangladeshi families across North America, the UK, and Australia who rely on our transparent land mutations.'}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              to="/rehab-membership"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold"
            >
              <Award className="h-4 w-4 text-amber-600" />
              <span>REHAB Member #{content.company.rehabMembership}</span>
            </Link>
            <Link
              to="/message-from-md"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{isBn ? 'ব্যবস্থাপনা পরিচালকের বার্তা' : 'Read MD Message'}</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-neutral-900">
            <img
              src="/assets/drel-banner.jpg"
              alt="Dakhina Group Headquarters and Estates"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/properties/villa-1-ext.jpg';
              }}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200/60 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-emerald-950 font-serif">
            {isBn ? 'আমাদের লক্ষ্য (Mission)' : 'Our Corporate Mission'}
          </h3>
          <p className="text-sm text-emerald-900/80 leading-relaxed">
            {content.about.mission}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-amber-50/70 border border-amber-200/60 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-md">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-amber-950 font-serif">
            {isBn ? 'আমাদের দর্শন (Vision)' : 'Our Vision'}
          </h3>
          <p className="text-sm text-amber-900/80 leading-relaxed">
            {content.about.vision}
          </p>
        </div>
      </div>

      {/* Assurance Card */}
      <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 border border-neutral-800 text-center max-w-4xl mx-auto space-y-4">
        <h3 className="text-2xl font-bold font-serif text-amber-400">
          {isBn ? 'আমাদের অঙ্গীকার (Our Assurance)' : 'Our Unconditional Assurance'}
        </h3>
        <p className="text-sm text-neutral-300 leading-relaxed">
          {content.about.assurance}
        </p>
        <div className="pt-2">
          <Link
            to="/contact-us#schedule"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <span>{isBn ? 'সরাসরি সাইট পরিদর্শন করুন' : 'Schedule On-Site Inspection'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
