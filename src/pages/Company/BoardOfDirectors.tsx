import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BoardOfDirectors: React.FC = () => {
  const { isBn, content } = useLanguage();

  const board = [
    {
      name: content.leadership.chairman.name,
      role: content.leadership.chairman.role,
      bio: content.leadership.chairman.bio,
      initials: 'MH',
    },
    {
      name: content.leadership.managingDirector.name,
      role: content.leadership.managingDirector.role,
      bio: content.leadership.managingDirector.bio,
      initials: 'SA',
    },
    {
      name: content.leadership.directors[0].name,
      role: content.leadership.directors[0].role,
      bio: content.leadership.directors[0].bio,
      initials: 'TA',
    },
    {
      name: content.leadership.directors[1].name,
      role: content.leadership.directors[1].role,
      bio: content.leadership.directors[1].bio,
      initials: 'SA',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
          {isBn ? 'নেতৃত্ব ও পরিচালনা পর্ষদ' : 'Leadership & Governance'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-gray-900">
          {isBn ? 'সম্মানিত পরিচালনা পর্ষদ' : 'Board of Directors'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          {isBn
            ? 'পারিবারিক ঐতিহ্য ও সামরিক শৃঙ্খলার সমন্বয়ে দখিনা গ্রুপের টেকসই অগ্রগতি'
            : 'Fostering generational trust, transparency, and masterplanned excellence'}
        </p>
      </div>

      {/* Founder Tribute Box */}
      <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-10 border border-neutral-800 shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 font-serif text-3xl font-bold border border-amber-500/40">
          PH
        </div>
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
            {isBn ? 'শ্রদ্ধাঞ্জলি' : 'Founder Tribute'}
          </span>
          <h2 className="text-2xl font-bold font-serif text-white">
            {content.leadership.founder.name}
          </h2>
          <span className="text-xs text-neutral-400 font-semibold block">
            {content.leadership.founder.role}
          </span>
          <p className="text-xs text-neutral-300 leading-relaxed pt-1">
            {content.leadership.founder.bio}
          </p>
        </div>
      </div>

      {/* 4 Active Board Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {board.map((member, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-white border border-gray-200/80 p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F3D2E] text-amber-400 font-serif text-2xl font-bold shadow-md shrink-0">
                {member.initials}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                  {member.role}
                </span>
                <h3 className="text-xl font-bold text-gray-900 font-serif mt-0.5">
                  {member.name}
                </h3>
                <span className="text-xs text-gray-400 font-medium">Dakhina Group</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {member.bio}
            </p>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Executive Governance</span>
              </span>
              <Link
                to="/contact-us"
                className="text-amber-700 hover:text-amber-800 font-semibold underline"
              >
                {isBn ? 'যোগাযোগ করুন' : 'Official Secretariat'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
