import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LeafletMap } from '../components/shared/LeafletMap';
import { Link } from 'react-router-dom';
import {
  Compass,
  FileText,
  Video,
  Calendar,
  ArrowRight,
} from 'lucide-react';

export const DakhinaCity: React.FC = () => {
  const { isBn, content } = useLanguage();
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  const galleryImages = [
    { title: 'Central 100ft Boulevard Access Road', src: './assets/site-road.jpg' },
    { title: 'Sector 4 Ground Grading & Development', src: './assets/project-work.jpg' },
    { title: 'Dakhina City Masterplanned Gateway', src: './assets/drel-banner.jpg' },
    { title: 'Lakefront Villa Waterfront View', src: './assets/properties/villa-1-ext.jpg' },
    { title: 'Luxury Contemporary Residence', src: './assets/properties/villa-2-ext.jpg' },
    { title: 'Phase 1 Demarcation Handover', src: './assets/properties/villa-4-ext.jpg' },
  ];

  const whyChooseReasons = [
    {
      title: isBn ? 'আইনি বিশুদ্ধতা ও তাৎক্ষণিক নিবন্ধন' : '100% Unquestionable Legal Transparency',
      desc: isBn
        ? '২০০৪ সাল থেকে একটানা জমি ক্রয় ও একত্রিতকরণ। প্রতিটি দাগ ও খতিয়ান সম্পূর্ণ নির্ভেজাল এবং তাৎক্ষণিক রেজিস্ট্রেশনযোগ্য।'
        : 'Continuous consolidated land procurement since 2004. Clear CS, SA, RS, and City Jorip records with immediate mutation facility.',
    },
    {
      title: isBn ? 'উত্তরা ও মেট্রোরেলের সরাসরি সান্নিধ্য' : 'Strategic Proximity to Uttara & MRT Line 6',
      desc: isBn
        ? 'উত্তরা ১৮ নম্বর সেক্টর ও দিয়াবাড়ী মেট্রোরেল স্টেশন থেকে মাত্র ১০ মিনিটের দূরত্বে ৩টি প্রশস্ত সংযোগ সড়ক।'
        : 'Less than 10 minutes from Uttara Sector 18 and Diabari Metro Rail Terminal via three broad arterial boulevards.',
    },
    {
      title: isBn ? 'প্রাকৃতিক উঁচু ভূমি (বন্যা মুক্ত)' : 'Natural High-Land (Zero Flood Risk)',
      desc: isBn
        ? 'সাভারের মইস্তাপাড়া ও উত্তর কাউন্দিয়া মৌজার প্রাকৃতিক লাল মাটির উঁচু ভূমি, যা সর্বকালের বন্যা সীমার অনেক ওপরে অবস্থিত।'
        : 'Natural highland topography above historic flood levels, minimizing piling costs and ensuring solid foundation stability.',
    },
    {
      title: isBn ? 'ড্যাপ (DAP) অনুমোদিত গ্রিন হোমস্টেড' : 'Full Detailed Area Plan (DAP) Compliance',
      desc: isBn
        ? 'রাজউকের ডিটেইলড এরিয়া প্ল্যানে রুরাল হোমস্টেড হিসেবে চিহ্নিত, যেখানে সবুজের মাঝে নির্মল জীবনযাপন নিশ্চিত।'
        : 'Designated as Rural Homestead Zone in RAJUK Detailed Area Plan (DAP 2005-2015 & 2022-2035) with eco-conscious ratios.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in">
      {/* Hero Masterplan Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white p-8 sm:p-14 border border-neutral-800 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-400/30">
            <Compass className="h-4 w-4" />
            <span>{isBn ? 'ফ্ল্যাগশিপ মেগা টাউনশিপ' : 'Flagship Masterplanned Township'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif leading-tight">
            {isBn ? 'দখিনা সিটি: প্রকৃতির কোলে আধুনিক নগরজীবন' : 'Dakhina City: Masterplanned Highland Sanctuary'}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
            {isBn
              ? 'সাভার ও উত্তরার মিলনস্থলে প্রায় ১২০০ বিঘা প্রাকৃতিক উঁচু জমিতে গড়ে উঠছে দখিনা সিটি। ৬,৫০০ প্লটের মধ্যে ১,৮০০ প্লট সফলভাবে হস্তান্তর সম্পন্ন হয়েছে।'
              : 'Spanning approximately 1,200 Bigha of natural highland in Savar adjacent to Uttara Model Town. Over 1,800 plots have already been handed over to proud owners.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Link
              to="/properties"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <span>{isBn ? 'ভিলা ক্যাটালগ দেখুন' : 'Explore Available Villas'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="https://dakhinagroup.com/downloads/Dakhina_City_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-200 font-semibold text-xs transition-colors"
            >
              <FileText className="h-4 w-4 text-amber-400" />
              <span>{isBn ? 'ব্রোশিওর ডাউনলোড করুন (PDF)' : 'Download Project Brochure (PDF)'}</span>
            </a>
          </div>
        </div>

        {/* Ambient watermark */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none p-6 font-serif text-[180px] font-black text-white leading-none">
          1200
        </div>
      </div>

      {/* Project Profile Specifications Grid */}
      <div className="space-y-6" id="profile">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            {isBn ? 'প্রকল্পের সারসংক্ষেপ' : 'Technical Specifications'}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {isBn ? 'দখিনা সিটি প্রকল্প পরিচিতি' : 'Official Project Profile'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              {isBn ? 'মৌজা ও অবস্থান' : 'Project Mouza & Location'}
            </span>
            <h4 className="text-sm font-bold text-gray-900 leading-snug">
              {content.projectProfile.location}
            </h4>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              {isBn ? 'মোট আয়তন' : 'Total Masterplan Area'}
            </span>
            <h4 className="text-sm font-bold text-gray-900 leading-snug">
              {content.projectProfile.totalArea}
            </h4>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              {isBn ? 'ড্যাপ জোনিং স্ট্যাটাস' : 'DAP Land Use Zoning'}
            </span>
            <h4 className="text-sm font-bold text-gray-900 leading-snug">
              {content.projectProfile.zoning}
            </h4>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              {isBn ? 'যোগাযোগ ব্যবস্থা' : 'Strategic Connectivity'}
            </span>
            <h4 className="text-sm font-bold text-gray-900 leading-snug">
              {content.projectProfile.connectivity}
            </h4>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="space-y-8" id="why-us">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            {isBn ? 'আমাদের বিশেষত্ব' : 'Why Choose Dakhina City'}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {isBn ? 'কেন দখিনা সিটিতে বিনিয়োগ করবেন?' : 'Four Pillars of Unrivaled Value'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyChooseReasons.map((reason, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{reason.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Video Section */}
      <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 border border-neutral-800 shadow-xl space-y-6" id="video">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Video className="h-4 w-4" />
              <span>{isBn ? 'সরাসরি ভিডিও ডকুমেন্টারি' : 'Official Project Video'}</span>
            </div>
            <h3 className="text-2xl font-bold mt-1">
              {isBn ? 'দখিনা সিটির বাস্তব চিত্র ও সাইট ডেভেলপমেন্ট' : 'Ground Development & Lakefront Progress'}
            </h3>
          </div>
          <Link
            to="/contact-us#schedule"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
          >
            <Calendar className="h-4 w-4" />
            <span>{isBn ? 'সাইট ভিজিট বুক করুন' : 'Book a Live Tour'}</span>
          </Link>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
          <iframe
            src="https://www.youtube.com/embed/jsMh07pOAy4"
            title="Dakhina City Official Project Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>

      {/* Project Gallery */}
      <div className="space-y-6" id="gallery">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            {isBn ? 'প্রকল্প গ্যালারি' : 'On-Site Photography'}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {isBn ? 'দখিনা সিটির বর্তমান দৃশ্যপট' : 'Visual Highlights & Road Works'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedGalleryImg(img.src)}
              className="group relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 cursor-pointer shadow-md border border-gray-100"
            >
              <img
                src={img.src}
                alt={img.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/properties/villa-1-ext.jpg';
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                {img.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Connection Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-extrabold text-gray-900">
          {isBn ? 'প্রকল্পের অবস্থান ও রোড ম্যাপ' : 'Interactive Geographic Coordinates'}
        </h3>
        <div className="h-96 w-full rounded-2xl overflow-hidden border border-gray-200 shadow-md">
          <LeafletMap focusTarget="project" className="h-full w-full" />
        </div>
      </div>

      {/* Gallery Modal Lightbox */}
      {selectedGalleryImg && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 cursor-pointer backdrop-blur-sm"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
            <img
              src={selectedGalleryImg}
              alt="Dakhina City Gallery"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './assets/properties/villa-1-ext.jpg';
              }}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
