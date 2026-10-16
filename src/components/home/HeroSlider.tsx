import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { ChevronLeft, ChevronRight, ShieldCheck, Search } from 'lucide-react';

export interface HeroSlide {
  image: string;
  badge: { en: string; bn: string };
  title: { en: string; bn: string };
  subtitle: { en: string; bn: string };
}

const SLIDES: HeroSlide[] = [
  {
    image: '/assets/dakhina-live/beutyfication.jpg',
    badge: {
      en: 'ARCHITECT OF TRUST · ESTABLISHED 2004',
      bn: 'আস্থার স্থপতি · ২০০৪ থেকে বিশ্বস্ত',
    },
    title: {
      en: 'Dakhina City: 1,200 Bigha Masterplanned Highland Sanctuary',
      bn: 'দখিনা সিটি: ঢাকা সেনানিবাস ও উত্তরা সংলগ্ন ১২০০ বিঘার পরিকল্পিত উপশহর',
    },
    subtitle: {
      en: 'Honored by the Bangladesh Air Force Welfare Trust & Senior Defense Officers. 100% legal transparency and immediate mutation.',
      bn: 'বাংলাদেশ বিমান বাহিনী ওয়েলফেয়ার ট্রাস্ট ও সিনিয়র সামরিক কর্মকর্তাদের নির্ভরতায় নির্মিত সম্পূর্ণ নির্ভেজাল ও তাৎক্ষণিক রেজিস্ট্রেশনযোগ্য আবাসন।',
    },
  },
  {
    image: '/assets/dakhina-live/DSCF8649.jpg',
    badge: {
      en: '10 MINUTES TO METRO RAIL LINE 6',
      bn: 'উত্তরা ১৮ নম্বর সেক্টর ও মেট্রোরেল সংলগ্ন',
    },
    title: {
      en: 'Direct Proximity to Uttara Sector 18 & Metro Rail Terminal',
      bn: 'দিয়াবাড়ী মেট্রোরেল স্টেশন ও উত্তরা ১৮ নং সেক্টর থেকে মাত্র ১০ মিনিটে নিজস্ব ড্রাইভওয়ে',
    },
    subtitle: {
      en: 'Three arterial 100ft expressways connecting Dhaka Cantonment, Mirpur DOHS, and Savar Highland.',
      bn: 'ঢাকা সেনানিবাস, মিরপুর ডিওএইচএস ও সাভার সংযোগে ১০০ ফুট প্রশস্ত মূল সংযোগ সড়ক ও আধুনিক ড্রেনেজ ব্যবস্থা।',
    },
  },
  {
    image: '/assets/dakhina-live/DSCF8646.jpg',
    badge: {
      en: 'REHAB MEMBER #495 · RAJUK DAP APPROVED',
      bn: 'রিহ্যাব সদস্য নং ৪৯৫ · রাজউক ড্যাপ অনুমোদিত',
    },
    title: {
      en: 'Solid Natural Red-Clay Highland Topography (Zero Flood Risk)',
      bn: 'ঐতিহাসিক সর্বকালের বন্যা মুক্ত প্রাকৃতিক লাল মাটির উঁচু ভূমি',
    },
    subtitle: {
      en: 'Save up to 40% in foundation piling costs with naturally consolidated soil and registered freehold deeds.',
      bn: 'নিরাপদ ভিত্তি নির্মাণে সাশ্রয়ী পাইলিং এবং শতভাগ নিষ্কণ্টক দাগ-খতিয়ানসহ হস্তান্তরকৃত প্লট।',
    },
  },
];

