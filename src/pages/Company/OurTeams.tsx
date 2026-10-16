import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { HardHat, Scale, Headphones, Compass, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OurTeams: React.FC = () => {
  const { isBn } = useLanguage();

  const teams = [
    {
      icon: <HardHat className="h-6 w-6 text-amber-600" />,
      title: isBn ? 'সিভিল ইঞ্জিনিয়ারিং ও সার্ভে ক্যাডার' : 'Civil Engineering & Masterplan Cadre',
      desc: isBn
        ? 'সাভার প্রকল্পে সরাসরি সীমানা চিহ্নিতকরণ, ড্রেনেজ ও ১০০ ফুট প্রধান এভিনিউ পাকা করার দায়িত্বে নিয়োজিত অভিজ্ঞ সিভিল প্রকৌশলীবৃন্দ।'
        : 'Senior civil and geotechnical engineers supervising highland grading, 100ft road paving, and underground utilities across all sectors.',
      headcount: isBn ? '২৫+ প্রকৌশলী ও সার্ভেয়ার' : '25+ Engineers & Surveyors',
    },
    {
      icon: <Scale className="h-6 w-6 text-emerald-600" />,
      title: isBn ? 'আইনি পরামর্শক ও দলিলপত্র বিভাগ' : 'Legal & Land Mutation Counsel',
      desc: isBn
        ? 'সিএস, এসএ, আরএস এবং সিটি জরিপ নথিপত্র যাচাইকরণ এবং ক্রেতাদের অনুকূলে নির্ভেজাল দলিলের নিশ্চয়তা বিধানকারী আইনজীবী প্যানেল।'
        : 'Bar-admitted property advocates ensuring seamless deed registration, CS/SA/RS title chain scrutiny, and direct possession mutations.',
      headcount: isBn ? '১২ সদস্যের আইনি প্যানেল' : '12 Title Advocates',
    },
    {
      icon: <Headphones className="h-6 w-6 text-blue-600" />,
      title: isBn ? 'কাস্টমার প্রটোকল ও প্রবাসী ডেস্ক' : 'Customer Protocol & Expatriate Desk',
      desc: isBn
        ? 'সম্মানিত সামরিক কর্মকর্তা এবং প্রবাসী ভাইবোনদের জন্য ২৪/৭ ডেডিকেটেড ভিআইপি সাইট ভিজিট এবং কিস্তির হিসাব সমন্বয়।'
        : 'Dedicated relationship managers coordinating site visit protocols, transport logistics, and embassy-attested powers of attorney.',
      headcount: isBn ? '১৮ প্রটোকল কর্মকর্তা' : '18 Protocol Officers',
    },
    {
      icon: <Compass className="h-6 w-6 text-purple-600" />,
      title: isBn ? 'স্থাপত্য ও মাস্টারপ্ল্যান স্টুডিও' : 'Architectural Design Studio',
      desc: isBn
        ? 'লেকভিউ ও গ্রিন ভিলার আধুনিক সিএডি ফ্লোর প্ল্যান, প্রাকৃতিক বায়ুচলাচল ও পরিবেশবান্ধব নকশা প্রণয়নকারী আর্কিটেক্ট টিম।'
        : 'Creative master planners sculpting sustainable villa layouts, lakeside walking promenades, and energy-conscious architectural footprints.',
      headcount: isBn ? '১০ আর্কিটেকচারাল ডিজাইনার' : '10 CAD Designers',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
          {isBn ? 'দক্ষ জনবল ও বিশেষজ্ঞ প্যানেল' : 'Professional Capabilities'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-gray-900">
          {isBn ? 'আমাদের দক্ষ টিম' : 'Our Experienced Teams'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          {isBn
            ? 'সামরিক শৃঙ্খলা, আইনি বিশুদ্ধতা ও আধুনিক প্রকৌশলবিদ্যার সমন্বয়ে আপনার আস্থার রূপকার'
            : 'Multi-disciplinary professionals upholding military discipline and uncompromised title clarity'}
        </p>
      </div>

      {/* Grid of Team Divisions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teams.map((team, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-white border border-gray-200/80 p-8 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
                {team.icon}
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {team.headcount}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 font-serif">{team.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{team.desc}</p>
          </div>
        ))}
      </div>

      {/* Central Contact / Careers Banner */}
      <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
        <ShieldCheck className="mx-auto h-12 w-12 text-amber-400" />
        <h3 className="text-2xl font-bold font-serif">
          {isBn ? 'দখিনা টিমে যোগ দিতে চান?' : 'Join the Dakhina Group Team'}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
          {isBn
            ? 'আমাদের অভিজ্ঞ সেলস, ইঞ্জিনিয়ারিং বা কাস্টমার প্রটোকল টিমে ক্যারিয়ার গড়তে বর্তমান বিজ্ঞপ্তিগুলো দেখুন।'
            : 'Explore current career opportunities in corporate sales, defense liaison, and civil engineering.'}
        </p>
        <div className="pt-2">
          <Link
            to="/career"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md"
          >
            {isBn ? 'চাকরির বিজ্ঞপ্তি দেখুন' : 'Explore Open Positions'}
          </Link>
        </div>
      </div>
    </div>
  );
};
