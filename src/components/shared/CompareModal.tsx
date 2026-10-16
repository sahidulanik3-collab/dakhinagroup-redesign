import React from 'react';
import { useCompare } from '../../hooks/useCompare';
import { useLanguage } from '../../hooks/useLanguage';
import propertiesData from '../../data/properties.json';
import { PropertyItem } from '../../data/schema';
import { formatBDT, toBanglaDigits } from '../../lib/utils';
import { X, Scale, Trash2, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompareModal: React.FC = () => {
  const { compareIds, removeFromCompare, clearCompare, isModalOpen, setIsModalOpen } = useCompare();
  const { isBn } = useLanguage();

  if (!isModalOpen) return null;

  const selectedProps = (propertiesData as PropertyItem[]).filter((p) =>
    compareIds.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden text-gray-900 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-neutral-900 text-white p-5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <Scale className="h-5 w-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold">
                {isBn ? 'ভিলা তুলনা (সর্বোচ্চ ৩টি)' : 'Side-by-Side Villa Comparison (Up to 3)'}
              </h3>
              <p className="text-xs text-neutral-400">
                {isBn
                  ? 'মূল্য, আয়তন এবং নাগরিক সুবিধার তুলনামূলক বিশ্লেষণ'
                  : 'Evaluate specifications, land size, and price parity'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedProps.length > 0 && (
              <button
                onClick={clearCompare}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{isBn ? 'সব মুছুন' : 'Clear All'}</span>
              </button>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table / Grid */}
        <div className="p-6 overflow-y-auto flex-1">
          {selectedProps.length === 0 ? (
            <div className="text-center py-12 text-gray-500 space-y-2">
              <Scale className="mx-auto h-12 w-12 text-gray-300" />
              <p className="font-semibold text-sm">
                {isBn ? 'কোনো ভিলা নির্বাচন করা হয়নি' : 'No villas added to comparison yet'}
              </p>
              <p className="text-xs text-gray-400">
                {isBn
                  ? 'প্রপার্টি কার্ডের স্কেল আইকনে ক্লিক করে ৩টি পর্যন্ত ভিলা যোগ করুন।'
                  : 'Click the compare scale icon on any property card to benchmark.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <tbody>
                  {/* Photo & Title Row */}
                  <tr className="border-b border-gray-100">
                    <td className="p-3 font-bold text-gray-500 w-36 bg-gray-50/50">
                      {isBn ? 'ভিলা ও ছবি' : 'Villa Model'}
                    </td>
                    {selectedProps.map((p) => (
                      <td key={p.id} className="p-3 w-64 align-top">
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-2 border border-gray-200">
                          <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <h4 className="font-bold text-sm text-gray-900 leading-snug">{p.title}</h4>
                        <span className="text-[11px] text-gray-500">{p.project}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Price */}
                  <tr className="border-b border-gray-100 bg-amber-50/30">
                    <td className="p-3 font-bold text-amber-900 bg-amber-50/50">
                      {isBn ? 'মূল্য (BDT)' : 'Price Offer (BDT)'}
                    </td>
                    {selectedProps.map((p) => (
                      <td key={p.id} className="p-3 font-extrabold text-sm text-emerald-800">
                        {formatBDT(p.price, false, isBn ? 'bn' : 'en')}
                      </td>
                    ))}
                  </tr>

                  {/* Category */}
                  <tr className="border-b border-gray-100">
                    <td className="p-3 font-bold text-gray-500 bg-gray-50/50">{isBn ? 'ক্যাটাগরি' : 'Category'}</td>
                    {selectedProps.map((p) => (
                      <td key={p.id} className="p-3 font-medium text-gray-800">{p.category}</td>
                    ))}
                  </tr>

                  {/* Status */}
                  <tr className="border-b border-gray-100">
                    <td className="p-3 font-bold text-gray-500 bg-gray-50/50">{isBn ? 'স্ট্যাটাস' : 'Status'}</td>
                    {selectedProps.map((p) => (
                      <td key={p.id} className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                          {p.status}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Land Size */}
                  <tr className="border-b border-gray-100">
                    <td className="p-3 font-bold text-gray-500 bg-gray-50/50">{isBn ? 'জমির পরিমাপ' : 'Land Size (Katha)'}</td>
                    {selectedProps.map((p) => (
                      <td key={p.id} className="p-3 font-bold text-gray-900">
                        {isBn ? toBanglaDigits(p.landSizeKatha) : p.landSizeKatha} Katha
                      </td>
                    ))}
                  </tr>

                  {/* Built Area */}
                  <tr className="border-b border-gray-100">
                    <td className="p-3 font-bold text-gray-500 bg-gray-50/50">{isBn ? 'বিল্ট-আপ এরিয়া' : 'Built Area (Sqft)'}</td>
                    {selectedProps.map((p) => (
                      <td key={p.id} className="p-3 font-bold text-gray-900">
                        {isBn ? toBanglaDigits(p.builtAreaSqft) : p.builtAreaSqft} Sqft
                      </td>
                    ))}
                  </tr>

                  {/* Bedrooms / Bathrooms */}
                  <tr className="border-b border-gray-100">
                    <td className="p-3 font-bold text-gray-500 bg-gray-50/50">{isBn ? 'রুম সংখ্যা' : 'Beds & Baths'}</td>
                    {selectedProps.map((p) => (
                      <td key={p.id} className="p-3 font-medium text-gray-800">
                        {isBn ? toBanglaDigits(p.bedrooms) : p.bedrooms} Beds, {isBn ? toBanglaDigits(p.bathrooms) : p.bathrooms} Baths ({p.floors} Floors)
                      </td>
                    ))}
                  </tr>

                  {/* Facing */}
                  <tr className="border-b border-gray-100">
                    <td className="p-3 font-bold text-gray-500 bg-gray-50/50">{isBn ? 'দিকদর্শন' : 'Facing'}</td>
                    {selectedProps.map((p) => (
                      <td key={p.id} className="p-3 font-medium text-gray-800">{p.facing} Facing</td>
                    ))}
                  </tr>

                  {/* Key Amenities */}
                  <tr className="border-b border-gray-100">
                    <td className="p-3 font-bold text-gray-500 bg-gray-50/50">{isBn ? 'মূল সুবিধাসমূহ' : 'Key Amenities'}</td>
                    {selectedProps.map((p) => (
                      <td key={p.id} className="p-3">
                        <ul className="space-y-1">
                          {p.amenities.slice(0, 4).map((a, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-gray-600 text-[11px]">
                              <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Action Link */}
                  <tr>
                    <td className="p-3 bg-gray-50/50"></td>
                    {selectedProps.map((p) => (
                      <td key={p.id} className="p-3">
                        <Link
                          to={`/properties/${p.slug}`}
                          onClick={() => setIsModalOpen(false)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition-colors"
                        >
                          <span>{isBn ? 'সম্পূর্ণ দেখুন' : 'Explore Villa'}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
