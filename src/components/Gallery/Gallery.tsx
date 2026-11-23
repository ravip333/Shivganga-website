import React, { useState } from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { Lightbox } from './Lightbox';
import { VideoModal } from '../VideoGallery/VideoModal';
import type { PhotoItem, VideoItem, MediaCategory } from '../../types';
import {
  Maximize2,
  Building2,
  Car,
  Sparkles,
  Play,
  Film,
  Clock,
  Images,
} from 'lucide-react';

interface GalleryProps {
  photos: PhotoItem[];
  videos: VideoItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ photos, videos }) => {
  const [activeCategory, setActiveCategory] = useState<MediaCategory>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const categories: { id: MediaCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Photos & Collages', icon: <Images className="w-3.5 h-3.5" /> },
    { id: 'elevation', label: 'Building Elevation (G+6)', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'parking', label: 'Dedicated Parking & Campus', icon: <Car className="w-3.5 h-3.5" /> },
    { id: 'festivals', label: 'Festivals & Functions', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'videos', label: 'Walkthrough Videos', icon: <Film className="w-3.5 h-3.5" /> },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const handleOpenPhoto = (item: PhotoItem) => {
    const idx = photos.findIndex((p) => p.id === item.id);
    if (idx !== -1) setActiveLightboxIndex(idx);
  };

  // Convert PhotoItem into Lightbox format
  const lightboxItems = photos.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category as any,
    categoryLabel: p.categoryLabel,
    imageUrl: p.imageUrl,
    caption: p.caption,
  }));

  return (
    <section id="photos" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Photo & Video Collages"
          title="Building Media by Category"
          subtitle="Explore authentic photo collages and walkthrough videos organized by building elevation, dedicated parking, and festive functions."
        />

        {/* Category Function Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* 1. Walkthrough Videos View */}
        {activeCategory === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-center justify-center">
                    <div className="w-13 h-13 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-emerald-700 transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{vid.duration}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-serif font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {vid.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {vid.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Photo Collages View (All, Elevation, Parking, Festivals) */}
        {activeCategory !== 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[240px] gap-4">
            {filteredPhotos.map((item, idx) => {
              // Asymmetrical artistic collage spans
              const isLarge = (idx === 0) || (idx === 4 && filteredPhotos.length > 5);
              const isWide = (idx === 1 && activeCategory !== 'all') || (idx === 5);

              let spanClass = 'col-span-1 row-span-1';
              if (isLarge) spanClass = 'col-span-1 sm:col-span-2 row-span-2';
              else if (isWide) spanClass = 'col-span-1 sm:col-span-2 row-span-1';

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenPhoto(item)}
                  className={`group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer ${spanClass}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.97] group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Gradient & Caption Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-700 text-white w-fit mb-1 shadow-xs">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-sm sm:text-base font-serif font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                      {item.caption}
                    </p>

                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Inline Videos Preview when in 'All' view */}
        {activeCategory === 'all' && (
          <div className="mt-14 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Walkthrough Videos
                </h3>
                <p className="text-xs text-slate-500">
                  Video recordings of building frontage, driveway, and parking
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCategory('videos')}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                View all videos →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-md transition-all group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-semibold">
                      {vid.duration}
                    </div>
                  </div>
                  <div className="p-3.5">
                    <h4 className="font-serif font-bold text-sm text-slate-900">
                      {vid.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox for Photos */}
      <Lightbox
        items={lightboxItems}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(newIdx) => setActiveLightboxIndex(newIdx)}
      />

      {/* Video Modal Player */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
};
