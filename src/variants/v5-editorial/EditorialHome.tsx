import React, { useState, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import propertiesData from '../../data/properties.json';
import { PropertyItem } from '../../data/schema';
import { formatBDT } from '../../lib/utils';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Play,
  X,
  Search,
  ChevronRight,
  DollarSign,
  Check,
} from 'lucide-react';

const TITLE_AUDIT_POINTS = [
  {
    id: 'cs',
    title: { en: '1. CS Khatian (Cadastral Survey 1912)', bn: '১. সিএস খতিয়ান (ক্যাডাস্ট্রাল সার্ভে ১৯১২)' },
    status: 'Verified Original',
    mouza: 'Baigartek & Dumni',
    dag: 'Original British CS Dag 104-320',
    desc: {
      en: 'Complete unbroken chain of ownership tracing back over a century to original settlement records. Zero gaps in hereditary succession.',
      bn: 'এক শতাব্দীরও বেশি পুরনো ব্রিটিশ সিএস জরিপ থেকে নিরবচ্ছিন্ন মালিকানার ধারাবাহিক দলিল। কোনো প্রকার ওয়ারিশান জটিলতা নেই।',
    },
  },
  {
    id: 'sa',
    title: { en: '2. SA Khatian (State Acquisition 1956)', bn: '২. এসএ খতিয়ান (স্টেট একুইজিশন ১৯৫৬)' },
    status: 'Ceiling Compliant',
    mouza: 'Dhaka Cantonment Circle',
    dag: 'SA Dag Verified per 1950 Act',
    desc: {
      en: 'Strict adherence to land ceiling limits under the 1950 State Acquisition and Tenancy Act. Free from any vested or abandoned property status.',
      bn: '১৯৫০ সালের জমিদারি অধিগ্রহণ আইন অনুযায়ী ভূমি সিলিং মেনে রেকর্ডকৃত। কোনো প্রকার অর্পিত বা শত্রু সম্পত্তির অস্তিত্ব নেই।',
    },
  },
  {
    id: 'rs',
    title: { en: '3. RS Khatian (Revenue Survey 1972)', bn: '৩. আরএস খতিয়ান (রেভিনিউ সার্ভে ১৯৭২)' },
    status: 'Demarcated & Clear',
    mouza: 'Mirpur-Uttara Sub-District',
    dag: 'RS Dag Boundary Consolidated',
    desc: {
      en: 'Post-liberation revenue survey records completely consolidated with physical boundary demarcations and government cadastral sheets.',
      bn: 'স্বাধীনতোত্তর আরএস জরিপের সাথে সরেজমিনে সীমানা চিহ্নিতকরণ ও সরকারি নকশার শতভাগ মিল নিশ্চিত।',
    },
  },
  {
    id: 'bs',
    title: { en: '4. BS / City Survey Khatian (1998)', bn: '৪. বিএস / সিটি জরিপ খতিয়ান (১৯৯৮)' },
    status: 'Official Ledger Match',
    mouza: 'Tejgaon Revenue Circle',
    dag: 'BS Plot Demarcation Finalized',
    desc: {
      en: 'Latest municipal and metropolitan city survey ledger accurately reflects Dakhina Group freehold title with zero overlapping claims.',
      bn: 'সর্বশেষ ঢাকা সিটি জরিপের সরকারি বালাম বইয়ে দখিনা গ্রুপের নামে বৈধ রেকর্ডভুক্ত ও চূড়ান্ত খতিয়ান বিদ্যমান।',
    },
  },
  {
    id: 'namjari',
    title: { en: '5. Mutation (Namjari) & DCR Receipt', bn: '৫. নামজারি (মিউটেশন) ও ডিসিআর দাখিলা' },
    status: 'Instant e-Namjari',
    mouza: 'AC Land Office Clearance',
    dag: 'Current Fiscal Tax Paid 2025-26',
    desc: {
      en: 'Up-to-date Land Development Tax (Khajna) paid, DCR receipt issued, and individual freehold mutation porcha ready for immediate registration.',
      bn: 'চলতি অর্থবছরের শতভাগ ভূমি উন্নয়ন কর (খাজনা) পরিশোধিত, ডিসিআর রশিদ ও ক্রেতার নামে সরাসরি নামজারি নিশ্চিত।',
    },
  },
  {
    id: 'nec',
    title: { en: '6. 30-Year Non-Encumbrance (NEC)', bn: '৬. ৩০ বছরের নির্দায় সনদ (এনইসি সার্চ)' },
    status: '100% Freehold Unencumbered',
    mouza: 'Dhaka Sub-Registry Office',
    dag: 'Search Receipt #NEC-2024/88',
    desc: {
      en: 'Certified 30-year non-encumbrance certificate issued by the Sub-Registrar confirming zero mortgage, bank lien, or litigation.',
      bn: 'সাব-রেজিস্ট্রি অফিস থেকে প্রদত্ত ৩০ বছরের নির্দায় সনদ—জমিটি কোনো ব্যাংক ঋণ বা আর্থিক দায়বদ্ধতায় আবদ্ধ নয়।',
    },
  },
];

