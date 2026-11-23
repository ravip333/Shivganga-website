import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { CheckCircle2, Building2, Car, ArrowUpDown, ShieldCheck } from 'lucide-react';
import type { SocietyData } from '../../types';
import { getAssetUrl } from '../../data/societyData';

interface AboutSocietyProps {
  data: SocietyData;
}

export const AboutSociety: React.FC<AboutSocietyProps> = ({ data }) => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Standalone G+6 Architecture"
          title={`About ${data.shortName}`}
          subtitle="A well-maintained standalone residential community offering quiet living, dedicated parking, passenger lift, and trusted administration."
        />

        {/* 2-Column Sober Modern Layout (Justonclick.in clean style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text & Concise Points */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
            {data.overview.map((paragraph, idx) => (
              <p key={idx} className="text-slate-600 leading-relaxed font-normal">
                {paragraph}
              </p>
            ))}

            {/* 4 Clean High-Tech Spec Blocks */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Ground + 6 Floors</div>
                  <div className="text-[11px] text-slate-500">Standalone Residential Tower</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800 shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Dedicated Ground Parking</div>
                  <div className="text-[11px] text-slate-500">Resident 4W & 2W Bays</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800 shrink-0">
                  <ArrowUpDown className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Passenger Elevator</div>
                  <div className="text-[11px] text-slate-500">Ground to 6th Floor AMC</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">24/7 Security Gate</div>
                  <div className="text-[11px] text-slate-500">Manned Entrance Watch</div>
                </div>
              </div>
            </div>

            {/* MCS Act Registration Note */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950 leading-relaxed">
                <strong>Statutory Registration:</strong> Shivganga Co-operative Housing Society Ltd. is registered under the Maharashtra Co-operative Societies Act, maintaining transparent building administration and peaceful living standards.
              </div>
            </div>
          </div>

          {/* Right Real Building Photo Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 group">
              <img
                src={getAssetUrl('society-photos/building-photo-11.jpeg')}
                alt={`${data.shortName} Daytime Elevation`}
                className="w-full h-84 sm:h-96 object-cover object-center group-hover:scale-104 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                    Actual Daytime Photo
                  </span>
                  <p className="text-lg font-serif font-bold text-white">
                    {data.fullName}
                  </p>
                  <p className="text-xs text-slate-300">
                    Daylight view highlighting ventilated balconies and clean elevation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
