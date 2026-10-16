import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { MapPin, Phone, Mail, Navigation, Clock, ShieldCheck } from 'lucide-react';

export const HeadquartersMapSection: React.FC = () => {
  const { isBn, content } = useLanguage();
  const [isMapActive, setIsMapActive] = React.useState(false);

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8934A]">
            {isBn ? 'কৌশলগত অবস্থান ও কর্পোরেট হেডকোয়ার্টার্স' : 'Corporate Headquarters & Connectivity'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0c3620] tracking-tight">
            {isBn ? 'দখিনা টাওয়ার · ইসিবি চত্বর, ঢাকা সেনানিবাস' : 'Dakhina Tower · ECB Chattar, Dhaka Cantonment'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto font-sans">
            {isBn
              ? 'মিরপুর ডিওএইচএস, কুর্মিটোলা ও ঢাকা সেনানিবাসের প্রাণকেন্দ্র ইসিবি চত্বরে আমাদের নিজস্ব ১০ তলা প্রধান কার্যালয়। প্রতিদিন পরিচালিত হয় সাইট ভিজিট।'
              : 'Our 10-story corporate headquarters located at ECB Chattar, Dhaka Cantonment, providing direct coordination and daily VIP site transports.'}
          </p>
        </div>

        {/* Map & Office Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl overflow-hidden border-2 border-neutral-200 shadow-xl bg-neutral-50">
          {/* Map Embed (matching Screenshot 1) */}
          <div
            className="lg:col-span-8 min-h-[380px] relative bg-neutral-200 group"
            onClick={() => setIsMapActive(true)}
            onMouseLeave={() => setIsMapActive(false)}
          >
            <iframe
              title="Dakhina Group Headquarters Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.369792440332!2d90.38466637604314!3d23.80544528666352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0c86fffff%3A0x6bfa9e924d55b0a3!2sDakhina%20Group!5e0!3m2!1sen!2sbd!4v1718000000000!5m2!1sen!2sbd"
              className={`w-full h-full min-h-[380px] border-0 transition-opacity ${
                isMapActive ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {!isMapActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/15 transition-colors cursor-pointer pointer-events-auto">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900/85 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                  {isBn ? 'ম্যাপে জুম বা নেভিগেট করতে ক্লিক করুন' : 'Click to interact with map'}
                </span>
              </div>
            )}
          </div>

          {/* Office Quick Contact Details */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white border-l border-neutral-200">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#128341]/10 text-[#128341] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5 text-[#128341]" />
                <span>{isBn ? 'প্রধান কর্পোরেট অফিস' : 'Principal Office'}</span>
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-[#0c3620]">
                  {isBn ? 'দখিনা টাওয়ার' : 'Dakhina Tower'}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {content.company.legalName}
                </p>
              </div>

              <div className="space-y-3.5 text-xs text-neutral-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#128341] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {content.company.address}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#128341] shrink-0" />
                  <a
                    href={`tel:${content.company.phone}`}
                    className="hover:text-[#128341] font-semibold transition-colors"
                  >
                    {content.company.phone} / +880 1713-338899
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#128341] shrink-0" />
                  <a
                    href={`mailto:${content.company.email}`}
                    className="hover:text-[#128341] transition-colors"
                  >
                    {content.company.email}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-[#128341] shrink-0" />
                  <span>{isBn ? 'শনিবার - বৃহস্পতিবার: সকাল ৯:০০ - সন্ধ্যা ৬:০০' : 'Sat - Thu: 9:00 AM - 6:00 PM'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200">
              <a
                href="https://maps.app.goo.gl/ECBChattarDakhina"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#128341] text-white text-xs font-bold hover:bg-[#0c3620] shadow-md transition-all"
              >
                <Navigation className="h-4 w-4 text-[#7dba41]" />
                <span>{isBn ? 'গুগল ম্যাপে দিকনির্দেশনা দেখুন' : 'Get Directions on Google Maps'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