const INSTALLMENT_TIERS = [
  { size: '3 Katha Executive', basePrice: 7500000, label: '3 Katha' },
  { size: '5 Katha Deluxe', basePrice: 12500000, label: '5 Katha' },
  { size: '10 Katha Lakefront', basePrice: 25000000, label: '10 Katha' },
];

const STATUTORY_GAZETTE_MATRIX = [
  { agency: 'RAJUK', full: 'Rajdhani Unnayan Kartripakkha', ref: 'Memo #RAJUK/DAP/2022-35/N-14', status: 'DAP Approved', date: 'Official Gazette' },
  { agency: 'BWDB', full: 'Bangladesh Water Development Board', ref: 'Memo #BWDB/HYD/409/08', status: 'Hydrology Cleared', date: 'Gazetted' },
  { agency: 'DWASA', full: 'Dhaka Water Supply & Sewerage', ref: 'Clearance #WASA/SEW/912', status: 'Drainage Cleared', date: 'Approved' },
  { agency: 'DoE', full: 'Department of Environment', ref: 'EIA Clearance #DoE/ENV/1874', status: 'Eco Sanctioned', date: 'Certified' },
  { agency: 'POLICE', full: 'Bangladesh Police Special Branch', ref: 'Security Clearance #SB/SEC/882', status: 'Safety Cleared', date: 'Approved' },
  { agency: 'FSCD', full: 'Fire Service & Civil Defence', ref: 'Clearance #FSCD/ROAD/80FT-3', status: 'Emergency Egress', date: 'Certified' },
  { agency: 'TITAS', full: 'Titas Gas Transmission Co.', ref: 'Grid Right-of-Way #TGTD/COR/55', status: 'Corridor Clear', date: 'Approved' },
  { agency: 'DTCA', full: 'Dhaka Transport Coordination', ref: 'Transit Integration #DTCA/EXP/204', status: 'Integrated', date: 'Endorsed' },
];

