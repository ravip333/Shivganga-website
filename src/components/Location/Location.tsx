import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Train,
  Bus,
  ShoppingBag,
  HeartPulse,
  Car,
} from 'lucide-react';
import type { SocietyData } from '../../types';

interface LocationProps {
  data: SocietyData;
}

export const Location: React.FC<LocationProps> = ({ data }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Train': return <Train className="w-5 h-5 text-emerald-700" />;
      case 'Bus': return <Bus className="w-5 h-5 text-emerald-700" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-emerald-700" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-emerald-700" />;
      default: return <MapPin className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <section id="location" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Location & Connectivity"
          title="Directions & Nearby Places"
          subtitle="Quiet standalone building location with quick connectivity to local transit, markets, and hospitals."
        />

        {/* 4 Sober Connectivity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {data.connectivity.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                {getIcon(item.iconName)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-serif font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Map & Address Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address Information Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-serif font-bold text-lg">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <span>{data.shortName}</span>
              </div>

              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <p className="font-semibold text-slate-800">
                  {data.contact.address}
                </p>
                <p>{data.contact.landmark}</p>
                <p className="text-slate-500">{data.contact.locationNote}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Car className="w-4 h-4 text-emerald-700" />
                  <span>Dedicated Resident Parking</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Ground-level demarcated parking bays for residents and visitor vehicles.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
              <a
                href={data.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
              <a
                href={data.contact.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs min-h-[340px]">
            <iframe
              title="Shivganga CHS Google Maps Location"
              src="https://maps.google.com/maps?q=Shiv+ganga+society&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[340px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
