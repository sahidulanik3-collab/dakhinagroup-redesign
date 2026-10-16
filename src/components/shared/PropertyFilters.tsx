import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

export interface FilterState {
  search: string;
  category: string;
  status: string;
  project: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

export const PropertyFilters: React.FC<{
  totalCount: number;
  filteredCount: number;
  className?: string;
}> = ({ totalCount, filteredCount, className = '' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isBn } = useLanguage();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Read state from URL search params
  const currentCategory = searchParams.get('category') || '';
  const currentStatus = searchParams.get('status') || '';
  const currentProject = searchParams.get('project') || '';
  const currentBeds = searchParams.get('bedrooms') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentSearch = searchParams.get('q') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next, { replace: true });
  };

  const handleReset = () => {
    setSearchParams({}, { replace: true });
  };

  const categories = [
    'Lakeview Villa',
    'Garden Villa',
    'Duplex Villa',
    'Twin Villa',
    'Courtyard Villa',
    'Corner Villa',
    'Cottage Studio',
  ];

  const projects = [
    'Dakhina City: Phase 1 (Lakeview Enclave)',
    'Dakhina City: Phase 2 (Green Valley)',
    'Dakhina Cantonment View Villas',
    'Dakhina Riverside Estates',
  ];

  const statuses = [
    { id: 'available', label: isBn ? 'উপলব্ধ (Available)' : 'Available' },
    { id: 'booked', label: isBn ? 'বুকড (Booked)' : 'Booked' },
    { id: 'handed-over', label: isBn ? 'হস্তান্তরিত (Handed Over)' : 'Handed Over' },
    { id: 'upcoming', label: isBn ? 'আসন্ন (Upcoming)' : 'Upcoming' },
  ];

  const activeFiltersCount = [
    currentCategory,
    currentStatus,
    currentProject,
    currentBeds,
    currentMinPrice,
    currentMaxPrice,
  ].filter(Boolean).length;

  return (
    <div className={`w-full ${className}`}>
      {/* Top Search & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-200/80">
        {/* Instant Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={currentSearch}
            onChange={(e) => updateParam('q', e.target.value)}
            placeholder={isBn ? 'ভিলা বা প্রকল্পের নাম দিয়ে খুঁজুন...' : 'Search villas by name, sector or category...'}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-gray-400"
          />
          {currentSearch && (
            <button
              onClick={() => updateParam('q', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={currentSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="newest">{isBn ? 'নতুন তালিকা' : 'Sort: Newest First'}</option>
            <option value="price-asc">{isBn ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High'}</option>
            <option value="price-desc">{isBn ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low'}</option>
            <option value="size-desc">{isBn ? 'আয়তন: বড় থেকে ছোট' : 'Size: Largest First'}</option>
          </select>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold shadow-sm"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-amber-400" />
            <span>{isBn ? 'ফিল্টার' : 'Filters'}</span>
            {activeFiltersCount > 0 && (
              <span className="h-4 w-4 rounded-full bg-amber-400 text-neutral-950 text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Quick Category Filter Pills */}
      <div className="hidden lg:flex items-center justify-between gap-2 mt-3 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => updateParam('category', '')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !currentCategory
                ? 'bg-neutral-900 text-white shadow'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {isBn ? 'সকল ক্যাটাগরি' : 'All Categories'} ({totalCount})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => updateParam('category', currentCategory === cat ? '' : cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentCategory === cat
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold underline px-2 py-1 shrink-0"
          >
            <RotateCcw className="h-3 w-3" />
            <span>{isBn ? 'ফিল্টার রিসেট' : 'Clear Filters'}</span>
          </button>
        )}
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-gray-500 mt-2 px-1">
        <span>
          {isBn
            ? `${filteredCount} টি ভিলা পাওয়া গেছে (মোট ${totalCount})`
            : `Showing ${filteredCount} of ${totalCount} villas`}
        </span>
      </div>

      {/* Mobile Bottom-Sheet Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-[999] flex flex-col justify-end bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-amber-600" />
                <h3 className="text-base font-bold text-gray-900">
                  {isBn ? 'ফিল্টার অপশন' : 'Search & Filters'}
                </h3>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Category selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-2">
                {isBn ? 'ক্যাটাগরি' : 'Category'}
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateParam('category', currentCategory === cat ? '' : cat)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                      currentCategory === cat
                        ? 'bg-neutral-900 text-white font-bold'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Project selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-2">
                {isBn ? 'প্রকল্প' : 'Project Enclave'}
              </label>
              <select
                value={currentProject}
                onChange={(e) => updateParam('project', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800"
              >
                <option value="">{isBn ? 'সকল প্রকল্প' : 'All Projects'}</option>
                {projects.map((proj) => (
                  <option key={proj} value={proj}>
                    {proj}
                  </option>
                ))}
              </select>
            </div>

            {/* Status selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-2">
                {isBn ? 'স্ট্যাটাস' : 'Availability Status'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {statuses.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => updateParam('status', currentStatus === st.id ? '' : st.id)}
                    className={`p-2 rounded-xl text-xs text-left border transition-all ${
                      currentStatus === st.id
                        ? 'border-neutral-900 bg-neutral-900 text-white font-bold'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedroom selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-2">
                {isBn ? 'বেডরুম সংখ্যা' : 'Bedrooms'}
              </label>
              <div className="flex gap-2">
                {['', '2', '3', '4', '5'].map((b) => (
                  <button
                    key={b}
                    onClick={() => updateParam('bedrooms', b)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      currentBeds === b
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {b === '' ? (isBn ? 'যেকোনো' : 'Any') : `${b}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700"
              >
                {isBn ? 'রিসেট' : 'Clear All'}
              </button>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex-1 py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold"
              >
                {isBn ? `${filteredCount} ফলাফল দেখুন` : `Show ${filteredCount} Villas`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
