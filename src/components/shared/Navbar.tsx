import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useFavourites } from '../../hooks/useFavourites';
import {
  Menu,
  X,
  ChevronDown,
  Heart,
  Globe,
  Phone,
  Calendar,
  Building2,
  Users,
  ShieldCheck,
  Award,
  FileText,
  PhoneCall,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, isBn, content } = useLanguage();
  const { count: favCount } = useFavourites();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeAll = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  // NavLink active class helper matching Screenshot 3 & 4 (orange active underline)
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3.5 py-2 text-xs font-bold tracking-wider transition-all uppercase ${
      isActive
        ? 'text-[#f37d20] font-black border-b-2 border-[#f37d20]'
        : 'text-inherit opacity-85 hover:opacity-100 hover:text-[#f37d20]'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-md border-b border-neutral-200/60 bg-white/95 text-neutral-900 shadow-sm">
      {/* Top utility bar on desktop */}
      <div className="hidden lg:block border-b border-neutral-100 py-1.5 px-6 text-[11px] bg-neutral-50 text-neutral-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Building2 className="h-3.5 w-3.5 text-[#128341]" />
              <span>REHAB Member #{content.company.rehabMembership}</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5 text-[#128341]" />
              <span>Approved by Statutory Agencies & Armed Forces Liaison</span>
            </span>
          </div>

          <div className="flex items-center gap-5 font-medium">
            <a
              href={`tel:${content.company.phone}`}
              className="flex items-center gap-1.5 hover:text-[#128341] transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-[#128341]" />
              <span>{content.company.phone}</span>
            </a>
            <span className="text-neutral-300">•</span>
            <Link
              to="/contact-us#schedule"
              className="flex items-center gap-1.5 text-[#f37d20] hover:text-[#d46513] transition-colors font-bold"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>{isBn ? 'সাইট ভিজিট বুক করুন' : 'Schedule Site Visit'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo matching live site */}
          <Link to="/" onClick={closeAll} className="flex items-center gap-3 group">
            <div className="flex items-center h-12 overflow-hidden transition-transform group-hover:scale-102">
              <img
                src="./assets/dakhina-live/dakhina.png"
                alt="Dakhina Group - Architect of Trust"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/dakhina-brand.png';
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-sans">
            <NavLink to="/" end className={navLinkClass}>
              {isBn ? 'হোম' : 'Home'}
            </NavLink>

            {/* Company Dropdown matching Screenshot 4 */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 px-3.5 py-2 text-xs font-bold tracking-wider uppercase text-neutral-800 hover:text-[#f37d20] transition-colors"
                onMouseEnter={() => setOpenDropdown('company')}
              >
                <span>{isBn ? 'কোম্পানি' : 'Company'}</span>
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-64 pt-2 hidden group-hover:block animate-fade-in z-50">
                <div className="rounded-2xl bg-white text-neutral-800 p-2.5 shadow-2xl border border-neutral-200 space-y-1">
                  <Link
                    to="/about-us"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium"
                  >
                    <Building2 className="h-4 w-4 text-[#128341]" />
                    <span>{isBn ? 'আমাদের সম্পর্কে' : 'About Us'}</span>
                  </Link>
                  <Link
                    to="/message-from-md"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#128341]" />
                    <span>{isBn ? 'ব্যবস্থাপনা পরিচালকের বার্তা' : 'Message from MD'}</span>
                  </Link>
                  <Link
                    to="/board-of-directors"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium"
                  >
                    <Users className="h-4 w-4 text-[#128341]" />
                    <span>{isBn ? 'পরিচালনা পর্ষদ' : 'Board Of Directors'}</span>
                  </Link>
                  <Link
                    to="/rehab-membership"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium"
                  >
                    <Building2 className="h-4 w-4 text-[#128341]" />
                    <span>{isBn ? 'রিহ্যাব সদস্যপদ' : 'REHAB Membership'}</span>
                  </Link>
                  <Link
                    to="/awards-achievements"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium"
                  >
                    <Award className="h-4 w-4 text-[#128341]" />
                    <span>{isBn ? 'পুরস্কার ও অর্জন' : 'Awards & Achievements'}</span>
                  </Link>
                  <Link
                    to="/our-teams"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium"
                  >
                    <Users className="h-4 w-4 text-[#128341]" />
                    <span>{isBn ? 'আমাদের টিম' : 'Our Teams'}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Dakhina City Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 px-3.5 py-2 text-xs font-bold tracking-wider uppercase text-neutral-800 hover:text-[#f37d20] transition-colors"
              >
                <span>{isBn ? 'দখিনা সিটি' : 'Dakhina City'}</span>
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-64 pt-2 hidden group-hover:block animate-fade-in z-50">
                <div className="rounded-2xl bg-white text-neutral-800 p-2.5 shadow-2xl border border-neutral-200 space-y-1">
                  <Link
                    to="/dakhina-city"
                    className="block px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium"
                  >
                    {isBn ? 'প্রকল্পের ওভারভিউ ও মাস্টারপ্ল্যান' : 'Project Overview & Masterplan'}
                  </Link>
                  <Link
                    to="/properties"
                    className="block px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-bold text-[#128341]"
                  >
                    {isBn ? 'সকল ভিলা ও প্লট (৪৮টি)' : 'Explore 48 Villas & Plots'}
                  </Link>
                  <Link
                    to="/dakhina-city#why-us"
                    className="block px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium"
                  >
                    {isBn ? 'বৈশিষ্ট্য ও নাগরিক সুবিধাসমূহ' : 'Features & Amenities'}
                  </Link>
                  <Link
                    to="/dakhina-city#gallery"
                    className="block px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium"
                  >
                    {isBn ? 'সাইট গ্যালারি ও ড্রোন ভিডিও' : 'Site Gallery & Drone Video'}
                  </Link>
                </div>
              </div>
            </div>

            <NavLink to="/our-clients" className={navLinkClass}>
              {isBn ? 'সম্মানিত ক্লায়েন্ট' : 'Our Clients'}
            </NavLink>

            <NavLink to="/media-news" className={navLinkClass}>
              {isBn ? 'মিডিয়া ও সংবাদ' : 'Media & News'}
            </NavLink>

            <NavLink to="/career" className={navLinkClass}>
              {isBn ? 'ক্যারিয়ার' : 'Career'}
            </NavLink>

            {/* Contact Us Dropdown matching Screenshot 3 */}
            <div className="relative group">
              <NavLink
                to="/contact-us"
                className={navLinkClass}
              >
                <span className="inline-flex items-center gap-1">
                  {isBn ? 'যোগাযোগ' : 'Contact Us'}
                  <ChevronDown className="h-3 w-3" />
                </span>
              </NavLink>

              <div className="absolute top-full right-0 w-56 pt-2 hidden group-hover:block animate-fade-in z-50">
                <div className="rounded-2xl bg-white text-neutral-800 p-2.5 shadow-2xl border border-neutral-200 space-y-1">
                  <Link
                    to="/contact-us#inquiry"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium"
                  >
                    <FileText className="h-3.5 w-3.5 text-[#128341]" />
                    <span>{isBn ? 'ইনকোয়ারি ফর্ম' : 'Inquiry Form'}</span>
                  </Link>
                  <Link
                    to="/contact-us#callback"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium"
                  >
                    <PhoneCall className="h-3.5 w-3.5 text-[#128341]" />
                    <span>{isBn ? 'রিকুয়েস্ট কলব্যাক' : 'Request Callback'}</span>
                  </Link>
                  <Link
                    to="/contact-us#schedule"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-[#128341] transition-colors font-medium text-[#f37d20] font-bold"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{isBn ? 'প্রজেক্ট ভিজিট শিডিউল' : 'Project Visit Schedule'}</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Favourites Button */}
            <Link
              to="/properties?fav=true"
              className="relative p-2.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-700"
              title="Saved Favourites"
              aria-label="View favourite properties"
            >
              <Heart className="h-5 w-5 text-neutral-700" />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#f37d20] text-[10px] font-bold text-white shadow-sm">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 text-neutral-700 text-xs font-bold hover:bg-neutral-100 transition-all"
              title="Toggle English / বাংলা"
              aria-label="Switch language"
            >
              <Globe className="h-3.5 w-3.5 text-[#128341]" />
              <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Book Tour CTA Button (Desktop) */}
            <Link
              to="/contact-us#schedule"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#128341] hover:bg-[#0c3620] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Calendar className="h-3.5 w-3.5 text-[#7dba41]" />
              <span>{isBn ? 'সাইট ভিজিট' : 'Book VIP Tour'}</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-neutral-100 transition-colors text-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-50 bg-white/98 text-neutral-900 backdrop-blur-xl overflow-y-auto p-6 space-y-6 animate-fade-in border-t border-neutral-200">
          <nav className="space-y-2">
            <NavLink
              to="/"
              onClick={closeAll}
              className="block py-3 px-4 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-colors"
            >
              {isBn ? 'হোম' : 'Home'}
            </NavLink>

            {/* Mobile Company Accordion */}
            <div>
              <button
                onClick={() => toggleDropdown('company')}
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-colors"
              >
                <span>{isBn ? 'কোম্পানি' : 'Company'}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'company' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'company' && (
                <div className="pl-6 space-y-1 py-1">
                  <Link to="/about-us" onClick={closeAll} className="block py-2 text-xs text-neutral-700 hover:text-[#128341]">
                    {isBn ? 'আমাদের সম্পর্কে' : 'About Us'}
                  </Link>
                  <Link to="/message-from-md" onClick={closeAll} className="block py-2 text-xs text-neutral-700 hover:text-[#128341]">
                    {isBn ? 'ব্যবস্থাপনা পরিচালকের বার্তা' : 'Message from MD'}
                  </Link>
                  <Link to="/board-of-directors" onClick={closeAll} className="block py-2 text-xs text-neutral-700 hover:text-[#128341]">
                    {isBn ? 'পরিচালনা পর্ষদ' : 'Board of Directors'}
                  </Link>
                  <Link to="/rehab-membership" onClick={closeAll} className="block py-2 text-xs text-neutral-700 hover:text-[#128341]">
                    {isBn ? 'রিহ্যাব সদস্যপদ' : 'REHAB Membership'}
                  </Link>
                  <Link to="/awards-achievements" onClick={closeAll} className="block py-2 text-xs text-neutral-700 hover:text-[#128341]">
                    {isBn ? 'পুরস্কার ও অর্জন' : 'Awards & Achievements'}
                  </Link>
                  <Link to="/our-teams" onClick={closeAll} className="block py-2 text-xs text-neutral-700 hover:text-[#128341]">
                    {isBn ? 'আমাদের টিম' : 'Our Teams'}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Dakhina City Accordion */}
            <div>
              <button
                onClick={() => toggleDropdown('dakhina-city')}
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-colors"
              >
                <span>{isBn ? 'দখিনা সিটি' : 'Dakhina City'}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'dakhina-city' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'dakhina-city' && (
                <div className="pl-6 space-y-1 py-1">
                  <Link to="/dakhina-city" onClick={closeAll} className="block py-2 text-xs text-neutral-700 hover:text-[#128341]">
                    {isBn ? 'প্রকল্প পরিচিতি' : 'Masterplan Overview'}
                  </Link>
                  <Link to="/properties" onClick={closeAll} className="block py-2 text-xs text-[#128341] font-bold">
                    {isBn ? 'ভিলা ও প্লটসমূহ (৪৮টি)' : 'Explore 48 Villas'}
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/our-clients"
              onClick={closeAll}
              className="block py-3 px-4 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-colors"
            >
              {isBn ? 'সম্মানিত ক্লায়েন্ট ও অনুমোদন' : 'Our Clients & Approvals'}
            </NavLink>

            <NavLink
              to="/media-news"
              onClick={closeAll}
              className="block py-3 px-4 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-colors"
            >
              {isBn ? 'মিডিয়া ও সংবাদ' : 'Media & News'}
            </NavLink>

            <NavLink
              to="/career"
              onClick={closeAll}
              className="block py-3 px-4 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-colors"
            >
              {isBn ? 'ক্যারিয়ার' : 'Career'}
            </NavLink>

            <NavLink
              to="/contact-us"
              onClick={closeAll}
              className="block py-3 px-4 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-colors"
            >
              {isBn ? 'যোগাযোগ' : 'Contact Us'}
            </NavLink>
          </nav>

          {/* Mobile Bottom Contacts */}
          <div className="pt-6 border-t border-neutral-200 space-y-3">
            <a
              href={`tel:${content.company.phone}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100 text-xs text-neutral-800"
            >
              <Phone className="h-4 w-4 text-[#128341]" />
              <span>{content.company.phone}</span>
            </a>
            <Link
              to="/contact-us#schedule"
              onClick={closeAll}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#128341] text-white font-bold text-xs shadow-md"
            >
              <Calendar className="h-4 w-4" />
              <span>{isBn ? 'সাইট ভিজিট শিডিউল করুন' : 'Schedule VIP Site Tour'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
