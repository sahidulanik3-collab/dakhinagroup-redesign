import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { toBanglaDigits } from '../../lib/utils';
import { Award, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';

interface MetricItem {
  target: number;
  suffix?: string;
  label: { en: string; bn: string };
  subtext: { en: string; bn: string };
  icon: React.ComponentType<{ className?: string }>;
}

const METRICS: MetricItem[] = [
  {
    target: 6500,
    suffix: '+',
    label: { en: 'Total Plots', bn: 'মোট প্লট' },
    subtext: {
      en: 'Masterplanned across 1,200 Bigha highland.',
      bn: '১২০০ বিঘায় পরিকল্পিত প্রাকৃতিক লাল মাটির উঁচু ভূমি।',
    },
    icon: Award,
  },
  {
    target: 1800,
    suffix: '+',
    label: { en: 'Handed Over Plots', bn: 'হস্তান্তরকৃত প্লট' },
    subtext: {
      en: 'Boundary demarcated & registered deeds.',
      bn: 'সীমানা প্রাচীর ও রেজিস্ট্রিকৃত দলিল হস্তান্তর সম্পন্ন।',
    },
    icon: CheckCircle2,
  },
  {
    target: 2000,
    suffix: '+',
    label: { en: 'In Development', bn: 'প্রক্রিয়াধীন প্লট' },
    subtext: {
      en: '60ft/80ft road paving & utility grid underway.',
      bn: '৬০ ও ৮০ ফুট সড়ক পাকাকরণ ও ইউটিলিটি চলমান।',
    },
    icon: Clock,
  },
  {
    target: 1200,
    suffix: '+',
    label: { en: 'Bigha Masterplan', bn: 'বিঘা মোট এলাকা' },
    subtext: {
      en: 'Natural red-clay highland with zero flood risk.',
      bn: 'ঐতিহাসিক সর্বকালের বন্যা মুক্ত উঁচু ভূমি।',
    },
    icon: MapPin,
  },
];

interface StatCardProps {
  metric: MetricItem;
  hasStarted: boolean;
  isBn: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ metric, hasStarted, isBn }) => {
  const [currentVal, setCurrentVal] = useState(0);
  const Icon = metric.icon;

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds smooth count
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Smooth cubic ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCurrentVal(Math.floor(easedProgress * metric.target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCurrentVal(metric.target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [hasStarted, metric.target]);

  const displayCount = isBn
    ? toBanglaDigits(currentVal)
    : currentVal.toLocaleString();

  return (
    <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-white/[0.07] hover:bg-white/[0.11] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group shadow-md hover:-translate-y-0.5">
      {/* Top Circular Icon */}
      <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-emerald-200 mb-2.5 group-hover:scale-105 transition-transform">
        <Icon className="w-4 h-4" />
      </div>

      {/* Large Bold Animated Counting Number */}
      <div className="flex items-baseline justify-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm font-sans">
        <span>{displayCount}</span>
        <span className="text-emerald-300 ml-0.5">{metric.suffix}</span>
      </div>

      {/* Uppercase Category Label */}
      <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-100/90 mt-1 mb-1">
        {isBn ? metric.label.bn : metric.label.en}
      </h4>

      {/* Crisp Brief Description */}
      <p className="text-[11px] sm:text-xs text-white/70 leading-snug line-clamp-2 max-w-[200px]">
        {isBn ? metric.subtext.bn : metric.subtext.en}
      </p>
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
      className="relative bg-[#094129] text-white py-8 sm:py-11 border-y border-emerald-800/40 shadow-inner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-7 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest">
            <Sparkles className="h-3 w-3 text-emerald-300" />
            <span>
              {isBn ? 'পরিমাপযোগ্য বাস্তব অর্জন' : 'Measurable Project Scale'}
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            {isBn ? 'সংখ্যায় দখিনা সিটির অগ্রগতি' : 'Milestones By The Numbers'}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-xl mx-auto">
            {isBn
              ? 'প্রাকৃতিক ১২০০ বিঘার মহাপরিকল্পনা এবং প্রতিরক্ষা বাহিনীর কর্মকর্তাদের আস্থায় গড়ে ওঠা বাস্তব চিত্র।'
              : 'Real metrics achieved across 1,200 Bigha masterplanned development and defense welfare trust.'}
          </p>
        </div>

        {/* 4 Compact Stat Cards in a Single Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 items-stretch">
          {METRICS.map((metric, idx) => (
            <StatCard
              key={idx}
              metric={metric}
              hasStarted={hasStarted}
              isBn={isBn}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MilestoneGaugeBanner;
