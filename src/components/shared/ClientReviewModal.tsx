import React, { useState } from 'react';
import { useVariant } from '../../hooks/useVariant';
import { useLanguage } from '../../hooks/useLanguage';
import { Check, Copy, X, Sparkles } from 'lucide-react';

export const ClientReviewModal: React.FC = () => {
  const { variant, showReviewModal, setShowReviewModal } = useVariant();
  const { isBn } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!showReviewModal) return null;

  const copySummaryText = () => {
    const text = `Dakhina Group Design Selection:
Variant #${variant.id}: ${variant.name}
Tagline: ${variant.tagline}
Palette:
- Primary: ${variant.palette.primary}
- Secondary: ${variant.palette.secondary}
- Accent: ${variant.palette.accent}
- Background: ${variant.palette.background}
Typography: ${variant.typography}
Personality: ${variant.personality}
Selected Date: ${new Date().toLocaleDateString()}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 text-gray-900">
        {/* Header Ribbon */}
        <div
          className="p-6 text-white transition-colors duration-300"
          style={{ backgroundColor: variant.palette.primary }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" style={{ color: variant.palette.accent }} />
              <span className="text-xs uppercase tracking-widest font-bold opacity-80">
                {isBn ? 'ক্লায়েন্ট রিভিউ মোড' : 'Client Design Review'}
              </span>
            </div>
            <button
              onClick={() => setShowReviewModal(false)}
              className="rounded-full p-1.5 hover:bg-white/20 transition-colors"
              aria-label="Close review card"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Variant {variant.id}: {variant.name}
          </h2>
          <p className="mt-1 text-sm opacity-90">{variant.tagline}</p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Color Swatches */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              {isBn ? 'রং বিন্যাস (Curated Palette)' : 'Curated Color Palette'}
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="space-y-1.5">
                <div
                  className="h-12 rounded-lg border border-gray-200 shadow-sm"
                  style={{ backgroundColor: variant.palette.primary }}
                />
                <span className="font-mono text-[10px] text-gray-600">Primary</span>
                <span className="block font-mono text-[11px] font-semibold">{variant.palette.primary}</span>
              </div>
              <div className="space-y-1.5">
                <div
                  className="h-12 rounded-lg border border-gray-200 shadow-sm"
                  style={{ backgroundColor: variant.palette.accent }}
                />
                <span className="font-mono text-[10px] text-gray-600">Accent</span>
                <span className="block font-mono text-[11px] font-semibold">{variant.palette.accent}</span>
              </div>
              <div className="space-y-1.5">
                <div
                  className="h-12 rounded-lg border border-gray-200 shadow-sm"
                  style={{ backgroundColor: variant.palette.secondary }}
                />
                <span className="font-mono text-[10px] text-gray-600">Secondary</span>
                <span className="block font-mono text-[11px] font-semibold">{variant.palette.secondary}</span>
              </div>
              <div className="space-y-1.5">
                <div
                  className="h-12 rounded-lg border border-gray-200 shadow-sm"
                  style={{ backgroundColor: variant.palette.background }}
                />
                <span className="font-mono text-[10px] text-gray-600">Canvas</span>
                <span className="block font-mono text-[11px] font-semibold">{variant.palette.background}</span>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              {isBn ? 'টাইপোগ্রাফি পেয়ারিং' : 'Typography System'}
            </h3>
            <p className="text-sm font-medium text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
              {variant.typography}
            </p>
          </div>

          {/* Personality / Architectural Rationale */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              {isBn ? 'ডিজাইন বৈশিষ্ট্য ও অনুভূতি' : 'Design Philosophy & Experience'}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
              {variant.personality}
            </p>
          </div>

          {/* Instruction to client */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800 leading-relaxed">
            {isBn
              ? 'টিপস: আপনি এই কার্ডটির স্ক্রিনশট নিতে পারেন অথবা নিচের বাটনে ক্লিক করে পুরো বিস্তারিত কপি করে হোয়াটসঅ্যাপ বা ইমেইলে পাঠাতে পারেন।'
              : 'Tip: You can screenshot this card or click "Copy Specifications" to send to your project team via WhatsApp or email.'}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
          <button
            onClick={copySummaryText}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all shadow-sm active:scale-95"
            style={{ backgroundColor: variant.palette.primary }}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-400" />
                <span>{isBn ? 'কপি সম্পন্ন হয়েছে!' : 'Copied to Clipboard!'}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>{isBn ? 'স্পেসিফিকেশন কপি করুন' : 'Copy Specifications'}</span>
              </>
            )}
          </button>
          <button
            onClick={() => setShowReviewModal(false)}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
