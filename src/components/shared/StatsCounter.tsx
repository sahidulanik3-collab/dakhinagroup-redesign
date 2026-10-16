import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { toBanglaDigits } from '../../lib/utils';
import { Award, CheckCircle, Clock, MapPin } from 'lucide-react';

interface StatProps {
  target: number;
  suffix?: string;
  duration?: number;
}

const Counter: React.FC<StatProps> = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const { isBn } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [hasStarted, target, duration]);

  const displayCount = isBn ? toBanglaDigits(count) : count.toLocaleString();

  return (
    <span ref={ref} className="font-extrabold tracking-tight">
      {displayCount}
      {suffix}
    </span>
  );
};

export const StatsSection: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { content } = useLanguage();

  const iconMap: Record<string, React.ReactNode> = {
    totalPlots: <Award className="h-6 w-6 text-amber-500" />,
    handedOver: <CheckCircle className="h-6 w-6 text-emerald-500" />,
    pending: <Clock className="h-6 w-6 text-blue-500" />,
    areaBigha: <MapPin className="h-6 w-6 text-rose-500" />,
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {content.stats.map((stat) => (
          <div
            key={stat.key}
            className="group relative overflow-hidden rounded-2xl bg-white/90 p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 group-hover:scale-110 transition-transform">
                {iconMap[stat.key]}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Verified
              </span>
            </div>

            <div className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-1">
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>

            <h4 className="text-sm font-bold text-gray-800 tracking-tight">
              {stat.label}
            </h4>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
