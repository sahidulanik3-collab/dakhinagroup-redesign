import React, { useState } from 'react';
import { useVariant, VARIANTS, VariantId } from '../../hooks/useVariant';
import { useLanguage } from '../../hooks/useLanguage';
import { Check, Eye, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';

export const VariantSwitcher: React.FC = () => {
  const {
    variantId,
    setVariantId,
    setShowReviewModal,
    showSwitcher,
  } = useVariant();
  const { isBn } = useLanguage();

  const [isExpanded, setIsExpanded] = useState(false);
  const [hideBarTemporarily, setHideBarTemporarily] = useState(false);

  // If switcher globally disabled via config
  if (!showSwitcher) return null;

  // If user temporarily hid the bar for a pure preview
  if (hideBarTemporarily) {
    return (
      <button
        onClick={() => setHideBarTemporarily(false)}
        className="fixed top-3 right-3 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-medium shadow-xl backdrop-blur-md border border-white/20 transition-all hover:scale-105"
        title="Restore Design Switcher"
      >
        <Eye className="h-3.5 w-3.5 text-amber-400" />
        <span>{isBn ? 'সুইচার প্রদর্শন করুন' : 'Show Switcher'}</span>
      </button>
    );
  }

  const variantKeys: VariantId[] = [1, 2, 3, 4, 5];

  return (
    <aside
      id="variant-switcher"
      aria-label="Design Variant Switcher"
      className="fixed top-0 inset-x-0 z-[100] flex justify-center pointer-events-none transition-all duration-300"
    >
      <div className="pointer-events-auto mt-2 mx-2 max-w-4xl w-full">
        <div className="bg-neutral-900/90 hover:bg-neutral-900 text-white shadow-2xl rounded-2xl border border-white/15 backdrop-blur-md px-3 py-2 transition-all">
          <div className="flex items-center justify-between gap-2">
            {/* Title / Badge */}
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-neutral-300">
                <Layers className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline">Design Variant:</span>
                <span className="text-amber-400 font-bold">{VARIANTS[variantId].name}</span>
              </div>
            </div>

            {/* Desktop Pills: 1, 2, 3, 4, 5 */}
            <div className="hidden md:flex items-center gap-1">
              {variantKeys.map((id) => {
                const item = VARIANTS[id];
                const isActive = variantId === id;
                return (
                  <button
                    key={id}
                    onClick={() => setVariantId(id)}
                    className={`group relative flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                    title={`Shortcut: Press '${id}' on keyboard`}
                  >
                    <span>{id}.</span>
                    <span className="hidden lg:inline">{item.name}</span>
                    {isActive && <Check className="h-3 w-3 stroke-[3]" />}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5">
              {/* Choose this design / Client summary */}
              <button
                onClick={() => setShowReviewModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                title="Client Review Mode: View design specifications and screenshot summary"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{isBn ? 'এই ডিজাইনটি বেছে নিন' : 'Choose this design'}</span>
                <span className="sm:hidden">{isBn ? 'পছন্দ' : 'Select'}</span>
              </button>

              {/* Mobile Dropdown Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="md:hidden flex items-center justify-center p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
                aria-label="Toggle all variants"
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {/* Hide preview button */}
              <button
                onClick={() => setHideBarTemporarily(true)}
                className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 text-xs"
                title="Hide switcher for clean client preview"
                aria-label="Hide bar"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Mobile Expanded Dropdown */}
          {isExpanded && (
            <div className="md:hidden pt-2 mt-2 border-t border-white/10 grid grid-cols-2 gap-1.5 animate-fade-in">
              {variantKeys.map((id) => {
                const item = VARIANTS[id];
                const isActive = variantId === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setVariantId(id);
                      setIsExpanded(false);
                    }}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs text-left transition-all ${
                      isActive
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{id}. {item.name}</div>
                      <div className={`text-[10px] ${isActive ? 'text-neutral-800' : 'text-neutral-400'}`}>
                        {item.tagline}
                      </div>
                    </div>
                    {isActive && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
