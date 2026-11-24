import React, { useState } from 'react';
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
  Copy,
  Check,
  Compass,
} from 'lucide-react';
import type { SocietyData } from '../../types';

interface LocationProps {
  data: SocietyData;
}

export const Location: React.FC<LocationProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${data.shortName}, ${data.contact.address}, ${data.contact.landmark}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <section id="location" className="py-20 sm:py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Location & Connectivity"
          title="Location Map & Directions"
          subtitle="A peaceful standalone residential building with smooth connectivity to railway transit, local transport, daily markets, and healthcare."
        />

        {/* 4 Clean Connectivity Distance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {data.connectivity.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex items-start gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {getIcon(item.iconName)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full shrink-0 border border-emerald-200/60">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Proper Interactive Map & Address Showcase (Justonclick.in clean layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Address & Directions Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Society Identity Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-serif font-bold text-sm shadow-md shadow-emerald-950/10">
                  SG
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug">
                    {data.fullName}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700">
                    Standalone Ground + 6 Floors Residential Tower
                  </span>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-900 text-sm">
                  {data.contact.address}
                </p>
                <p className="text-slate-600">
                  <strong>Landmark:</strong> {data.contact.landmark}
                </p>
                <p className="text-slate-500 text-xs">
                  {data.contact.locationNote}
                </p>
              </div>

              {/* Parking Guidance Note */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                <Car className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 leading-relaxed">
                  <strong>Resident & Visitor Parking:</strong> Clear driveway access leading directly to demarcated ground parking bays.
                </div>
              </div>

              {/* Emergency & Gate Contacts Strip */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Gate Intercom: Main Desk</span>
                <span>•</span>
                <span>Police: 100/112</span>
                <span>•</span>
                <span>Ambulance: 102/108</span>
              </div>
            </div>

            {/* Quick Action Buttons (Copy Address / Open Google Maps) */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2.5">
                <a
                  href={data.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-xl transition-all cursor-pointer hover:scale-102"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 py-3 px-4 rounded-2xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Copy Address to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <a
                href={data.contact.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                <span>Get Step-by-Step Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Right: Proper Map Embed with Live Map Bar */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-lg flex flex-col min-h-[460px]">
            {/* Map Top Bar */}
            <div className="p-3.5 sm:p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-serif font-bold text-white tracking-wide">
                  Live Google Map View
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  • Shivganga CHS Standalone Tower
                </span>
              </div>

              <a
                href={data.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Open Full Map</span>
              </a>
            </div>

            {/* Embedded Interactive Map */}
            <div className="relative flex-1 w-full min-h-[400px] bg-slate-100">
              <iframe
                title="Shivganga CHS Google Maps Location"
                src="https://maps.google.com/maps?q=Shiv+ganga+society&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[400px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Map Pin Badge inside map corner */}
              <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 text-slate-900 text-xs font-bold shadow-lg border border-slate-200 backdrop-blur-md">
                  <MapPin className="w-4 h-4 text-emerald-700 fill-emerald-100" />
                  <span>Shivganga CHS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
