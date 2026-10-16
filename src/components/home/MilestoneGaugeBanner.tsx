import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface MetricGauge {
  value: string;
  label: { en: string; bn: string };
  subtext: { en: string; bn: string };
  percentage: number; // 0 to 100 for circular stroke
}

const GAUGES: MetricGauge[] = [
  {
    value: '6500',
    label: { en: 'Total Plot', bn: 'মোট প্লট' },
    subtext: {
      en: 'Masterplanned across 1,200 Bigha highland',
      bn: '১২০০ বিঘায় পরিকল্পিত আবাসন ব্লক',
    },
    percentage: 100,
  },
  {
    value: '1800',
    label: { en: 'Handed Over Plot', bn: 'হস্তান্তরকৃত প্লট' },
    subtext: {
      en: 'Direct boundary demarcation & registered deed',
      bn: 'সরাসরি সীমানা প্রাচীর ও দলিল হস্তান্তর সম্পন্ন',
    },
    percentage: 82,
  },
  {
    value: '2000',
    label: { en: 'Pending', bn: 'প্রক্রিয়াধীন প্লট' },
    subtext: {
      en: 'Fast-track boulevard paving & utility grid',
      bn: 'সড়ক পাকাকরণ ও ইউটিলিটি সংযোগ চলমান',
    },
    percentage: 65,
  },
];

export const MilestoneGaugeBanner: React.FC = () => {
  const { isBn } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#62a42b] via-[#75b538] to-[#128341] text-white py-14 sm:py-16 shadow-inner">
      {/* City Skyline Outline SVG Vector Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex items-end">
        <svg
          className="w-full h-32 sm:h-40 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,120 L0,85 L35,85 L35,55 L50,55 L50,85 L80,85 L80,30 L110,30 L110,85 L140,85 L140,65 L170,65 L170,85 L220,85 L220,20 L240,20 L240,85 L280,85 L280,50 L310,50 L310,85 L350,85 L350,40 L380,40 L380,85 L420,85 L420,10 L445,10 L445,85 L490,85 L490,60 L520,60 L520,85 L560,85 L560,35 L590,35 L590,85 L640,85 L640,45 L680,45 L680,85 L720,85 L720,15 L750,15 L750,85 L800,85 L800,55 L830,55 L830,85 L870,85 L870,30 L900,30 L900,85 L940,85 L940,60 L970,60 L970,85 L1020,85 L1020,25 L1050,25 L1050,85 L1100,85 L1100,45 L1140,45 L1140,85 L1200,85 L1200,120 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-100/90">
            {isBn ? 'বাস্তবায়িত অর্জন ও প্রকল্পের চিত্র' : 'Verified Physical Scale & Handover Track Record'}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-white">
            {isBn ? 'দখিনা সিটির বাস্তব অগ্রগতি' : 'Milestones of Dakhina City'}
          </h2>
        </div>

        {/* 3 Speedometer/Odometer Gauge Circles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto items-center">
          {GAUGES.map((gauge, idx) => {
            const radius = 64;
            const stroke = 8;
            const normalizedRadius = radius - stroke * 2;
            const circumference = normalizedRadius * 2 * Math.PI;
            const strokeDashoffset = circumference - (gauge.percentage / 100) * circumference;

            return (
              <div
                key={idx}
                className="group flex flex-col items-center text-center p-4 transition-transform hover:-translate-y-1 duration-300"
              >
                {/* Circular Gauge Frame */}
                <div className="relative h-44 w-44 sm:h-48 sm:w-48 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-2xl flex items-center justify-center">
                  <svg
                    height={radius * 2.6}
                    width={radius * 2.6}
                    className="transform -rotate-90"
                  >
                    {/* Background Ring */}
                    <circle
                      stroke="rgba(255, 255, 255, 0.2)"
                      fill="transparent"
                      strokeWidth={stroke}
                      r={normalizedRadius}
                      cx={radius * 1.3}
                      cy={radius * 1.3}
                    />
                    {/* Foreground Active Ring */}
                    <circle
                      stroke="#ffffff"
                      fill="transparent"
                      strokeWidth={stroke}
                      strokeDasharray={circumference + ' ' + circumference}
                      style={{ strokeDashoffset }}
                      strokeLinecap="round"
                      r={normalizedRadius}
                      cx={radius * 1.3}
                      cy={radius * 1.3}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  {/* Inner Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <span className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight drop-shadow-md">
                      {gauge.value}
                    </span>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-100 mt-1">
                      {isBn ? gauge.label.bn : gauge.label.en}
                    </span>
                  </div>
                </div>

                {/* Subtext description */}
                <p className="text-xs text-white/90 mt-3 max-w-[220px] font-sans">
                  {isBn ? gauge.subtext.bn : gauge.subtext.en}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
