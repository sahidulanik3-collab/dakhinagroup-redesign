import React, { useState, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import propertiesData from '../../data/properties.json';
import { PropertyItem } from '../../data/schema';
import { formatBDT } from '../../lib/utils';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Play,
  X,
  Search,
  CheckCircle2,
  Sliders,
  DollarSign,
  Award,
  ArrowUpRight,
  Compass,
} from 'lucide-react';

const HISTORICAL_ROI_DATA = [
  { year: '2004', pricePerKatha: 2.5, event: 'Masterplan & Land Consolidation', returnRate: 'Baseline' },
  { year: '2010', pricePerKatha: 6.5, event: 'Demarcation & 60ft Boulevard Construction', returnRate: '+160%' },
  { year: '2016', pricePerKatha: 15.0, event: 'BAFWT Joint Venture Enclave Launched', returnRate: '+500%' },
  { year: '2020', pricePerKatha: 28.0, event: 'Metro Rail Line 6 Terminal Integration', returnRate: '+1,020%' },
  { year: '2026', pricePerKatha: 45.0, event: 'Cantonment Link Expressway Completion', returnRate: '+1,700%' },
];

const DEFENSE_HONOR_VIP = [
  {
    id: 'tawhid',
    name: 'Major General Tawhidul Islam (Retd.)',
    bnName: 'মেজর জেনারেল তৌহিদুল ইসলাম (অব.)',
    branch: 'Bangladesh Army',
    role: 'Former Master General of the Ordnance',
    parcel: 'SECTOR-02 / PARCEL #EXEC-104',
    facing: 'South-East Lakefront',
    quote: {
      en: 'Dakhina City exemplifies the highest standard of land documentation and professional ethics. Demarcated boundaries and rapid mutation provide complete peace of mind.',
      bn: 'দখিনা সিটি সর্বোচ্চ স্তরের ভূমিসংক্রান্ত আইনি স্বচ্ছতা ও পেশাদারিত্বের প্রমাণ দিয়েছে। নিখুঁত সীমানা প্রাচীর ও দ্রুত নামজারি শতভাগ আস্থার নিশ্চয়তা দেয়।',
    },
  },
  {
    id: 'tarapder',
    name: 'Brigadier General Abdul Alim Tarapder (Retd.)',
    bnName: 'ব্রিগেডিয়ার জেনারেল আব্দুল আলিম তরফদার (অব.)',
    branch: 'Bangladesh Army',
    role: 'Former Station Commander, Dhaka Cantonment',
    parcel: 'SECTOR-01 / PARCEL #DEF-208',
    facing: 'North-East 80ft Boulevard',
    quote: {
      en: 'The strategic proximity to Uttara Sector 18 and planned Cantonment link roads makes Dakhina Group the pre-eminent choice for senior defense officers seeking serene living.',
      bn: 'উত্তরা ১৮ নম্বর সেক্টর ও সেনানিবাস সংযোগ সড়কের নৈকট্য অবসরপ্রাপ্ত সিনিয়র সামরিক কর্মকর্তাদের শান্তিপূর্ণ বসবাসের জন্য দখিনাকে সেরা পছন্দের রূপ দিয়েছে।',
    },
  },
  {
    id: 'gaffar',
    name: 'Brigadier General Dr. Chowdhury Abdul Gaffar (Retd.)',
    bnName: 'ব্রিগেডিয়ার জেনারেল ড. চৌধুরী আব্দুল গাফফার (অব.)',
    branch: 'Bangladesh Army',
    role: 'Armed Forces Medical Corps',
    parcel: 'LAKEVIEW / PARCEL #VILLA-012',
    facing: 'Direct Waterfront Lagoon',
    quote: {
      en: 'Their transparent approach, direct handover records, and focus on genuine physical possession place Dakhina Group in an elite class of real estate developers.',
      bn: 'সরাসরি সীমানা চিহ্নিত করে দ্রুত খতিয়ান হস্তান্তর ও প্রকৃত দখল নিশ্চিতকরণের ক্ষেত্রে দখিনা গ্রুপ দেশের রিয়েল এস্টেট খাতে একটি অনন্য দৃষ্টান্ত।',
    },
  },
  {
    id: 'ashfaque',
    name: 'Brigadier General Dr. Md Ashfaque Uzzaman (Retd.)',
    bnName: 'ব্রিগেডিয়ার জেনারেল ড. মোঃ আশফাক উজ্জামান (অব.)',
    branch: 'Bangladesh Army',
    role: 'Senior Consultant & Defense Specialist',
    parcel: 'SECTOR-03 / PARCEL #CORNER-305',
    facing: 'Corner Plot 60ft Arterial',
    quote: {
      en: 'A trustworthy real estate conglomerate upholding uncompromising integrity. The natural red-clay highland topography of Dakhina City is truly exceptional.',
      bn: 'অটুট সততা ও আস্থার প্রতীক। দখিনা সিটির প্রাকৃতিক লাল মাটির উঁচু ভূমি ও সুপরিকল্পিত মাস্টারপ্ল্যান সত্যিই তুলনাহীন।',
    },
  },
];

