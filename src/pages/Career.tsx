import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { CareerApplyModal } from '../components/shared/Forms/CareerApplyModal';
import { Briefcase, MapPin, Clock, Award, Shield, Users, CheckCircle, ArrowRight, Mail } from 'lucide-react';

export const Career: React.FC = () => {
  const { isBn, content } = useLanguage();

  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const careers = content.careers || [];

  const perks = [
    {
      icon: Shield,
      titleEn: 'Security & Integrity',
      titleBn: 'নিরাপত্তা ও বিশ্বস্ততা',
      descEn: 'Work with high-level institutional and defense personnel with utmost transparency and ethics.',
      descBn: 'সর্বোচ্চ স্বচ্ছতা ও নীতির সাথে প্রাতিষ্ঠানিক ও প্রতিরক্ষা কর্মকর্তাদের সাথে কাজের সুযোগ।',
    },
    {
      icon: Award,
      titleEn: 'Excellence & Heritage',
      titleBn: 'উৎকর্ষ ও গৌরব',
      descEn: 'Be part of an iconic 20-year legacy shaping modern townships in Dhaka Cantonment and Savar.',
      descBn: 'ঢাকা সেনানিবাস ও সাভারে আধুনিক আবাসন বিনির্মাণে ২০ বছরের ঐতিহ্যের অংশীদার হন।',
    },
    {
      icon: Users,
      titleEn: 'Collaborative Growth',
      titleBn: 'সম্মিলিত সমৃদ্ধি',
      descEn: 'Competitive compensation, executive performance incentives, and career acceleration programs.',
      descBn: 'আকর্ষণীয় বেতন কাঠামো, এক্সিকিউটিভ ইনসেনটিভ এবং পেশাগত পদোন্নতির সুযোগ।',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 bg-primary/10 text-primary border border-primary/20">
          <Briefcase className="w-3.5 h-3.5" />
          <span>{isBn ? 'কর্মসংস্থান ও ভবিষ্যৎ' : 'Careers at Dakhina Group'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6 font-display">
          {isBn
            ? 'আস্থা ও সততার সাথে আপনার ক্যারিয়ার গড়ুন'
            : 'Build Your Career with the Architect of Trust'}
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed font-body">
          {isBn
            ? 'দক্ষিণা গ্রুপে আমরা কেবল রিয়েল এস্টেট তৈরি করি না—আমরা জাতির সমৃদ্ধি ও হাজারো পরিবারের আস্থা নির্মাণ করি। আমাদের কর্মঠ ও দূরদর্শী টিমে আপনাকে স্বাগত।'
            : 'At Dakhina Group, we do not merely develop properties; we build lifetime trust and thriving master-planned communities. Join our mission to redefine urban living in Bangladesh.'}
        </p>
      </div>

      {/* Perks / Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {perks.map((perk, i) => {
          const Icon = perk.icon;
          return (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 font-display">
                {isBn ? perk.titleBn : perk.titleEn}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-body">
                {isBn ? perk.descBn : perk.descEn}
              </p>
            </div>
          );
        })}
      </div>

      {/* Open Positions Section */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-display">
              {isBn ? 'বর্তমান খালি পদসমূহ' : 'Current Openings'}
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              {isBn
                ? 'সরাসরি আবেদন করুন অথবা জীবনবৃত্তান্ত প্রেরণ করুন।'
                : 'Apply directly through our secure portal or submit your CV.'}
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 mt-4 md:mt-0 w-fit">
            {careers.length} {isBn ? 'টি পদ উন্মুক্ত' : 'Positions Available'}
          </span>
        </div>

        <div className="space-y-6">
          {careers.map((job) => (
            <div
              key={job.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                      {job.department}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.type}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-display">
                    {job.title}
                  </h3>
                  <p className="text-sm font-medium text-amber-700 mt-1">
                    {isBn ? 'অভিজ্ঞতা:' : 'Experience:'} {job.experience}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedJob(job.title)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm w-full sm:w-auto min-h-[44px]"
                >
                  <span>{isBn ? 'আবেদন করুন' : 'Apply for this Role'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-neutral-600 mb-5 font-body leading-relaxed">
                {job.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
                  {isBn ? 'যোগ্যতা ও দক্ষতা:' : 'Key Requirements:'}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-600">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General Application Callout */}
      <div className="rounded-3xl p-8 sm:p-10 bg-neutral-900 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-2xl font-bold font-display mb-2">
            {isBn ? 'আপনার প্রোফাইলের উপযুক্ত পদ খুঁজে পাচ্ছেন না?' : 'Don’t See an Exact Match?'}
          </h3>
          <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
            {isBn
              ? 'আমরা সর্বদা প্রতিভাবান ও উদ্যমী পেশাদারদের সন্ধান করি। আপনার জীবনবৃত্তান্ত আমাদের মানবসম্পদ বিভাগে পাঠিয়ে রাখুন।'
              : 'We are always keen to meet ambitious architects, engineers, and real estate professionals. Send your CV and portfolio directly to our HR team.'}
          </p>
          <a
            href="mailto:info@dakhinagroup.com?subject=Speculative%20Career%20Application%20-%20Dakhina%20Group"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-sm transition-colors min-h-[44px]"
          >
            <Mail className="w-4 h-4" />
            <span>info@dakhinagroup.com</span>
          </a>
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <CareerApplyModal
          jobTitle={selectedJob}
          isOpen={true}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};
