import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ShieldCheck, Quote, CheckCircle2, Award } from 'lucide-react';

const REAL_CLIENTS = [
  {
    name: 'Tawhidul Islam',
    bnName: 'তৌহিদুল ইসলাম',
    rank: 'Major General (Retd.)',
    bnRank: '(অবসরপ্রাপ্ত) মেজর জেনারেল',
    branch: 'Bangladesh Army',
    bnBranch: 'বাংলাদেশ সেনাবাহিনী',
    avatar: '/assets/dakhina-live/user-jpg.webp',
    quote: {
      en: 'Dakhina City exemplifies the highest standard of land documentation and professional ethics. Investing here provided complete confidence and legal transparency.',
      bn: 'দখিনা সিটি সর্বোচ্চ স্তরের ভূমিসংক্রান্ত আইনি স্বচ্ছতা ও পেশাদারিত্বের প্রমাণ দিয়েছে। এখানে বিনিয়োগে আমি শতভাগ নিশ্চিত ও সন্তুষ্ট।',
    },
    allotment: 'Sector 2 Executive Villa Enclave',
  },
  {
    name: 'Abdul Alim Tarapder',
    bnName: 'আব্দুল আলিম তরফদার',
    rank: 'Brigadier General (Retd.)',
    bnRank: '(অবসরপ্রাপ্ত) ব্রিগেডিয়ার জেনারেল',
    branch: 'Bangladesh Army',
    bnBranch: 'বাংলাদেশ সেনাবাহিনী',
    avatar: '/assets/dakhina-live/user-jpg.webp',
    quote: {
      en: 'The proximity to Uttara Sector 18 and the planned Cantonment corridors makes Dakhina Group the pre-eminent choice for senior defense officers seeking serene residential living.',
      bn: 'উত্তরা ১৮ নম্বর সেক্টর ও সেনানিবাস সংযোগ সড়কের নৈকট্য অবসরপ্রাপ্ত সিনিয়র সামরিক কর্মকর্তাদের শান্তিপূর্ণ বসবাসের জন্য দখিনাকে সেরা পছন্দের রূপ দিয়েছে।',
    },
    allotment: 'Lakefront Highland Estate Block A',
  },
  {
    name: 'Dr. Chowdhury Abdul Gaffar',
    bnName: 'ড. চৌধুরী আব্দুল গাফফার',
    rank: 'Brigadier General (Retd.)',
    bnRank: '(অবসরপ্রাপ্ত) ব্রিগেডিয়ার জেনারেল',
    branch: 'Bangladesh Army',
    bnBranch: 'বাংলাদেশ সেনাবাহিনী',
    avatar: '/assets/dakhina-live/user-jpg.webp',
    quote: {
      en: 'Their transparent approach, direct handover records, and focus on genuine physical possession place Dakhina Group in a class of their own.',
      bn: 'সরাসরি সীমানা চিহ্নিত করে দ্রুত খতিয়ান হস্তান্তর ও প্রকৃত দখল নিশ্চিতকরণের ক্ষেত্রে দখিনা গ্রুপ দেশের রিয়েল এস্টেট খাতে একটি অনন্য দৃষ্টান্ত।',
    },
    allotment: 'Highland Avenue 10 Katha Plot',
  },
  {
    name: 'Dr. Md Ashfaque Uzzaman',
    bnName: 'ড. মোঃ আশফাক উজ্জামান',
    rank: 'Brigadier General (Retd.)',
    bnRank: '(অবসরপ্রাপ্ত) ব্রিগেডিয়ার জেনারেল',
    branch: 'Bangladesh Army',
    bnBranch: 'বাংলাদেশ সেনাবাহিনী',
    avatar: '/assets/dakhina-live/user-jpg.webp',
    quote: {
      en: 'A trustworthy real estate firm upholding uncompromising integrity. The natural red-clay highland topography of Dakhina City is truly exceptional.',
      bn: 'অটুট সততা ও আস্থার প্রতীক। দখিনা সিটির প্রাকৃতিক লাল মাটির উঁচু ভূমি ও সুপরিকল্পিত মাস্টারপ্ল্যান সত্যিই তুলনাহীন।',
    },
    allotment: 'Sector 1 Prime Boulevard Plot',
  },
];

