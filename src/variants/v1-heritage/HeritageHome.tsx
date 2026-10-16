import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import propertiesData from '../../data/properties.json';
import { PropertyItem } from '../../data/schema';
import { PropertyCard } from '../../components/shared/PropertyCard';
import { HeroSlider } from '../../components/home/HeroSlider';
import { RespectedClientsSection } from '../../components/home/RespectedClientsSection';
import { ApprovedAgenciesSection } from '../../components/home/ApprovedAgenciesSection';
import { MilestoneGaugeBanner } from '../../components/home/MilestoneGaugeBanner';
import { DrelVideoSection } from '../../components/home/DrelVideoSection';
import { HeadquartersMapSection } from '../../components/home/HeadquartersMapSection';
import {
  ShieldCheck,
  Compass,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Award,
} from 'lucide-react';

export const HeritageHome: React.FC = () => {
  const { isBn, content } = useLanguage();
  const allProps = propertiesData as PropertyItem[];
  const featured = allProps.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="space-y-0 animate-fade-in font-sans">
      {/* 1. Full-Width Hero Drone Slider with Integrated Property Search */}
      <HeroSlider />

      {/* 2. Respected Clients Section (BAFWT + BAF crests + General Officers) */}
      <RespectedClientsSection />

      {/* 3. Approved Agencies Section (Statutory badges + 4 Site Progress Photos) */}
      <ApprovedAgenciesSection />

      {/* 4. Signature Green Milestone Gauge Ribbon (6500, 1800, 2000) */}
      <MilestoneGaugeBanner />

      {/* 5. Curated Luxury Residences & Plots Catalog */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#128341]/10 text-[#128341] text-xs font-bold uppercase tracking-widest mb-2">
                <Sparkles className="h-3.5 w-3.5 text-[#128341]" />
                <span>{isBn ? 'প্রিমিয়াম আবাসন সম্ভার' : 'Exclusive Residential Inventory'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0c3620] tracking-tight">
                {isBn ? 'দখিনা সিটির নির্বাচিত ভিলা ও প্লট' : 'Featured Architectural Villas & Plots'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
                {isBn
                  ? 'প্রাকৃতিক লাল মাটির নিষ্কণ্টক দাগ-খতিয়ান সম্বলিত ৩, ৫ ও ১০ কাঠার আবাসিক প্লট এবং পরিবেশবান্ধব লাক্সারি ডুপ্লেক্স।'
                  : 'Freehold registered 3, 5 & 10 Katha plots and bespoke luxury eco-villas with immediate utility clearances.'}
              </p>
            </div>

            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#128341] hover:bg-[#0c3620] text-white font-bold text-xs shadow-md transition-all shrink-0"
            >
              <Compass className="h-4 w-4 text-[#7dba41]" />
              <span>{isBn ? 'সকল ৪৮টি ভিলা দেখুন' : 'Explore All 48 Properties'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 3-Column Grid of Properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Iconic DREL Hedge & Video Showcase */}
      <DrelVideoSection />

      {/* 7. Executive Leadership / Message from MD */}
      <section className="py-16 bg-[#f7faf8] border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-[#128341]/20 shadow-xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#7dba41]/10 via-transparent to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-4 text-center lg:text-left space-y-4">
                <div className="relative inline-block mx-auto lg:mx-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#0c3620] text-[#7dba41] flex items-center justify-center font-serif text-3xl font-black shadow-xl border-4 border-[#7dba41]/30 overflow-hidden">
                    SA
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-[#128341] text-white p-2 rounded-xl shadow-md">
                    <Award className="h-4 w-4 text-[#7dba41]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-[#0c3620]">
                    Lt. Col. Syed Ariful Azam (Retd.)
                  </h3>
                  <p className="text-xs font-bold text-[#128341] uppercase tracking-wider mt-0.5">
                    Managing Director, Dakhina Group
                  </p>
                  <span className="text-[11px] text-neutral-500 block mt-1">
                    Bangladesh Armed Forces (Retd.)
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#128341]/10 text-[#128341] text-[11px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#128341]" />
                  <span>{isBn ? 'দায়িত্বশীল নেতৃত্বের অঙ্গীকার' : 'Executive Commitment to Integrity'}</span>
                </div>

                <p className="italic text-sm sm:text-base text-[#0c3620] font-serif font-semibold">
                  "{content.mdMessage.subtitle}"
                </p>

                <p>{content.mdMessage.paragraphs[0]}</p>

                <div className="pt-2">
                  <Link
                    to="/message-from-md"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#128341] hover:text-[#0c3620] uppercase tracking-wider underline group"
                  >
                    <span>{isBn ? 'ব্যবস্থাপনা পরিচালকের পূর্ণাঙ্গ বার্তা পড়ুন' : 'Read Full Executive Message'}</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Dakhina Tower & Cantonment Strategic Map Section */}
      <HeadquartersMapSection />
    </div>
  );
};

export default HeritageHome;
