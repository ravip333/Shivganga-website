import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Sparkles,
  Building2,
  Car,
  ArrowUpDown,
  ShieldCheck,
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
  slides,
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
      className="relative pt-28 pb-14 sm:pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Shivganga CHS Home Showcase"
    >
      {/* Soft Ambient Radial Background (Justonclick.in clean aesthetic) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-b from-emerald-100/50 via-emerald-50/20 to-transparent pointer-events-none rounded-full blur-3xl -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dual-Column Minimal & High-Impact Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Less Content, Clean & Ultra-Professional */}
          <div className="lg:col-span-6 space-y-5 text-left">
            {/* Minimal Status Pill Badge with Beacon Pulse */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-800 text-xs font-semibold shadow-xs border border-slate-200/90">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-emerald-950 font-bold uppercase tracking-wider text-[11px]">
                Standalone G+6 Living • MCS Act Registered
              </span>
            </div>

            {/* Concise, Bold Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-5.5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                {shortName}
              </h1>
              <p className="text-xl sm:text-2xl text-emerald-800 font-sans font-medium mt-1.5 tracking-tight">
                Quiet Comfort. Close-Knit Community.
              </p>
            </div>

            {/* Short 1-Sentence Subtitle (Uncluttered) */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-lg">
              A standalone 6-floor residential tower offering dedicated resident ground parking, passenger elevator, and 24/7 security watch.
            </p>

            {/* Just 2 Clean Action Buttons (Less content, more impact) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#photos"
                onClick={(e) => scrollToSection(e, '#photos')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer hover:scale-102 group"
              >
                <span>Explore Gallery & Collages</span>
                <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#location"
                onClick={(e) => scrollToSection(e, '#location')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 hover:text-emerald-900 transition-all duration-200 border border-slate-200 shadow-xs cursor-pointer hover:scale-102"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>View Location Map</span>
              </a>
            </div>

            {/* Minimal Inline Key Specs Strip (Clean, Not Bulky) */}
            <div className="pt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 border-t border-slate-200/80">
              <span className="flex items-center gap-1.5 text-slate-800 bg-slate-100/80 px-2.5 py-1 rounded-lg">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>G+6 Standalone</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-800 bg-slate-100/80 px-2.5 py-1 rounded-lg">
                <Car className="w-3.5 h-3.5 text-emerald-700" />
                <span>Dedicated Parking</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-800 bg-slate-100/80 px-2.5 py-1 rounded-lg">
                <ArrowUpDown className="w-3.5 h-3.5 text-emerald-700" />
                <span>Passenger Lift</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-800 bg-slate-100/80 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>24/7 Security</span>
              </span>
            </div>
          </div>

          {/* Right Column: Daylight Building Slider with Floating Badge Animation */}
          <div className="lg:col-span-6 relative">
            {/* Floating Glass Pill Badge (Justonclick.in Animation) */}
            <div className="absolute -top-3 -right-2 z-30 hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-slate-800 text-xs font-bold shadow-lg border border-slate-200/90 backdrop-blur-md animate-float">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-emerald-950 font-bold">100% Real Building Photos</span>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200/90 bg-slate-900 group aspect-4/3 sm:aspect-16/11">
              {/* Slides in Full Daylight Colors */}
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

              {/* Bottom Subtle Vignette for Captions */}
              <div className="absolute inset-x-0 bottom-0 z-15 h-32 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Floating Slide Badge at top-left */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-md backdrop-blur-md border border-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>{activeSlide.badge}</span>
                </span>
              </div>

              {/* Bottom Caption & Controls */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-4">
                <div className="text-white max-w-xs sm:max-w-sm">
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
