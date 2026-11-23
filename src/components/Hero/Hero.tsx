import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck,
  Building2,
  Car,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Images,
  PartyPopper,
  Sparkles,
} from 'lucide-react';
import type { HeroSlide } from '../../types';

interface HeroProps {
  shortName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  slides: HeroSlide[];
  googleMapsUrl: string;
}

export const Hero: React.FC<HeroProps> = ({
  shortName,
  tagline,
  heroHeadline,
  heroSubheadline,
  slides,
  googleMapsUrl,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const INTERVAL_STEP = 50;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  // Auto slide timer with live progress bar
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (INTERVAL_STEP / SLIDE_DURATION) * 100;
      });
    }, INTERVAL_STEP);

    return () => clearInterval(timer);
  }, [isPaused, slides.length, nextSlide]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const activeSlide = slides[currentSlideIndex] || slides[0];

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Shivganga CHS Home Showcase"
    >
      {/* Soft Ambient Background Glow (Justonclick.in Modern Light Style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/40 via-emerald-50/20 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dual-Column Modern Light Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography, Tagline, CTAs & Specs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Unique Tagline Pill Badge with Glowing Pulse */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-800 text-xs font-semibold shadow-xs border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-emerald-950 font-bold uppercase tracking-wider text-[11px]">
                {tagline}
              </span>
            </div>

            {/* Headline with High-Contrast Typography */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {heroHeadline.split(' ')[0]} {heroHeadline.split(' ')[1]}{' '}
                <span className="text-emerald-800 block sm:inline">
                  {shortName}
                </span>
              </h1>
              <p className="text-xs uppercase tracking-widest font-bold text-emerald-700">
                Standalone Ground + 6 Floors Residential Tower
              </p>
            </div>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
              {heroSubheadline}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#photos"
                onClick={(e) => scrollToSection(e, '#photos')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer hover:scale-102"
              >
                <Images className="w-4 h-4 text-emerald-200" />
                <span>Explore Photo Gallery</span>
              </a>

              <a
                href="#celebrations"
                onClick={(e) => scrollToSection(e, '#celebrations')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-emerald-50 hover:text-emerald-900 transition-all duration-200 border border-slate-200 shadow-xs cursor-pointer hover:scale-102"
              >
                <PartyPopper className="w-4 h-4 text-rose-500" />
                <span>Celebrations</span>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-emerald-600" />
                <span>Google Maps</span>
              </a>
            </div>

            {/* 4 Clean Architectural Spec Blocks (Justonclick.in Grid) */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase text-slate-500">Structure</span>
                </div>
                <div className="text-xs font-bold text-slate-900 leading-snug">G+6 Standalone</div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
                  <Car className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase text-slate-500">Parking</span>
                </div>
                <div className="text-xs font-bold text-slate-900 leading-snug">Dedicated Bays</div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase text-slate-500">Elevator</span>
                </div>
                <div className="text-xs font-bold text-slate-900 leading-snug">Passenger Lift</div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase text-slate-500">Security</span>
                </div>
                <div className="text-xs font-bold text-slate-900 leading-snug">24/7 Gate Watch</div>
              </div>
            </div>
          </div>

          {/* Right Column: Daylight Building Slider in High-Tech Framed Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200/90 bg-slate-900 group aspect-4/3 sm:aspect-16/11">
              {/* Slides with Full Daylight Clarity (No Heavy Dark Overlays) */}
              {slides.map((slide, idx) => {
                const isActive = idx === currentSlideIndex;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.imageUrl}
                      alt={`${shortName} - ${slide.title}`}
                      className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out brightness-[0.98] contrast-[1.02] ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                );
              })}

              {/* Subtle Elegant Gradient on bottom for caption text */}
              <div className="absolute inset-x-0 bottom-0 z-15 h-36 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent pointer-events-none" />

              {/* Floating Slide Badge at top-left */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-md backdrop-blur-md border border-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeSlide.badge}</span>
                </span>
              </div>

              {/* Bottom Caption & Controls */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-4">
                <div className="text-white max-w-sm">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white drop-shadow-sm leading-snug">
                    {activeSlide.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
                    {activeSlide.subtitle}
                  </p>
                </div>

                {/* Slider Controls (Previous / Slide Counter / Next) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white tracking-wider">
                    <span className="text-emerald-400">0{currentSlideIndex + 1}</span>
                    <span className="text-white/40 mx-0.5">/</span>
                    <span>0{slides.length}</span>
                  </div>

                  <button
                    type="button"
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Live Progress Bar on the bottom of the card */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-25">
                <div
                  className="h-full bg-emerald-500 transition-all ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Thumbnail Mini-Bar Below Slider */}
            <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto py-1">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentSlideIndex(i);
                    setProgress(0);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    i === currentSlideIndex
                      ? 'bg-emerald-50 text-emerald-950 border-emerald-400 font-bold shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>{s.badge}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
