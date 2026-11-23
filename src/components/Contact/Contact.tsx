import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import {
  ShieldCheck,
  PhoneCall,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import type { SocietyData } from '../../types';

interface ContactProps {
  data: SocietyData;
}

export const Contact: React.FC<ContactProps> = ({ data }) => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Contact & Access"
          title="Building Guidelines & Contacts"
          subtitle="Essential information regarding building access and emergency telephone contacts."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Building Address & Security Gate Card */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-slate-900">
                    {data.shortName}
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold uppercase">
                    Security Gate & Visitor Entry
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <p>
                  <strong>Address:</strong> {data.contact.address}
                </p>
                <p>
                  <strong>Visitor Guidelines:</strong> Guests, parcel deliveries, and service technicians must register at the main entrance gate before entry.
                </p>
                <p>
                  <strong>Parking Protocol:</strong> Dedicated ground parking slots are reserved for residents. Visitor vehicles must park in designated spaces.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <a
                href={data.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold underline"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>View Google Maps Reference</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Emergency Telephone Directory */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-slate-900">
                    Emergency Helplines
                  </h3>
                  <span className="text-[11px] text-amber-800 font-semibold uppercase">
                    Immediate Public Services
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                {data.contact.emergencyContacts.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs"
                  >
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded">
                      {item.number}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-[11px] text-slate-400 italic">
              * Non-commercial residential information portal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
