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
  Grid,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface GalleryProps {
  photos: PhotoItem[];
  videos: VideoItem[];
  externalSelectedCategory?: MediaCategory;
  isUploadModalOpen?: boolean;
  onCloseUploadModal?: () => void;
  onOpenUploadModal?: (category?: MediaCategory) => void;
}

interface MultiPhotoAlbum {
  id: string;
  title: string;
  category: MediaCategory;
  categoryLabel: string;
  badge: string;
  description: string;
  photos: PhotoItem[];
}

export const Gallery: React.FC<GalleryProps> = ({
  photos: initialPhotos,
  videos: initialVideos,
  externalSelectedCategory,
  isUploadModalOpen: externalIsUploadOpen,
  onCloseUploadModal: externalCloseUpload,
  onOpenUploadModal: externalOpenUpload,
}) => {
  const [photosList, setPhotosList] = useState<PhotoItem[]>(() => {
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

  const [videosList, setVideosList] = useState<VideoItem[]>(() => {
    try {
      const stored = localStorage.getItem('shivganga_user_videos');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...initialVideos];
        }
      }
    } catch {
      // fallback
    }
    return initialVideos;
  });

  const [activeCategory, setActiveCategory] = useState<MediaCategory>(
    externalSelectedCategory || 'all'
  );
  const [viewMode, setViewMode] = useState<'collages' | 'grid'>('collages');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [internalUploadOpen, setInternalUploadOpen] = useState(false);
  const [uploadTargetCategory, setUploadTargetCategory] = useState<MediaCategory>('holi');

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
      // ignore
    }
    setActiveCategory(targetCategory);
  };

  const handleNewVideos = (newVideos: VideoItem[]) => {
    const updated = [...newVideos, ...videosList];
    setVideosList(updated);
    try {
      const existing = JSON.parse(localStorage.getItem('shivganga_user_videos') || '[]');
      localStorage.setItem('shivganga_user_videos', JSON.stringify([...newVideos, ...existing]));
    } catch {
      // ignore
    }
    setActiveCategory('videos');
  };

  // Build Multi-Photo Albums based on current photos
  const albums: MultiPhotoAlbum[] = [
    {
      id: 'album-elevation',
      title: 'Building Elevation & Architecture',
      category: 'elevation',
      categoryLabel: 'Building Elevation',
      badge: 'G+6 Tower',
      description: 'Daytime exterior facade, full 6-floor structural elevation, ventilated balconies, and campus perimeter.',
      photos: photosList.filter((p) => p.category === 'elevation'),
    },
    {
      id: 'album-parking',
      title: 'Dedicated Ground Parking & Campus Driveway',
      category: 'parking',
      categoryLabel: 'Dedicated Parking',
      badge: 'Ground Bays',
      description: 'Demarcated parking bays for resident four-wheelers and two-wheelers, covered sections, and security check-post.',
      photos: photosList.filter((p) => p.category === 'parking'),
    },
    {
      id: 'album-festivals',
      title: 'Diwali Deepotsav & Grand Illumination',
      category: 'festivals',
      categoryLabel: 'Diwali & Lights',
      badge: 'Festival of Lights',
      description: 'Spectacular decorative golden fairy lighting covering the entire residential facade and floor-wise celebrations.',
      photos: photosList.filter((p) => p.category === 'festivals'),
    },
    {
      id: 'album-holi',
      title: 'Holi Celebration & Color Gathering',
      category: 'holi',
      categoryLabel: 'Holi Celebration',
      badge: 'Color Festival',
      description: 'Vibrant annual festival of colors with resident families, organic gulal, traditional music, and joyful community spirit.',
      photos: photosList.filter((p) => p.category === 'holi'),
    },
    {
      id: 'album-mens',
      title: "Men's Day Fellowship & Meetup",
      category: 'mens_day',
      categoryLabel: "Men's Day",
      badge: 'Community Meet',
      description: 'Morning tea meetup and appreciation get-together honoring resident fathers and men of Shivganga CHS.',
      photos: photosList.filter((p) => p.category === 'mens_day'),
    },
    {
      id: 'album-national',
      title: 'Republic & Independence Day Celebrations',
      category: 'national',
      categoryLabel: 'National Days',
      badge: 'Flag Hoisting',
      description: 'Patriotic flag hoisting ceremony at the main entrance gate with anthem singing and sweets distribution.',
      photos: photosList.filter((p) => p.category === 'national'),
    },
  ];

  const filteredAlbums =
    activeCategory === 'all'
      ? albums
      : albums.filter((a) => a.category === activeCategory);

  const filteredSinglePhotos =
    activeCategory === 'all'
      ? photosList
      : photosList.filter((p) => p.category === activeCategory);

  const categories: { id: MediaCategory; label: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'all',
      label: 'All Media',
      icon: <Images className="w-3.5 h-3.5" />,
      count: photosList.length + videosList.length,
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
      count: videosList.length,
    },
  ];

  const handleOpenPhoto = (item: PhotoItem) => {
    const idx = photosList.findIndex((p) => p.id === item.id);
    if (idx !== -1) setActiveLightboxIndex(idx);
  };

  return (
    <section id="photos" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Visual Assets"
          title="Multi-Photo Collages & Media"
          subtitle="Explore authentic daylight architecture, dedicated ground parking bays, community celebrations, and walkthrough video tours."
        />

        {/* View Mode & Category Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
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

          {/* Action Row: View Mode Switcher + Upload Button */}
          <div className="flex items-center gap-2.5 self-end lg:self-auto shrink-0">
            {/* View Mode Toggle (Collage Albums vs Single Grid) */}
            {activeCategory !== 'videos' && (
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('collages')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'collages'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Multi-Photo Collage Albums"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Collages</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="All Single Photos Grid"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Grid</span>
                </button>
              </div>
            )}

            {/* Quick Upload Button */}
            <button
              onClick={() => handleOpenUpload(activeCategory === 'videos' || activeCategory === 'all' ? 'holi' : activeCategory)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
            >
              <Upload className="w-4 h-4 text-emerald-700" />
              <span>Upload Media</span>
            </button>
          </div>
        </div>

        {/* 1. Multi-Photo Collage Cards View (User's Core Requirement) */}
        {activeCategory !== 'videos' && viewMode === 'collages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredAlbums.map((album) => {
              if (album.photos.length === 0) return null;
              const photoCount = album.photos.length;

              return (
                <div
                  key={album.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                >
                  {/* Multi-Photo Collage Frame */}
                  <div className="relative aspect-16/11 w-full overflow-hidden bg-slate-900 p-2 gap-2 grid grid-cols-2">
                    {/* 1st Main Feature Photo */}
                    <div
                      onClick={() => handleOpenPhoto(album.photos[0])}
                      className={`relative overflow-hidden rounded-2xl cursor-pointer ${
                        photoCount === 1
                          ? 'col-span-2 h-full'
                          : photoCount === 2
                          ? 'col-span-1 h-full'
                          : 'col-span-1 row-span-2 h-full'
                      }`}
                    >
                      <img
                        src={album.photos[0].imageUrl}
                        alt={album.photos[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.96] group-hover:brightness-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* 2nd Photo */}
                    {photoCount >= 2 && (
                      <div
                        onClick={() => handleOpenPhoto(album.photos[1])}
                        className={`relative overflow-hidden rounded-2xl cursor-pointer ${
                          photoCount === 2 ? 'col-span-1 h-full' : 'col-span-1 h-full'
                        }`}
                      >
                        <img
                          src={album.photos[1].imageUrl}
                          alt={album.photos[1].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.96] group-hover:brightness-100"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* 3rd Photo or Stack with "+X More" Overlay */}
                    {photoCount >= 3 && (
                      <div
                        onClick={() => handleOpenPhoto(album.photos[2])}
                        className="relative overflow-hidden rounded-2xl cursor-pointer col-span-1 h-full"
                      >
                        <img
                          src={album.photos[2].imageUrl}
                          alt={album.photos[2].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.96] group-hover:brightness-100"
                          loading="lazy"
                        />

                        {/* If 4+ photos, show stylish overlay */}
                        {photoCount > 3 && (
                          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white p-2">
                            <span className="text-xl sm:text-2xl font-serif font-bold text-white">
                              +{photoCount - 2}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                              More Photos
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Floating Album Badge at top-left of the collage */}
                    <div className="absolute top-4 left-4 z-20 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-md backdrop-blur-md border border-slate-200">
                        <Layers className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{album.badge}</span>
                      </span>
                    </div>

                    {/* Floating Photo Count Badge at top-right */}
                    <div className="absolute top-4 right-4 z-20 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900/85 text-white shadow-md backdrop-blur-xs">
                        {photoCount} Photos
                      </span>
                    </div>
                  </div>

                  {/* Collage Card Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {album.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5 font-normal">
                        {album.description}
                      </p>
                    </div>

                    {/* Action Row */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => handleOpenPhoto(album.photos[0])}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer group-hover:translate-x-0.5"
                      >
                        <span>View All {photoCount} Photos in Lightbox</span>
                        <ArrowRight className="w-4 h-4 text-emerald-700" />
                      </button>

                      <button
                        onClick={() => handleOpenUpload(album.category)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>+ Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. Single Photo Grid View */}
        {activeCategory !== 'videos' && viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredSinglePhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => handleOpenPhoto(photo)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.96] group-hover:brightness-100"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
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

        {/* 3. Walkthrough Videos Section */}
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
              {videosList.map((vid) => (
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

      {/* Photo & Video Upload Modal for Celebrations */}
      <PhotoUploadModal
        isOpen={isUploadOpen}
        onClose={handleCloseUpload}
        onUploadPhotos={handleNewUpload}
        onUploadVideos={handleNewVideos}
        initialCategory={uploadTargetCategory}
      />
    </section>
  );
};
