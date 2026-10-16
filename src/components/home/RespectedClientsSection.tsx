import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { ShieldCheck, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface MilitaryClient {
  name: string;
  rank: string;
  branch: string;
  quote: {
    en: string;
    bn: string;
  };
  highlight: string;
}

const MILITARY_CLIENTS: MilitaryClient[] = [
  {
    name: 'Tawhidul Islam',
    rank: 'Major General (Retd.)',
    branch: 'Bangladesh Army',
    quote: {
      en: 'Dakhina City exemplifies the highest standard of land documentation and professional ethics. Investing here provided complete confidence and legal transparency.',
      bn: 'দখিনা সিটি সর্বোচ্চ স্তরের ভূমিসংক্রান্ত আইনি স্বচ্ছতা ও পেশাদারিত্বের প্রমাণ দিয়েছে। এখানে বিনিয়োগে আমি শতভাগ নিশ্চিত ও সন্তুষ্ট।',
    },
    highlight: 'Sector 2 Executive Villa Plot',
  },
  {
    name: 'Abdul Alim Tarapder',
    rank: 'Brigadier General (Retd.)',
    branch: 'Bangladesh Army',
    quote: {
      en: 'The strategic proximity to Uttara Sector 18 and planned Cantonment link roads makes Dakhina Group the pre-eminent choice for senior defense officers seeking serene living.',
      bn: 'উত্তরা ১৮ নম্বর সেক্টর ও সেনানিবাস সংযোগ সড়কের নৈকট্য অবসরপ্রাপ্ত সিনিয়র সামরিক কর্মকর্তাদের শান্তিপূর্ণ বসবাসের জন্য দখিনাকে সেরা পছন্দের রূপ দিয়েছে।',
    },
    highlight: 'Lakeview Highland Estate',
  },
  {
    name: 'Dr. Chowdhury Abdul Gaffar',
    rank: 'Brigadier General (Retd.)',
    branch: 'Bangladesh Army',
    quote: {
      en: 'Their transparent approach, direct handover records, and focus on genuine physical possession place Dakhina Group in an elite class of real estate developers.',
      bn: 'সরাসরি সীমানা চিহ্নিত করে দ্রুত খতিয়ান হস্তান্তর ও প্রকৃত দখল নিশ্চিতকরণের ক্ষেত্রে দখিনা গ্রুপ দেশের রিয়েল এস্টেট খাতে একটি অনন্য দৃষ্টান্ত।',
    },
    highlight: 'Waterfront Boulevard Block C',
  },
  {
    name: 'Dr. Md Ashfaque Uzzaman',
    rank: 'Brigadier General (Retd.)',
    branch: 'Bangladesh Army',
    quote: {
      en: 'A trustworthy real estate conglomerate upholding uncompromising integrity. The natural red-clay highland topography of Dakhina City is truly exceptional.',
      bn: 'অটুট সততা ও আস্থার প্রতীক। দখিনা সিটির প্রাকৃতিক লাল মাটির উঁচু ভূমি ও সুপরিকল্পিত মাস্টারপ্ল্যান সত্যিই তুলনাহীন।',
    },
    highlight: 'Sector 1 Prime Plot',
  },
];

export const RespectedClientsSection: React.FC = () => {
  const { isBn } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const prevClient = () => {
    setActiveIndex((prev) => (prev === 0 ? MILITARY_CLIENTS.length - 1 : prev - 1));
  };

  const nextClient = () => {
    setActiveIndex((prev) => (prev + 1) % MILITARY_CLIENTS.length);
  };

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#eaf5eb]/60 via-[#f4faf4] to-white border-y border-[#128341]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#128341]/10 border border-[#128341]/30 text-[#128341] text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="h-4 w-4 text-[#128341]" />
            <span>{isBn ? 'প্রতিরক্ষা ও রাষ্ট্রীয় আস্থা' : 'National & Armed Forces Trust'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0c3620] tracking-tight">
            {isBn ? 'আমাদের সম্মানিত গ্রাহকবৃন্দ' : 'Our Respected Clients'}
          </h2>

          <p className="text-xs sm:text-sm text-[#466352] max-w-2xl mx-auto font-sans leading-relaxed">
            {isBn
              ? 'বাংলাদেশ বিমান বাহিনী ওয়েলফেয়ার ট্রাস্ট এবং সশস্ত্র বাহিনীর সিনিয়র জেনারেল অফিসারবৃন্দের শতভাগ আস্থায় দখিনা সিটি ঢাকার সবচেয়ে নিরাপদ ও নিষ্কণ্টক আবাসন।'
              : 'Endorsed and trusted by Bangladesh Air Force Welfare Trust, high-ranking defense commanders, and distinguished civil dignitaries for unassailable legal integrity.'}
          </p>
        </div>

        {/* Official Defense Emblems Banner (Air Force Welfare Trust + Air Force Crest) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 py-6 px-8 rounded-3xl bg-white/90 shadow-md border border-[#128341]/20 max-w-4xl mx-auto backdrop-blur-sm">
          {/* Bangladesh Air Force Welfare Trust */}
          <div className="flex items-center gap-4 group">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white p-2 shadow-lg border-2 border-[#128341]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src="/assets/dakhina-live/welfaretrust-r33lvjwn5b3k7hab9swrc3e0d0q171674wldcv3kk0.png"
                alt="Bangladesh Air Force Welfare Trust"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/dakhina-live/baf-r33lskr1i70vfxlynilafufgn3e6tjcsq680nbig9c.png';
                }}
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#128341] tracking-wider uppercase block">
                Official Liaison Partner
              </span>
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#0c3620] leading-tight">
                {isBn ? 'বাংলাদেশ বিমান বাহিনী ওয়েলফেয়ার ট্রাস্ট' : 'Bangladesh Air Force Welfare Trust'}
              </h4>
              <span className="text-[11px] text-[#557563]">
                {isBn ? 'যৌথ আবাসন সমন্বয় ও উন্নয়ন' : 'Joint Residential Welfare Coordination'}
              </span>
            </div>
          </div>

          <div className="hidden sm:block h-16 w-px bg-[#128341]/20" />

          {/* Bangladesh Air Force Crest */}
          <div className="flex items-center gap-4 group">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white p-2 shadow-lg border-2 border-[#128341]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src="/assets/dakhina-live/baf-r33lskr1i70vfxlynilafufgn3e6tjcsq680nbig9c.png"
                alt="Bangladesh Air Force Official Crest"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/dakhina-live/welfaretrust-r33lvjwn5b3k7hab9swrc3e0d0q171674wldcv3kk0.png';
                }}
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#128341] tracking-wider uppercase block">
                Armed Forces Defense Sector
              </span>
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#0c3620] leading-tight">
                {isBn ? 'বাংলাদেশ বিমান বাহিনী' : 'Bangladesh Air Force'}
              </h4>
              <span className="text-[11px] text-[#557563]">
                {isBn ? 'সম্মানিত সদস্য ও অফিসারবৃন্দের বাসস্থান' : 'Institutional Allotment Trust'}
              </span>
            </div>
          </div>
        </div>

        {/* Distinguished Military Client Cards Strip */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MILITARY_CLIENTS.map((client, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border ${
                  activeIndex === idx
                    ? 'bg-white border-[#128341] shadow-xl scale-[1.02] ring-2 ring-[#128341]/20'
                    : 'bg-white/80 border-[#128341]/20 hover:border-[#128341]/50 hover:bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-[#eaf5eb] border-2 border-[#128341] flex items-center justify-center shrink-0 shadow-sm">
                    <img
                      src="/assets/dakhina-live/user-jpg.webp"
                      alt={client.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/dakhina-live/baf-r33lskr1i70vfxlynilafufgn3e6tjcsq680nbig9c.png';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-[#0c3620] leading-tight">
                      {client.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#128341] mt-0.5">
                      {client.rank}
                    </p>
                    <span className="text-[10px] text-[#557563] block font-mono">
                      {client.branch}
                    </span >
                  </div>
                </div>

                <p className="text-xs text-[#3b5344] italic leading-relaxed line-clamp-3">
                  "{isBn ? client.quote.bn : client.quote.en}"
                </p>

                <div className="mt-4 pt-3 border-t border-[#128341]/10 flex items-center justify-between text-[11px]">
                  <span className="text-[#128341] font-semibold flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    Verified Plot Owner
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Navigation matching live site */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={prevClient}
              className="p-1.5 rounded-full bg-white border border-[#128341]/30 text-[#128341] hover:bg-[#128341] hover:text-white transition-colors"
              aria-label="Previous client"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {MILITARY_CLIENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === i ? 'w-8 bg-[#128341]' : 'w-2 bg-[#128341]/30 hover:bg-[#128341]/60'
                }`}
                aria-label={`Go to client slide ${i + 1}`}
              />
            ))}
            <button
              onClick={nextClient}
              className="p-1.5 rounded-full bg-white border border-[#128341]/30 text-[#128341] hover:bg-[#128341] hover:text-white transition-colors"
              aria-label="Next client"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
