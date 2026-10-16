import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  ArrowUp,
  Globe,
} from 'lucide-react';

const GALLERY_THUMBNAILS = [
  { src: '/assets/dakhina-live/drel-150x150.jpg', alt: 'DREL Hedge Landmark' },
  { src: '/assets/dakhina-live/DSCF8648-150x150.jpg', alt: 'Highland Aerial Drone View' },
  { src: '/assets/dakhina-live/beutyfication-150x150.jpg', alt: 'Flower Boulevard Driveway' },
  { src: '/assets/dakhina-live/60-150x150.jpg', alt: 'Demarcated Plot Road' },
  { src: '/assets/dakhina-live/80-150x150.jpg', alt: 'Main 80ft Boulevard' },
  { src: '/assets/dakhina-live/beutyfication2-150x150.jpg', alt: 'Lakefront Residential Compound' },
];

export const Footer: React.FC = () => {
  const { content, isBn, toggleLanguage, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full text-white text-xs overflow-hidden border-t-4 border-[#128341]">
      {/* Scenic mirpur_view.jpg Panoramic Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/dakhina-live/mirpur_view.jpg"
          alt="Dakhina City Panoramic Green Landscape"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-bottom"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/dakhina-live/DSCF8649.jpg';
          }}
        />
        {/* Dark Emerald & Neutral Gradient Overlay for Superior Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-neutral-900/80 backdrop-blur-[2px]" />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info (col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block group">
              <div className="bg-white/95 rounded-2xl p-2.5 shadow-md border border-white/20 inline-flex items-center gap-3">
                <img
                  src="/assets/dakhina-live/dakhina.png"
                  alt="Dakhina Group - Architect of Trust"
                  loading="lazy"
                  decoding="async"
                  className="h-10 sm:h-12 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/dakhina-brand.png';
                  }}
                />
              </div>
            </Link>

            <p className="text-neutral-300 leading-relaxed text-xs max-w-sm font-sans">
              {isBn
                ? 'দখিনা গ্রুপ বাংলাদেশের অন্যতম শীর্ষস্থানীয় রিয়েল এস্টেট ও কনগ্লোমারেট কোম্পানি। ২০০৪ সাল থেকে রাজধানী ঢাকার উপকণ্ঠে গড়ে তুলছে আধুনিক, নিরাপদ ও নিষ্কণ্টক আবাসন।'
                : 'Dakhina Group is one of the premier real estate and infrastructure development conglomerates in Bangladesh, masterplanning future-ready sustainable cities since 2004.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={content.company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-[#128341] text-white border border-white/10 transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={content.company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-[#128341] text-white border border-white/10 transition-colors shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/dakhinagroup"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-[#128341] text-white border border-white/10 transition-colors shadow-sm"
                aria-label="Twitter / X"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={content.company.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-[#128341] text-white border border-white/10 transition-colors shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: 6-Thumbnail Project Gallery (col-span-3) - matching Screenshot 1 */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-serif font-bold text-sm tracking-wide flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7dba41]" />
              <span>{isBn ? 'প্রকল্পের বাস্তব দৃশ্য' : 'Project Gallery'}</span>
            </h4>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {GALLERY_THUMBNAILS.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden aspect-square border border-white/20 bg-black/40 group relative shadow-md"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/dakhina-live/beutyfication.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
            <Link
              to="/dakhina-city"
              className="inline-block text-[11px] text-[#7dba41] hover:text-white font-semibold pt-1 underline"
            >
              {isBn ? 'সকল স্থিরচিত্র ও মাস্টারপ্ল্যান দেখুন →' : 'View Full Masterplan & Visuals →'}
            </Link>
          </div>

          {/* Column 3: Quick Links (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-serif font-bold text-sm tracking-wide flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#f37d20]" />
              <span>{isBn ? 'প্রয়োজনীয় লিংক' : 'Quick Links'}</span>
            </h4>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <Link to="/dakhina-city" className="hover:text-[#7dba41] transition-colors">
                  {isBn ? 'দখিনা সিটি' : 'Dakhina City'}
                </Link>
              </li>
              <li>
                <Link to="/message-from-md" className="hover:text-[#7dba41] transition-colors">
                  {isBn ? 'এমডি মহোদয়ের বার্তা' : 'Message from MD'}
                </Link>
              </li>
              <li>
                <Link to="/board-of-directors" className="hover:text-[#7dba41] transition-colors">
                  {isBn ? 'পরিচালনা পর্ষদ' : 'Board Of Directors'}
                </Link>
              </li>
              <li>
                <Link to="/awards-achievements" className="hover:text-[#7dba41] transition-colors">
                  {isBn ? 'অর্জন ও স্বীকৃতি' : 'Awards & Achievements'}
                </Link>
              </li>
              <li>
                <Link to="/our-clients" className="hover:text-[#7dba41] transition-colors">
                  {isBn ? 'সম্মানিত ক্লায়েন্টবৃন্দ' : 'Our Respected Clients'}
                </Link>
              </li>
              <li>
                <Link to="/media-news" className="hover:text-[#7dba41] transition-colors">
                  {isBn ? 'মিডিয়া ও সংবাদ' : 'Media & News'}
                </Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-[#7dba41] transition-colors">
                  {isBn ? 'ক্যারিয়ার' : 'Career'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Dakhina Tower (col-span-3) - matching Screenshot 1 */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-serif font-bold text-sm tracking-wide flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#128341]" />
              <span>{isBn ? 'দখিনা টাওয়ার' : 'Dakhina Tower'}</span>
            </h4>
            <div className="space-y-3 text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#7dba41] shrink-0 mt-0.5" />
                <span className="leading-snug text-neutral-200">
                  Dakhina Tower, 543/A, ECB Chattar, Main Road, Dhaka Cantonment, Dhaka-1206
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#7dba41] shrink-0" />
                <div className="space-y-0.5">
                  <a href="tel:+8801713338888" className="hover:text-white transition-colors block">
                    +880 1713-338888
                  </a>
                  <a href="tel:+8801713338899" className="hover:text-white transition-colors block text-[11px] text-neutral-400">
                    +880 1713-338899
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#7dba41] shrink-0" />
                <a href="mailto:info@dakhinagroup.com" className="hover:text-white transition-colors">
                  info@dakhinagroup.com
                </a>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact-us#inquiry"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#128341] hover:bg-[#169c4e] text-white font-bold text-[11px] shadow-md transition-all"
                >
                  {isBn ? 'ইনকোয়ারি ফর্ম পূরণ করুন' : 'Direct Inquiry Form'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to top row */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <span>{isBn ? 'পৃষ্ঠার শীর্ষে চলুন' : 'Back to Top'}</span>
            <ArrowUp className="h-3.5 w-3.5 text-[#7dba41]" />
          </button>
        </div>
      </div>

      {/* Signature Bottom Green Bar matching Screenshot 1 */}
      <div className="relative z-10 bg-gradient-to-r from-[#5da72a] via-[#6fad33] to-[#128341] text-white py-3.5 px-4 sm:px-6 lg:px-8 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Left links */}
          <div className="flex items-center gap-3">
            <Link to="/about-us" className="hover:underline">
              {isBn ? 'আমাদের সম্পর্কে' : 'About Us'}
            </Link>
            <span>•</span>
            <Link to="/contact-us" className="hover:underline">
              {isBn ? 'যোগাযোগ' : 'Contact Us'}
            </Link>
            <span>•</span>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:underline"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
          </div>

          {/* Right Copyright */}
          <div>
            {new Date().getFullYear()} © All Rights Reserved by{' '}
            <span className="font-bold">Dakhina Group</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