const AGENCIES = [
  {
    name: 'Bangladesh Water Development Board',
    bnName: 'পানি উন্নয়ন বোর্ড',
    short: 'BWDB',
    logo: '/assets/dakhina-live/wdb-150x150.png',
    role: 'Hydrology and flood prevention clearance',
  },
  {
    name: 'Dhaka WASA',
    bnName: 'ঢাকা ওয়াসা',
    short: 'DWASA',
    logo: '/assets/dakhina-live/wasa-150x150.png',
    role: 'Potable water supply & drainage system',
  },
  {
    name: 'Bangladesh Police',
    bnName: 'বাংলাদেশ পুলিশ',
    short: 'POLICE',
    logo: '/assets/dakhina-live/police-150x150.jpg',
    role: 'Public security and community safety',
  },
  {
    name: 'RAJUK',
    bnName: 'রাজউক',
    short: 'RAJUK',
    logo: '/assets/dakhina-live/rajuk-150x150.jpg',
    role: 'Detailed Area Plan (DAP) homestead zone',
  },
  {
    name: 'Titas Gas T&D',
    bnName: 'তিতাস গ্যাস',
    short: 'TITAS',
    logo: '/assets/dakhina-live/titas-150x150.jpeg',
    role: 'Utility corridor and supply clearance',
  },
  {
    name: 'Fire Service & Civil Defence',
    bnName: 'ফায়ার সার্ভিস',
    short: 'FSCD',
    logo: '/assets/dakhina-live/fire-150x150.png',
    role: 'Fire safety egress & 80ft arterial roads',
  },
  {
    name: 'Department of Environment',
    bnName: 'পরিবেশ অধিদপ্তর',
    short: 'DoE',
    logo: '/assets/dakhina-live/doe-150x150.png',
    role: 'Eco-equilibrium & lake preservation',
  },
  {
    name: 'Dhaka Transport Coordination Authority',
    bnName: 'ডিটিসিএ',
    short: 'DTCA',
    logo: '/assets/dakhina-live/dtca-150x150.jpeg',
    role: 'Expressway & Metro Line 6 connectivity',
  },
];

