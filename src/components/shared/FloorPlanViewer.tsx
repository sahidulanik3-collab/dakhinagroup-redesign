import React, { useState } from 'react';
import { FloorPlan } from '../../data/schema';
import { useLanguage } from '../../hooks/useLanguage';
import { toBanglaDigits } from '../../lib/utils';
import { Layers, Maximize } from 'lucide-react';

export const FloorPlanViewer: React.FC<{
  floorPlans: FloorPlan[];
  className?: string;
}> = ({ floorPlans, className = '' }) => {
  const { isBn } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  if (!floorPlans || floorPlans.length === 0) return null;

  const current = floorPlans[activeTab];

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-amber-600" />
          <h3 className="text-base font-bold text-gray-900">
            {isBn ? 'ফ্লোর প্ল্যান ও স্থাপত্য বিন্যাস' : 'Architectural Floor Plans'}
          </h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 border-b border-gray-100">
        {floorPlans.map((plan, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === idx
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {plan.floor}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div>
            <span className="font-semibold text-gray-900 block">{current.floor}</span>
            <span className="text-gray-500">{current.description}</span>
          </div>
          <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            {isBn ? toBanglaDigits(current.areaSqft) : current.areaSqft} Sqft
          </span>
        </div>

        {/* Plan Vector Diagram */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 bg-neutral-50 flex items-center justify-center p-2">
          <img
            src={current.image}
            alt={`${current.floor} layout plan`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/floorplans/plan-ground.svg';
            }}
            className="w-full h-full object-contain"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-md text-[10px] font-semibold text-gray-700 border border-gray-200 shadow-sm">
            <Maximize className="h-3 w-3" />
            <span>Architectural CAD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
