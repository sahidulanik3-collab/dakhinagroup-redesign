import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Trophy, MapPin } from 'lucide-react';

export const AwardsAchievements: React.FC = () => {
  const { isBn, content } = useLanguage();
  const [filter, setFilter] = useState<'All' | 'International' | 'National' | 'Excellence'>('All');

  const filteredAwards = content.awards.filter((award) => {
    if (filter === 'All') return true;
    return award.category === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
          {isBn ? 'স্বীকৃতি ও সম্মাননা' : 'Industry Accolades'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-gray-900">
          {isBn ? 'পুরস্কার ও অর্জনসমূহ' : 'Awards & Achievements'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          {isBn
            ? 'দেশ ও আন্তর্জাতিক রিয়েল এস্টেট মেলায় দখিনা গ্রুপের শ্রেষ্ঠত্বের স্বীকৃতি'
            : 'Two decades of recognized distinction across North America, Australia, and Bangladesh'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        {(['All', 'International', 'National', 'Excellence'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === cat
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat === 'All' ? (isBn ? 'সকল পুরস্কার' : 'All Accolades') : cat}
          </button>
        ))}
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAwards.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white border border-gray-200/80 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                  <Trophy className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                  {item.year}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-gray-900 leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>{item.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
