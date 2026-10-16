import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MessageFromMD: React.FC = () => {
  const { isBn, content } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
          {content.mdMessage.title}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif text-gray-900">
          {content.mdMessage.subtitle}
        </h1>
      </div>

      {/* Main Executive Letter Card */}
      <div className="rounded-3xl bg-white border border-gray-200/80 p-8 sm:p-12 shadow-xl space-y-8">
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F3D2E] text-amber-400 font-serif text-2xl font-bold shadow-md">
            AZ
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {content.leadership.managingDirector.name}
            </h2>
            <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider">
              {content.leadership.managingDirector.role} · Dakhina Group
            </p>
            <p className="text-xs text-gray-500">
              {content.leadership.managingDirector.militaryTitle}
            </p>
          </div>
        </div>

        {/* Message Paragraphs */}
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <div className="relative pl-6 border-l-4 border-amber-500 italic text-base text-gray-800 font-medium">
            <Quote className="h-5 w-5 text-amber-500 absolute -top-1 left-1 opacity-40" />
            <p className="pl-2">{content.mdMessage.paragraphs[0]}</p>
          </div>

          <p>{content.mdMessage.paragraphs[1]}</p>

          <p>{content.mdMessage.paragraphs[2]}</p>
        </div>

        {/* Sign-off */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-widest block font-medium">
              {isBn ? 'আন্তরিক শ্রদ্ধাসহ' : 'With Warm Regard & Commitment'}
            </span>
            <div className="text-lg font-extrabold text-[#0F3D2E] font-serif mt-1">
              {content.mdMessage.signOff.name}
            </div>
            <div className="text-xs text-amber-800 font-semibold">
              {content.mdMessage.signOff.title}
            </div>
          </div>

          <Link
            to="/board-of-directors"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all"
          >
            <span>{isBn ? 'পরিচালনা পর্ষদের প্রোফাইল' : 'View Board of Directors'}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