const DEFENSE_DISPATCHES = [
  {
    serial: 'DISPATCH-AF-2024/01',
    name: 'Major General Tawhidul Islam (Retd.)',
    bnName: 'মেজর জেনারেল তৌহিদুল ইসলাম (অব.)',
    role: 'Former Master General of the Ordnance',
    endorsement: {
      en: 'In matters of land documentation, certainty is everything. Dakhina Group’s 6-point statutory title chain represents the gold standard of real estate transparency in Bangladesh.',
      bn: 'জমির মালিকানায় আইনি নিশ্চয়তাই প্রধান। দখিনা গ্রুপের ৬ স্তরের খতিয়ান যাচাই ও রাষ্ট্রীয় অনুমোদন বাংলাদেশের রিয়েল এস্টেট খাতে এক উজ্জ্বল দৃষ্টান্ত।',
    },
  },
  {
    serial: 'DISPATCH-AF-2024/02',
    name: 'Brigadier General Abdul Alim Tarapder (Retd.)',
    bnName: 'ব্রিগেডিয়ার জেনারেল আব্দুল আলিম তরফদার (অব.)',
    role: 'Former Station Commander, Dhaka Cantonment',
    endorsement: {
      en: 'The direct link between ECB Chattar and Dakhina City, combined with Bangladesh Air Force Welfare Trust endorsement, offers complete peace of mind for retired officers.',
      bn: 'ইসিবি চত্বর থেকে সরাসরি যোগাযোগ এবং বিমান বাহিনী ওয়েলফেয়ার ট্রাস্টের অংশীদারিত্ব অবসরপ্রাপ্ত কর্মকর্তাদের জন্য শতভাগ নিরাপদ আস্থার পরিবেশ তৈরি করেছে।',
    },
  },
  {
    serial: 'DISPATCH-AF-2024/03',
    name: 'Brigadier General Dr. Chowdhury Abdul Gaffar (Retd.)',
    bnName: 'ব্রিগেডিয়ার জেনারেল ড. চৌধুরী আব্দুল গাফফার (অব.)',
    role: 'Senior Consultant & Defense Medical Veteran',
    endorsement: {
      en: 'Immediate possession, verified mutation receipts, and crystal-clear boundary demarcations make Dakhina City a legally unassailable asset for future generations.',
      bn: 'তাত্ক্ষণিক দখল, শতভাগ নামজারি এবং নিখুঁত সীমানা প্রাচীর দখিনা সিটিকে ভবিষ্যৎ প্রজন্মের জন্য একটি সম্পূর্ণ নিরাপদ সম্পদে পরিণত করেছে।',
    },
  },
];