const AGENCIES = [
  { short: 'BWDB', name: 'Water Development Board', bnName: 'পানি উন্নয়ন বোর্ড', logo: './assets/dakhina-live/wdb-150x150.png', memo: 'Clearance #HYD-409/08' },
  { short: 'DWASA', name: 'Dhaka WASA', bnName: 'ঢাকা ওয়াসা', logo: './assets/dakhina-live/wasa-150x150.png', memo: 'Water Grid Approved' },
  { short: 'POLICE', name: 'Bangladesh Police', bnName: 'বাংলাদেশ পুলিশ', logo: './assets/dakhina-live/police-150x150.jpg', memo: 'Security Clearance' },
  { short: 'RAJUK', name: 'RAJUK DAP 2022-35', bnName: 'রাজউক ড্যাপ', logo: './assets/dakhina-live/rajuk-150x150.jpg', memo: 'Homestead Masterplan' },
  { short: 'TITAS', name: 'Titas Gas Grid', bnName: 'তিতাস গ্যাস', logo: './assets/dakhina-live/titas-150x150.jpeg', memo: 'Energy Corridor' },
  { short: 'FSCD', name: 'Fire Service & Civil Defence', bnName: 'ফায়ার সার্ভিস', logo: './assets/dakhina-live/fire-150x150.png', memo: '80ft Road Clearance' },
  { short: 'DoE', name: 'Dept of Environment', bnName: 'পরিবেশ অধিদপ্তর', logo: './assets/dakhina-live/doe-150x150.png', memo: 'Eco Hydrology Approved' },
  { short: 'DTCA', name: 'Transport Coordination', bnName: 'ডিটিসিএ', logo: './assets/dakhina-live/dtca-150x150.jpeg', memo: 'Expressway Integration' },
];

