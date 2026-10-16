import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Agency {
  id: string;
  name: string;
  bnName: string;
  logo: string;
  role: string;
  bnRole: string;
}

const AGENCIES: Agency[] = [
  {
    id: 'wdb',
    name: 'Bangladesh Water Development Board',
    bnName: 'বাংলাদেশ পানি উন্নয়ন বোর্ড',
    logo: './assets/dakhina-live/wdb-150x150.png',
    role: 'Hydrology, flood safety & water flow clearance',
    bnRole: 'হাইড্রোলজি ও বন্যা নিরোধক ছাড়পত্র',
  },
  {
    id: 'wasa',
    name: 'Dhaka WASA',
    bnName: 'ঢাকা ওয়াসা',
    logo: './assets/dakhina-live/wasa-150x150.png',
    role: 'Water supply pipeline & drainage grid clearance',
    bnRole: 'পানি সরবরাহ ও পয়ঃনিষ্কাশন অনুমোদন',
  },
  {
    id: 'police',
    name: 'Bangladesh Police',
    bnName: 'বাংলাদেশ পুলিশ',
    logo: './assets/dakhina-live/police-150x150.jpg',
    role: 'Law & order, civic safety security clearance',
    bnRole: 'সার্বিক আইন-শৃঙ্খলা ও নিরাপত্তা ছাড়পত্র',
  },
  {
    id: 'rajuk',
    name: 'RAJUK (Capital Development Authority)',
    bnName: 'রাজউক (রাজধানী উন্নয়ন কর্তৃপক্ষ)',
    logo: './assets/dakhina-live/rajuk-150x150.jpg',
    role: 'Detailed Area Plan (DAP) homestead zoning alignment',
    bnRole: 'ডিটেইল্ড এরিয়া প্ল্যান (ড্যাপ) অনুমোদন',
  },
  {
    id: 'titas',
    name: 'Titas Gas Transmission & Distribution',
    bnName: 'তিতাস গ্যাস ট্রান্সমিশন অ্যান্ড ডিস্ট্রিবিউশন',
    logo: './assets/dakhina-live/titas-150x150.jpeg',
    role: 'Liaison for underground energy pipeline corridor',
    bnRole: 'গ্যাস লাইন ও জ্বালানি করিডোর অনুমোদন',
  },
  {
    id: 'fire',
    name: 'Fire Service & Civil Defence',
    bnName: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স',
    logo: './assets/dakhina-live/fire-150x150.png',
    role: 'Fire safety egress & 80ft arterial road clearance',
    bnRole: 'অগ্নি নিরাপত্তা ও প্রশস্ত সংযোগ সড়ক অনুমোদন',
  },
  {
    id: 'doe',
    name: 'Department of Environment',
    bnName: 'পরিবেশ অধিদপ্তর',
    logo: './assets/dakhina-live/doe-150x150.png',
    role: 'Ecological equilibrium & natural lake preservation',
    bnRole: 'পরিবেশগত অবস্থান ও জলাধার সংরক্ষণ ছাড়পত্র',
  },
  {
    id: 'dtca',
    name: 'Dhaka Transport Coordination Authority',
    bnName: 'ঢাকা পরিবহন সমন্বয় কর্তৃপক্ষ',
    logo: './assets/dakhina-live/dtca-150x150.jpeg',
    role: 'Regional highway corridor & Metro Line 6 integration',
    bnRole: 'আঞ্চলিক মহাসড়ক ও মেট্রো লাইন সমন্বয়',
  },
];

const PROGRESS_PHOTOS = [
  {
    image: './assets/dakhina-live/60.jpg',
    caption: {
      en: '60ft & 80ft Main Boulevard Demarcation',
      bn: '৬০ ও ৮০ ফুট প্রশস্ত প্রধান সংযোগ সড়ক ও সীমানা প্রাচীর',
    },
  },
  {
    image: './assets/dakhina-live/beutyfication2.jpg',
    caption: {
      en: 'Lakeview Residential Compound & Villas',
      bn: 'লেকভিউ আবাসিক জোন ও বিলাসবহুল ভিলা এরিয়া',
    },
  },
  {
    image: './assets/dakhina-live/project_work3-1024x610.jpg',
    caption: {
      en: 'Underground Drainage & Culvert Construction',
      bn: 'ভূগর্ভস্থ আরসিসি ড্রেনেজ ও বক্স কালভার্ট নির্মাণ',
    },
  },
  {
    image: './assets/dakhina-live/beutyfication4.jpg',
    caption: {
      en: 'Paved Eco-Walkways & Tree Plantation',
      bn: 'ইকো ওয়াকওয়ে, বৃক্ষরোপণ ও মনোরম পুষ্পকানন',
    },
  },
];

export const ApprovedAgenciesSection: React.FC = () => {
  const { isBn } = useLanguage();

  return (
    <section className="py-16 bg-white border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8934A]">
            {isBn ? 'সংবিধিবদ্ধ আইনি সনদ' : 'Statutory Clearances & Government Alliances'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#f37d20] tracking-tight">
            {isBn ? 'অনুমোদনকারী সংস্থাসমূহ' : 'Approved by Following Agencies'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-2xl mx-auto">
            {isBn
              ? 'দখিনা সিটি প্রকল্পের প্রতিটি প্লট ও সড়ক ব্যবস্থা গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সকল সংশ্লিষ্ট সংবিধিবদ্ধ সংস্থা দ্বারা অনুমোদিত।'
              : 'Every parcel and boulevard in Dakhina City adheres strictly to statutory regulatory mandates of the Government of Bangladesh.'}
          </p>
        </div>

        {/* Agency Circular Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center justify-center">
          {AGENCIES.map((agency) => (
            <div
              key={agency.id}
              className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-emerald-50/50 transition-all duration-300"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white p-2 shadow-md border-2 border-neutral-100 group-hover:border-[#128341] group-hover:shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden">
                <img
                  src={agency.logo}
                  alt={agency.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain p-1 filter group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './assets/dakhina-live/rajuk-150x150.jpg';
                  }}
                />
              </div>
              <span className="text-[11px] font-bold text-neutral-800 mt-2.5 leading-snug group-hover:text-[#128341] transition-colors">
                {isBn ? agency.bnName : agency.name}
              </span>
              <span className="text-[9px] text-neutral-400 mt-0.5 line-clamp-1">
                {isBn ? agency.bnRole : agency.role}
              </span>
            </div>
          ))}
        </div>

        {/* 4-Photo Site Development Progress Strip */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#128341]" />
              <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                {isBn ? 'সরেজমিন উন্নয়ন অগ্রগতি' : 'On-Site Realized Development Progress'}
              </span>
            </div>
            <Link
              to="/dakhina-city"
              className="text-xs font-bold text-[#128341] hover:text-[#0c3620] flex items-center gap-1 group"
            >
              <span>{isBn ? 'সম্পূর্ণ মাস্টারপ্ল্যান দেখুন' : 'View Masterplan & Infrastructure'}</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRESS_PHOTOS.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-neutral-200 aspect-[4/3] bg-neutral-100 hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.caption.en}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './assets/dakhina-live/beutyfication.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <p className="text-[11px] font-semibold leading-tight drop-shadow-sm">
                    {isBn ? item.caption.bn : item.caption.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
