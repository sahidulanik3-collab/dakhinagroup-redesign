import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { toBanglaDigits } from '../../lib/utils';
import { Sparkles, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

interface MetricGauge {
  target: number;
  suffix?: string;
  label: { en: string; bn: string };
  badge: { en: string; bn: string };
  subtext: { en: string; bn: string };
  percentage: number; // 0 to 100
  accentColor: string;
}

const GAUGES: MetricGauge[] = [
  {
    target: 6500,
    suffix: '+',
    label: { en: 'Total Plots', bn: 'মোট প্লট' },
    badge: { en: '100% Freehold', bn: '১০০% নিষ্কণ্টক দাগ-খতিয়ান' },
    subtext: {
      en: 'Masterplanned across 1,200 Bigha natural red-clay highland',
      bn: '১২০০ বিঘায় পরিকল্পিত প্রাকৃতিক লাল মাটির উঁচু ভূমি',
    },
    percentage: 100,
    accentColor: '#34d399', // bright emerald
  },
  {
    target: 1800,
    suffix: '+',
    label: { en: 'Handed Over Plots', bn: 'হস্তান্তরকৃত প্লট' },
    badge: { en: 'Physical Possession', bn: 'বাস্তব দখল ও নামজারি' },
    subtext: {
      en: 'Direct boundary demarcation with completed registered deeds',
      bn: 'সরাসরি সীমানা প্রাচীর ও রেজিস্ট্রিকৃত দলিল হস্তান্তর সম্পন্ন',
    },
    percentage: 82,
    accentColor: '#fbbf24', // warm gold
  },
  {
    target: 2000,
    suffix: '+',
    label: { en: 'Development Underway', bn: 'প্রক্রিয়াধীন প্লট' },
    badge: { en: 'Fast-Track Utility', bn: 'সড়ক ও ইউটিলিটি চলমান' },
    subtext: {
      en: 'Fast-track 60ft/80ft boulevard paving and smart drainage network',
      bn: '৬০ ও ৮০ ফুট প্রশস্ত সড়ক পাকাকরণ ও আধুনিক ড্রেনেজ ব্যবস্থা',
    },
    percentage: 65,
    accentColor: '#38bdf8', // crisp cyan
  },
];

interface AnimatedGaugeCardProps {
  gauge: MetricGauge;
  hasStarted: boolean;
  isBn: boolean;
  icon: React.ReactNode;
}

const AnimatedGaugeCard: React.FC<AnimatedGaugeCardProps> = ({
  gauge,
  hasStarted,
  isBn,
  icon,
}) => {
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;
    const duration = 2200; // 2.2 seconds smooth count
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Smooth ease-out quad curve
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCurrentVal(Math.floor(easedProgress * gauge.target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCurrentVal(gauge.target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [hasStarted, gauge.target]);

  const displayCount = isBn
    ? toBanglaDigits(currentVal)
    : currentVal.toLocaleString();

  // SVG circular gauge math
  const size = 180;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Animate stroke dashoffset when hasStarted is true
  const strokeDashoffset = hasStarted
    ? circumference - (gauge.percentage / 100) * circumference
    : circumference;

  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0d3b27]/80 via-[#0a2f1f]/90 to-[#062015] backdrop-blur-xl border border-emerald-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-emerald-400/50 transition-all duration-500 hover:-translate-y-2 group overflow-hidden flex flex-col items-center text-center">
      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-400/20 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-950/40 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Tag Badge */}
      <div className="w-full flex items-center justify-between gap-2 mb-6 pb-3 border-b border-emerald-500/15 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] sm:text-[11px] font-bold tracking-wider text-emerald-300 uppercase">
          {icon}
          <span>{isBn ? gauge.badge.bn : gauge.badge.en}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex h-2 w-2 relative">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: gauge.accentColor }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: gauge.accentColor }}
            />
          </span>
          <span className="text-[10px] font-mono text-emerald-400/70 font-semibold uppercase">
            {gauge.percentage}%
          </span>
        </div>
      </div>

      {/* Circular Speedometer Gauge Meter */}
      <div className="relative h-44 w-44 sm:h-48 sm:w-48 flex items-center justify-center my-2 relative z-10">
        <svg
          height={size}
          width={size}
          className="transform -rotate-90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
        >
          {/* Background Track Circle */}
          <circle
            stroke="rgba(16, 185, 129, 0.12)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />

          {/* Active Animated Progress Arc */}
          <circle
            stroke={gauge.accentColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{
              strokeDashoffset,
              transition: 'stroke-dashoffset 2.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>

        {/* Center Text Container: Animated Count + Crisp Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 pointer-events-none">
          <div className="flex items-baseline justify-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {displayCount}
            </span>
            <span
              className="text-xl sm:text-2xl font-bold ml-0.5"
              style={{ color: gauge.accentColor }}
            >
              {gauge.suffix}
            </span>
          </div>

          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-200/90 mt-1.5 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/20 max-w-[130px] leading-tight">
            {isBn ? gauge.label.bn : gauge.label.en}
          </span>
        </div>
      </div>

      {/* Bottom Subtext Description with High Legibility */}
      <div className="w-full mt-4 pt-4 border-t border-emerald-500/15 relative z-10">
        <p className="text-xs sm:text-sm text-emerald-100/80 font-sans leading-relaxed">
          {isBn ? gauge.subtext.bn : gauge.subtext.en}
        </p>
      </div>
    </div>
  );
};

export const MilestoneGaugeBanner: React.FC = () => {
  const { isBn } = useLanguage();
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#041d13] via-[#072c1c] to-[#041a10] text-white py-16 sm:py-24 border-y border-emerald-500/20 shadow-2xl"
    >
      {/* Background Architectural Mesh & Top Radial Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.18),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* City Skyline Outline Vector Background at the bottom */}
      <div className="absolute inset-x-0 bottom-0 opacity-20 pointer-events-none flex items-end">
        <svg
          className="w-full h-28 sm:h-36 text-emerald-950"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,120 L0,85 L35,85 L35,55 L50,55 L50,85 L80,85 L80,30 L110,30 L110,85 L140,85 L140,65 L170,65 L170,85 L220,85 L220,20 L240,20 L240,85 L280,85 L280,50 L310,50 L310,85 L350,85 L350,40 L380,40 L380,85 L420,85 L420,10 L445,10 L445,85 L490,85 L490,60 L520,60 L520,85 L560,85 L560,35 L590,35 L590,85 L640,85 L640,45 L680,45 L680,85 L720,85 L720,15 L750,15 L750,85 L800,85 L800,55 L830,55 L830,85 L870,85 L870,30 L900,30 L900,85 L940,85 L940,60 L970,60 L970,85 L1020,85 L1020,25 L1050,25 L1050,85 L1100,85 L1100,45 L1140,45 L1140,85 L1200,85 L1200,120 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>
              {isBn
                ? 'বাস্তবায়িত অর্জন ও প্রকল্পের চিত্র'
                : 'Verified Physical Scale & Handover Track Record'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight drop-shadow-md">
            {isBn ? 'দখিনা সিটির বাস্তব অগ্রগতি' : 'Milestones of Dakhina City'}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed max-w-2xl mx-auto">
            {isBn
              ? 'আইনি বিশুদ্ধতা, নিষ্কণ্টক রেজিস্ট্রেশন এবং প্রতিরক্ষা বাহিনীর কর্মকর্তাদের আস্থায় গড়ে ওঠা ১২০০ বিঘার স্বয়ংসম্পূর্ণ আবাসন মেগা প্রকল্প।'
              : 'Endorsed by defense personnel and expatriates: 100% legal clarity, verified physical demarcation, and rapid infrastructure handover across 1,200 Bigha.'}
          </p>
        </div>

        {/* 3 Animated Speedometer Gauge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto items-stretch">
          <AnimatedGaugeCard
            gauge={GAUGES[0]}
            hasStarted={hasStarted}
            isBn={isBn}
            icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
          />
          <AnimatedGaugeCard
            gauge={GAUGES[1]}
            hasStarted={hasStarted}
            isBn={isBn}
            icon={<CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
          />
          <AnimatedGaugeCard
            gauge={GAUGES[2]}
            hasStarted={hasStarted}
            isBn={isBn}
            icon={<Clock className="w-3.5 h-3.5 text-sky-400" />}
          />
        </div>
      </div>
    </section>
  );
};

export default MilestoneGaugeBanner;