export const MidnightHome: React.FC = () => {
  const { isBn } = useLanguage();
  const navigate = useNavigate();
  const allProps = propertiesData as PropertyItem[];
  const featured = allProps.filter((p) => p.featured).slice(0, 6);

  // Modal and Interactive States
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(0);

  // Form Filter State
  const [category, setCategory] = useState('');
  const categorySelectId = useId();

  // ROI Calculator Interactive States
  const [roiPlotSize, setRoiPlotSize] = useState<number>(5); // Katha: 3, 5, 10
  const [roiHorizon, setRoiHorizon] = useState<number>(5); // Years: 3, 5, 10
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState<number>(4); // default 2026

  // Calculation Logic:
  // Base 2026 price = 45 Lakh/katha
  // Annual projected growth = 18.5%
  const currentTotalCost = roiPlotSize * 45; // in BDT Lakhs
  const projectedFutureCost = Math.round(currentTotalCost * Math.pow(1 + 0.185, roiHorizon));
  const estimatedProfit = projectedFutureCost - currentTotalCost;
  const percentageGain = Math.round(((projectedFutureCost - currentTotalCost) / currentTotalCost) * 100);

  // Alternative asset benchmark for comparison (Bank FDR at 8.5% p.a.)
  const bankFdrFuture = Math.round(currentTotalCost * Math.pow(1 + 0.085, roiHorizon));
  const bankFdrGain = Math.round(((bankFdrFuture - currentTotalCost) / currentTotalCost) * 100);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-28 animate-fade-in text-[#F8FAFC] bg-[#050811] font-sans selection:bg-[#D4AF37]/30 selection:text-white">
      {/* ========================================================
          1. ULTRA-VIP OBSIDIAN HERO WITH 24K GOLD INSIGNIA
      ======================================================== */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20">
        {/* Ambient Luminous Gold & Deep Sapphire Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#D4AF37]/10 via-[#1E3A8A]/10 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-[#B87333]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          {/* Top VIP Air Force Authority Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#0C152B] via-[#0E1B38] to-[#0C152B] border border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.12)]">
            <div className="flex items-center gap-4">
              {/* Gold BAFWT Crest Medallion */}
              <div className="relative group shrink-0">
                <div className="w-12 h-12 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] shadow-md flex items-center justify-center">
                  <img
                    src="./assets/dakhina-live/welfaretrust-r33lvjwn5b3k7hab9swrc3e0d0q171674wldcv3kk0.png"
                    alt="BAFWT Crest"
                    className="w-10 h-10 object-contain rounded-full bg-white p-0.5"
                  />
                </div>
              </div>

              {/* Gold BAF Crest Medallion */}
              <div className="relative group shrink-0">
                <div className="w-12 h-12 rounded-full p-1 bg-gradient-to-tr from-[#F3E5AB] to-[#D4AF37] shadow-md flex items-center justify-center">
                  <img
                    src="./assets/dakhina-live/baf-r33lskr1i70vfxlynilafufgn3e6tjcsq680nbig9c.png"
                    alt="BAF Crest"
                    className="w-10 h-10 object-contain rounded-full bg-white p-0.5"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block font-bold">
                  {isBn ? 'যৌথ উদ্যোগ ও বিশেষ প্রতিরক্ষা আবাসন' : 'AIR FORCE WELFARE TRUST (BAFWT) JOINT VENTURE'}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white drop-shadow">
                  {isBn
                    ? 'বাংলাদেশ বিমান বাহিনী ও শীর্ষ সামরিক কর্মকর্তাদের বিশ্বস্ত উপশহর'
                    : 'Premier Defense Housing Enclave & Strategic Cantonment Axis'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#F3E5AB] font-bold">
                REHAB #495
              </span>
              <span className="text-[#94A3B8] hidden md:inline">RAJUK DAP 2022-2035 COMPLIANT</span>
            </div>
          </div>

          {/* Main Visual Drone Stage */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] lg:aspect-[21/9] border-2 border-[#D4AF37]/30 shadow-[0_0_60px_rgba(212,175,55,0.18)] group">
            <img
              src="./assets/dakhina-live/DSCF8648.jpg"
              alt="Dakhina City Midnight Drone View"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './assets/dakhina-live/DSCF8649.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/60 to-transparent" />

            {/* Stage Text Overlay */}
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1A38]/90 border border-[#D4AF37]/50 text-[#F3E5AB] text-xs font-semibold tracking-widest uppercase shadow-2xl backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>{isBn ? 'কনকর্ড মিডনাইট লাক্সারি · ভিআইপি বিনিয়োগ' : 'VIP NOCTURNE ESTATES & DEFENSE ENCLAVE'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.08]">
                {isBn ? (
                  <>
                    পরিকল্পিত জীবনের <br />
                    <span className="italic text-[#F3E5AB]">মহিমান্বিত আভিজাত্য</span> দখিনা সিটি
                  </>
                ) : (
                  <>
                    The Obsidian Standard of <br />
                    <span className="italic text-[#F3E5AB]">Generational Wealth</span>
                  </>
                )}
              </h1>

              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed max-w-2xl font-sans drop-shadow">
                {isBn
                  ? 'ঢাকা সেনানিবাসের ইসিবি চত্বর ও দিয়াবাড়ী মেট্রোরেল সংলগ্ন ১২০০ বিঘার নদী ও হ্রদবেষ্টিত সুরক্ষিত উপশহর। প্রাকৃতিক লাল মাটির উঁচু ভূমি, শূন্য পাইলিং খরচ ও শতভাগ আইনি শুদ্ধতা।'
                  : '1,200 Bighas of high-elevation freehold estate adjoining Uttara Sector 18 and Metro Terminal. Zero piling overhead, demarcated boundaries, and defense-grade title assurance.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8934A] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#050811] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>{isBn ? '৪কে ভিডিও ড্রোন প্রদর্শন' : 'Watch 4K Cinema Drone'}</span>
                </button>
                <a
                  href="#roi-matrix"
                  className="px-6 py-3.5 rounded-2xl bg-[#0E1A38]/90 hover:bg-[#152752] border border-[#D4AF37]/40 text-[#F3E5AB] font-bold text-xs uppercase tracking-wider backdrop-blur-md shadow-md transition-all flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
                  <span>{isBn ? 'ক্যাপিটাল গ্রোথ ও আরওআই সিমুলেটর' : 'Simulate Land ROI'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Filter Strip (Glassmorphic Dark Sapphire) */}
          <form
            onSubmit={handleSearch}
            className="p-5 rounded-3xl bg-[#0B132B]/90 border border-[#D4AF37]/35 shadow-2xl backdrop-blur-xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
          >
            <div className="sm:col-span-5 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#050811]/80 border border-[#D4AF37]/20">
              <Compass className="h-4 w-4 text-[#D4AF37] shrink-0" />
              <label htmlFor={categorySelectId} className="sr-only">
                {isBn ? 'সম্পত্তির ক্যাটাগরি' : 'Property Category'}
              </label>
              <select
                id={categorySelectId}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-[#0B132B] text-white">{isBn ? 'সকল ভিআইপি সেক্টর ও প্লট (৪৮টি)' : 'All VIP Sectors & Plots (48 Available)'}</option>
                <option value="Residential Plot" className="bg-[#0B132B] text-white">{isBn ? 'আবাসিক প্লট (৩, ৫, ১০ কাঠা)' : 'Residential Plot (3, 5, 10 Katha)'}</option>
                <option value="Luxury Villa" className="bg-[#0B132B] text-white">{isBn ? 'লাক্সারি প্রাইভেট ভিলা' : 'Luxury Private Villa'}</option>
                <option value="Lakeview Estate" className="bg-[#0B132B] text-white">{isBn ? 'লেকভিউ কর্নার এস্টেট' : 'Lakeview Corner Estate'}</option>
              </select>
            </div>

            <div className="sm:col-span-4 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#050811]/80 border border-[#D4AF37]/20 text-xs text-[#CBD5E1]">
              <ShieldCheck className="h-4 w-4 text-[#D4AF37] shrink-0" />
              <span className="truncate">{isBn ? '১০০% ঝামেলামুক্ত সিএস/এসএ/আরএস নামজারি' : 'Immediate Freehold Deed & Mutation'}</span>
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8934A] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#050811] text-xs font-bold tracking-wider uppercase shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                <span>{isBn ? 'প্লট খুঁজুন' : 'Search Plots'}</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ========================================================
          2. EXCLUSIVE FEATURE: 2004–2026 CAPITAL ROI & APPRECIATION MATRIX
      ======================================================== */}
      <section id="roi-matrix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#0E1A38] to-[#070D1A] border-2 border-[#D4AF37]/40 shadow-[0_0_50px_rgba(212,175,55,0.15)] space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D4AF37]/25 pb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] text-[11px] font-mono tracking-widest uppercase">
                <TrendingUp className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>HISTORICAL GROWTH & WEALTH CREATION</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                {isBn ? '২০০৪ থেকে ২০২৬: ভূমির মূল্যবৃদ্ধি ও ভবিষ্যৎ আরওআই সিমুলেটর' : 'Historical Capital Appreciation & Projected Land ROI'}
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                {isBn
                  ? 'ঢাকা উত্তর ও সেনানিবাস করিডোরের সবচেয়ে স্থিতিশীল মূলধন বৃদ্ধি। বিগত ২২ বছরের প্রমাণিত ট্র্যাক রেকর্ড ও ৫-১০ বছরের প্রক্ষেপণ।'
                  : 'Track the 22-year capital surge across Dhaka Cantonment North Corridor with live multi-year ROI projection.'}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-[#D4AF37] block font-bold uppercase">HISTORICAL TRAJECTORY</span>
              <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">+1,700%</span>
              <span className="text-[11px] text-[#94A3B8] block">Total Capital Surge (2004–2026)</span>
            </div>
          </div>

          {/* Interactive 2004-2026 Historical Timeline Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#F3E5AB]">
              <span className="font-bold flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-[#D4AF37]" />
                SELECT HISTORICAL MILESTONE
              </span>
              <span className="text-[#94A3B8]">Click any year to inspect price trajectory</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {HISTORICAL_ROI_DATA.map((item, idx) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedTimelineIndex(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedTimelineIndex === idx
                      ? 'bg-[#15254A] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] ring-1 ring-[#D4AF37]'
                      : 'bg-[#060B18]/70 border-white/10 hover:border-white/30 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className={selectedTimelineIndex === idx ? 'text-[#F3E5AB]' : 'text-neutral-300'}>{item.year}</span>
                    <span className="text-[10px] text-[#D4AF37]">{item.returnRate}</span>
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-white mt-1">
                    ৳{item.pricePerKatha} Lac
                  </div>
                  <p className="text-[10px] text-neutral-400 truncate mt-1">{item.event}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Interactive ROI Calculator Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#050A16] border border-[#D4AF37]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[#D4AF37]" />
                <span>{isBn ? 'আপনার প্লটের সম্ভাব্য রিটার্ন হিসাব করুন' : 'Calculate Your Future Land Valuation'}</span>
              </h3>

              {/* Katha Size Selector */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-400">Plot Dimension (Katha):</span>
                  <span className="text-[#F3E5AB] font-bold">{roiPlotSize} Katha</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 10].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setRoiPlotSize(size)}
                      className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                        roiPlotSize === size
                          ? 'bg-[#D4AF37] text-[#050811] shadow-md'
                          : 'bg-[#0E1B38] text-neutral-300 border border-white/10 hover:bg-[#16274D]'
                      }`}
                    >
                      {size} Katha
                    </button>
                  ))}
                </div>
              </div>

              {/* Investment Horizon Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-400">Holding Horizon (Years):</span>
                  <span className="text-[#D4AF37] font-bold">{roiHorizon} Years ({(new Date().getFullYear()) + roiHorizon})</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 10].map((yrs) => (
                    <button
                      key={yrs}
                      type="button"
                      onClick={() => setRoiHorizon(yrs)}
                      className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                        roiHorizon === yrs
                          ? 'bg-[#D4AF37] text-[#050811] shadow-md'
                          : 'bg-[#0E1B38] text-neutral-300 border border-white/10 hover:bg-[#16274D]'
                      }`}
                    >
                      {yrs} Years
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5 pt-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Benchmark Rate: 18.5% annual appreciation based on historical corridor metrics.</span>
              </div>
            </div>

            {/* Live Output Matrix Display (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Output: Projected Value */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#12224A] to-[#0A142D] border border-[#D4AF37]/50 shadow-xl space-y-2">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block font-bold">
                  PROJECTED VALUATION ({new Date().getFullYear() + roiHorizon})
                </span>
                <div className="text-3xl font-mono font-bold text-white tracking-tight">
                  ৳{projectedFutureCost.toLocaleString()} Lac
                </div>
                <div className="text-xs text-neutral-300">
                  Current 2026 Price: <span className="font-mono text-white">৳{currentTotalCost} Lac</span>
                </div>
                <div className="pt-2">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#128341]/20 border border-[#128341]/60 text-[#4ADE80] font-mono text-xs font-bold">
                    Net Gain: +৳{estimatedProfit.toLocaleString()} Lac (+{percentageGain}%)
                  </span>
                </div>
              </div>

              {/* Comparison vs Bank FDR */}
              <div className="p-6 rounded-2xl bg-[#081022] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  VS. TRADITIONAL BANK FDR (8.5% P.A.)
                </span>
                <div className="text-2xl font-mono font-bold text-neutral-300 tracking-tight">
                  ৳{bankFdrFuture.toLocaleString()} Lac
                </div>
                <div className="text-xs text-neutral-400">
                  FDR Return: <span className="font-mono text-neutral-200">+{bankFdrGain}%</span>
                </div>
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-[#D4AF37] font-bold block">
                    Dakhina Outperforms by +{percentageGain - bankFdrGain}% Alpha
                  </span>
                </div>
              </div>

              {/* Visual Relative Strength Progress */}
              <div className="sm:col-span-2 p-4 rounded-xl bg-[#060D1C] border border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#F3E5AB]">Dakhina City Land Asset</span>
                  <span className="text-[#4ADE80] font-bold">+{percentageGain}% Return</span>
                </div>
                <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#D4AF37] to-[#4ADE80] h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, Math.max(25, percentageGain / 2.5))}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono pt-1">
                  <span>Traditional Bank Term Deposit</span>
                  <span>+{bankFdrGain}% Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. EXCLUSIVE VIP FEATURE: DEFENSE ALLOTMENT RADAR & TESTIMONIALS
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] text-[11px] font-mono tracking-widest uppercase">
              <Award className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>DEFENSE HIGH COMMAND ENDORSEMENTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              {isBn ? 'সিনিয়র সামরিক কর্মকর্তাদের আস্থা ও বরাদ্দ বিবরণ' : 'Defense Allotment Registry & Officer Citations'}
            </h2>
          </div>
          <div className="text-xs font-mono text-[#D4AF37]">
            100% DEMARCATED FREEHOLD RESIDENTIAL ENCLAVE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Officer Selector Tabs (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            {DEFENSE_HONOR_VIP.map((officer, idx) => (
              <button
                key={officer.id}
                onClick={() => setSelectedOfficer(idx)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  selectedOfficer === idx
                    ? 'bg-[#15254A] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] text-white'
                    : 'bg-[#0B132B]/60 border-white/10 hover:border-white/20 text-neutral-400 hover:text-white'
                }`}
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold block">{isBn ? officer.bnName : officer.name}</h4>
                  <span className="text-[11px] font-mono text-[#D4AF37] block">{officer.branch}</span>
                  <span className="text-[10px] text-neutral-400 block">{officer.parcel}</span>
                </div>
                <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${selectedOfficer === idx ? 'text-[#D4AF37] translate-x-1' : 'text-neutral-500'}`} />
              </button>
            ))}
          </div>

          {/* Right Column: Detailed Officer Dossier Card (8 Cols) */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0C1630] via-[#0E1C3D] to-[#080E20] border-2 border-[#D4AF37]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Watermark Crest */}
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-72 h-72 opacity-5 pointer-events-none">
              <img src="./assets/dakhina-live/welfaretrust-r33lvjwn5b3k7hab9swrc3e0d0q171674wldcv3kk0.png" alt="BAFWT Watermark" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                    OFFICIAL ALLOTTEE DOSSIER
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {isBn ? DEFENSE_HONOR_VIP[selectedOfficer].bnName : DEFENSE_HONOR_VIP[selectedOfficer].name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">{DEFENSE_HONOR_VIP[selectedOfficer].role}</p>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-[#128341]/20 border border-[#128341]/60 text-[#4ADE80] text-xs font-mono font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Possession & Mutation</span>
                </div>
              </div>

              {/* Allotment Parcel Coordinates */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#050A16]/80 border border-white/10 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block text-[10px]">ALLOTTED PLOT</span>
                  <span className="text-white font-bold">{DEFENSE_HONOR_VIP[selectedOfficer].parcel}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">ORIENTATION</span>
                  <span className="text-[#F3E5AB] font-bold">{DEFENSE_HONOR_VIP[selectedOfficer].facing}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-neutral-500 block text-[10px]">CIVIL DEFENSE CLEARANCE</span>
                  <span className="text-[#4ADE80] font-bold">FSCD #80FT ARTERIAL</span>
                </div>
              </div>

              {/* Citation Quote */}
              <div className="p-6 rounded-2xl bg-[#070D1C] border border-[#D4AF37]/20 relative">
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed italic">
                  "{isBn ? DEFENSE_HONOR_VIP[selectedOfficer].quote.bn : DEFENSE_HONOR_VIP[selectedOfficer].quote.en}"
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs font-mono border-t border-white/10 mt-6">
              <span className="text-[#94A3B8]">Dakhina City Sector 1 & 2 Defense Masterplan</span>
              <Link to="/contact-us#vip" className="text-[#D4AF37] hover:underline font-bold flex items-center gap-1">
                <span>Inquire About Defense VIP Quota</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. CURATED NOCTURNE PROPERTIES SHOWCASE
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
              CURATED DEFENSE & EXECUTIVE INVENTORY
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {isBn ? 'ভিআইপি প্লট ও লাক্সারি ভিলা সংগ্রহ' : 'Exclusive Residential Plots & Estates'}
            </h2>
          </div>
          <Link
            to="/properties"
            className="text-xs font-mono text-[#D4AF37] hover:text-[#F3E5AB] transition-colors flex items-center gap-1 shrink-0 font-bold"
          >
            <span>{isBn ? 'সকল ৪৮টি সম্পত্তি দেখুন' : 'Explore All 48 Properties'}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((prop) => (
            <div
              key={prop.id}
              className="group rounded-3xl overflow-hidden bg-[#0A1224] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 shadow-xl transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './assets/dakhina-live/DSCF8649.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1224] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050811]/80 backdrop-blur-md border border-[#D4AF37]/40 text-[#F3E5AB] text-[10px] font-mono font-bold uppercase">
                  {prop.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                  <span className="font-bold text-[#F3E5AB] text-sm">
                    {formatBDT(prop.price)}
                  </span>
                  <span className="text-neutral-400">{prop.landSizeKatha} Katha</span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-[#F3E5AB] transition-colors line-clamp-1">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {prop.locationArea} — Sector 18 Extension & Metro Corridor.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#4ADE80] flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="h-3 w-3" /> Ready Mutation
                  </span>
                  <Link
                    to={`/properties/${prop.slug}`}
                    className="text-[#D4AF37] hover:text-white font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>View Dossier</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. 24K GOLD STATUTORY REGULATORY MEDALLIONS
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
            INTER-AGENCY CLEARANCE ECOSYSTEM
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {isBn ? '৮টি রাষ্ট্রীয় ও নিয়ন্ত্রক সংস্থার বৈধ অনুমোদন' : 'Statutory Clearances & Regulatory Accreditations'}
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            {isBn
              ? 'আইনি স্বচ্ছতায় কোনো আপস নেই। প্রতিটি সরকারি দপ্তরের সুনির্দিষ্ট ছাড়পত্র সহ সম্পূর্ণ নিরাপদ।'
              : 'Uncompromising legal and environmental clearances issued by statutory Bangladeshi authorities.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {AGENCIES.map((agency) => (
            <div
              key={agency.short}
              className="p-4 rounded-2xl bg-[#091122] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all flex flex-col items-center text-center space-y-2.5 shadow-md group"
            >
              <div className="w-14 h-14 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src={agency.logo}
                  alt={agency.name}
                  className="w-12 h-12 object-contain rounded-full bg-white p-1"
                />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-white block">{agency.short}</span>
                <span className="text-[10px] text-neutral-400 block line-clamp-1">{agency.bnName}</span>
                <span className="text-[9px] font-mono text-[#D4AF37] block mt-1">{agency.memo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          6. FULL-WIDTH OBSIDIAN PANORAMIC FOOTER BANNER
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[24/8] border border-[#D4AF37]/40 shadow-2xl">
          <img
            src="./assets/dakhina-live/DSCF8646.jpg"
            alt="Dakhina City Mirpur Flyover Link"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050811] via-[#050811]/80 to-transparent" />

          <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-center space-y-4 max-w-xl">
            <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
              STRATEGIC INFRASTRUCTURE
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {isBn ? 'মিরপুর ডিওএইচএস ও ঢাকা সেনানিবাস সংযোগ' : 'Direct Link to Dhaka Cantonment & Mirpur DOHS'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              {isBn
                ? 'ইসিবি চত্বর কর্পোরেট হেডকোয়ার্টার থেকে মাত্র ১০ মিনিটে নিজস্ব প্রাইভেট বাউন্ডারিতে পৌঁছান।'
                : '10-minute seamless transit from ECB Chattar Cantonment Corporate HQ to Dakhina City gate.'}
            </p>
            <div className="pt-2">
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#050811] font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                <span>{isBn ? 'ভিআইপি ভিজিট বুক করুন' : 'Schedule Private Inspection'}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4K Drone Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Dakhina City 4K Cinema Drone"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MidnightHome;
