import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface PropertyGalleryLightboxProps {
  images: string[];
  title: string;
}

export const PropertyGalleryLightbox: React.FC<PropertyGalleryLightboxProps> = ({
  images,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, images.length]);

  return (
    <div className="space-y-3">
      {/* Main Feature Image */}
      <div className="relative h-80 sm:h-[450px] w-full overflow-hidden rounded-2xl bg-neutral-900 group">
        <img
          src={images[currentIndex]}
          alt={`${title} - view ${currentIndex + 1}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/properties/villa-1-ext.jpg';
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Counter Badge */}
        <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-mono font-medium text-white backdrop-blur-md">
          {currentIndex + 1} / {images.length} Photos
        </div>

        {/* Expand / Fullscreen button */}
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md hover:bg-black/80 transition-colors"
          aria-label="Open fullscreen gallery"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          <span>View Lightbox</span>
        </button>

        {/* Carousel arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Strip */}
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
              currentIndex === idx
                ? 'border-amber-500 scale-95 shadow-md'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              alt={`Thumb ${idx + 1}`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/properties/villa-1-ext.jpg';
              }}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-lg animate-fade-in">
          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="font-semibold text-sm truncate max-w-md">
              {title} ({currentIndex + 1} of {images.length})
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Modal Main Image */}
          <div className="relative max-h-[80vh] max-w-5xl overflow-hidden flex items-center justify-center">
            <img
              src={images[currentIndex]}
              alt={`${title} large view`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/properties/villa-1-ext.jpg';
              }}
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
