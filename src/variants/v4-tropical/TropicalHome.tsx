import React, { useState, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import propertiesData from '../../data/properties.json';
import { PropertyItem } from '../../data/schema';
import { formatBDT } from '../../lib/utils';
import {
  Waves,
  Trees,
  ShieldCheck,
  ChevronRight,
  Play,
  X,
  Search,
  CheckCircle2,
  DollarSign,
  Compass,
  ArrowRight,
  Droplets,
  Wind,
  Leaf,
} from 'lucide-react';

const ECO_AMENITIES = [
  {
    id: 'lake',
    title: { en: '50-Acre Natural Lake & Boardwalk', bn: '৫০ একর প্রাকৃতিক লেক ও লেকভিউ প্রমেনেড' },
    desc: {
      en: 'Direct waterfront frontage with a 2.5km paved walking and cycling trail, fresh lake breezes, and dedicated sunset recreation pavilions.',
      bn: '২.৫ কিলোমিটার দীর্ঘ সুরভিত হাঁটার পথ ও সাইক্লিং ট্র্যাক সহ মনোরম লেকভিউ প্রমেনেড এবং সূর্যাস্ত দর্শনের মনোরম প্যাভিলিয়ন।',
    },
    img: '/assets/dakhina-live/beutyfication2.jpg',
    metric: '2.5 KM',
    label: 'Lake Promenade',
  },
  {
    id: 'boulevard',
    title: { en: 'Tree-Canopied 60ft & 80ft Arterials', bn: '৬০ ও ৮০ ফুট বৃক্ষশোভিত প্রধান অ্যাভিনিউ' },
    desc: {
      en: 'Double-row shaded mahogany and rain trees along wide asphalt avenues with dedicated underground storm-water gravity drainage.',
      bn: 'উভয় পাশে সবুজ বৃক্ষশোভিত প্রশস্ত ৮০ ফুট প্রধান সড়ক এবং ভূগর্ভস্থ প্রাকৃতিক ড্রেনেজ ও ড্রেন গ্রিড।',
    },
    img: '/assets/dakhina-live/60.jpg',
    metric: '80 FT',
    label: 'Arterial Road',
  },
  {
    id: 'park',
    title: { en: 'Central Eco-Park & Botanical Enclave', bn: 'সেন্ট্রাল ইকো-পার্ক ও বোটানিক্যাল সংরক্ষিত এলাকা' },
    desc: {
      en: 'Protected green lungs with over 15,000 indigenous trees, children play meadows, and community herb gardens maintaining a 3°C cooler microclimate.',
      bn: '১৫,০০০ এর অধিক দেশীয় ফলজ ও বনজ বৃক্ষবেষ্টিত সুরক্ষিত গ্রিন বেল্ট, যা আশেপাশের ঢাকা শহরের চেয়ে ৩ ডিগ্রি শীতল পরিবেশ নিশ্চিত করে।',
    },
    img: '/assets/dakhina-live/beutyfication.jpg',
    metric: '15,000+',
    label: 'Native Trees',
  },
  {
    id: 'highland',
    title: { en: 'Solid Red-Clay Highland (14.5m PWD)', bn: 'প্রাকৃতিক লাল মাটির উঁচু ভূমি (১৪.৫ মিটার পিডব্লিউডি)' },
    desc: {
      en: 'Ancient geologically consolidated Madhupur tract, situated comfortably above the 100-year Dhaka flood level with zero risk of waterlogging.',
      bn: 'ঐতিহাসিক ভাওয়াল-মধুপুর গড়ের প্রাকৃতিক লাল মাটি। শতবর্ষের বন্যা সীমার চেয়ে বহুগুণ উঁচুতে অবস্থিত হওয়ায় জলাবদ্ধতার কোনো শঙ্কা নেই।',
    },
    img: '/assets/dakhina-live/DSCF8649.jpg',
    metric: '14.5 M',
    label: 'Elevation (PWD)',
  },
];

const DEFENSE_ECO_REVIEWS = [
  {
    name: 'Major General Tawhidul Islam (Retd.)',
    bnName: 'মেজর জেনারেল তৌহিদুল ইসলাম (অব.)',
    branch: 'Bangladesh Army',
    quote: {
      en: 'After decades of demanding military service, the pristine fresh air, unpolluted waterbody, and solid red-clay foundation make Dakhina City the ultimate sanctuary for health and tranquility.',
      bn: 'দীর্ঘ কর্মজীবনের পর দখিনা সিটির বিশুদ্ধ বাতাস, উন্মুক্ত জলাশয় এবং প্রাকৃতিক লাল মাটির শান্তিময় নির্মল পরিবেশ অবসর জীবনের জন্য নিখুঁত শান্তি এনে দেয়।',
    },
    role: 'Executive Enclave Resident',
  },
  {
    name: 'Brigadier General Abdul Alim Tarapder (Retd.)',
    bnName: 'ব্রিগেডিয়ার জেনারেল আব্দুল আলিম তরফদার (অব.)',
    branch: 'Bangladesh Army',
    quote: {
      en: 'Zero piling cost is not just a marketing claim—it is a proven geological reality here. We saved tens of lakhs in foundation engineering on this highland.',
      bn: 'শূন্য পাইলিং কোনো কথার কথা নয়—এখানে এটি প্রমাণিত ভূতাত্ত্বিক বাস্তবতা। শক্ত লাল মাটি হওয়ায় আমাদের ভবনের বেইজে লাখ লাখ টাকা সাশ্রয় হয়েছে।',
    },
    role: 'Sector 1 Lakefront Allottee',
  },
  {
    name: 'Brigadier General Dr. Chowdhury Abdul Gaffar (Retd.)',
    bnName: 'ব্রিগেডিয়ার জেনারেল ড. চৌধুরী আব্দুল গাফফার (অব.)',
    branch: 'Bangladesh Army',
    quote: {
      en: 'The harmonious coexistence of statutory legal approvals with dedicated green zones and lakeside jogging paths makes this a masterclass in urban planning.',
      bn: 'সকল সরকারি সংস্থার পূর্ণাঙ্গ ছাড়পত্রের সাথে বিশাল সবুজ এলাকা ও লেকের সংযোগ একে ভবিষ্যৎ প্রজন্মের জন্য এক অতুলনীয় স্বাস্থ্যকর বসতি করেছে।',
    },
    role: 'Medical Corps Veteran',
  },
];

const STATUTORY_GREEN_AGENCIES = [
  { short: 'DoE', name: 'Dept of Environment', bn: 'পরিবেশ অধিদপ্তর', file: '/assets/dakhina-live/doe-150x150.png', badge: 'Eco Clearance Approved' },
  { short: 'BWDB', name: 'Water Development Board', bn: 'পানি উন্নয়ন বোর্ড', file: '/assets/dakhina-live/wdb-150x150.png', badge: 'Hydrology Certified' },
  { short: 'DWASA', name: 'Dhaka WASA', bn: 'ঢাকা ওয়াসা', file: '/assets/dakhina-live/wasa-150x150.png', badge: 'Natural Drainage Clear' },
  { short: 'RAJUK', name: 'RAJUK DAP 2022-35', bn: 'রাজউক ড্যাপ', file: '/assets/dakhina-live/rajuk-150x150.jpg', badge: 'Green Homestead Zone' },
  { short: 'POLICE', name: 'Bangladesh Police', bn: 'বাংলাদেশ পুলিশ', file: '/assets/dakhina-live/police-150x150.jpg', badge: 'Community Safety Valid' },
  { short: 'FIRE', name: 'Fire Service & Civil Defence', bn: 'ফায়ার সার্ভিস', file: '/assets/dakhina-live/fire-150x150.png', badge: '80ft Access Grid' },
];

export const TropicalHome: React.FC = () => {
  const { isBn } = useLanguage();
  const navigate = useNavigate();
  const allProps = propertiesData as PropertyItem[];
  const featured = allProps.filter((p) => p.featured).slice(0, 6);

  const [activeAmenity, setActiveAmenity] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Form Filter State
  const [selectedCategory, setSelectedCategory] = useState('');
  const categorySelectId = useId();

  // Foundation & Piling Cost Savings Interactive Calculator State
  const [storeys, setStoreys] = useState<number>(6); // 3 to 10 storeys
  const [plotKatha, setPlotKatha] = useState<number>(5); // 3, 5, 10 katha

  // Calculation parameters:
  // Low marshland piling cost: approx ৳3.2 Lakh per storey for 5 katha (deep bored piles 90-120 ft)
  // Dakhina red clay foundation cost: shallow mat foundation, approx ৳0.8 Lakh per storey
  const marshlandFoundationCost = Math.round((storeys * 2.8 * (plotKatha / 5)) + (plotKatha * 2.5));
  const dakhinaHighlandCost = Math.round((storeys * 0.9 * (plotKatha / 5)) + (plotKatha * 0.8));
  const directCashSavings = marshlandFoundationCost - dakhinaHighlandCost;
  const savingsPercent = Math.round((directCashSavings / marshlandFoundationCost) * 100);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-28 animate-fade-in font-sans text-[#062E25] bg-[#F7F9F5] selection:bg-[#0E7C7B]/20 selection:text-[#064E3B]">
      {/* ========================================================
          1. LAKESIDE BOTANICAL HERO (BASHUNDHARA ECO TOWNSHIP)
      ======================================================== */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20">
        {/* Soft Botanical Ambient Gradients */}
        <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-[#0E7C7B]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          {/* Top Botanical Authority Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-white/90 border border-[#064E3B]/15 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-[#064E3B] text-white">
                <Trees className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#0E7C7B] uppercase block font-bold">
                  {isBn ? '১২০০ বিঘা প্রাকৃতিক উঁচু লাল মাটির উপশহর' : '1,200 BIGHA NATURAL RED-CLAY ECO TOWNSHIP'}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#062E25]">
                  {isBn
                    ? 'প্রাকৃতিক লেকভিউ, ৭২% উন্মুক্ত সবুজ ও ঢাকা সেনানিবাস সংলগ্ন নির্মল আবাসন'
                    : 'Pristine Waterfront Living, 72% Green Open Space & 0% Deep Piling'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#E8F5E9] border border-[#064E3B]/20 text-[#064E3B] font-bold flex items-center gap-1.5">
                <Leaf className="h-3 w-3" />
                DoE Certified
              </span>
              <span className="px-3 py-1 rounded-full bg-[#E0F2FE] border border-[#0284C7]/20 text-[#0369A1] font-bold">
                14.5m PWD Elevation
              </span>
            </div>
          </div>

          {/* Organic Rounded Drone Hero Stage */}
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[16/9] lg:aspect-[21/9] border-2 border-[#064E3B]/20 shadow-xl group">
            <img
              src="/assets/dakhina-live/DSCF8648.jpg"
              alt="Dakhina City Lakeview Drone"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/dakhina-live/beutyfication2.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062E25]/90 via-[#062E25]/40 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 space-y-4 max-w-3xl text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md">
                <Waves className="h-3.5 w-3.5 text-[#34D399]" />
                <span>{isBn ? 'বসুন্ধরা ইকো টাউনশিপ স্টাইল · নদী ও লেকভিউ' : 'ECOLOGICAL LAKEFRONT TOWNSHIP & BOTANICAL OASIS'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.08]">
                {isBn ? (
                  <>
                    সবুজে ঘেরা জীবনের <br />
                    <span className="italic text-[#34D399]">প্রাকৃতিক প্রশান্তি</span> দখিনা সিটি
                  </>
                ) : (
                  <>
                    Where Nature Meets <br />
                    <span className="italic text-[#34D399]">Sovereign Security</span>
                  </>
                )}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed max-w-2xl font-sans">
                {isBn
                  ? 'ঢাকা সেনানিবাসের ইসিবি চত্বর ও দিয়াবাড়ী মেট্রোরেল সংলগ্ন ১২০০ বিঘার নদী ও হ্রদবেষ্টিত সংরক্ষিত উপশহর। প্রাকৃতিক শক্ত লাল মাটি, শূন্য পাইলিং খরচ ও শতভাগ আইনি স্বচ্ছতা।'
                  : 'Masterplanned lakeside haven adjoining Uttara Sector 18 and Metro Terminal. Ancient high-bearing red clay, natural water retention, and 0% flood vulnerability.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="px-6 py-3.5 rounded-2xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2"
                >
                  <Play className="h-4 w-4 fill-current text-[#34D399]" />
                  <span>{isBn ? '৪কে ড্রোন ভিডিও দেখুন' : 'Explore 4K Drone Tour'}</span>
                </button>
                <a
                  href="#foundation-calculator"
                  className="px-6 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-[#062E25] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                >
                  <DollarSign className="h-4 w-4 text-[#064E3B]" />
                  <span>{isBn ? 'পাইলিং খরচ সাশ্রয় ক্যালকুলেটর' : 'Calculate Piling Savings'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Eco-Search Strip */}
          <form
            onSubmit={handleSearch}
            className="p-5 rounded-3xl bg-white border border-[#064E3B]/15 shadow-xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
          >
            <div className="sm:col-span-5 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#F0FDF4] border border-[#064E3B]/20">
              <Compass className="h-4 w-4 text-[#064E3B] shrink-0" />
              <label htmlFor={categorySelectId} className="sr-only">
                {isBn ? 'প্লটের ধরন নির্বাচন করুন' : 'Select Plot Type'}
              </label>
              <select
                id={categorySelectId}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs text-[#062E25] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="">{isBn ? 'সকল লেকভিউ ও গার্ডেন প্লট (৪৮টি)' : 'All Lakeview & Garden Plots (48 Available)'}</option>
                <option value="Residential Plot">{isBn ? 'আবাসিক প্লট (৩, ৫, ১০ কাঠা)' : 'Residential Plot (3, 5, 10 Katha)'}</option>
                <option value="Lakeview Estate">{isBn ? 'প্রিমিয়াম লেকভিউ এস্টেট' : 'Premium Lakeview Estate'}</option>
                <option value="Luxury Villa">{isBn ? 'প্রাইভেট গার্ডেন ভিলা' : 'Private Garden Villa'}</option>
              </select>
            </div>

            <div className="sm:col-span-4 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#F0FDF4] border border-[#064E3B]/20 text-xs text-[#064E3B]">
              <ShieldCheck className="h-4 w-4 text-[#064E3B] shrink-0" />
              <span className="truncate font-semibold">{isBn ? '১০০% ভাওয়াল লাল মাটি · তাত্ক্ষণিক নামজারি' : 'Solid Natural Red Clay · Instant Mutation'}</span>
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#064E3B] hover:bg-[#047857] text-white text-xs font-bold tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                <span>{isBn ? 'প্লট সার্চ করুন' : 'Search Green Plots'}</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ========================================================
          2. EXCLUSIVE FEATURE: NATURAL HIGHLAND FOUNDATION SAVINGS CALCULATOR
      ======================================================== */}
      <section id="foundation-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white border-2 border-[#064E3B]/20 shadow-xl space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#064E3B]/10 pb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] border border-[#064E3B]/20 text-[#064E3B] text-[11px] font-mono tracking-widest uppercase font-bold">
                <ShieldCheck className="h-3.5 w-3.5 text-[#064E3B]" />
                <span>GEOTECHNICAL ENGINEERING ADVANTAGE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#062E25]">
                {isBn ? 'প্রাকৃতিক লাল মাটি বনাম জলাভূমি: পাইলিং খরচ সাশ্রয় ক্যালকুলেটর' : 'Highland Red Clay vs Marshland: Foundation Cost Calculator'}
              </h2>
              <p className="text-xs sm:text-sm text-[#4B6358]">
                {isBn
                  ? 'ঢাকা শহরের পূর্ব/দক্ষিণ অংশের নিচু জলাভূমিতে ৮০-১২০ ফুট পাইলিং করতে লাখ লাখ টাকা অপচয় হয়। দখিনা সিটির প্রাকৃতিক শক্ত লাল মাটিতে শূন্য পাইলিং খরচে সরাসরি নগদ টাকা সাশ্রয় করুন।'
                  : 'Low-lying marshlands require 80–120ft bored piling costing fortunes. Dakhina City’s natural consolidated Madhupur red clay requires only shallow mat footings.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#064E3B]/20 text-right">
              <span className="text-[10px] font-mono text-[#064E3B] block font-bold uppercase">ESTIMATED DIRECT SAVINGS</span>
              <span className="text-3xl sm:text-4xl font-mono font-bold text-[#064E3B] tracking-tight">৳{directCashSavings} Lac</span>
              <span className="text-[11px] text-[#064E3B]/80 block font-semibold">Save {savingsPercent}% on Structural Foundation</span>
            </div>
          </div>

          {/* Interactive Sliders & Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-sm font-bold text-[#062E25] uppercase tracking-wider font-mono">
                {isBn ? 'ভবন ও প্লটের পরিমাপ নির্বাচন করুন:' : 'Configure Building Parameters:'}
              </h3>

              {/* Storeys Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-[#4B6358]">Building Height:</span>
                  <span className="text-[#064E3B] font-bold text-sm">{storeys} Storeys (G+{storeys - 1})</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  step="1"
                  value={storeys}
                  onChange={(e) => setStoreys(Number(e.target.value))}
                  className="w-full accent-[#064E3B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>3 Storeys</span>
                  <span>6 Storeys</span>
                  <span>10 Storeys</span>
                </div>
              </div>

              {/* Katha Size Selector */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-[#4B6358]">Plot Size:</span>
                  <span className="text-[#064E3B] font-bold">{plotKatha} Katha</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 10].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPlotKatha(size)}
                      className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                        plotKatha === size
                          ? 'bg-[#064E3B] text-white shadow-md'
                          : 'bg-[#F0FDF4] text-[#064E3B] border border-[#064E3B]/20 hover:bg-[#DCFCE7]'
                      }`}
                    >
                      {size} Katha
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#064E3B]/20 text-xs text-[#064E3B] space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Geological SPT Value &gt; 25 at 4ft Depth</span>
                </div>
                <p className="text-[11px] text-[#4B6358]">
                  Tested and verified by BUET Civil Geotech engineering labs. 100% natural red-clay stratum.
                </p>
              </div>
            </div>

            {/* Visual Comparison Box (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Low Marshland Foundation Card */}
                <div className="p-6 rounded-2xl bg-neutral-100 border border-neutral-300 space-y-3">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                    LOW MARSHLAND / FILLED SOIL
                  </span>
                  <div className="text-2xl font-mono font-bold text-neutral-700">
                    ৳{marshlandFoundationCost} Lac
                  </div>
                  <ul className="text-xs text-neutral-600 space-y-1.5 font-sans">
                    <li className="flex items-center gap-1.5 text-red-600">
                      <X className="h-3.5 w-3.5 shrink-0" />
                      <span>Requires 90-120ft cast-in-situ bored piles</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-neutral-600">
                      <span>• High soil settlement risk over time</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-neutral-600">
                      <span>• 3 to 5 months added construction delay</span>
                    </li>
                  </ul>
                </div>

                {/* Dakhina Natural Highland Card */}
                <div className="p-6 rounded-2xl bg-[#E8F5E9] border-2 border-[#064E3B] space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#064E3B] uppercase tracking-widest block font-bold">
                      DAKHINA NATURAL HIGHLAND
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#064E3B] text-white text-[9px] font-bold">BEST</span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-[#064E3B]">
                    ৳{dakhinaHighlandCost} Lac
                  </div>
                  <ul className="text-xs text-[#062E25] space-y-1.5 font-sans font-medium">
                    <li className="flex items-center gap-1.5 text-[#064E3B]">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Standard shallow mat / pad footing</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-[#064E3B]">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>0% deep piling cost required</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-[#064E3B]">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Immediate construction turnaround</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Total Savings Highlight Banner */}
              <div className="p-4 rounded-2xl bg-[#064E3B] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                <div className="text-center sm:text-left">
                  <span className="text-[11px] font-mono text-[#34D399] uppercase tracking-wider block font-bold">
                    NET CASH SAVINGS ON FOUNDATION
                  </span>
                  <div className="text-xl sm:text-2xl font-mono font-bold">
                    ৳{directCashSavings} Lakh Direct Construction Cash Kept in Your Pocket
                  </div>
                </div>
                <Link
                  to="/contact-us#soil-report"
                  className="px-4 py-2.5 rounded-xl bg-white text-[#064E3B] hover:bg-[#F0FDF4] text-xs font-bold font-mono shrink-0 shadow-sm transition-all"
                >
                  Download BUET Soil Report →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. EXCLUSIVE FEATURE: LAKESIDE ECO-AMENITIES NAVIGATOR
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#064E3B]/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] border border-[#064E3B]/20 text-[#064E3B] text-[11px] font-mono tracking-widest uppercase font-bold">
              <Trees className="h-3.5 w-3.5 text-[#064E3B]" />
              <span>BOTANICAL MASTERPLAN & WATERFRONT AMENITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#062E25] mt-1">
              {isBn ? 'প্রাকৃতিক লেকভিউ ও সবুজ বোটানিক্যাল মাস্টারপ্ল্যান' : 'Lakeside Living & Eco-Amenities Navigator'}
            </h2>
          </div>
          <div className="text-xs font-mono text-[#064E3B] font-bold">
            72% OPEN GREEN & WATER RESERVOIR
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ECO_AMENITIES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveAmenity(idx)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeAmenity === idx
                  ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-lg'
                  : 'bg-white text-[#062E25] border-neutral-200 hover:border-[#064E3B]/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                <span className={activeAmenity === idx ? 'text-[#34D399]' : 'text-[#0E7C7B]'}>
                  0{idx + 1}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeAmenity === idx ? 'bg-white/20' : 'bg-neutral-100'}`}>
                  {item.metric}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-semibold line-clamp-1">{isBn ? item.title.bn : item.title.en}</h4>
              <span className={`text-[10px] block mt-0.5 ${activeAmenity === idx ? 'text-neutral-300' : 'text-neutral-500'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Active Amenity Display Showcase */}
        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white border border-[#064E3B]/15 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden aspect-[16/10] bg-neutral-900 shadow-md">
            <img
              src={ECO_AMENITIES[activeAmenity].img}
              alt={ECO_AMENITIES[activeAmenity].label}
              className="w-full h-full object-cover transition-all duration-700 hover:scale-103"
            />
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono font-bold">
              {ECO_AMENITIES[activeAmenity].label} — {ECO_AMENITIES[activeAmenity].metric}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0E7C7B] font-bold block">
                FEATURING THE BEST OF BOTANICAL URBANISM
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#062E25]">
                {isBn ? ECO_AMENITIES[activeAmenity].title.bn : ECO_AMENITIES[activeAmenity].title.en}
              </h3>
              <p className="text-xs sm:text-sm text-[#4B6358] leading-relaxed">
                {isBn ? ECO_AMENITIES[activeAmenity].desc.bn : ECO_AMENITIES[activeAmenity].desc.en}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#064E3B]/20 grid grid-cols-2 gap-3 text-xs font-mono text-[#064E3B]">
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4" />
                <span>3°C Cooler Breeze</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                <span>0% Flood Zone</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/dakhina-city"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <span>{isBn ? 'সম্পূর্ণ মাস্টারপ্ল্যান দেখুন' : 'Explore Complete Eco Masterplan'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. GREEN LAKESIDE PROPERTIES SHOWCASE
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#064E3B]/10 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#064E3B] font-bold block">
              ECO RESIDENTIAL PORTFOLIO
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#062E25]">
              {isBn ? 'লেকভিউ প্লট ও গার্ডেন ভিলা' : 'Available Lakeview Plots & Green Villas'}
            </h2>
          </div>
          <Link
            to="/properties"
            className="text-xs font-mono text-[#064E3B] hover:text-[#047857] transition-colors flex items-center gap-1 shrink-0 font-bold"
          >
            <span>{isBn ? 'সকল ৪৮টি সম্পত্তি দেখুন' : 'View All 48 Properties'}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((prop) => (
            <div
              key={prop.id}
              className="group rounded-3xl overflow-hidden bg-white border border-[#064E3B]/15 hover:border-[#064E3B] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/dakhina-live/DSCF8649.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#064E3B] text-[10px] font-mono font-bold uppercase shadow-sm">
                  {prop.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                  <span className="font-bold text-white text-sm">
                    {formatBDT(prop.price)}
                  </span>
                  <span className="text-neutral-200">{prop.landSizeKatha} Katha</span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#062E25] group-hover:text-[#064E3B] transition-colors line-clamp-1">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-[#4B6358] mt-1 line-clamp-2">
                    {prop.locationArea} — Red-Clay Highland & Lake Corridor.
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#064E3B] font-bold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="h-3 w-3" /> 0% Piling Overhead
                  </span>
                  <Link
                    to={`/properties/${prop.slug}`}
                    className="text-[#064E3B] hover:text-[#047857] font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>View Property</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. DEFENSE GENERAL OFFICER ECO SANCTUARY REVIEWS
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#064E3B] text-white space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#34D399] font-bold block">
                AUTHENTIC DEFENSE RESIDENT TESTIMONIALS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                {isBn ? 'সিনিয়র সামরিক কর্মকর্তাদের শান্তিপূর্ণ বসবাসের নিশ্চয়তা' : 'Defense General Officers On Living in Dakhina City'}
              </h2>
            </div>
            <div className="text-xs font-mono text-[#34D399]">
              REHAB MEMBER #495 // BAFWT JOINT VENTURE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEFENSE_ECO_REVIEWS.map((review, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-4 flex flex-col justify-between backdrop-blur-sm">
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic">
                  "{isBn ? review.quote.bn : review.quote.en}"
                </p>
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white">{isBn ? review.bnName : review.name}</h4>
                  <span className="text-xs text-[#34D399] font-mono block">{review.branch}</span>
                  <span className="text-[10px] text-neutral-400 font-mono block">{review.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. STATUTORY ENVIRONMENTAL CLEARANCES
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#064E3B] font-bold block">
            REGULATORY & ECOLOGICAL CLEARANCES
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#062E25]">
            {isBn ? 'পরিবেশ অধিদপ্তর ও রাষ্ট্রীয় সংবিধিবদ্ধ অনুমোদন' : 'Statutory Clearances & Environmental Sanctions'}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATUTORY_GREEN_AGENCIES.map((agency) => (
            <div
              key={agency.short}
              className="p-4 rounded-2xl bg-white border border-[#064E3B]/15 hover:border-[#064E3B] transition-all flex flex-col items-center text-center space-y-2.5 shadow-sm group"
            >
              <div className="w-14 h-14 rounded-full p-1 bg-[#E8F5E9] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src={agency.file}
                  alt={agency.name}
                  className="w-12 h-12 object-contain rounded-full bg-white p-1"
                />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-[#062E25] block">{agency.short}</span>
                <span className="text-[10px] text-[#4B6358] block line-clamp-1">{agency.bn}</span>
                <span className="text-[9px] font-mono text-[#064E3B] font-bold block mt-1">{agency.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4K Drone Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-[#064E3B]/50 shadow-2xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Dakhina City Eco Drone Tour"
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

export default TropicalHome;
