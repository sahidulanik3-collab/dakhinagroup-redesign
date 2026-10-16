import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { InquiryForm } from '../components/shared/Forms/InquiryForm';
import { CallbackForm } from '../components/shared/Forms/CallbackForm';
import { VisitScheduleForm } from '../components/shared/Forms/VisitScheduleForm';
import { LeafletMap } from '../components/shared/LeafletMap';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Calendar,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export const ContactUs: React.FC = () => {
  const { isBn } = useLanguage();
  const [activeTab, setActiveTab] = useState<'inquiry' | 'callback' | 'visit'>('inquiry');
  const [mapTarget, setMapTarget] = useState<'office' | 'project'>('office');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 bg-primary/10 text-primary border border-primary/20">
          <Phone className="w-3.5 h-3.5" />
          <span>{isBn ? 'যোগাযোগ ও সরাসরি সেবা' : 'Get In Touch'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6 font-display">
          {isBn ? 'আমাদের সাথে যোগাযোগ করুন' : 'Connect with Dakhina Group'}
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed font-body">
          {isBn
            ? 'আমাদের প্রধান কার্যালয় বা প্রকল্প এলাকা পরিদর্শনের জন্য আমরা সর্বদা আপনার সেবায় নিয়োজিত। আপনার যেকোনো অনুসন্ধান বা প্রকল্প পরিদর্শনের পরিকল্পনা জানাতে নিচের ফরম পূরণ করুন।'
            : 'Whether you require legal verification, bespoke villa advisory, or want to experience Dakhina City first-hand, our team is at your dedicated service.'}
        </p>
      </div>

      {/* Corporate Offices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* HQ Card */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 font-display mb-2">
              {isBn ? 'প্রধান কার্যালয় (দখিনা টাওয়ার)' : 'Headquarters (Dakhina Tower)'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-body">
              {isBn
                ? '৫৪৩/এ ইসিবি চত্বর, প্রধান সড়ক, ঢাকা সেনানিবাস, ঢাকা-১২০৬'
                : '543/A ECB Chattar, Main Road, Dhaka Cantonment, Dhaka-1206'}
            </p>
          </div>
          <button
            onClick={() => setMapTarget('office')}
            className="mt-4 text-xs font-bold text-primary inline-flex items-center gap-1 hover:underline text-left pt-2 border-t border-neutral-100"
          >
            <span>{isBn ? 'মানচিত্রে দেখুন' : 'View on Map'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Project Office Card */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 font-display mb-2">
              {isBn ? 'প্রকল্প কার্যালয় (দখিনা সিটি)' : 'Project Site (Dakhina City)'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-body">
              {isBn
                ? 'মৌইস্তাপাড়া, কাউন্দিয়া, সাভার, ঢাকা (উত্তরা ১৮ নম্বর সেক্টরের সন্নিকটে)'
                : 'Moistapara, Kumarkhoda, Savar, Dhaka (Direct link to Uttara Sector 18)'}
            </p>
          </div>
          <button
            onClick={() => setMapTarget('project')}
            className="mt-4 text-xs font-bold text-amber-700 inline-flex items-center gap-1 hover:underline text-left pt-2 border-t border-neutral-100"
          >
            <span>{isBn ? 'মানচিত্রে দেখুন' : 'View on Map'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Hotlines */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 font-display mb-2">
              {isBn ? 'জরুরি হটলাইন' : 'Direct Hotlines'}
            </h3>
            <div className="space-y-1.5 text-xs sm:text-sm text-neutral-600 font-mono">
              <p>
                <a href="tel:+8801407048190" className="hover:text-primary transition-colors block">
                  +880 1407 048190
                </a>
              </p>
              <p>
                <a href="tel:+8801711592834" className="hover:text-primary transition-colors block">
                  +880 1711 592834
                </a>
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-400 pt-2 border-t border-neutral-100">
            {isBn ? 'হোয়াটসঅ্যাপ সংযোগ সক্রিয়' : 'WhatsApp direct response active'}
          </p>
        </div>

        {/* Operating Hours & Email */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 font-display mb-2">
              {isBn ? 'অফিস সময় ও ইমেইল' : 'Hours & Inquiries'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-body mb-2">
              {isBn ? 'শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – সন্ধ্যা ৬:০০' : 'Sat – Thu: 9:00 AM – 6:00 PM'}
            </p>
            <a
              href="mailto:info@dakhinagroup.com"
              className="text-xs sm:text-sm font-semibold text-primary hover:underline break-all inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>info@dakhinagroup.com</span>
            </a>
          </div>
          <div className="mt-4 text-xs text-emerald-700 flex items-center gap-1.5 pt-2 border-t border-neutral-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isBn ? 'রিহ্যাব সদস্য নং ৪৯৫' : 'REHAB Member #495'}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Section: Forms & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Form Selector Column (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
          {/* Form Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-neutral-100/90 rounded-2xl">
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
                activeTab === 'inquiry'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isBn ? 'সাধারণ অনুসন্ধান' : 'Send Inquiry'}</span>
            </button>

            <button
              onClick={() => setActiveTab('callback')}
              className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
                activeTab === 'callback'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isBn ? 'কলব্যাক অনুরোধ' : 'Request Callback'}</span>
            </button>

            <button
              onClick={() => setActiveTab('visit')}
              className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
                activeTab === 'visit'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{isBn ? 'প্রকল্প পরিদর্শন' : 'Schedule Visit'}</span>
            </button>
          </div>

          {/* Form Content */}
          <div>
            {activeTab === 'inquiry' && <InquiryForm />}
            {activeTab === 'callback' && <CallbackForm />}
            {activeTab === 'visit' && <VisitScheduleForm />}
          </div>
        </div>

        {/* Map & Direction Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900 font-display">
                {isBn ? 'অবস্থান মানচিত্র' : 'Strategic Location'}
              </h3>
              <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setMapTarget('office')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    mapTarget === 'office'
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {isBn ? 'প্রধান অফিস' : 'HQ Office'}
                </button>
                <button
                  onClick={() => setMapTarget('project')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    mapTarget === 'project'
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {isBn ? 'দখিনা সিটি' : 'Dakhina City'}
                </button>
              </div>
            </div>

            <div className="h-80 sm:h-96 rounded-2xl overflow-hidden border border-neutral-200">
              <LeafletMap focusTarget={mapTarget} className="h-full w-full" />
            </div>

            <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 text-xs text-neutral-600 leading-relaxed">
              <p className="font-semibold text-neutral-800 mb-1">
                {isBn ? 'যাতায়াত সংক্রান্ত দিকনির্দেশনা:' : 'Transit Direction Notes:'}
              </p>
              <p>
                {isBn
                  ? 'উত্তরা ১৮ নম্বর সেক্টর মেট্রোরেল স্টেশন অথবা মাসকাট প্লাজা থেকে সরাসরি ১০০ ফুট সংযোগ সড়ক দিয়ে মাত্র ১০ মিনিটে দখিনা সিটিতে পৌঁছানো যায়। পরিদর্শনের দিন আমাদের নিজস্ব শীতাতপ নিয়ন্ত্রিত ট্রান্সপোর্টের ব্যবস্থা রয়েছে।'
                  : 'Reach Dakhina City in under 10 minutes from Uttara Sector 18 Metro Rail station or Maskat Plaza via the 100-foot dedicated arterial link. Complimentary shuttle pickup available upon request.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
