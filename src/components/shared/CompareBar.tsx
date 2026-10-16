import React from 'react';
import { useCompare } from '../../hooks/useCompare';
import { useLanguage } from '../../hooks/useLanguage';
import propertiesData from '../../data/properties.json';
import { PropertyItem } from '../../data/schema';
import { Scale, ArrowRight, X } from 'lucide-react';

export const CompareBar: React.FC = () => {
  const { compareIds, removeFromCompare, setIsModalOpen } = useCompare();
  const { isBn } = useLanguage();

  if (compareIds.length === 0) return null;

  const selected = (propertiesData as PropertyItem[]).filter((p) =>
    compareIds.includes(p.id)
  );

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[80] rounded-2xl bg-neutral-900/95 text-white p-3 shadow-2xl border border-neutral-700 backdrop-blur-md animate-fade-in">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-neutral-950 font-bold">
            <Scale className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold leading-tight">
              {isBn ? 'ভিলা তুলনা' : 'Compare Villas'} ({compareIds.length}/3)
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {selected.map((p) => (
                <span
                  key={p.id}
                  className="inline-flex items-center gap-1 bg-neutral-800 text-[10px] text-neutral-300 px-2 py-0.5 rounded"
                >
                  <span className="truncate max-w-[80px]">{p.title.split(' ')[0]}</span>
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="hover:text-rose-400"
                    aria-label={`Remove ${p.title}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-all shadow-sm shrink-0"
        >
          <span>{isBn ? 'তুলনা দেখুন' : 'Compare Now'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