export const OurClients: React.FC = () => {
  const { isBn } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in font-sans">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#128341]/10 text-[#128341] text-xs font-bold uppercase tracking-widest border border-[#128341]/30">
          <ShieldCheck className="h-4 w-4 text-[#128341]" />
          <span>{isBn ? 'আস্থা ও নির্ভরতার প্রতীক' : 'The Anchor of Institutional Trust'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif text-[#0c3620]">
          {isBn ? 'আমাদের সম্মানিত ক্লায়েন্ট ও রাষ্ট্রীয় অনুমোদন' : 'Our Respected Clients & Approvals'}
        </h1>
        <p className="text-xs sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto font-sans">
          {isBn
            ? 'বাংলাদেশ বিমান বাহিনী ওয়েলফেয়ার ট্রাস্ট, সশস্ত্র বাহিনীর ঊর্ধ্বতন কর্মকর্তা এবং দেশের শীর্ষ সংবিধিবদ্ধ সরকারি সংস্থাগুলোর সমন্বয়ে দখিনা সিটি একটি নিরাপদ ও আধুনিক উপশহর।'
            : 'Forging enduring institutional bonds with the Bangladesh Air Force Welfare Trust, high-ranking military commanders, and all statutory regulatory bodies.'}
        </p>
      </div>

      {/* Official Defense Partnership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Air Force Welfare Trust */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#f4faf4] to-white border-2 border-[#128341]/30 shadow-lg flex flex-col sm:flex-row items-center gap-6">
          <div className="h-28 w-28 rounded-full bg-white p-3 shadow-xl border-2 border-[#128341] flex items-center justify-center shrink-0">
            <img
              src="/assets/dakhina-live/welfaretrust-r33lvjwn5b3k7hab9swrc3e0d0q171674wldcv3kk0.png"
              alt="Bangladesh Air Force Welfare Trust"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-bold text-[#128341] tracking-widest uppercase block">
              Official Coordination
            </span>
            <h3 className="text-xl font-serif font-black text-[#0c3620]">
              {isBn ? 'বাংলাদেশ বিমান বাহিনী ওয়েলফেয়ার ট্রাস্ট' : 'Bangladesh Air Force Welfare Trust'}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {isBn
                ? 'বিমান বাহিনী ওয়েলফেয়ার ট্রাস্টের সম্মানিত সদস্যদের আবাসন প্রকল্প সমন্বয়ে দখিনা গ্রুপ বিশ্বস্ততার সাথে কাজ করছে।'
                : 'Partnering in masterplanned welfare housing solutions tailored for senior officers and servicemen of the Bangladesh Air Force.'}
            </p>
          </div>
        </div>

        {/* Bangladesh Air Force Crest */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#f4faf4] to-white border-2 border-[#128341]/30 shadow-lg flex flex-col sm:flex-row items-center gap-6">
          <div className="h-28 w-28 rounded-full bg-white p-3 shadow-xl border-2 border-[#128341] flex items-center justify-center shrink-0">
            <img
              src="/assets/dakhina-live/baf-r33lskr1i70vfxlynilafufgn3e6tjcsq680nbig9c.png"
              alt="Bangladesh Air Force Crest"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-bold text-[#128341] tracking-widest uppercase block">
              Armed Forces Community
            </span>
            <h3 className="text-xl font-serif font-black text-[#0c3620]">
              {isBn ? 'বাংলাদেশ বিমান বাহিনী' : 'Bangladesh Air Force'}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {isBn
                ? 'আইনি স্বচ্ছতা, নিষ্কণ্টক জমি ও ১০০ ফুট মহাসড়ক সংযোগের কারণে প্রতিরক্ষা বাহিনীর শীর্ষ কর্মকর্তাদের প্রথম পছন্দ।'
                : 'Recognized for absolute title security, dispute-free inheritance, and prime strategic connectivity to Cantonment corridors.'}
            </p>
          </div>
        </div>
      </div>

      {/* Military Leadership Testimonials */}
      <div className="space-y-6">
        <div className="border-b border-neutral-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0c3620]">
              {isBn ? 'সম্মানিত সামরিক কর্মকর্তাদের মতামত' : 'Distinguished Military Client Endorsements'}
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              {isBn
                ? 'নিরাপত্তা, আইনি বিশুদ্ধতা ও শান্তিপূর্ণ জীবনযাপনের জন্য সশস্ত্র বাহিনীর নির্ভরতা'
                : 'Endorsed for title purity, immediate mutation, and tranquil residential community standards'}
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-[#128341] font-bold">
            <Award className="h-4 w-4" />
            <span>Over 65% plots trusted by defense personnel</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REAL_CLIENTS.map((client, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-[#128341]/20 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Quote className="h-8 w-8 text-[#128341]/40" />
                <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed font-sans">
                  “{isBn ? client.quote.bn : client.quote.en}”
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-neutral-100 border border-[#128341] shrink-0">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#0c3620]">
                      {isBn ? client.bnName : client.name}
                    </h4>
                    <p className="text-xs text-[#128341] font-semibold">
                      {isBn ? client.bnRank : client.rank}
                    </p>
                    <span className="text-[11px] text-neutral-500 block">
                      {isBn ? client.bnBranch : client.branch} · {client.allotment}
                    </span>
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#128341] font-bold text-xs border border-emerald-200">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Approvals Grid with Authentic Logos */}
      <div className="rounded-3xl bg-white p-8 sm:p-12 border border-neutral-200 shadow-xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#f37d20]">
            {isBn ? 'সংবিধিবদ্ধ অনুমোদন' : 'Statutory & Inter-Agency Coordination'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0c3620]">
            {isBn ? 'অনুমোদনকারী সংস্থাসমূহ' : 'Approved by Following Statutory Agencies'}
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            {isBn
              ? 'রাজউক, ওয়াসা, পানি উন্নয়ন বোর্ড, তিতাস গ্যাস এবং পরিবেশ অধিদপ্তরসহ সকল সরকারি নীতিমালার শতভাগ বাস্তবায়ন।'
              : 'Full alignment with RAJUK DAP, utility grids, hydrology safety, and municipal standards.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {AGENCIES.map((agency, i) => (
            <div
              key={i}
              className="rounded-2xl bg-neutral-50 p-4 border border-neutral-200 hover:border-[#128341] hover:bg-emerald-50/40 transition-colors flex flex-col items-center text-center space-y-2 group"
            >
              <div className="h-16 w-16 rounded-full bg-white border border-neutral-200 p-2 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src={agency.logo}
                  alt={agency.name}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/dakhina-live/rajuk-150x150.jpg';
                  }}
                />
              </div>
              <h4 className="font-bold text-[11px] text-neutral-800 leading-tight">
                {isBn ? agency.bnName : agency.short}
              </h4>
              <p className="text-[9px] text-neutral-500 leading-snug line-clamp-2">
                {agency.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OurClients;
