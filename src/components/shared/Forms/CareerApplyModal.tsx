import React, { useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { validateFormSecurity } from '../../../lib/utils';
import { X, UploadCloud, CheckCircle, AlertCircle, Briefcase } from 'lucide-react';

interface CareerApplyModalProps {
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CareerApplyModal: React.FC<CareerApplyModalProps> = ({
  jobTitle,
  isOpen,
  onClose,
}) => {
  const { isBn, content } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [fileName, setFileName] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formStartTime] = useState<number>(() => Date.now());

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const security = validateFormSecurity(honeypot, formStartTime);
    if (!security.valid) {
      setStatus('error');
      setErrorMessage(isBn ? 'স্বয়ংক্রিয় স্প্যাম সুরক্ষা সক্রিয়।' : 'Automated bot submission detected.');
      return;
    }

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setStatus('error');
      setErrorMessage(isBn ? 'প্রয়োজনীয় তথ্য পূরণ করুন।' : 'Please fill all required fields.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 700);
  };

  const handleDirectEmail = () => {
    const subject = encodeURIComponent(`Application for ${jobTitle} - ${fullName}`);
    const body = encodeURIComponent(
      `Dear HR Team,\n\nI am applying for the position of ${jobTitle}.\nName: ${fullName}\nPhone: ${phone}\nExperience: ${experience}\nCover Note:\n${coverNote}\n\nAttached is my CV.`
    );
    window.location.href = `mailto:${content.company.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-gray-900">
        {/* Header */}
        <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Briefcase className="h-5 w-5 text-amber-400" />
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-300">
                {isBn ? 'চাকরির আবেদন' : 'Career Application'}
              </span>
              <h3 className="text-base font-bold leading-tight">{jobTitle}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-white/20 transition-colors text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {status === 'success' ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
              <h4 className="text-lg font-bold text-emerald-950">
                {isBn ? 'আবেদন সফলভাবে গ্রহণ করা হয়েছে!' : 'Application Submitted!'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
                {isBn
                  ? 'দখিনা গ্রুপ এইচআর টিম আপনার সিভি পর্যালোচনা করে শর্টলিস্টেড প্রার্থীদের সাথে যোগাযোগ করবে।'
                  : 'Dakhina Group HR team will review your credentials and contact shortlisted applicants for interview.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-emerald-700 text-white font-medium text-xs hover:bg-emerald-800"
                >
                  {isBn ? 'বন্ধ করুন' : 'Close Window'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {isBn ? 'ইমেইল ঠিকানা *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {isBn ? 'ফোন নম্বর *' : 'Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {isBn ? 'মোট অভিজ্ঞতা (বছর)' : 'Years of Relevant Experience'}
                </label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder={isBn ? 'উদা: ৪ বছর' : 'e.g. 4.5 Years'}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Resume attachment simulator */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {isBn ? 'সিভি বা রেজ্যুমে আপলোড করুন (PDF / DOC)' : 'Upload Resume / CV (PDF / DOC)'}
                </label>
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-emerald-600 bg-gray-50/50 transition-colors">
                  <UploadCloud className="h-7 w-7 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-600 font-medium">
                    {fileName ? fileName : isBn ? 'ফাইল নির্বাচন করতে এখানে ক্লিক করুন' : 'Click to attach your CV document'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {isBn ? 'কভার নোট বা বার্তা' : 'Cover Note'}
                </label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder={isBn ? 'আপনার অভিজ্ঞতা ও দক্ষতার সারসংক্ষেপ...' : 'Brief introduction of your qualifications...'}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex-1 py-3 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-all shadow-sm"
                >
                  {status === 'submitting' ? (isBn ? 'প্রেরণ হচ্ছে...' : 'Submitting...') : (isBn ? 'আবেদন জমা দিন' : 'Submit Application')}
                </button>
                <button
                  type="button"
                  onClick={handleDirectEmail}
                  className="px-4 py-3 rounded-lg border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-100"
                  title="Or send application directly via your email client"
                >
                  {isBn ? 'ইমেইল করুন' : 'Mail Directly'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
