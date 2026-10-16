import React, { useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { validateFormSecurity } from '../../../lib/utils';
import { Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

interface InquiryFormProps {
  propertyTitle?: string;
  className?: string;
  onSuccess?: () => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  propertyTitle,
  className = '',
  onSuccess,
}) => {
  const { isBn, content } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    propertyTitle
      ? isBn
        ? `আমি "${propertyTitle}" সম্পর্কে বিস্তারিত জানতে আগ্রহী। দয়া করে আমার সাথে যোগাযোগ করুন।`
        : `I am interested in learning more about "${propertyTitle}". Please contact me with pricing and site visit details.`
      : ''
  );
  const [honeypot, setHoneypot] = useState('');
  const [formStartTime] = useState<number>(() => Date.now());

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Security validation (honeypot + time trap)
    const security = validateFormSecurity(honeypot, formStartTime);
    if (!security.valid) {
      setStatus('error');
      setErrorMessage(
        isBn
          ? 'নিরাপত্তা সুরক্ষা: স্বয়ংক্রিয় স্প্যাম শনাক্ত হয়েছে।'
          : 'Security check failed: Automated submission detected.'
      );
      return;
    }

    if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage(
        isBn
          ? 'অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।'
          : 'Please fill out all required fields.'
      );
      return;
    }

    setStatus('submitting');

    const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT;

    if (formEndpoint) {
      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName,
            email,
            phone,
            propertyTitle: propertyTitle || 'General Inquiry',
            message,
            timestamp: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          setStatus('success');
          if (onSuccess) onSuccess();
        } else {
          throw new Error('Server returned non-200');
        }
      } catch {
        fallbackToWhatsApp();
      }
    } else {
      // In demo mode without backend, transition to success and offer instant WhatsApp connection
      setTimeout(() => {
        setStatus('success');
        if (onSuccess) onSuccess();
      }, 700);
    }
  };

  const fallbackToWhatsApp = () => {
    const phoneClean = content.company.phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Dakhina Group,\nName: ${fullName}\nPhone: ${phone}\nEmail: ${email}\nProperty: ${propertyTitle || 'General Inquiry'}\nMessage: ${message}`
    );
    window.open(`https://wa.me/${phoneClean}?text=${text}`, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Anti-spam honeypot (hidden from human users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="inquiry-hp">Company Code</label>
        <input
          id="inquiry-hp"
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
            {isBn ? 'আপনার বার্তা সফলভাবে গ্রহণ করা হয়েছে!' : 'Inquiry Received!'}
          </h4>
          <p className="mt-1 text-sm text-emerald-700 leading-relaxed">
            {isBn
              ? 'আমাদের সিনিয়র প্রপার্টি কনসালটেন্ট শীঘ্রই আপনার সাথে যোগাযোগ করবেন।'
              : 'Our senior real estate advisory team will contact you promptly.'}
          </p>

          <button
            type="button"
            onClick={fallbackToWhatsApp}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-sm"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{isBn ? 'সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন' : 'Chat Instantly on WhatsApp'}</span>
          </button>
        </div>
      ) : (
        <>
          {propertyTitle && (
            <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200/60 text-xs text-amber-900">
              <span className="font-semibold">{isBn ? 'নির্বাচিত ভিলা:' : 'Inquiring for:'}</span>{' '}
              {propertyTitle}
            </div>
          )}

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-inherit opacity-80 mb-1">
              {isBn ? 'আপনার পুরো নাম *' : 'Full Name *'}
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isBn ? 'উদা: মো. আনোয়ার হোসেন' : 'e.g. Lt. Col. Tariq Rahman / Dr. S. Ahmed'}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-inherit opacity-80 mb-1">
                {isBn ? 'মোবাইল নম্বর *' : 'Phone Number *'}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1700 000000"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-inherit opacity-80 mb-1">
                {isBn ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-inherit opacity-80 mb-1">
              {isBn ? 'আপনার বার্তা বা প্রশ্ন *' : 'Message or Specific Questions *'}
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isBn ? 'আপনার পছন্দের প্লট সাইজ, বাজেট বা পরিদর্শনের সময় উল্লেখ করতে পারেন...' : 'Inquire about pricing, booking terms, or scheduling a site tour...'}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <span>{isBn ? 'প্রেরণ করা হচ্ছে...' : 'Transmitting securely...'}</span>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>{isBn ? 'অনুসন্ধান পাঠান' : 'Submit Inquiry'}</span>
              </>
            )}
          </button>
        </>
      )}
    </form>
  );
};
