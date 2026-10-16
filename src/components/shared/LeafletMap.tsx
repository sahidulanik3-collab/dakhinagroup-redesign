import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../../hooks/useLanguage';
import { Navigation } from 'lucide-react';

interface LeafletMapProps {
  className?: string;
  focusTarget?: 'project' | 'office';
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  className = '',
  focusTarget = 'project',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { isBn } = useLanguage();

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const locations = [
      {
        name: isBn ? 'দখিনা সিটি (প্রকল্প এলাকা)' : 'Dakhina City (Flagship Masterplan)',
        subtitle: isBn ? '১২০০ বিঘা পরিকল্পিত উপশহর' : '1,200 Bigha Masterplanned Township',
        lat: 23.8345,
        lng: 90.3152,
        type: 'project',
      },
      {
        name: isBn ? 'দখিনা টাওয়ার (প্রধান কার্যালয়)' : 'Dakhina Tower (Headquarters)',
        subtitle: '543/A ECB Chattar, Dhaka Cantonment',
        lat: 23.8242,
        lng: 90.3875,
        type: 'office',
      },
      {
        name: isBn ? 'উত্তরা ১৮ নম্বর সেক্টর / মেট্রোরেল' : 'Uttara Sector 18 (Metro Rail Line 6)',
        subtitle: 'Direct Link Via 100ft Boulevard',
        lat: 23.8745,
        lng: 90.3752,
        type: 'landmark',
      },
      {
        name: isBn ? 'মাসকাট প্লাজা' : 'Maskat Plaza, Uttara',
        subtitle: 'Direct access point (10 mins)',
        lat: 23.8682,
        lng: 90.3985,
        type: 'landmark',
      },
    ];

    const defaultCenter: [number, number] =
      focusTarget === 'office' ? [23.8242, 90.3875] : [23.8345, 90.3352];

    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 12,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // OpenStreetMap standard tiles (Zero API key needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Custom Marker Icons using CSS DivIcon
    locations.forEach((loc) => {
      const isProject = loc.type === 'project';
      const isOffice = loc.type === 'office';

      const iconHtml = `
        <div style="
          background-color: ${isProject ? '#0F3D2E' : isOffice ? '#B8934A' : '#1C1C1C'};
          color: white;
          border: 2px solid white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          border-radius: 9999px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        ">
          ${isProject ? 'D' : isOffice ? 'T' : '•'}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-icon',
        html: iconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const popupContent = `
        <div style="font-family: sans-serif; padding: 4px;">
          <h4 style="margin: 0; font-size: 13px; font-weight: bold; color: #0F3D2E;">${loc.name}</h4>
          <p style="margin: 3px 0 0 0; font-size: 11px; color: #555;">${loc.subtitle}</p>
        </div>
      `;

      L.marker([loc.lat, loc.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(popupContent);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [focusTarget, isBn]);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-gray-200 shadow-md ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full min-h-[360px]" />
      
      {/* Legend Overlay Card */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-xl border border-gray-200 text-xs shadow-lg pointer-events-auto space-y-1.5 max-w-xs hidden sm:block">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#0F3D2E]" />
          <span className="font-semibold text-gray-800">{isBn ? 'দখিনা সিটি প্রকল্প' : 'Dakhina City Project Area'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#B8934A]" />
          <span className="font-semibold text-gray-800">{isBn ? 'দখিনা টাওয়ার হেড অফিস' : 'Dakhina Tower (ECB Chattar)'}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 pt-1 border-t border-gray-100">
          <Navigation className="h-3 w-3 text-emerald-600" />
          <span>{isBn ? 'উত্তরা ও সেনানিবাস থেকে ৩টি প্রধান সংযোগ সড়ক' : 'Connected via 3 arterial routes from Uttara & Cantonment'}</span>
        </div>
      </div>
    </div>
  );
};
