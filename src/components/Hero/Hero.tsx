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
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Shivganga CHS Background Slider"
    >
      {/* Background Slides with Ken Burns subtle animation */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={`${shortName} - ${slide.title}`}
                className={`w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.08] transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-106' : 'scale-100'
                }`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Multi-layered vignette for optimal text readability */}
        <div className="absolute inset-0 z-15 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/70" />
        <div className="absolute inset-0 z-15 bg-gradient-to-r from-slate-950/85 via-slate-950/35 to-transparent" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl text-left">
          {/* Unique Tagline Live Badge (Tech Agency / Modern Style) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 text-slate-800 text-xs font-semibold mb-6 shadow-md shadow-black/10">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-950 font-bold uppercase tracking-wider text-[11px]">
              {tagline}
            </span>
          </div>

          {/* Main Heading with High-Contrast Typography */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.14]">
            {heroHeadline}
          </h1>

          {/* Subheadline with Generous Readability */}
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
            {heroSubheadline}
          </p>

          {/* Current Active Slide Label */}
          <div className="mt-4 flex items-center gap-2.5 text-xs font-medium text-emerald-300">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-500/50 text-[11px] font-bold uppercase tracking-wider">
              {activeSlide.badge}
            </span>
            <span className="text-slate-300 font-medium">{activeSlide.title}</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#photos"
              onClick={(e) => scrollToSection(e, '#photos')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl cursor-pointer hover:scale-102"
            >
              <Images className="w-4 h-4 text-emerald-700" />
              <span>Explore Photo Gallery</span>
            </a>

            <a
              href="#celebrations"
              onClick={(e) => scrollToSection(e, '#celebrations')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-all shadow-lg cursor-pointer hover:scale-102"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Festivals & Celebrations</span>
            </a>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white/95 hover:text-white border border-white/30 hover:border-white/60 bg-white/10 backdrop-blur-md transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-emerald-400" />
              <span>Google Maps</span>
            </a>
          </div>

          {/* 4 Clean Key Specs Blocks (Modern Justonclick.in Grid) */}
          <div className="mt-12 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 text-white hover:bg-white/15 transition-all">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-[11px] font-semibold text-slate-300">Architecture</span>
              </div>
              <div className="text-sm font-bold text-white">Ground + 6 Floors</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Standalone Tower</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 text-white hover:bg-white/15 transition-all">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                <Car className="w-4 h-4" />
                <span className="text-[11px] font-semibold text-slate-300">Parking</span>
              </div>
              <div className="text-sm font-bold text-white">Dedicated Bays</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Demarcated Slots</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 text-white hover:bg-white/15 transition-all">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                <ArrowUpDown className="w-4 h-4" />
                <span className="text-[11px] font-semibold text-slate-300">Elevator</span>
              </div>
              <div className="text-sm font-bold text-white">Passenger Lift</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Ground to 6th Floor</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 text-white hover:bg-white/15 transition-all">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-semibold text-slate-300">Security</span>
              </div>
              <div className="text-sm font-bold text-white">24/7 Gate Watch</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Manned Checkpost</div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto Slider Controls with Numbered Slide Indicator */}
      <div className="absolute right-4 sm:right-8 bottom-6 z-30 flex items-center gap-3">
        {/* Previous Button */}
        <button
          type="button"
          onClick={prevSlide}
          className="p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all focus:outline-none cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide Counter e.g. 01 / 04 */}
        <div className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white tracking-wider">
          <span className="text-emerald-400">0{currentSlideIndex + 1}</span>
          <span className="text-white/40 mx-1">/</span>
          <span>0{slides.length}</span>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all focus:outline-none cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Subtle Auto Slider Progress Line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          className="h-full bg-emerald-500 transition-all ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
};