export const HeroSlider: React.FC = () => {
  const { isBn } = useLanguage();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="relative w-full overflow-hidden bg-neutral-950 text-white">
      {/* Slider viewport */}
      <div className="relative h-[540px] sm:h-[620px] lg:h-[700px] w-full">
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Zoom */}
            <img
              src={slide.image}
              alt={slide.title.en}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/dakhina-live/beutyfication.jpg';
              }}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-10000"
            />
            {/* Dark Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />

            {/* Slide Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-0">
                <div className="max-w-3xl space-y-4">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#128341]/90 text-white text-xs font-bold tracking-widest uppercase border border-white/20 backdrop-blur-md shadow-lg">
                    <ShieldCheck className="h-4 w-4 text-[#B8934A]" />
                    <span>{isBn ? slide.badge.bn : slide.badge.en}</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-white leading-[1.12] drop-shadow-md">
                    {isBn ? slide.title.bn : slide.title.en}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base lg:text-lg text-neutral-200 leading-relaxed max-w-2xl drop-shadow">
                    {isBn ? slide.subtitle.bn : slide.subtitle.en}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <Link
                      to="/properties"
                      className="px-6 py-3.5 rounded-xl bg-[#128341] hover:bg-[#0e6934] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-emerald-900/40 active:scale-95 border border-emerald-400/40"
                    >
                      {isBn ? 'ভিলা ও প্লটসমূহ দেখুন' : 'Explore 48 Properties'}
                    </Link>

                    <Link
                      to="/contact-us#schedule"
                      className="px-6 py-3.5 rounded-xl bg-white/95 hover:bg-white text-neutral-900 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"
                    >
                      {isBn ? 'সাইট ভিজিট বুক করুন' : 'Schedule VIP Site Visit'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Previous Button (Orange like live site) */}
        <button
          onClick={() => setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-[#f37d20] hover:bg-[#d96611] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>

        {/* Next Button (Orange like live site) */}
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-[#f37d20] hover:bg-[#d96611] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="h-7 w-7" />
        </button>

        {/* Dot pagination */}
        <div className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all ${
                current === i ? 'w-8 bg-[#f37d20]' : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Property Search Strip (Corporate Standard) */}
      <div className="relative z-20 -mt-16 sm:-mt-12 max-w-6xl mx-auto px-4 sm:px-6">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-neutral-200 text-neutral-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center"
        >
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
              {isBn ? 'প্রোপার্টির ধরন' : 'Property Category'}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#128341] bg-neutral-50 text-neutral-900"
            >
              <option value="">{isBn ? 'সকল ক্যাটাগরি (৪৮টি)' : 'All Categories (48)'}</option>
              <option value="Lakeview Villa">{isBn ? 'লেকভিউ ভিলা' : 'Lakeview Villa'}</option>
              <option value="Courtyard Villa">{isBn ? 'কোর্টইয়ার্ড ভিলা' : 'Courtyard Villa'}</option>
              <option value="Garden Villa">{isBn ? 'গার্ডেন ভিলা' : 'Garden Villa'}</option>
              <option value="Duplex Villa">{isBn ? 'ডুপ্লেক্স ভিলা' : 'Duplex Villa'}</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
              {isBn ? 'প্রকল্প জোন / মৌজা' : 'Project Mouza / Sector'}
            </label>
            <select
              className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#128341] bg-neutral-50 text-neutral-900"
            >
              <option value="">{isBn ? 'সকল সেক্টর (দখিনা সিটি)' : 'All Sectors (Dakhina City)'}</option>
              <option value="sec-1">Sector 1 (Lakeview Enclave)</option>
              <option value="sec-2">Sector 2 (Highland Boulevard)</option>
              <option value="sec-4">Sector 4 (Central Plaza)</option>
              <option value="sec-6">Sector 6 (Green Homestead)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
              {isBn ? 'বাজেট সীমা' : 'Investment Range'}
            </label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#128341] bg-neutral-50 text-neutral-900"
            >
              <option value="">{isBn ? 'সকল বাজেট' : 'Any Budget'}</option>
              <option value="under-2">Under ৳ 2.00 Crore</option>
              <option value="2-3">৳ 2.00 Cr - ৳ 3.00 Cr</option>
              <option value="above-3">Above ৳ 3.00 Crore</option>
            </select>
          </div>

          <div className="sm:col-span-2 lg:col-span-1 pt-1 sm:pt-0">
            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-[#128341] hover:bg-[#0e6934] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-4"
            >
              <Search className="h-4 w-4" />
              <span>{isBn ? 'ইনভেন্টরি খুঁজুন' : 'Search Villas'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