export const EditorialHome: React.FC = () => {
  const { isBn } = useLanguage();
  const navigate = useNavigate();
  const allProps = propertiesData as PropertyItem[];
  const featured = allProps.filter((p) => p.featured).slice(0, 6);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedAuditPoint, setSelectedAuditPoint] = useState<string>('cs');

  // Form Filter State
  const [selectedCategory, setSelectedCategory] = useState('');
  const categorySelectId = useId();

  // Installment Simulator State
  const [tierIndex, setTierIndex] = useState<number>(0); // 3 Katha, 5 Katha, 10 Katha
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 20% to 50%
  const [tenureMonths, setTenureMonths] = useState<number>(36); // 12 to 60 months

  // Calculation:
  const selectedTier = INSTALLMENT_TIERS[tierIndex];
  const totalPrice = selectedTier.basePrice;
  const bookingAmount = Math.round(totalPrice * (downPaymentPercent / 100));
  const handoverAmount = Math.round(totalPrice * 0.10); // 10% on registry / handover
  const remainingForEmi = totalPrice - bookingAmount - handoverAmount;
  const monthlyEmi = Math.round(remainingForEmi / tenureMonths);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-28 animate-fade-in font-sans text-[#0F172A] bg-[#F8FAFC] selection:bg-[#0F172A] selection:text-white">
      {/* ========================================================
          1. SOVEREIGN REGULATORY GAZETTE HERO
      ======================================================== */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Official Gazette Status Header */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0F172A] text-white border-2 border-[#1E293B] shadow-lg flex flex-wrap items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#22C55E] animate-ping" />
              <div>
                <span className="text-[10px] uppercase text-[#CA8A04] tracking-widest block font-bold">
                  STATE REGULATORY AUDIT & OFFICIAL GAZETTE
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  RAJUK DAP 2022-2035 COMPLIANT // REHAB MEMBER #495
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded bg-[#1E293B] border border-white/20 text-[#CA8A04] font-bold">
                BAFWT JOINT VENTURE
              </span>
              <span className="text-neutral-400 hidden md:inline">100% UNCONDITIONAL FREEHOLD</span>
            </div>
          </div>

          {/* Large Hero Stage */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] lg:aspect-[21/9] border-2 border-[#0F172A]/30 shadow-2xl bg-neutral-900 group">
            <img
              src="./assets/dakhina-live/DSCF8646.jpg"
              alt="Dakhina City Sovereign Masterplan"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './assets/dakhina-live/DSCF8649.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />

            {/* Stage Text Overlay */}
            <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 space-y-4 max-w-3xl text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E293B]/90 border border-white/20 text-[#CA8A04] text-xs font-mono font-bold tracking-widest uppercase">
                <FileText className="h-3.5 w-3.5" />
                <span>{isBn ? 'ইনস্টিটিউশনাল প্রাইম · সার্বভৌম আইনি নিশ্চয়তা' : 'INSTITUTIONAL PRIME · SOVEREIGN TITLE RECORD'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.08]">
                {isBn ? (
                  <>
                    আইনি বিশুদ্ধতায় <br />
                    <span className="text-[#CA8A04]">শতভাগ আপসহীন</span> দখিনা সিটি
                  </>
                ) : (
                  <>
                    The Sovereign Standard of <br />
                    <span className="text-[#CA8A04]">Uncompromised Title</span>
                  </>
                )}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl font-sans">
                {isBn
                  ? 'ঢাকা সেনানিবাসের ইসিবি চত্বর ও উত্তরা ১৮ নম্বর সেক্টর সংলগ্ন ১২০০ বিঘার প্রাকৃতিক উঁচু লাল মাটির উপশহর। বাংলাদেশ বিমান বাহিনী ওয়েলফেয়ার ট্রাস্ট ও শীর্ষ প্রতিরক্ষা কর্মকর্তাদের অবিচল আস্থার প্রতীক।'
                  : '1,200 Bighas of planned suburban topography adjoining Uttara Sector 18 and Metro Terminal. Audited title, verified Khatian continuity, and zero dispute guarantees.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-white/30 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2"
                >
                  <Play className="h-4 w-4 fill-current text-[#CA8A04]" />
                  <span>{isBn ? 'ভিডিও ড্রোন পরিদর্শন' : 'Inspect 4K Drone Footage'}</span>
                </button>
                <a
                  href="#title-audit"
                  className="px-6 py-3.5 rounded-xl bg-[#CA8A04] hover:bg-[#EAB308] text-[#0F172A] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 font-mono"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>{isBn ? '৬ স্তরের খতিয়ান অডিট দেখুন' : 'Inspect 6-Point Title Audit'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Legal Search */}
          <form
            onSubmit={handleSearch}
            className="p-5 rounded-2xl bg-white border-2 border-[#0F172A]/10 shadow-xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center font-mono"
          >
            <div className="sm:col-span-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-100 border border-neutral-300">
              <FileText className="h-4 w-4 text-[#0F172A] shrink-0" />
              <label htmlFor={categorySelectId} className="sr-only">
                {isBn ? 'প্লট ক্যাটাগরি' : 'Plot Category'}
              </label>
              <select
                id={categorySelectId}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs text-[#0F172A] font-bold focus:outline-none cursor-pointer"
              >
                <option value="">{isBn ? 'সকল রেজিস্ট্রিকৃত প্লট (৪৮টি)' : 'All Registered Plots (48 Available)'}</option>
                <option value="Residential Plot">{isBn ? 'আবাসিক প্লট (৩, ৫, ১০ কাঠা)' : 'Residential Plot (3, 5, 10 Katha)'}</option>
                <option value="Lakeview Estate">{isBn ? 'লেকভিউ কর্নার এস্টেট' : 'Lakeview Corner Estate'}</option>
                <option value="Luxury Villa">{isBn ? 'এক্সিকিউটিভ ভিলা' : 'Executive Villa'}</option>
              </select>
            </div>

            <div className="sm:col-span-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-100 border border-neutral-300 text-xs text-[#0F172A]">
              <ShieldCheck className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span className="truncate font-bold">{isBn ? 'সিএস/এসএ/আরএস/বিএস বালাম প্রস্তুত' : 'CS/SA/RS/BS Ledgers Validated'}</span>
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4 text-[#CA8A04]" />
                <span>{isBn ? 'প্লট খুঁজুন' : 'Search Plots'}</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ========================================================
          2. EXCLUSIVE FEATURE: 6-POINT STATUTORY TITLE PURITY AUDIT
      ======================================================== */}
      <section id="title-audit" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#0F172A]/20 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0F172A] text-[#CA8A04] text-[11px] font-mono tracking-widest uppercase font-bold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>MANDATORY LEGAL DUE DILIGENCE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0F172A]">
                {isBn ? '৬ স্তরের খতিয়ান ও মালিকানা বিশুদ্ধতা অডিট চেকলিস্ট' : '6-Point Statutory Title Purity & Khatian Audit Tool'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                {isBn
                  ? 'বাংলাদেশে জমি ক্রয়ে সবচেয়ে গুরুত্বপূর্ণ হলো দলিলের নিশ্ছিদ্র ধারাবাহিকতা। দখিনা সিটির প্রতিটি প্লটের সিএস থেকে শুরু করে বিএস পর্যন্ত সকল রেকর্ড সরকারি বালাম বইয়ের সাথে শতভাগ সমন্বিত।'
                  : 'Inspect the uncompromised chain of legal custody from 1912 British Cadastral Survey to present-day municipal e-Namjari records.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F172A] text-white text-right font-mono">
              <span className="text-[10px] text-[#CA8A04] block font-bold uppercase">TITLE STATUS</span>
              <span className="text-2xl font-bold text-white flex items-center gap-1.5 justify-end">
                <CheckCircle2 className="h-6 w-6 text-[#22C55E]" />
                100% PURE
              </span>
              <span className="text-[10px] text-neutral-400 block">Zero Dispute Guarantee</span>
            </div>
          </div>

          {/* Interactive Audit Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {TITLE_AUDIT_POINTS.map((point) => (
              <button
                key={point.id}
                onClick={() => setSelectedAuditPoint(point.id)}
                className={`p-3.5 rounded-xl border text-left transition-all font-mono ${
                  selectedAuditPoint === point.id
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                  <span className={selectedAuditPoint === point.id ? 'text-[#CA8A04]' : 'text-neutral-500'}>
                    STAGE {point.id.toUpperCase()}
                  </span>
                  <Check className="h-3.5 w-3.5 text-[#22C55E]" />
                </div>
                <h4 className="text-xs font-bold line-clamp-1">{isBn ? point.title.bn : point.title.en}</h4>
              </button>
            ))}
          </div>

          {/* Detailed Audit Display */}
          {(() => {
            const activePoint = TITLE_AUDIT_POINTS.find((p) => p.id === selectedAuditPoint) || TITLE_AUDIT_POINTS[0];
            return (
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50 border-2 border-[#0F172A]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded bg-[#0F172A] text-[#CA8A04] text-xs font-mono font-bold">
                      {activePoint.status}
                    </span>
                    <span className="text-xs font-mono text-neutral-600">
                      Mouza: <strong className="text-neutral-900">{activePoint.mouza}</strong>
                    </span>
                    <span className="text-xs font-mono text-neutral-600">
                      Record: <strong className="text-neutral-900">{activePoint.dag}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A]">
                    {isBn ? activePoint.title.bn : activePoint.title.en}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                    {isBn ? activePoint.desc.bn : activePoint.desc.en}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-[#16A34A] font-bold">
                      <CheckCircle2 className="h-4 w-4" />
                      Original Ledgers Inspected & Verified
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-600">Cantonment & Tejgaon Sub-Registry Archive</span>
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 rounded-xl bg-white border border-neutral-300 shadow-sm space-y-3 font-mono">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold block">AUDIT DOCUMENT DISPATCH</span>
                  <div className="text-sm font-bold text-[#0F172A]">Verified Ledger Copy Available</div>
                  <p className="text-[11px] text-neutral-600 font-sans">
                    Schedule an in-person inspection of certified certified Porcha and CS/SA/RS maps at our ECB Chattar HQ.
                  </p>
                  <Link
                    to="/contact-us#legal"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold text-center block transition-all"
                  >
                    Request Certified Copies →
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ========================================================
          3. EXCLUSIVE FEATURE: FLEXIBLE PLOT INSTALLMENT SIMULATOR
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] text-white border-2 border-[#1E293B] shadow-2xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1E293B] text-[#CA8A04] text-[11px] font-mono tracking-widest uppercase font-bold">
                <DollarSign className="h-3.5 w-3.5" />
                <span>TRANSPARENT FINANCIAL STRUCTURING</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                {isBn ? 'প্লট কিস্তি ও পরিশোধ সময়সূচী সিমুলেটর' : 'Interactive Plot Installment & Repayment Schedule Simulator'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300">
                {isBn
                  ? 'আপনার সামর্থ্য ও পছন্দের ওপর ভিত্তি করে ডাউন পেমেন্ট এবং ১২ থেকে ৬০ মাসের কিস্তি নির্ধারণ করুন। কোনো অপ্রকাশিত ফি বা হিডেন চার্জ নেই।'
                  : 'Tailor your booking down payment and monthly tenure from 12 to 60 months with complete fee transparency.'}
              </p>
            </div>

            <div className="text-right font-mono">
              <span className="text-[10px] text-[#CA8A04] block font-bold uppercase">SELECTED PARCEL TOTAL</span>
              <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                ৳{(totalPrice / 100000).toFixed(1)} Lac
              </span>
              <span className="text-[10px] text-neutral-400 block">{selectedTier.size}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-mono">
            {/* Left Controls (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Plot Tier Selector */}
              <div className="space-y-2">
                <span className="text-xs text-neutral-400 block">Select Plot Category:</span>
                <div className="grid grid-cols-3 gap-2">
                  {INSTALLMENT_TIERS.map((tier, idx) => (
                    <button
                      key={tier.size}
                      type="button"
                      onClick={() => setTierIndex(idx)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        tierIndex === idx
                          ? 'bg-[#CA8A04] text-[#0F172A] shadow-md'
                          : 'bg-[#1E293B] text-neutral-300 border border-white/10 hover:bg-[#28374F]'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Down Payment Percentage Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Down Payment Ratio:</span>
                  <span className="text-[#CA8A04] font-bold">{downPaymentPercent}% (৳{(bookingAmount / 100000).toFixed(1)} Lac)</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#CA8A04] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500">
                  <span>20% (Min)</span>
                  <span>35%</span>
                  <span>50% (Max)</span>
                </div>
              </div>

              {/* Installment Tenure Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Tenure (Months):</span>
                  <span className="text-white font-bold">{tenureMonths} Months ({Math.round(tenureMonths / 12)} Years)</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[12, 24, 36, 48, 60].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTenureMonths(m)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${
                        tenureMonths === m
                          ? 'bg-[#CA8A04] text-[#0F172A]'
                          : 'bg-[#1E293B] text-neutral-300 hover:bg-[#28374F]'
                      }`}
                    >
                      {m}M
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]" />
                <span>0% Interest Surcharge for 24-Month Tenure Option.</span>
              </div>
            </div>

            {/* Right Financial Breakdown (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#1E293B] border border-white/10 space-y-2">
                <span className="text-[10px] text-[#CA8A04] uppercase tracking-wider block font-bold">
                  DOWN PAYMENT / BOOKING
                </span>
                <div className="text-3xl font-bold text-white tracking-tight">
                  ৳{(bookingAmount / 100000).toFixed(1)} Lac
                </div>
                <div className="text-xs text-neutral-400">
                  {downPaymentPercent}% of total plot valuation
                </div>
                <div className="pt-2 text-[11px] text-[#22C55E] font-bold">
                  Immediate Demarcation Deed Issued
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#1E293B] border border-white/10 space-y-2">
                <span className="text-[10px] text-[#CA8A04] uppercase tracking-wider block font-bold">
                  MONTHLY INSTALLMENT (EMI)
                </span>
                <div className="text-3xl font-bold text-[#CA8A04] tracking-tight">
                  ৳{monthlyEmi.toLocaleString()}
                </div>
                <div className="text-xs text-neutral-400">
                  Fixed over {tenureMonths} equal monthly installments
                </div>
                <div className="pt-2 text-[11px] text-neutral-300">
                  Zero Bank Paperwork Overhead
                </div>
              </div>

              <div className="sm:col-span-2 p-4 rounded-xl bg-[#0B1220] border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-neutral-400 block">Final Handover Milestone:</span>
                  <span className="text-white font-bold">৳{(handoverAmount / 100000).toFixed(1)} Lac (10% on Mutation & Registry)</span>
                </div>
                <Link
                  to="/contact-us#installment"
                  className="px-4 py-2 rounded-lg bg-[#CA8A04] hover:bg-[#EAB308] text-[#0F172A] text-xs font-bold transition-all"
                >
                  Apply For This Plan →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. INTER-AGENCY STATUTORY CLEARANCE GAZETTE MATRIX
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#0F172A] font-bold block">
              REGULATORY CLEARANCE REGISTRY
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
              {isBn ? '৮টি সংবিধিবদ্ধ সরকারি সংস্থার ছাড়পত্র রেজিস্ট্রি' : 'Statutory Clearances & Regulatory Accreditations'}
            </h2>
          </div>
          <div className="text-xs font-mono text-neutral-600">
            ALL CLEARANCES GAZETTED & PERMANENT
          </div>
        </div>

        {/* Gazette Table */}
        <div className="rounded-2xl border-2 border-[#0F172A]/15 overflow-hidden bg-white shadow-md font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0F172A] text-white border-b border-[#0F172A]">
                  <th className="p-3.5 font-bold">AGENCY</th>
                  <th className="p-3.5 font-bold">STATUTORY AUTHORITY</th>
                  <th className="p-3.5 font-bold">APPROVAL MEMO / RECORD</th>
                  <th className="p-3.5 font-bold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {STATUTORY_GAZETTE_MATRIX.map((row) => (
                  <tr key={row.agency} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-3.5 font-bold text-[#0F172A]">{row.agency}</td>
                    <td className="p-3.5 text-neutral-700">{row.full}</td>
                    <td className="p-3.5 text-neutral-600">{row.ref}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] font-bold text-[10px] inline-flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. DEFENSE HIGH COMMAND GAZETTE DISPATCHES
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#0F172A] font-bold block">
              AUTHENTIC SERVICE DISPATCHES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
              {isBn ? 'সিনিয়র প্রতিরক্ষা কর্মকর্তাদের প্রাতিষ্ঠানিক সুপারিশ' : 'Defense General Officers Institutional Citations'}
            </h2>
          </div>
          <div className="text-xs font-mono text-neutral-600">
            OFFICIAL RESIDENTIAL ALLOTMENT ARCHIVE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEFENSE_DISPATCHES.map((dispatch) => (
            <div
              key={dispatch.serial}
              className="p-6 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#0F172A] transition-all"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-neutral-400 block font-bold">{dispatch.serial}</span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic font-sans">
                  "{isBn ? dispatch.endorsement.bn : dispatch.endorsement.en}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 font-mono">
                <h4 className="text-sm font-bold text-[#0F172A]">{isBn ? dispatch.bnName : dispatch.name}</h4>
                <span className="text-xs text-neutral-500 block">{dispatch.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          6. CURATED PROPERTY LEDGER
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#0F172A] font-bold block">
              REGISTRATION-READY LEDGER
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
              {isBn ? 'উপলব্ধ প্লট ও এস্টেট রেজিস্ট্রি' : 'Available Plots & Property Ledgers'}
            </h2>
          </div>
          <Link
            to="/properties"
            className="text-xs font-mono text-[#0F172A] hover:underline transition-colors flex items-center gap-1 shrink-0 font-bold"
          >
            <span>{isBn ? 'সকল ৪৮টি রেজিস্ট্রি দেখুন' : 'Explore All 48 Properties'}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          {featured.map((prop) => (
            <div
              key={prop.id}
              className="group rounded-2xl overflow-hidden bg-white border-2 border-neutral-200 hover:border-[#0F172A] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
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
                <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#0F172A] text-white text-[10px] font-bold uppercase">
                  {prop.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-black/60 px-3 py-1.5 rounded-lg">
                  <span className="font-bold text-[#CA8A04]">{formatBDT(prop.price)}</span>
                  <span>{prop.landSizeKatha} Katha</span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#CA8A04] transition-colors line-clamp-1">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2 font-sans">
                    {prop.locationArea} — Ready for immediate deed execution.
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[#16A34A] font-bold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="h-3 w-3" /> Ready Mutation
                  </span>
                  <Link
                    to={`/properties/${prop.slug}`}
                    className="text-[#0F172A] hover:underline font-bold flex items-center gap-1"
                  >
                    <span>Dossier</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4K Drone Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Dakhina City Sovereign Masterplan Drone"
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

export default EditorialHome;
