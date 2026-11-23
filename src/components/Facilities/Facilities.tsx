import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { Car, ArrowUpDown, ShieldCheck, Droplets } from 'lucide-react';
import type { Amenity } from '../../types';

interface FacilitiesProps {
  amenities: Amenity[];
}

export const Facilities: React.FC<FacilitiesProps> = ({ amenities }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-5 h-5 text-emerald-700" />;
      case 'ArrowUpDown': return <ArrowUpDown className="w-5 h-5 text-emerald-700" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-emerald-700" />;
      default: return <Car className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <section id="amenities" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Amenities"
          title="Building Amenities & Features"
          subtitle="Essential infrastructure provided for comfortable living in the standalone 6-floor residential tower."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Real Photo Thumbnail */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 text-slate-800 shadow-xs">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      {getIcon(item.iconName)}
                    </div>
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
