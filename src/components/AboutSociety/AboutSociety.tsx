import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { CheckCircle2 } from 'lucide-react';
import type { SocietyData } from '../../types';

interface AboutSocietyProps {
  data: SocietyData;
}

export const AboutSociety: React.FC<AboutSocietyProps> = ({ data }) => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About The Building"
          title={`About ${data.shortName}`}
          subtitle="A standalone 6-floor residential tower offering dedicated parking, passenger lift access, and peaceful living."
        />

        {/* 2-Column Sober Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Concise Points */}
          <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            {data.overview.map((paragraph, idx) => (
              <p key={idx} className="text-slate-600">
                {paragraph}
              </p>
            ))}

            {/* 4 Clean Bullet Facts */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-800">Ground + 6 Floors Standalone</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-800">Dedicated Ground Parking</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-800">Passenger Lift (G to 6th)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-800">24/7 Security Gate & Watch</span>
              </div>
            </div>
          </div>

          {/* Right Real Building Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
              <img
                src="./society-photos/building-photo-11.jpeg"
                alt={`${data.shortName} Daytime Elevation`}
                className="w-full h-80 sm:h-92 object-cover object-center group-hover:scale-103 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                    Daytime Architectural View
                  </span>
                  <p className="text-lg font-serif font-bold text-white">
                    {data.fullName}
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
