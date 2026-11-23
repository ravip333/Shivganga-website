import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { Car, ArrowUpDown, ShieldCheck, Droplets, Check } from 'lucide-react';
import type { Amenity } from '../../types';

interface FacilitiesProps {
  amenities: Amenity[];
}

export const Facilities: React.FC<FacilitiesProps> = ({ amenities }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-5 h-5 text-emerald-800" />;
      case 'ArrowUpDown': return <ArrowUpDown className="w-5 h-5 text-emerald-800" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-800" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-emerald-800" />;
      default: return <Car className="w-5 h-5 text-emerald-800" />;
    }
  };

  return (
    <section id="amenities" className="py-20 sm:py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Infrastructure"
          title="Building Amenities & Features"
          subtitle="Essential infrastructure and services provided for comfortable residential living in our standalone 6-floor tower."
        />

        {/* 4 Clean Amenity Cards with High-Contrast Light Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {amenities.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Real Photo Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 brightness-95 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Content Block */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      {getIcon(item.iconName)}
                    </div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Building Facility</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
