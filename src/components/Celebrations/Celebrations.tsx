import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { Sparkles, Calendar, ArrowRight, Upload, Users, PartyPopper, Heart, Flag } from 'lucide-react';
import type { CelebrationItem, MediaCategory } from '../../types';

interface CelebrationsProps {
  celebrations: CelebrationItem[];
  onSelectCategory: (category: MediaCategory) => void;
  onOpenUpload: (category: MediaCategory) => void;
}

export const Celebrations: React.FC<CelebrationsProps> = ({
  celebrations,
  onSelectCategory,
  onOpenUpload,
}) => {
  const getCelebrationIcon = (cat: MediaCategory) => {
    switch (cat) {
      case 'holi':
        return <PartyPopper className="w-5 h-5 text-rose-600" />;
      case 'mens_day':
        return <Users className="w-5 h-5 text-sky-600" />;
      case 'festivals':
        return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'national':
        return <Flag className="w-5 h-5 text-emerald-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getAccentBadgeStyle = (cat: MediaCategory) => {
    switch (cat) {
      case 'holi':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'mens_day':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'festivals':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'national':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <section id="celebrations" className="py-20 sm:py-24 bg-slate-100/60 relative border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Community & Celebrations"
          title="Society Festivals & Cultural Gatherings"
          subtitle="From Holi and Men's Day to Diwali illumination, explore how resident families come together in joyful unity."
        />

        {/* 4 Major Celebration Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {celebrations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Image Banner with Badge */}
              <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 brightness-[0.92] group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                {/* Season & Badge */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs ${getAccentBadgeStyle(
                      item.category
                    )}`}
                  >
                    {getCelebrationIcon(item.category)}
                    <span>{item.badge}</span>
                  </span>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/90 text-xs font-medium mb-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.season}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug drop-shadow-sm">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Highlights Bullet Block */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                      Celebration Highlights
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons: View Photos & Upload Photos */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectCategory(item.category)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>View {item.name.split(' ')[0]} Photos</span>
                    <ArrowRight className="w-4 h-4 text-emerald-700" />
                  </button>

                  <button
                    onClick={() => onOpenUpload(item.category)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photos</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resident Community Banner with Upload CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-700/40">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/60 text-emerald-200 border border-emerald-600/50">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Resident Community Engagement</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Have photographs from recent society events?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              Share your favorite celebration memories from Holi, Men's Day, Diwali, or campus gatherings to showcase them in our official community gallery.
            </p>
          </div>

          <button
            onClick={() => onOpenUpload('holi')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer shrink-0 hover:scale-102"
          >
            <Upload className="w-4 h-4 text-emerald-700" />
            <span>Upload Society Photos</span>
          </button>
        </div>
      </div>
    </section>
  );
};
