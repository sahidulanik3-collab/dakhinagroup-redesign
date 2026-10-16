import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useFavourites } from '../hooks/useFavourites';
import { useCompare } from '../hooks/useCompare';
import propertiesData from '../data/properties.json';
import { PropertyItem } from '../data/schema';
import { formatBDT, toBanglaDigits } from '../lib/utils';
import { PropertyGalleryLightbox } from '../components/shared/PropertyGalleryLightbox';
import { FloorPlanViewer } from '../components/shared/FloorPlanViewer';
import { LoanCalculator } from '../components/shared/LoanCalculator';
import { LeafletMap } from '../components/shared/LeafletMap';
import { InquiryForm } from '../components/shared/Forms/InquiryForm';
import { PropertyCard } from '../components/shared/PropertyCard';
import {
  Heart,
  Scale,
  Printer,
  Share2,
  MapPin,
  Check,
  Video,
  ArrowLeft,
  Calendar,
} from 'lucide-react';

export const PropertyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isBn } = useLanguage();
  const { toggleFavourite, isFavourite } = useFavourites();
  const { addToCompare, removeFromCompare, isComparing, setIsModalOpen } = useCompare();

  const allProps = propertiesData as PropertyItem[];
  const property = allProps.find((p) => p.slug === slug) || allProps[0];

  const fav = isFavourite(property.id);
  const comp = isComparing(property.id);

  // Similar properties
  const similarProps = allProps
    .filter((p) => p.id !== property.id && p.category === property.category)
    .slice(0, 3);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${property.title} | Dakhina Group`,
          text: `Check out ${property.title} in ${property.project}.`,
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(isBn ? 'লিংক সফলভাবে কপি হয়েছে!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in property-print-container">
      {/* Back button & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{isBn ? 'ফিরে যান' : 'Back to Listings'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Compare Button */}
          <button
            onClick={() => {
              if (comp) {
                removeFromCompare(property.id);
              } else {
                addToCompare(property.id);
                setIsModalOpen(true);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              comp ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Scale className="h-4 w-4" />
            <span>{comp ? (isBn ? 'তুলনা তালিকাভুক্ত' : 'Added to Compare') : (isBn ? 'তুলনা করুন' : 'Compare')}</span>
          </button>

          {/* Favourite Button */}
          <button
            onClick={() => toggleFavourite(property.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              fav ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Heart className={`h-4 w-4 ${fav ? 'fill-rose-600' : ''}`} />
            <span>{fav ? (isBn ? 'পছন্দের তালিকাভুক্ত' : 'Saved') : (isBn ? 'সংরক্ষণ' : 'Save')}</span>
          </button>

          {/* Print Brochure */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-all"
            title="Print or Save as PDF Brochure"
          >
            <Printer className="h-4 w-4" />
            <span>{isBn ? 'ব্রোশিওর প্রিন্ট' : 'Print Brochure'}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-all"
            aria-label="Share property"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Title & Price Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b border-gray-200">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white shadow-sm">
              {property.status}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-900 border border-amber-300">
              Sample Listing
            </span>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              {property.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 font-serif">
            {property.title}
          </h1>

          <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
            <span>{property.locationArea}</span>
            <span>•</span>
            <span className="font-semibold text-gray-700">{property.project}</span>
          </p>
        </div>

        {/* Pricing Card */}
        <div className="text-left lg:text-right bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 min-w-[240px]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
            {isBn ? 'আনুমানিক বিনিয়োগ' : 'Total Investment'}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900">
            {formatBDT(property.price, false, isBn ? 'bn' : 'en')}
          </div>
          <span className="text-xs text-gray-500 block mt-0.5">
            ≈ {formatBDT(property.pricePerSqft, false, isBn ? 'bn' : 'en')} / Sqft
          </span>
        </div>
      </div>

      {/* Swipeable Gallery with Lightbox */}
      <PropertyGalleryLightbox images={property.images} title={property.title} />

      {/* Layout Columns: Left (Specs & Plans) / Right (Sticky Inquiry Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Key Metric Highlights Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm text-center">
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">{isBn ? 'জমির পরিমাপ' : 'Land Size'}</span>
              <span className="text-lg font-bold text-gray-900 mt-1 block">
                {isBn ? toBanglaDigits(property.landSizeKatha) : property.landSizeKatha} Katha
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">{isBn ? 'বিল্ট-আপ এরিয়া' : 'Built Area'}</span>
              <span className="text-lg font-bold text-gray-900 mt-1 block">
                {isBn ? toBanglaDigits(property.builtAreaSqft) : property.builtAreaSqft} Sqft
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">{isBn ? 'বেড ও বাথ' : 'Beds / Baths'}</span>
              <span className="text-lg font-bold text-gray-900 mt-1 block">
                {isBn ? `${toBanglaDigits(property.bedrooms)} / ${toBanglaDigits(property.bathrooms)}` : `${property.bedrooms}B / ${property.bathrooms}B`}
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">{isBn ? 'দিকদর্শন' : 'Facing'}</span>
              <span className="text-lg font-bold text-gray-900 mt-1 block">
                {property.facing}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">
              {isBn ? 'স্থাপত্য বিবরণ ও জীবনযাত্রা' : 'Architectural Overview'}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {isBn ? property.description.bn : property.description.en}
            </p>
          </div>

          {/* Amenities & Infrastructure */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              {isBn ? 'নাগরিক সুযোগ-সুবিধা' : 'Curated Amenities & Infrastructure'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Floor Plans */}
          <FloorPlanViewer floorPlans={property.floorPlans} />

          {/* Video & Virtual Tour Slots */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-amber-600" />
                <h3 className="text-base font-bold text-gray-900">
                  {isBn ? 'ভার্চুয়াল ট্যুর ও প্রকল্প ভিডিও' : 'Virtual Tour & Video Walkthrough'}
                </h3>
              </div>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900">
              <iframe
                src="https://www.youtube.com/embed/jsMh07pOAy4"
                title="Dakhina City Project Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Interactive Location Map */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              {isBn ? 'প্রকল্প অবস্থান ও সড়ক সংযোগ' : 'Location & Road Access'}
            </h3>
            <div className="h-80 w-full rounded-2xl overflow-hidden border border-gray-200">
              <LeafletMap focusTarget="project" className="h-full w-full" />
            </div>
          </div>

          {/* Installment / Loan Calculator */}
          <LoanCalculator initialPrice={property.price} />
        </div>

        {/* Right Column: Sticky Inquiry Card (4 cols) */}
        <div className="lg:col-span-4 sticky top-28 space-y-6 no-print">
          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-xl space-y-4">
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                {isBn ? 'এই ভিলা সম্পর্কে অনুসন্ধান' : 'Inquire for this Villa'}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {isBn ? 'দখিনা গ্রুপের সিনিয়র কনসালটেন্টের সাথে কথা বলুন' : 'Direct advisory with Dakhina Group team'}
              </p>
            </div>

            <InquiryForm propertyTitle={property.title} />

            <div className="pt-4 border-t border-gray-100 text-center">
              <Link
                to="/contact-us#schedule"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors"
              >
                <Calendar className="h-4 w-4 text-emerald-700" />
                <span>{isBn ? 'সাইট ভিজিটের জন্য সময় নির্ধারণ করুন' : 'Schedule VIP Site Tour'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarProps.length > 0 && (
        <div className="pt-12 border-t border-gray-200 space-y-6 no-print">
          <h3 className="text-2xl font-extrabold text-gray-900">
            {isBn ? 'অনুরূপ অন্যান্য ভিলাসমূহ' : 'Similar Villa Residences in Dakhina City'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProps.map((sim) => (
              <PropertyCard key={sim.id} property={sim} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
