import React from 'react';
import { Link } from 'react-router-dom';
import { PropertyItem } from '../../data/schema';
import { useVariant } from '../../hooks/useVariant';
import { useLanguage } from '../../hooks/useLanguage';
import { useFavourites } from '../../hooks/useFavourites';
import { useCompare } from '../../hooks/useCompare';
import { formatBDT, toBanglaDigits } from '../../lib/utils';
import { Heart, Scale, Bed, Bath, Compass, ShieldCheck } from 'lucide-react';

interface PropertyCardProps {
  property: PropertyItem;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, className = '' }) => {
  const { variantId } = useVariant();
  const { isBn } = useLanguage();
  const { toggleFavourite, isFavourite } = useFavourites();
  const { addToCompare, removeFromCompare, isComparing } = useCompare();

  const fav = isFavourite(property.id);
  const comp = isComparing(property.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (comp) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property.id);
    }
  };

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(property.id);
  };

  const detailUrl = `/properties/${property.slug}`;

  // ==========================================
  // VARIANT 2: MODERN MINIMAL (Clean Architectural Card)
  // ==========================================
  if (variantId === 2) {
    return (
      <div className={`group relative flex flex-col bg-white border border-neutral-200/80 hover:border-neutral-900 transition-all duration-300 ${className}`}>
        {/* Top Image */}
        <div className="relative w-full aspect-[16/10] sm:h-56 overflow-hidden bg-neutral-100">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = './assets/properties/villa-1-ext.jpg';
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-neutral-900 text-white">
              {property.status}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-white/90 text-neutral-800">
              Sample Listing
            </span>
          </div>
        </div>

        {/* Info Column */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono uppercase tracking-widest mb-1.5">
              <span>{property.category}</span>
              <span>{property.facing} Facing</span>
            </div>

            <Link to={detailUrl}>
              <h3 className="text-xl font-bold text-neutral-900 hover:text-amber-700 transition-colors font-manrope">
                {property.title}
              </h3>
            </Link>

            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
              <span>{property.locationArea}</span>
            </p>

            {/* Clean Specifications Row */}
            <div className="flex items-center gap-6 my-4 py-3 border-y border-neutral-100 text-xs text-neutral-600 font-manrope">
              <div>
                <span className="font-bold text-neutral-900">{isBn ? toBanglaDigits(property.landSizeKatha) : property.landSizeKatha}</span> Katha
              </div>
              <div className="h-3 w-px bg-neutral-200" />
              <div>
                <span className="font-bold text-neutral-900">{isBn ? toBanglaDigits(property.builtAreaSqft) : property.builtAreaSqft}</span> Sqft
              </div>
              <div className="h-3 w-px bg-neutral-200" />
              <div>
                <span className="font-bold text-neutral-900">{isBn ? toBanglaDigits(property.bedrooms) : property.bedrooms}</span> Beds
              </div>
              <div className="h-3 w-px bg-neutral-200" />
              <div>
                <span className="font-bold text-neutral-900">{isBn ? toBanglaDigits(property.bathrooms) : property.bathrooms}</span> Baths
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">Total Investment</span>
              <span className="text-xl font-extrabold text-neutral-900 font-manrope">
                {formatBDT(property.price, true, isBn ? 'bn' : 'en')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCompareClick}
                className={`p-2 rounded-full border text-xs transition-colors ${
                  comp ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-200 hover:bg-neutral-100 text-neutral-700'
                }`}
                title="Compare up to 3 villas"
              >
                <Scale className="h-4 w-4" />
              </button>
              <button
                onClick={handleFavClick}
                className={`p-2 rounded-full border text-xs transition-colors ${
                  fav ? 'bg-rose-50 text-rose-600 border-rose-200' : 'border-neutral-200 hover:bg-neutral-100 text-neutral-700'
                }`}
                title="Add to Favourites"
              >
                <Heart className={`h-4 w-4 ${fav ? 'fill-rose-600' : ''}`} />
              </button>
              <Link
                to={detailUrl}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold font-manrope transition-colors"
              >
                {isBn ? 'বিস্তারিত' : 'View Villa'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VARIANT 3: MIDNIGHT ESTATE (Cinematic Dark Card)
  // ==========================================
  if (variantId === 3) {
    return (
      <div className={`group relative rounded-2xl bg-[#131D31] border border-amber-500/20 hover:border-amber-400/50 shadow-2xl transition-all duration-300 hover:shadow-amber-500/10 flex flex-col justify-between overflow-hidden ${className}`}>
        <div>
          {/* Card Media */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.title}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './assets/properties/villa-1-ext.jpg';
              }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131D31] via-transparent to-black/40" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-amber-400 text-neutral-950 shadow-lg">
                {property.status}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-black/60 text-amber-200 border border-amber-400/30">
                Sample
              </span>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <button
                onClick={handleFavClick}
                className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors"
                aria-label="Add to favourites"
              >
                <Heart className={`h-4 w-4 ${fav ? 'text-rose-500 fill-rose-500' : ''}`} />
              </button>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-amber-300/90 font-mono">
              <span>{property.category}</span>
              <span>{property.facing} Facing</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            <Link to={detailUrl}>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors font-fraunces">
                {property.title}
              </h3>
            </Link>
            <p className="text-xs text-neutral-400 mt-1">{property.locationArea}</p>

            <div className="grid grid-cols-4 gap-2 my-4 p-3 rounded-xl bg-black/30 border border-white/5 text-center text-xs text-neutral-300">
              <div>
                <span className="block font-bold text-amber-400">{isBn ? toBanglaDigits(property.landSizeKatha) : property.landSizeKatha}</span>
                <span className="text-[10px] text-neutral-400">Katha</span>
              </div>
              <div>
                <span className="block font-bold text-amber-400">{isBn ? toBanglaDigits(property.builtAreaSqft) : property.builtAreaSqft}</span>
                <span className="text-[10px] text-neutral-400">Sqft</span>
              </div>
              <div>
                <span className="block font-bold text-amber-400">{isBn ? toBanglaDigits(property.bedrooms) : property.bedrooms}</span>
                <span className="text-[10px] text-neutral-400">Beds</span>
              </div>
              <div>
                <span className="block font-bold text-amber-400">{isBn ? toBanglaDigits(property.bathrooms) : property.bathrooms}</span>
                <span className="text-[10px] text-neutral-400">Baths</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5">
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 block">Investment Value</span>
            <span className="text-xl font-extrabold text-amber-400">
              {formatBDT(property.price, true, isBn ? 'bn' : 'en')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCompareClick}
              className={`p-2 rounded-lg border text-xs transition-colors ${
                comp ? 'bg-amber-400 text-neutral-950 border-amber-400' : 'border-neutral-700 text-neutral-300 hover:border-amber-400'
              }`}
              title="Compare side-by-side"
            >
              <Scale className="h-4 w-4" />
            </button>
            <Link
              to={detailUrl}
              className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-md shadow-amber-400/20 transition-all"
            >
              {isBn ? 'বিস্তারিত' : 'Explore'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VARIANT 4: TROPICAL RESORT (Organic Rounded Pebble Glass)
  // ==========================================
  if (variantId === 4) {
    return (
      <div className={`group relative rounded-[2rem] bg-white/80 backdrop-blur-md border border-[#0E7C7B]/15 hover:border-[#0E7C7B]/40 shadow-xl shadow-teal-900/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${className}`}>
        <div>
          <div className="relative h-60 overflow-hidden m-3 rounded-[1.5rem]">
            <img
              src={property.images[0]}
              alt={property.title}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './assets/properties/villa-1-ext.jpg';
              }}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-[#0E7C7B] text-white shadow-md">
                {property.status}
              </span>
              <span className="px-2.5 py-1 text-[10px] rounded-full bg-white/90 text-[#163231] font-semibold">
                Sample
              </span>
            </div>

            <div className="absolute top-3 right-3 flex gap-1.5">
              <button
                onClick={handleFavClick}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-[#163231] shadow transition-colors"
                aria-label="Add to favourites"
              >
                <Heart className={`h-4 w-4 ${fav ? 'text-rose-500 fill-rose-500' : ''}`} />
              </button>
            </div>

            <div className="absolute bottom-3 right-3">
              <span className="px-3.5 py-1.5 rounded-full bg-[#FF7A59] text-white font-extrabold text-xs shadow-lg">
                {formatBDT(property.price, true, isBn ? 'bn' : 'en')}
              </span>
            </div>
          </div>

          <div className="p-5 pt-2">
            <span className="text-[11px] font-bold tracking-wider text-[#0E7C7B] uppercase block mb-1">
              {property.category} · {property.facing}
            </span>
            <Link to={detailUrl}>
              <h3 className="text-xl font-bold text-[#163231] group-hover:text-[#0E7C7B] transition-colors font-display">
                {property.title}
              </h3>
            </Link>
            <p className="text-xs text-[#4F6765] mt-1">{property.locationArea}</p>

            <div className="flex items-center justify-between mt-4 py-3 px-4 rounded-2xl bg-[#F6EFE4]/60 text-xs text-[#163231] font-jakarta">
              <div className="flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5 text-[#0E7C7B]" />
                <span>{isBn ? toBanglaDigits(property.landSizeKatha) : property.landSizeKatha} Katha</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bed className="h-3.5 w-3.5 text-[#0E7C7B]" />
                <span>{isBn ? toBanglaDigits(property.bedrooms) : property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="h-3.5 w-3.5 text-[#0E7C7B]" />
                <span>{isBn ? toBanglaDigits(property.bathrooms) : property.bathrooms} Baths</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 pt-0 flex items-center justify-between">
          <button
            onClick={handleCompareClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              comp ? 'bg-[#0E7C7B] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Scale className="h-3.5 w-3.5" />
            <span>{isBn ? 'তুলনা' : 'Compare'}</span>
          </button>

          <Link
            to={detailUrl}
            className="px-5 py-2.5 rounded-full bg-[#0E7C7B] hover:bg-[#095857] text-white text-xs font-bold transition-all shadow-md shadow-teal-900/10 active:scale-95"
          >
            {isBn ? 'ভিলা বিবরণ' : 'Discover'}
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // VARIANT 5: EDITORIAL BOLD (Swiss Sharp Brutalist)
  // ==========================================
  if (variantId === 5) {
    return (
      <div className={`group relative rounded-none bg-white border-2 border-black hover:bg-[#FAF9F6] transition-all flex flex-col justify-between overflow-hidden ${className}`}>
        <div>
          <div className="relative h-60 border-b-2 border-black overflow-hidden bg-neutral-200">
            <img
              src={property.images[0]}
              alt={property.title}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './assets/properties/villa-1-ext.jpg';
              }}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 flex gap-1">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#E5391B] text-white uppercase">
                {property.status}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-black text-white">
                DEMO
              </span>
            </div>
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={handleFavClick}
                className="p-1.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                aria-label="Save property"
              >
                <Heart className={`h-4 w-4 ${fav ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>
          </div>

          <div className="p-5 font-mono">
            <div className="text-[10px] font-bold text-[#E5391B] uppercase tracking-wider mb-1">
              {property.category} // {property.facing}
            </div>

            <Link to={detailUrl}>
              <h3 className="text-xl font-black text-black group-hover:text-[#E5391B] transition-colors uppercase tracking-tight">
                {property.title}
              </h3>
            </Link>

            <p className="text-xs text-neutral-600 mt-1">{property.locationArea}</p>

            {/* Brutalist Spec Grid */}
            <div className="grid grid-cols-2 gap-px bg-black my-4 border border-black text-xs">
              <div className="bg-white p-2">
                <span className="text-[9px] text-neutral-500 block uppercase">LAND SIZE</span>
                <span className="font-bold">{isBn ? toBanglaDigits(property.landSizeKatha) : property.landSizeKatha} KATHA</span>
              </div>
              <div className="bg-white p-2">
                <span className="text-[9px] text-neutral-500 block uppercase">BUILT AREA</span>
                <span className="font-bold">{isBn ? toBanglaDigits(property.builtAreaSqft) : property.builtAreaSqft} SQFT</span>
              </div>
              <div className="bg-white p-2">
                <span className="text-[9px] text-neutral-500 block uppercase">BEDROOMS</span>
                <span className="font-bold">{isBn ? toBanglaDigits(property.bedrooms) : property.bedrooms} BEDS</span>
              </div>
              <div className="bg-white p-2">
                <span className="text-[9px] text-neutral-500 block uppercase">BATHROOMS</span>
                <span className="font-bold">{isBn ? toBanglaDigits(property.bathrooms) : property.bathrooms} BATHS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 pt-0 font-mono flex items-center justify-between border-t border-black/10">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-neutral-500 block">PRICE (BDT)</span>
            <span className="text-xl font-black text-black">
              {formatBDT(property.price, true, isBn ? 'bn' : 'en')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCompareClick}
              className={`p-2 border border-black text-xs font-bold transition-colors ${
                comp ? 'bg-black text-white' : 'bg-white hover:bg-neutral-100 text-black'
              }`}
              title="Compare"
            >
              <Scale className="h-4 w-4" />
            </button>
            <Link
              to={detailUrl}
              className="px-4 py-2 bg-black hover:bg-[#E5391B] text-white text-xs font-bold uppercase transition-colors"
            >
              {isBn ? 'বিস্তারিত' : 'VIEW ->'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VARIANT 1: HERITAGE LUXE (Default: Tall Gold-Framed Card)
  // ==========================================
  return (
    <div className={`group relative rounded-xl bg-white border border-[#B8934A]/30 hover:border-[#B8934A] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${className}`}>
      <div>
        {/* Media Frame with gold hairline */}
        <div className="relative h-64 overflow-hidden bg-emerald-950">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = './assets/properties/villa-1-ext.jpg';
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full bg-[#0F3D2E] text-white border border-[#B8934A]/50 shadow-md">
              {property.status}
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-medium tracking-wide rounded-full bg-[#FAF7F0] text-[#0F3D2E] border border-[#B8934A]/30">
              Sample Listing
            </span>
          </div>

          {/* Action icon buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button
              onClick={handleFavClick}
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
              aria-label="Add to favourites"
            >
              <Heart className={`h-4 w-4 ${fav ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Facing & Category Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-amber-200 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              <span>{property.category}</span>
            </span>
            <span>{property.facing} Facing</span>
          </div>
        </div>

        {/* Info Content */}
        <div className="p-5">
          <Link to={detailUrl}>
            <h3 className="text-xl font-bold text-[#0F3D2E] group-hover:text-[#B8934A] transition-colors font-serif leading-tight">
              {property.title}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 mt-1">{property.locationArea}</p>

          {/* Inset Metadata Grid */}
          <div className="grid grid-cols-4 gap-2 my-4 py-2.5 px-3 rounded-lg bg-[#FAF7F0] border border-[#B8934A]/20 text-center text-xs">
            <div>
              <span className="block font-bold text-[#0F3D2E]">{isBn ? toBanglaDigits(property.landSizeKatha) : property.landSizeKatha}</span>
              <span className="text-[10px] text-gray-500">Katha</span>
            </div>
            <div>
              <span className="block font-bold text-[#0F3D2E]">{isBn ? toBanglaDigits(property.builtAreaSqft) : property.builtAreaSqft}</span>
              <span className="text-[10px] text-gray-500">Sqft</span>
            </div>
            <div>
              <span className="block font-bold text-[#0F3D2E]">{isBn ? toBanglaDigits(property.bedrooms) : property.bedrooms}</span>
              <span className="text-[10px] text-gray-500">Beds</span>
            </div>
            <div>
              <span className="block font-bold text-[#0F3D2E]">{isBn ? toBanglaDigits(property.bathrooms) : property.bathrooms}</span>
              <span className="text-[10px] text-gray-500">Baths</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">
            {isBn ? 'মূল্য প্রাক্কলন' : 'Price Offer'}
          </span>
          <span className="text-xl font-extrabold text-[#0F3D2E]">
            {formatBDT(property.price, true, isBn ? 'bn' : 'en')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCompareClick}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              comp ? 'bg-[#0F3D2E] text-amber-400 border-[#0F3D2E]' : 'border-gray-200 text-gray-600 hover:border-[#B8934A]'
            }`}
            title="Compare with other villas"
          >
            <Scale className="h-4 w-4" />
          </button>
          <Link
            to={detailUrl}
            className="px-4 py-2 rounded-lg bg-[#0F3D2E] hover:bg-[#1A5340] text-[#B8934A] hover:text-white font-bold text-xs shadow-md transition-all active:scale-95 border border-[#B8934A]/40"
          >
            {isBn ? 'সম্পূর্ণ বিবরণ' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};
