import React, { useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { validateFormSecurity } from '../../../lib/utils';
import { Calendar, Clock, Car, CheckCircle, AlertCircle } from 'lucide-react';

export const VisitScheduleForm: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isBn, content } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [guests, setGuests] = useState('2');
  const [pickupNeeded, setPickupNeeded] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formStartTime] = useState<number>(() => Date.now());

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const security = validateFormSecurity(honeypot, formStartTime);
    if (!security.valid) {
      setStatus('error');
      setErrorMessage(isBn ? 'স্বয়ংক্রিয় স্প্যাম সুরক্ষা সক্রিয়।' : 'Security validation failed.');
      return;
    }

    if (!fullName.trim() || !phone.trim() || !visitDate.trim()) {
      setStatus('error');
      setErrorMessage(isBn ? 'দয়া করে নাম, ফোন এবং পরিদর্শনের তারিখ নির্বাচন করুন।' : 'Please provide name, phone, and target visit date.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 700);
  };

  const handleWhatsApp = () => {
    const phoneClean = content.company.phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Dakhina Group,\nI would like to schedule a site tour of Dakhina City:\nName: ${fullName}\nPhone: ${phone}\nDate: ${visitDate}\nTime: ${visitTime}\nGuests: ${guests}\nPickup Needed: ${pickupNeeded ? 'Yes (from Dakhina Tower/Uttara)' : 'No (Self Drive)'}`
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
          <CheckCircle className="mx-auto h-12 w-12 text-emerald-600 mb-2" />
          <h4 className="text-lg font-bold text-emerald-900">
            {isBn ? 'পরিদর্শন সূচি নিশ্চিত হয়েছে!' : 'Site Visit Tour Scheduled!'}
          </h4>
          <p className="mt-1 text-sm text-emerald-700 leading-relaxed">
            {isBn
              ? `আমরা ${visitDate} তারিখে আপনার জন্য দখিনা সিটির সাইট প্রটোকল প্রস্তুত রাখব।`
              : `We have scheduled your guided tour for ${visitDate} at ${visitTime}. Our protocol officer will meet you.`}
          </p>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold shadow-sm"
          >
            <span>{isBn ? 'হোয়াটসঅ্যাপে বুকিং নিশ্চিত করুন' : 'Confirm via WhatsApp Concierge'}</span>
          </button>
        </div>
      ) : (
        <>
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
              {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isBn ? 'উদা: ব্রিগ. জেনা. এম রহমান' : 'e.g. Brig. Gen. M. Rahman'}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
                {isBn ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider opacity-80 mb-1 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                <span>{isBn ? 'পরিদর্শনের তারিখ *' : 'Preferred Date *'}</span>
              </label>
              <input
                type="date"
                required
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider opacity-80 mb-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                <span>{isBn ? 'পছন্দের সময় *' : 'Time Slot *'}</span>
              </label>
              <select
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              >
                <option value="10:00 AM">10:00 AM (Morning Tour)</option>
                <option value="11:30 AM">11:30 AM (Pre-Noon Tour)</option>
                <option value="03:00 PM">03:00 PM (Afternoon Tour)</option>
                <option value="04:30 PM">04:30 PM (Sunset Lake Tour)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
              {isBn ? 'অতিথির সংখ্যা' : 'Number of Guests'}
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            >
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3-4 Family Members</option>
              <option value="5">5+ Delegation / Group</option>
            </select>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              id="pickup-check"
              checked={pickupNeeded}
              onChange={(e) => setPickupNeeded(e.target.checked)}
              className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="pickup-check" className="text-xs text-gray-700 cursor-pointer flex items-center gap-1.5">
              <Car className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                {isBn
                  ? 'দখিনা টাওয়ার / উত্তরা থেকে কমপ্লিমেন্টারি ট্রান্সপোর্ট পিকআপ প্রয়োজন'
                  : 'Complimentary executive transport pickup needed from Dakhina Tower / Uttara'}
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-all shadow-md active:scale-[0.98]"
          >
            <Calendar className="h-4 w-4" />
            <span>{isBn ? 'পরিদর্শন সূচি নিশ্চিত করুন' : 'Confirm Site Visit Schedule'}</span>
          </button>
        </>
      )}
    </form>
  );
};
