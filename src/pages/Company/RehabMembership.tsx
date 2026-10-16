import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Award, ShieldCheck, Calendar, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RehabMembership: React.FC = () => {
  const { isBn, content } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
          {isBn ? 'স্বীকৃতি ও প্রাতিষ্ঠানিক নিবন্ধন' : 'Statutory Certification'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-gray-900">
          {isBn ? 'রিহ্যাব সদস্যপদ' : 'REHAB Membership'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Real Estate & Housing Association of Bangladesh
        </p>
      </div>

      {/* Official Certificate Card */}
      <div className="rounded-3xl bg-white border-2 border-amber-500/30 p-8 sm:p-12 shadow-xl space-y-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F3D2E] text-amber-400 font-bold text-2xl shadow-md">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Active & Certified
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                {content.company.legalName}
              </h3>
              <p className="text-xs text-gray-500 font-medium">REHAB Member in Good Standing</p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-amber-50/60 p-4 rounded-xl border border-amber-200/60">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
              Membership Number
            </span>
            <span className="text-2xl font-black text-amber-900 font-mono">
              #{content.company.rehabMembership}
            </span>
          </div>
        </div>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/60 text-center space-y-1">
            <Calendar className="mx-auto h-5 w-5 text-amber-600 mb-1" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              {isBn ? 'প্রতিষ্ঠা সাল' : 'Year of Inception'}
            </span>
            <span className="text-lg font-bold text-gray-900 block font-mono">
              {content.company.yearEstablished}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/60 text-center space-y-1">
            <ShieldCheck className="mx-auto h-5 w-5 text-emerald-600 mb-1" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              {isBn ? 'সদস্যপদ লাভের তারিখ' : 'Member Since'}
            </span>
            <span className="text-lg font-bold text-gray-900 block font-mono">
              {content.company.rehabMemberSince}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/60 text-center space-y-1">
            <FileText className="mx-auto h-5 w-5 text-blue-600 mb-1" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              {isBn ? 'রিহ্যাব কোড অফ এথিক্স' : 'Code of Ethics'}
            </span>
            <span className="text-lg font-bold text-emerald-700 block">
              100% Compliant
            </span>
          </div>
        </div>

        {/* Context Text */}
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed pt-2">
          <p>
            {isBn
              ? 'দখিনা রিয়েল এস্টেট (প্রা.) লিমিটেড (DREL) গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের যৌথ মূলধনী কোম্পানি ও ফার্মসমূহের পরিদপ্তর (RJSC) নিবন্ধিত প্রতিষ্ঠান এবং রিয়েল এস্টেট অ্যান্ড হাউজিং অ্যাসোসিয়েশন অব বাংলাদেশ (রিহ্যাব)-এর সম্মানিত সদস্য (সদস্য নং ৪৯৫/২০০৮)।'
              : 'Dakhina Real Estate (Pvt.) Limited has maintained unblemished compliance with the statutory consumer safety regulations of REHAB. Every property sold adheres to strict survey boundaries, transparent escalation-free agreements, and immediate mutation clearance.'}
          </p>
          <p>
            {isBn
              ? 'আমরা রিহ্যাবের নীতিমালার আলোকে প্লট হস্তান্তর, মাস্টারপ্ল্যান বাস্তবায়ন এবং ক্রেতা অধিকার সুরক্ষায় প্রতিশ্রুতিবদ্ধ।'
              : 'Our commitment guarantees buyers complete protection under Bangladesh real estate jurisprudence, supported by physical possession and prompt handover.'}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/awards-achievements"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800"
          >
            <span>{isBn ? 'রিহ্যাব মেলা পুরস্কার ও স্বীকৃতিসমূহ দেখুন' : 'Explore REHAB Fair Awards & Milestones'}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/contact-us"
            className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all"
          >
            {isBn ? 'অফিস পরিদর্শনের সূচি নিন' : 'Visit Corporate Secretariat'}
          </Link>
        </div>
      </div>
    </div>
  );
};
