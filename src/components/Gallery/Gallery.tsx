import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { Lightbox } from './Lightbox';
import { VideoModal } from '../VideoGallery/VideoModal';
import { PhotoUploadModal } from './PhotoUploadModal';
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
  PartyPopper,
  Users,
  Flag,
  Upload,
  Calendar,
} from 'lucide-react';

interface GalleryProps {
  photos: PhotoItem[];
  videos: VideoItem[];
  externalSelectedCategory?: MediaCategory;
  isUploadModalOpen?: boolean;
  onCloseUploadModal?: () => void;
  onOpenUploadModal?: (category?: MediaCategory) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  photos: initialPhotos,
  videos,
  externalSelectedCategory,
  isUploadModalOpen: externalIsUploadOpen,
  onCloseUploadModal: externalCloseUpload,
  onOpenUploadModal: externalOpenUpload,
}) => {
  const [photosList, setPhotosList] = useState<PhotoItem[]>(() => {
    // Check localStorage for resident uploaded photos
    try {
      const stored = localStorage.getItem('shivganga_user_photos');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...initialPhotos];
        }
      }
    } catch {
      // fallback
    }
    return initialPhotos;
  });

  const [activeCategory, setActiveCategory] = useState<MediaCategory>(
    externalSelectedCategory || 'all'
  );
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [internalUploadOpen, setInternalUploadOpen] = useState(false);
  const [uploadTargetCategory, setUploadTargetCategory] = useState<MediaCategory>('holi');

  // Sync external category selection
  useEffect(() => {
    if (externalSelectedCategory) {
      setActiveCategory(externalSelectedCategory);
    }
  }, [externalSelectedCategory]);

  const isUploadOpen = externalIsUploadOpen !== undefined ? externalIsUploadOpen : internalUploadOpen;
  const handleCloseUpload = () => {
    if (externalCloseUpload) {
      externalCloseUpload();
    } else {
      setInternalUploadOpen(false);
    }
  };

  const handleOpenUpload = (cat: MediaCategory = 'holi') => {
    setUploadTargetCategory(cat);
    if (externalOpenUpload) {
      externalOpenUpload(cat);
    } else {
      setInternalUploadOpen(true);
    }
  };

  const handleNewUpload = (newPhotos: PhotoItem[], targetCategory: MediaCategory) => {
    const updated = [...newPhotos, ...photosList];
    setPhotosList(updated);
    try {
      const existingUserPhotos = JSON.parse(localStorage.getItem('shivganga_user_photos') || '[]');
      localStorage.setItem('shivganga_user_photos', JSON.stringify([...newPhotos, ...existingUserPhotos]));
    } catch {
      // ignore storage error
    }
    setActiveCategory(targetCategory);
  };

  const categories: { id: MediaCategory; label: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'all',
      label: 'All Media',
      icon: <Images className="w-3.5 h-3.5" />,
      count: photosList.length + videos.length,
    },
    {
      id: 'elevation',
      label: 'Building Elevation',
      icon: <Building2 className="w-3.5 h-3.5" />,
      count: photosList.filter((p) => p.category === 'elevation').length,
    },
    {
      id: 'parking',
      label: 'Dedicated Parking',
      icon: <Car className="w-3.5 h-3.5" />,
      count: photosList.filter((p) => p.category === 'parking').length,
    },
    {
      id: 'holi',
      label: 'Holi Celebration',
      icon: <PartyPopper className="w-3.5 h-3.5" />,
      count: photosList.filter((p) => p.category === 'holi').length,
    },
    {
      id: 'mens_day',
      label: "Men's Day",
      icon: <Users className="w-3.5 h-3.5" />,
      count: photosList.filter((p) => p.category === 'mens_day').length,
    },
    {
      id: 'festivals',
      label: 'Diwali & Lights',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      count: photosList.filter((p) => p.category === 'festivals').length,
    },
    {
      id: 'national',
      label: 'National Days',
      icon: <Flag className="w-3.5 h-3.5" />,
      count: photosList.filter((p) => p.category === 'national').length,
    },
    {
      id: 'videos',
      label: 'Walkthrough Videos',
      icon: <Film className="w-3.5 h-3.5" />,
      count: videos.length,
    },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? photosList
      : photosList.filter((p) => p.category === activeCategory);

  const handleOpenPhoto = (item: PhotoItem) => {
    const idx = photosList.findIndex((p) => p.id === item.id);
    if (idx !== -1) setActiveLightboxIndex(idx);
  };

  return (
    <section id="photos" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Visual Assets"
          title="Society Photo & Video Collages"
          subtitle="Explore authentic daytime architecture, dedicated ground parking, community festivals, and walkthrough videos."
        />

        {/* Category Filter Tabs with Upload Action */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          {/* Scrollable Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto py-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/15'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-emerald-950/80 text-emerald-100' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Upload Button */}
          <button
            onClick={() => handleOpenUpload(activeCategory === 'videos' || activeCategory === 'all' ? 'holi' : activeCategory)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs shrink-0 self-end lg:self-auto"
          >
            <Upload className="w-4 h-4 text-emerald-700" />
            <span>Upload Photo</span>
          </button>
        </div>

        {/* Collages Grid for Photos */}
        {activeCategory !== 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => handleOpenPhoto(photo)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
              >
                {/* Photo Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.96] group-hover:brightness-100"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />

                  {/* Gradient & Hover Zoom Icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                      {photo.categoryLabel}
                    </span>
                  </div>

                  {photo.date && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      <span>{photo.date}</span>
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-11 h-11 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <Maximize2 className="w-5 h-5 text-emerald-700" />
                    </div>
                  </div>
                </div>

                {/* Text Block */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                      {photo.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                    <span>Click to view full photo</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Walkthrough Videos Grid */}
        {(activeCategory === 'videos' || activeCategory === 'all') && (
          <div className={`${activeCategory === 'all' ? 'mt-16 pt-12 border-t border-slate-200' : ''}`}>
            {activeCategory === 'all' && (
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Campus Walkthrough Videos
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Actual video recordings capturing the exterior 6-floor elevation and ground parking area.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group cursor-pointer flex flex-col hover:-translate-y-1"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-emerald-600/95 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-emerald-700 transition-all duration-300">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>

                    {vid.duration && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-xs font-medium text-white">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{vid.duration}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {vid.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                        {vid.caption}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5 text-emerald-600" />
                        Click to watch
                      </span>
                      <span className="text-emerald-800 font-semibold group-hover:underline">
                        Play Video →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox for Photos */}
      <Lightbox
        items={photosList}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(newIdx) => setActiveLightboxIndex(newIdx)}
      />

      {/* Video Modal Player */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      {/* Photo Upload Modal for Celebrations */}
      <PhotoUploadModal
        isOpen={isUploadOpen}
        onClose={handleCloseUpload}
        onUploadPhotos={handleNewUpload}
        initialCategory={uploadTargetCategory}
      />
    </section>
  );
};
