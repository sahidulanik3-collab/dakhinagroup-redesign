import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import propertiesData from '../../data/properties.json';
import { PropertyItem } from '../../data/schema';
import { formatBDT } from '../../lib/utils';
import {
  ArrowRight,
  Layers,
  ChevronRight,
  ShieldCheck,
  Play,
  X,
  Search,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

const SLIDE_VIEWS = [
  { id: 'drone', label: 'Aerial View 01', img: './assets/dakhina-live/DSCF8649.jpg', caption: 'High-Elevation Aerial Survey across 1,200 Bigha Highland' },
  { id: 'road', label: 'Boulevard 02', img: './assets/dakhina-live/60.jpg', caption: 'Demarcated 60ft and 80ft Arterial Road Network' },
  { id: 'lake', label: 'Enclave 03', img: './assets/dakhina-live/beutyfication2.jpg', caption: 'Lakeview Residential Compound & Private Boundary' },
];

const PLOT_SPECS = [
  { size: '3 Katha', dim: '30ft x 72ft', facing: 'South & Lake-Facing', road: '40ft & 60ft Wide', piling: '0% Piling Cost (Natural Highland)', status: 'Ready for Mutation' },
  { size: '5 Katha', dim: '40ft x 90ft', facing: 'North-East Corner', road: '60ft Boulevard', piling: 'High-Consolidation Red Clay', status: 'Immediate Possession' },
  { size: '10 Katha', dim: '60ft x 120ft', facing: 'Lakefront & Park View', road: '80ft Express Arterial', piling: 'Maximum FAR Advantage', status: 'Executive Defense Enclave' },
];

const DEFENSE_HONORS = [
  {
    name: 'Major General Tawhidul Islam (Retd.)',
    bnName: 'মেজর জেনারেল তৌহিদুল ইসলাম (অব.)',
    branch: 'Bangladesh Army',
    allotment: 'Sector 2 Executive Enclave',
    quote: 'The uncompromised documentation integrity and prompt mutation at Dakhina City set a new national standard.',
    bnQuote: 'দখিনা সিটির আইনি বিশুদ্ধতা ও দ্রুত নামজারি বাংলাদেশের আবাসন খাতে এক অনন্য দৃষ্টান্ত স্থাপন করেছে।',
  },
  {
    name: 'Brigadier General Abdul Alim Tarapder (Retd.)',
    bnName: 'ব্রিগেডিয়ার জেনারেল আব্দুল আলিম তরফদার (অব.)',
    branch: 'Bangladesh Army',
    allotment: 'Lakefront Highland Estate',
    quote: 'Direct proximity to Uttara Sector 18 and Dhaka Cantonment makes this our ultimate residential sanctuary.',
    bnQuote: 'উত্তরা ১৮ নম্বর সেক্টর ও সেনানিবাসের নৈকট্য এটিকে আমাদের জন্য সবচেয়ে নির্ভরযোগ্য শান্তিময় আবাসন করে তুলেছে।',
  },
  {
    name: 'Brigadier General Dr. Chowdhury Abdul Gaffar (Retd.)',
    bnName: 'ব্রিগেডিয়ার জেনারেল ড. চৌধুরী আব্দুল গাফফার (অব.)',
    branch: 'Bangladesh Army',
    allotment: 'Highland Boulevard Sector 1',
    quote: 'Transparent boundary demarcation, freehold ownership, and genuine physical possession give absolute confidence.',
    bnQuote: 'স্বচ্ছ সীমানা প্রাচীর, রেজিস্ট্রিকৃত মালিকানা এবং প্রকৃত দখল বিনিয়োগকারী হিসেবে পূর্ণ নিশ্চয়তা দেয়।',
  },
];

const STATUTORY_AGENCIES = [
  { short: 'BWDB', name: 'Water Development Board', bn: 'পানি উন্নয়ন বোর্ড', file: './assets/dakhina-live/wdb-150x150.png', reg: 'Clearance #HYD-409/08' },
  { short: 'DWASA', name: 'Dhaka WASA Drainage', bn: 'ঢাকা ওয়াসা', file: './assets/dakhina-live/wasa-150x150.png', reg: 'Water Grid Approval' },
  { short: 'POLICE', name: 'Bangladesh Police', bn: 'বাংলাদেশ পুলিশ', file: './assets/dakhina-live/police-150x150.jpg', reg: 'Safety Security Egress' },
  { short: 'RAJUK', name: 'RAJUK DAP 2022-35', bn: 'রাজউক ড্যাপ', file: './assets/dakhina-live/rajuk-150x150.jpg', reg: 'Homestead Masterplan' },
  { short: 'TITAS', name: 'Titas Gas Grid', bn: 'তিতাস গ্যাস', file: './assets/dakhina-live/titas-150x150.jpeg', reg: 'Energy Corridor Clear' },
  { short: 'FIRE', name: 'Fire & Civil Defence', bn: 'ফায়ার সার্ভিস', file: './assets/dakhina-live/fire-150x150.png', reg: '80ft Road Clearance' },
  { short: 'DoE', name: 'Dept of Environment', bn: 'পরিবেশ অধিদপ্তর', file: './assets/dakhina-live/doe-150x150.png', reg: 'Eco Hydrology Approved' },
  { short: 'DTCA', name: 'Transport Coordination', bn: 'ডিটিসিএ', file: './assets/dakhina-live/dtca-150x150.jpeg', reg: 'Expressway Integration' },
];

export const MinimalHome: React.FC = () => {
  const { isBn } = useLanguage();
  const navigate = useNavigate();
  const allProps = propertiesData as PropertyItem[];
  const featured = allProps.filter((p) => p.featured).slice(0, 4);

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSpecTab, setActiveSpecTab] = useState(1);
  const [activeCAD, setActiveCAD] = useState<string | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [filterType, setFilterType] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filterType) params.set('category', filterType);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="space-y-24 pb-28 animate-fade-in font-manrope text-[#18181B] bg-[#F8F9FA]">
      {/* ========================================================
          1. ASYMMETRICAL ARCHITECTURAL SPLIT HERO
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Editorial Text Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-[#E4E4E7] shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-[#71717A] uppercase border-b border-neutral-200 pb-3">
                <span className="font-bold text-[#C27803]">REHAB #495</span>
                <span>/</span>
                <span>COORD: 23°50'04"N 90°18'55"E</span>
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#128341] font-bold block">
                  {isBn ? 'আস্থার স্থপতি · ২০০৪ থেকে বিশ্বস্ত' : 'ARCHITECT OF TRUST · ESTABLISHED 2004'}
                </span>
                <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#18181B] leading-[1.08]">
                  {isBn ? (
                    <>
                      পরিকল্পিত জীবনের <br />
                      <span className="font-semibold text-[#18181B]">স্থাপত্য ও নিরাপত্তা</span>
                    </>
                  ) : (
                    <>
                      The Architecture <br />
                      <span className="font-semibold text-[#18181B]">of Generational Trust</span>
                    </>
                  )}
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed font-sans">
                {isBn
                  ? 'ঢাকা সেনানিবাসের ইসিবি চত্বর ও উত্তরা ১৮ নম্বর সেক্টরের সন্নিকটে ১২০০ বিঘার প্রাকৃতিক উঁচু লাল মাটির উপশহর। বাংলাদেশ বিমান বাহিনী ওয়েলফেয়ার ট্রাস্ট ও সিনিয়র সামরিক কর্মকর্তাদের শতভাগ আস্থার নিরাপদ বিনিয়োগ।'
                  : '1,200 Bighas of planned suburban topography adjoining Uttara Sector 18 and Metro Rail Terminal. Honored by Bangladesh Air Force Welfare Trust and defense personnel.'}
              </p>
            </div>

            {/* Quick Filter Form */}
            <form onSubmit={handleSearch} className="space-y-3 pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-[#18181B] focus:outline-none focus:border-[#C27803]"
                >
                  <option value="">{isBn ? 'সকল ৪৮টি ভিলা ও প্লট' : 'Explore All 48 Properties'}</option>
                  <option value="Luxury Villa">{isBn ? 'লাক্সারি ভিলা' : 'Luxury Villa'}</option>
                  <option value="Residential Plot">{isBn ? 'আবাসিক প্লট (৩, ৫, ১০ কাঠা)' : 'Residential Plot'}</option>
                  <option value="Lakeview Estate">{isBn ? 'লেকভিউ এস্টেট' : 'Lakeview Estate'}</option>
                </select>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl bg-[#18181B] hover:bg-[#C27803] text-white text-xs font-semibold shadow-md transition-all shrink-0"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717A] pt-1">
                <span className="flex items-center gap-1 text-[#128341] font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  100% Freehold Mutation
                </span>
                <Link to="/contact-us#schedule" className="hover:text-[#C27803] underline font-semibold">
                  Schedule VIP Tour →
                </Link>
              </div>
            </form>
          </div>

          {/* Right Visual Deck with View Selectors (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-neutral-900 border border-[#E4E4E7] shadow-xl group flex-1">
              <img
                src={SLIDE_VIEWS[activeSlide].img}
                alt="Architectural Masterplan"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Slide Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono text-[#C27803] uppercase tracking-wider block font-bold">
                    SURVEY EXHIBIT
                  </span>
                  <p className="text-xs sm:text-sm font-semibold max-w-md drop-shadow-md">
                    {SLIDE_VIEWS[activeSlide].caption}
                  </p>
                </div>
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-[#18181B] text-xs font-semibold backdrop-blur-md shadow-lg transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Play className="h-3.5 w-3.5 fill-current text-[#C27803]" />
                  <span>4K Drone</span>
                </button>
              </div>
            </div>

            {/* View Switcher Pills */}
            <div className="grid grid-cols-3 gap-3">
              {SLIDE_VIEWS.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActiveSlide(i)}
                  className={`py-3 px-4 rounded-2xl text-left border transition-all text-xs font-mono ${
                    activeSlide === i
                      ? 'bg-white border-[#C27803] text-[#18181B] shadow-md font-bold'
                      : 'bg-white/60 border-neutral-200 text-[#71717A] hover:bg-white'
                  }`}
                >
                  <span className="block text-[10px] text-[#C27803] font-bold">0{i + 1}</span>
                  <span className="truncate block">{v.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. EXCLUSIVE FEATURE: ARCHITECTURAL SPECIFICATION & FAR MATRIX
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl border border-[#E4E4E7] p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-100 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C27803] font-bold block">
                TECHNICAL ENGINEERING SPECIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-[#18181B]">
                {isBn ? 'প্লট স্পেসিফিকেশন ও ইঞ্জিনিয়ারিং তুলনা' : 'Architectural Plot Dimension & Foundation Matrix'}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {PLOT_SPECS.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSpecTab(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeSpecTab === idx
                      ? 'bg-[#18181B] text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {spec.size}
                </button>
              ))}
            </div>
          </div>

          {/* Active Spec Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#F8F9FA] border border-neutral-200 text-xs font-mono">
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase">DIMENSIONS</span>
              <span className="text-sm font-bold text-[#18181B] mt-1 block">{PLOT_SPECS[activeSpecTab].dim}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase">FRONTAGE FACING</span>
              <span className="text-sm font-bold text-[#18181B] mt-1 block">{PLOT_SPECS[activeSpecTab].facing}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase">ROAD CORRIDOR</span>
              <span className="text-sm font-bold text-[#18181B] mt-1 block">{PLOT_SPECS[activeSpecTab].road}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase">FOUNDATION PILING</span>
              <span className="text-sm font-bold text-[#128341] mt-1 block">{PLOT_SPECS[activeSpecTab].piling}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. DEFENSE TRUST: BAF WELFARE TRUST & AIR FORCE EMBLEMS
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E4E4E7] pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#128341] font-bold block">
              DEFENSE TRUST & CLIENT ACCREDITATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-[#18181B]">
              {isBn ? 'আমাদের সম্মানিত ক্লায়েন্ট ও প্রতিরক্ষা নির্ভরতা' : 'Our Respected Clients & Defense Alliance'}
            </h2>
          </div>
          <span className="text-xs font-mono text-[#71717A]">65%+ RESIDENTIAL PLOTS TRUSTED BY ARMED FORCES</span>
        </div>

        {/* Dual Emblems Frame */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E4E4E7] flex items-center gap-5 shadow-sm">
            <div className="h-20 w-20 rounded-full bg-neutral-50 p-2.5 border border-neutral-300 flex items-center justify-center shrink-0">
              <img
                src="./assets/dakhina-live/welfaretrust-r33lvjwn5b3k7hab9swrc3e0d0q171674wldcv3kk0.png"
                alt="BAF Welfare Trust"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#C27803] font-bold uppercase tracking-wider block">
                OFFICIAL LIAISON PARTNER
              </span>
              <h3 className="text-base font-semibold text-[#18181B]">
                {isBn ? 'বাংলাদেশ বিমান বাহিনী ওয়েলফেয়ার ট্রাস্ট' : 'Bangladesh Air Force Welfare Trust'}
              </h3>
              <p className="text-xs text-[#71717A] mt-1">
                {isBn ? 'যৌথ আবাসন সমন্বয় ও আইনি নিশ্চয়তা' : 'Joint Residential Welfare Coordination'}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E4E4E7] flex items-center gap-5 shadow-sm">
            <div className="h-20 w-20 rounded-full bg-neutral-50 p-2.5 border border-neutral-300 flex items-center justify-center shrink-0">
              <img
                src="./assets/dakhina-live/baf-r33lskr1i70vfxlynilafufgn3e6tjcsq680nbig9c.png"
                alt="Bangladesh Air Force"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#C27803] font-bold uppercase tracking-wider block">
                ARMED FORCES DEFENSE SECTOR
              </span>
              <h3 className="text-base font-semibold text-[#18181B]">
                {isBn ? 'বাংলাদেশ বিমান বাহিনী' : 'Bangladesh Air Force'}
              </h3>
              <p className="text-xs text-[#71717A] mt-1">
                {isBn ? 'সম্মানিত সামরিক কর্মকর্তাদের নিশ্চিত বাসস্থান' : 'Institutional Allotment Trust'}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Large Architectural Citation Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEFENSE_HONORS.map((officer, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-[#E4E4E7] shadow-sm flex flex-col justify-between space-y-6 hover:border-[#C27803] transition-colors"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-[#C27803] uppercase tracking-wider block font-bold">
                  CITATION 0{idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-[#3F3F46] leading-relaxed italic">
                  "{isBn ? officer.bnQuote : officer.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#18181B]">{isBn ? officer.bnName : officer.name}</h4>
                  <span className="text-[11px] text-[#71717A] font-mono block mt-0.5">{officer.allotment}</span>
                </div>
                <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#128341] flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          4. STATUTORY CLEARANCES & REALIZED DEVELOPMENT STRIP
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl border border-[#E4E4E7] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C27803] font-bold block">
                INTER-AGENCY REGULATORY CERTIFICATION
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-[#18181B]">
                {isBn ? 'অনুমোদনকারী সংবিধিবদ্ধ সংস্থাসমূহ' : 'Approved by Following Statutory Agencies'}
              </h3>
            </div>
            <span className="text-xs font-mono text-[#71717A]">DAP 2022-2035 HOMESTEAD ZONE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {STATUTORY_AGENCIES.map((agency, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-[#C27803] flex flex-col items-center text-center space-y-2 group transition-all"
              >
                <div className="h-14 w-14 rounded-full bg-white p-2 border border-neutral-200 shadow-sm flex items-center justify-center">
                  <img src={agency.file} alt={agency.name} className="h-full w-full object-contain" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#18181B] leading-tight">
                  {agency.short}
                </span>
                <span className="text-[9px] text-[#71717A] font-mono line-clamp-1">{agency.reg}</span>
              </div>
            ))}
          </div>

          {/* 4 Photos */}
          <div className="pt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-neutral-200 relative group">
              <img src="./assets/dakhina-live/60.jpg" alt="60ft Road" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute bottom-2.5 left-3 right-3 text-white text-[10px] font-mono">
                {isBn ? '৬০ ও ৮০ ফুট মূল সংযোগ সড়ক' : '60ft & 80ft Main Boulevard'}
              </span>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-neutral-200 relative group">
              <img src="./assets/dakhina-live/beutyfication2.jpg" alt="Lakeview Compound" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute bottom-2.5 left-3 right-3 text-white text-[10px] font-mono">
                {isBn ? 'লেকভিউ আবাসিক কম্পাউন্ড' : 'Lakeview Compound'}
              </span>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-neutral-200 relative group">
              <img src="./assets/dakhina-live/project_work3-1024x610.jpg" alt="RCC Drainage" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute bottom-2.5 left-3 right-3 text-white text-[10px] font-mono">
                {isBn ? 'আরসিসি ড্রেনেজ ও বক্স কালভার্ট' : 'Underground RCC Drainage'}
              </span>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-neutral-200 relative group">
              <img src="./assets/dakhina-live/beutyfication4.jpg" alt="Botanical Walkways" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute bottom-2.5 left-3 right-3 text-white text-[10px] font-mono">
                {isBn ? 'ইকো ওয়াকওয়ে ও বৃক্ষরোপণ' : 'Paved Floral Walkways'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. DREL SIGNATURE HEDGE LANDMARK & DRONE VIDEO
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-3">
          <span className="text-xs font-mono uppercase font-bold tracking-widest text-[#128341]">
            ICONIC LANDMARK · DREL
          </span>
          <span className="text-xs font-mono text-[#71717A]">1,200 BIGHA HIGHLAND ENTRY</span>
        </div>

        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-neutral-900 border border-[#E4E4E7] group shadow-xl">
          <img
            src="./assets/dakhina-live/drel-1024x440.jpg"
            alt="DREL Iconic Carved Hedge Garden"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors" />

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsVideoOpen(true)}
              className="h-20 w-20 rounded-full bg-white text-[#18181B] flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95"
              aria-label="Play Dakhina City Drone Video"
            >
              <Play className="h-8 w-8 fill-current translate-x-1 text-[#C27803]" />
            </button>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
            <span>Dakhina Real Estate Limited (DREL) Scenic Entrance Hedge</span>
            <span>Click to Play 4K Drone Tour</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. ARCHITECTURAL PROPERTY SPECIFICATION ROWS
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C27803] font-bold block">
              CURATED INVENTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-[#18181B]">
              {isBn ? 'নির্বাচিত ভিলা ও প্লটসমূহ' : 'Selected Architectural Residences'}
            </h2>
          </div>
          <Link
            to="/properties"
            className="text-xs font-mono font-bold uppercase tracking-wider text-[#18181B] hover:text-[#C27803] transition-colors inline-flex items-center gap-1"
          >
            <span>View All 48 Properties</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {featured.map((prop, idx) => (
            <div
              key={prop.id}
              className="bg-white rounded-3xl border border-[#E4E4E7] p-6 hover:border-[#C27803] transition-all group shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 text-white font-mono text-[10px] uppercase">
                    ARCH-0{idx + 1}
                  </span>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#71717A]">
                    <span className="text-[#C27803] font-bold">{prop.category}</span>
                    <span>•</span>
                    <span>{prop.project}</span>
                    <span>•</span>
                    <span>Facing: {prop.facing}</span>
                  </div>

                  <h3 className="text-xl font-medium text-[#18181B]">
                    <Link to={`/properties/${prop.slug}`} className="hover:text-[#C27803] transition-colors">
                      {prop.title}
                    </Link>
                  </h3>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono text-[#71717A] pt-1">
                    <div>
                      <span className="block text-[10px] text-neutral-400">LAND</span>
                      <span className="font-semibold text-neutral-800">{prop.landSizeKatha} Katha</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-neutral-400">AREA</span>
                      <span className="font-semibold text-neutral-800">{prop.builtAreaSqft} Sq.ft</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-neutral-400">BED/BATH</span>
                      <span className="font-semibold text-neutral-800">{prop.bedrooms}B / {prop.bathrooms}B</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 flex flex-col justify-between items-start lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-4 lg:pt-0 lg:pl-6">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] font-mono text-[#71717A] uppercase block">VALUATION</span>
                    <div className="text-xl font-semibold text-[#18181B]">
                      {formatBDT(prop.price, true, isBn ? 'bn' : 'en')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full lg:w-auto">
                    <button
                      onClick={() => setActiveCAD(activeCAD === prop.id ? null : prop.id)}
                      className="flex-1 lg:flex-none px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-mono font-medium hover:border-[#C27803] transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <Layers className="h-3.5 w-3.5 text-[#C27803]" />
                      <span>CAD Spec</span>
                    </button>
                    <Link
                      to={`/properties/${prop.slug}`}
                      className="px-4 py-2 rounded-xl bg-[#18181B] text-white text-xs font-medium hover:bg-[#C27803] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {activeCAD === prop.id && (
                <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-[10px] font-mono text-[#C27803] uppercase block mb-2 font-bold">
                      ARCHITECTURAL CAD BLUEPRINT
                    </span>
                    <img
                      src={prop.floorPlans[0]?.image || './assets/floorplans/plan-ground.svg'}
                      alt="Floor plan"
                      className="w-full h-48 object-contain rounded"
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">SPECIFICATION SUMMARY</span>
                    <p className="text-neutral-700 leading-relaxed">{prop.floorPlans[0]?.description || 'Modern open-plan living with floor-to-ceiling glass exposure.'}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. CANTONMENT HEADQUARTERS MAP AT ECB CHATTAR
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E4E4E7] bg-white overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-8 min-h-[360px] bg-neutral-100">
            <iframe
              title="Dakhina Tower Cantonment Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.369792440332!2d90.38466637604314!3d23.80544528666352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0c86fffff%3A0x6bfa9e924d55b0a3!2sDakhina%20Group!5e0!3m2!1sen!2sbd!4v1718000000000!5m2!1sen!2sbd"
              className="w-full h-full min-h-[360px] border-0"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-4 p-8 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-neutral-200">
            <div className="space-y-4">
              <span className="text-[11px] font-mono text-[#C27803] uppercase tracking-wider block font-bold">
                PRINCIPAL HEADQUARTERS
              </span>
              <h3 className="text-xl font-light text-[#18181B]">Dakhina Tower</h3>
              <p className="text-xs text-[#71717A] leading-relaxed">
                543/A ECB Chattar, Main Road, Dhaka Cantonment, Dhaka-1206.
              </p>
              <div className="pt-2 text-xs font-mono space-y-1 text-neutral-800">
                <div>HOTLINE: +880 1713-338888</div>
                <div>LIAISON: +880 1713-338899</div>
              </div>
            </div>
            <Link
              to="/contact-us#schedule"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#18181B] text-white text-xs font-semibold hover:bg-[#C27803] transition-colors text-center inline-flex items-center justify-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              <span>{isBn ? 'সাইট ভিজিট সময় নির্ধারণ' : 'Schedule Private Inspection'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-neutral-700 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white transition-colors"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/jsMh07pOAy4?autoplay=1&rel=0"
              title="Dakhina City Drone Tour"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalHome;
