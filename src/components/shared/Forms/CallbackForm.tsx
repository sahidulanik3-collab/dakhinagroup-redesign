import React, { useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { validateFormSecurity } from '../../../lib/utils';
import { PhoneCall, CheckCircle, AlertCircle } from 'lucide-react';

export const CallbackForm: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isBn, content } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [honeypot, setHoneypot] = useState('');
  const [formStartTime] = useState<number>(() => Date.now());

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const security = validateFormSecurity(honeypot, formStartTime);
    if (!security.valid) {
      setStatus('error');
      setErrorMessage(isBn ? 'নিরাপত্তা যাচাই ব্যর্থ হয়েছে।' : 'Security check failed.');
      return;
    }

    if (!fullName.trim() || !phone.trim()) {
      setStatus('error');
      setErrorMessage(isBn ? 'নাম এবং ফোন নম্বর প্রদান করুন।' : 'Please enter your name and phone number.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 600);
  };

  const handleWhatsApp = () => {
    const phoneClean = content.company.phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Dakhina Group,\nPlease request callback for:\nName: ${fullName}\nPhone: ${phone}\nPreferred Time: ${preferredTime}`
    );
    window.open(`https://wa.me/${phoneClean}?text=${text}`, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === 'success' ? (
        <div className="rounded-xl bg-emerald-50 p-6 text-center border border-emerald-200 animate-fade-in">
          <CheckCircle className="mx-auto h-10 w-10 text-emerald-600 mb-2" />
          <h4 className="text-base font-bold text-emerald-900">
            {isBn ? 'কলব্যাক অনুরোধ গৃহীত হয়েছে!' : 'Callback Request Scheduled!'}
          </h4>
          <p className="mt-1 text-xs text-emerald-700">
            {isBn
              ? 'আমাদের একজন কর্মকর্তা শীঘ্রই আপনাকে কল করবেন।'
              : 'Our executive will call you during your selected time slot.'}
          </p>
          <button
            type="button"
            onClick={handleWhatsApp}
            className="mt-3 text-xs text-emerald-700 underline font-medium hover:text-emerald-900"
          >
            {isBn ? 'অথবা এখনই হোয়াটসঅ্যাপে বার্তা পাঠান' : 'Or chat immediately via WhatsApp'}
          </button>
        </div>
      ) : (
        <>
          {errorMessage && (
            <div className="flex items-center gap-2 p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
              {isBn ? 'আপনার নাম *' : 'Your Name *'}
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isBn ? 'উদা: মো. আনোয়ারুল হক' : 'e.g. Tariq Ahmed'}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
              {isBn ? 'মোবাইল নম্বর *' : 'Phone Number *'}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 1407 048190"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
              {isBn ? 'সুবিধাজনক সময়' : 'Preferred Time'}
            </label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="morning">{isBn ? 'সকাল (১০:০০ - ১২:০০)' : 'Morning (10:00 AM - 12:00 PM)'}</option>
              <option value="afternoon">{isBn ? 'দুপুর (২:০০ - ৪:০০)' : 'Afternoon (2:00 PM - 4:00 PM)'}</option>
              <option value="evening">{isBn ? 'সন্ধ্যা (৫:০০ - ৭:০০)' : 'Evening (5:00 PM - 7:00 PM)'}</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-sm active:scale-95"
          >
            <PhoneCall className="h-4 w-4" />
            <span>{isBn ? 'কলব্যাকের অনুরোধ করুন' : 'Request Callback'}</span>
          </button>
        </>
      )}
    </form>
  );
};
