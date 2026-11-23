import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '../../types';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const newIdx = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(newIdx);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const newIdx = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIdx);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-slate-950/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
    >
      {/* Top Header Bar */}
      <div
        className="w-full max-w-6xl flex items-center justify-between text-white py-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold border border-white/20">
            {currentIndex + 1} / {items.length}
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-wider text-emerald-400 font-bold">
            {currentItem.categoryLabel}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative w-full max-w-5xl flex-1 flex items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer z-10 shadow-lg"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer z-10 shadow-lg"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Display Image & Title */}
        <div className="flex flex-col items-center max-h-[72vh]">
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="max-h-[62vh] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300"
          />
          <div className="mt-3 text-center text-white max-w-2xl px-4">
            <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
              {currentItem.title}
            </h3>
            {currentItem.caption && (
              <p className="mt-0.5 text-xs sm:text-sm text-slate-300">
                {currentItem.caption}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip for Fast Collage Navigation */}
      <div
        className="w-full max-w-4xl py-2 flex items-center justify-center gap-2 overflow-x-auto z-10 scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => onNavigate(idx)}
            className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
              idx === currentIndex
                ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/30'
                : 'border-white/20 opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
