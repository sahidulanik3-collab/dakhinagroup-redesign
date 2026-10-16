import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Calendar, ArrowRight, X } from 'lucide-react';

export const MediaNews: React.FC = () => {
  const { isBn, content } = useLanguage();
  const [filter, setFilter] = useState<'All' | 'Corporate' | 'Infrastructure' | 'Customer Care'>('All');
  const [activeArticle, setActiveArticle] = useState<typeof content.news[0] | null>(null);

  const filteredNews = content.news.filter((item) => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
          {isBn ? 'সংবাদ ও মিডিয়া কভারেজ' : 'Press & Announcements'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-gray-900">
          {isBn ? 'মিডিয়া ও সর্বশেষ সংবাদ' : 'Media & News'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          {isBn
            ? 'দখিনা সিটি প্রকল্পের উন্নয়ন অগ্রগতি, চুক্তি স্বাক্ষর ও প্রাতিষ্ঠানিক আপডেট'
            : 'Milestones, infrastructure updates, and partnership briefings from Dakhina Group'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        {(['All', 'Corporate', 'Infrastructure', 'Customer Care'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === cat
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat === 'All' ? (isBn ? 'সকল সংবাদ' : 'All Updates') : cat}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl bg-white border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 font-bold uppercase tracking-wider text-[10px]">
                  {item.category}
                </span>
                <span className="flex items-center gap-1 text-gray-400 font-mono text-[11px]">
                  <Calendar className="h-3 w-3" />
                  <span>{item.date}</span>
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-900 font-serif leading-snug hover:text-amber-600 transition-colors cursor-pointer"
                  onClick={() => setActiveArticle(item)}>
                {item.title}
              </h2>

              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {item.summary}
              </p>
            </div>

            <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setActiveArticle(item)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
              >
                <span>{isBn ? 'সম্পূর্ণ পড়ুন' : 'Read Full Release'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 text-gray-900 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                <Calendar className="h-4 w-4 text-amber-600" />
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span className="font-bold text-amber-600 uppercase">{activeArticle.category}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <h3 className="text-2xl font-bold font-serif text-gray-900 leading-tight">
              {activeArticle.title}
            </h3>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs font-medium text-gray-700 leading-relaxed">
              {activeArticle.summary}
            </div>

            <div className="text-sm text-gray-700 leading-relaxed space-y-4">
              <p>{activeArticle.content}</p>
              <p>
                {isBn
                  ? 'দখিনা গ্রুপ তার সকল প্রকল্পের ক্ষেত্রে স্বচ্ছতা ও নির্ধারিত সময়সীমা রক্ষার্থে প্রতিশ্রুতিবদ্ধ। মিডিয়া ও জনসংযোগ সংক্রান্ত তথ্যের জন্য যোগাযোগ করুন: info@dakhinagroup.com।'
                  : 'Dakhina Group remains committed to transparent milestones and verified documentation. For press inquiries, please contact corporate media relations at info@dakhinagroup.com.'}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
              >
                {isBn ? 'বন্ধ করুন' : 'Close Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
