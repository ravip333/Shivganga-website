import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { Building2, Car, ArrowUpDown, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { SocietyData } from '../../types';
import { getAssetUrl } from '../../data/societyData';

interface AboutSocietyProps {
  data: SocietyData;
}

export const AboutSociety: React.FC<AboutSocietyProps> = ({ data }) => {
  const highlights = [
    {
      title: "G+6 Standalone Tower",
      desc: "Ground + 6 residential floors with natural ventilation and open balconies.",
      icon: <Building2 className="w-5 h-5 text-emerald-700" />,
      image: getAssetUrl("society-photos/building-photo-11.jpeg"),
      badge: "Architecture"
    },
    {
      title: "Dedicated Ground Parking",
      desc: "Demarcated covered & open parking bays reserved for resident vehicles.",
      icon: <Car className="w-5 h-5 text-emerald-700" />,
      image: getAssetUrl("society-photos/building-photo-13.jpeg"),
      badge: "Resident Bays"
    },
    {
      title: "Passenger Elevator",
      desc: "Reliable lift connecting Ground to 6th floor with regular AMC maintenance.",
      icon: <ArrowUpDown className="w-5 h-5 text-emerald-700" />,
      image: getAssetUrl("society-photos/building-photo-12.jpeg"),
      badge: "Ground to 6th"
    },
    {
      title: "24/7 Security Gate",
      desc: "Manned entrance gate with visitor logbook and nighttime surveillance.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
      image: getAssetUrl("society-photos/building-photo-3-enhanced.jpeg"),
      badge: "Manned 24/7"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Standalone Residential Community"
          title={`About ${data.shortName} & Amenities`}
          subtitle="A quiet, well-maintained residential building designed for comfortable family living, registered under the Maharashtra Co-operative Societies Act."
        />

        {/* 4 Clean Visual Cards (About + Amenities Combined) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Photo */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.97] group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-800 shadow-xs">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Society Registration Note */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>{data.fullName}</strong> is a legally registered Co-operative Housing Society under the Maharashtra Co-operative Societies Act.
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full shrink-0">
            Registered CHS
          </span>
        </div>
      </div>
    </section>
  );
};
