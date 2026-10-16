import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Play, X, ShieldCheck, Sparkles } from 'lucide-react';

export const DrelVideoSection: React.FC = () => {
  const { isBn } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-14 sm:py-20 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#128341]/10 text-[#128341] text-xs font-bold uppercase tracking-widest border border-[#128341]/20">
            <Sparkles className="h-3.5 w-3.5 text-[#128341]" />
            <span>{isBn ? 'দখিনা সিটির সিগনেচার ল্যান্ডমার্ক' : 'Iconic Signature Landmark'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0c3620] tracking-tight">
            {isBn ? 'প্রকৃতির কোলে নান্দনিক দখিনা সিটি' : 'Dakhina Real Estate Limited (DREL)'}
          </h2>

          <p className="text-xs sm:text-sm text-[#466352] max-w-2xl mx-auto font-sans leading-relaxed">
            {isBn
              ? 'কাশবনের শুভ্রতায় ও সবুজ নিসর্গে খোদাই করা দখিনা সিটির ঐতিহাসিক প্রবেশদ্বার। ড্রোন ভিডিও চিত্রে দেখুন ১২০০ বিঘার সুবিশাল কর্মযজ্ঞ।'
              : 'The iconic manicured hedge landmark welcoming visitors into Dakhina City amidst pristine highland flora and autumn Kashful.'}
          </p>
        </div>

        {/* Video Banner Container matching Screenshot 1 */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#128341]/20 bg-black group aspect-[16/9] sm:aspect-[21/9] max-h-[520px]">
          {/* Main Visual */}
          <img
            src="/assets/dakhina-live/drel-1024x440.jpg"
            alt="DREL - Dakhina Real Estate Limited Iconic Landmark"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/dakhina-live/drel.jpg';
            }}
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 group-hover:from-black/70 transition-colors" />

          {/* Centered Play Button matching Screenshot 1 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white/80 hover:bg-white text-[#128341] shadow-2xl backdrop-blur-md transition-all duration-300 transform group-hover:scale-110 active:scale-95 group/btn"
              aria-label="Play Dakhina City Drone Tour Video"
            >
              {/* Outer Pulsing Ring */}
              <span className="absolute -inset-3 rounded-full border-2 border-white/60 animate-ping opacity-60 pointer-events-none" />
              <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-current translate-x-1 text-[#128341]" />
            </button>
          </div>

          {/* Bottom Caption Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#7dba41]" />
              <span className="font-semibold tracking-wide">
                {isBn ? 'সরেজমিন সাইট ভিডিও চিত্র' : 'Authentic On-Site Drone Footage'}
              </span>
            </div>
            <span className="hidden sm:inline-block text-neutral-300">
              {isBn ? 'ভিডিও দেখতে ক্লিক করুন' : 'Click to Play Full HD Overview'}
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {isPlaying && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setIsPlaying(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-neutral-700 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white transition-colors"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/jsMh07pOAy4?autoplay=1&rel=0"
              title="Dakhina City Drone Video Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};
