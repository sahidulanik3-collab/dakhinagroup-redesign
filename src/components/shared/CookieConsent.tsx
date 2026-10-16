import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Shield, Check, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const { isBn } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('dakhina_cookie_consent');
    if (!consent) {
      // Delay prompt slightly so page settles
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(
      'dakhina_cookie_consent',
      JSON.stringify({ accepted: true, analytics: analyticsEnabled, date: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(
      'dakhina_cookie_consent',
      JSON.stringify({ accepted: false, analytics: false, date: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[85] rounded-2xl bg-neutral-900/95 text-white p-5 shadow-2xl border border-neutral-700 backdrop-blur-md animate-fade-in text-xs">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
          <Shield className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="font-bold text-sm text-neutral-100 flex items-center justify-between">
            <span>{isBn ? 'গোপনীয়তা ও কুকি নীতি' : 'Privacy & Security Notice'}</span>
            <button
              onClick={() => setIsVisible(false)}
              className="text-neutral-400 hover:text-white"
              aria-label="Dismiss notice"
            >
              <X className="h-4 w-4" />
            </button>
          </h4>
          <p className="text-neutral-300 leading-relaxed text-[11px]">
            {isBn
              ? 'আমরা আপনার ব্রাউজিং পছন্দ মনে রাখতে এবং নিরাপদ অভিজ্ঞতা নিশ্চিত করতে প্রয়োজনীয় কুকি ব্যবহার করি। কোনো তৃতীয় পক্ষের ট্র্যাকার অন্তর্ভুক্ত নেই।'
              : 'Dakhina Group uses essential local storage to remember your design preferences and guarantee session security. Zero third-party ad trackers are loaded.'}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="analytics-optin"
              checked={analyticsEnabled}
              onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              className="rounded text-amber-500 focus:ring-0 cursor-pointer h-3.5 w-3.5"
            />
            <label htmlFor="analytics-optin" className="text-[11px] text-neutral-300 cursor-pointer">
              {isBn ? 'নামবিহীন পারফরম্যান্স মেট্রিক্স অনুমতি দিন (ঐচ্ছিক)' : 'Allow anonymous performance telemetry (optional)'}
            </label>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleAccept}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all text-xs"
            >
              <Check className="h-3.5 w-3.5" />
              <span>{isBn ? 'সম্মতি দিন' : 'Accept Essential'}</span>
            </button>
            <button
              onClick={handleDecline}
              className="py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium transition-all text-xs"
            >
              {isBn ? 'প্রত্যাখ্যান' : 'Decline'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
