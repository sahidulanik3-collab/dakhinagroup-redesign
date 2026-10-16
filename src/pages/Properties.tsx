import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useFavourites } from '../hooks/useFavourites';
import propertiesData from '../data/properties.json';
import { PropertyItem } from '../data/schema';
import { PropertyCard } from '../components/shared/PropertyCard';
import { PropertyFilters } from '../components/shared/PropertyFilters';
import { CompareBar } from '../components/shared/CompareBar';
import { Compass, Heart } from 'lucide-react';

export const Properties: React.FC = () => {
  const { isBn } = useLanguage();
  const { favourites } = useFavourites();
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // URL search params
  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';
  const project = searchParams.get('project') || '';
  const bedrooms = searchParams.get('bedrooms') || '';
  const sort = searchParams.get('sort') || 'newest';
  const showFavOnly = searchParams.get('fav') === 'true';

  const allProps = propertiesData as PropertyItem[];

  // Filter and sort computation
  const filteredProperties = useMemo(() => {
    return allProps
      .filter((p) => {
        if (showFavOnly && !favourites.includes(p.id)) return false;
        if (category && p.category !== category) return false;
        if (status && p.status !== status) return false;
        if (project && p.project !== project) return false;
        if (bedrooms && p.bedrooms < Number(bedrooms)) return false;
        if (query) {
          const matchTitle = p.title.toLowerCase().includes(query);
          const matchLocation = p.locationArea.toLowerCase().includes(query);
          const matchCategory = p.category.toLowerCase().includes(query);
          if (!matchTitle && !matchLocation && !matchCategory) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        if (sort === 'size-desc') return b.builtAreaSqft - a.builtAreaSqft;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [allProps, query, category, status, project, bedrooms, sort, showFavOnly, favourites]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedItems = filteredProperties.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-6 border-b border-gray-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="h-4 w-4" />
            <span>{isBn ? 'সম্পূর্ণ ভিলা ক্যাটালগ (৪৮টি)' : 'Exclusive Inventory · 48 Villa Models'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {showFavOnly
              ? isBn ? 'সংরক্ষিত পছন্দের ভিলাসমূহ' : 'Saved Favourite Villas'
              : isBn ? 'দখিনা সিটি ভিলা ও প্লটসমূহ' : 'Dakhina City Villa Residences'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
            {isBn
              ? 'লেকভিউ, গার্ডেন ও ডুপ্লেক্স ভিলার বিস্তৃত সংগ্রহ। প্রতিটি রেকর্ডে বিস্তারিত ফ্লোর প্ল্যান, মূল্য ও নাগরিক সুবিধা অন্তর্ভুক্ত।'
              : 'Browse luxury lakefront and courtyard villas with verified land demarcation and immediate construction readiness.'}
          </p>
        </div>

        {showFavOnly && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold">
            <Heart className="h-4 w-4 fill-rose-600" />
            <span>{favourites.length} Favourites</span>
          </div>
        )}
      </div>

      {/* Filter Component */}
      <PropertyFilters
        totalCount={allProps.length}
        filteredCount={filteredProperties.length}
      />

      {/* Property Cards Grid */}
      {paginatedItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200/80 p-8 space-y-3">
          <Compass className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="text-lg font-bold text-gray-800">
            {isBn ? 'কোনো ভিলা পাওয়া যায়নি' : 'No properties matched your criteria'}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {isBn
              ? 'দয়া করে ফিল্টার রিসেট করুন অথবা অনুসন্ধানের শর্ত পরিবর্তন করুন।'
              : 'Try clearing some active filters or broaden your search keywords.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paginatedItems.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            {isBn ? 'পূর্ববর্তী' : 'Previous'}
          </button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`h-9 w-9 rounded-xl text-xs font-bold transition-all ${
                page === num
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            {isBn ? 'পরবর্তী' : 'Next'}
          </button>
        </div>
      )}

      {/* Sticky comparison floating bar */}
      <CompareBar />
    </div>
  );
};
