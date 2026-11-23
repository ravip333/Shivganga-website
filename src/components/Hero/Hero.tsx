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
      className="relative min-h-[92vh] flex items-center pt-20 pb-16 overflow-hidden bg-slate-950"
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

        {/* Sober, multi-layered vignette for optimal text readability */}
        <div className="absolute inset-0 z-15 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/65" />
        <div className="absolute inset-0 z-15 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          {/* Sober Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-slate-800 text-xs font-semibold mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-emerald-900 font-bold uppercase tracking-wider text-[11px]">
              {tagline}
            </span>
          </div>

          {/* Simple, Sober Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.12]">
            {shortName}
          </h1>

          {/* Concise Subheadline */}
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-xl">
            {heroSubheadline}
          </p>

          {/* Current Slide Badge */}
          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-semibold uppercase">
              {activeSlide.badge}
            </span>
            <span className="text-slate-300">{activeSlide.title}</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#collages"
              onClick={(e) => scrollToSection(e, '#collages')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Images className="w-4 h-4 text-emerald-700" />
              <span>View Photo Collages</span>
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, '#about')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-all shadow-md cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>Building Details</span>
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white/90 hover:text-white border border-white/30 hover:border-white/60 bg-white/5 backdrop-blur-sm transition-all"
            >
              <ExternalLink className="w-4 h-4 text-emerald-400" />
              <span>Google Maps</span>
            </a>
          </div>

          {/* 4 Clean Key Specs Pills */}
          <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-white">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-0.5">
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold text-slate-300">Structure</span>
              </div>
              <div className="text-xs font-bold text-white">Ground + 6 Floors</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-white">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-0.5">
                <Car className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold text-slate-300">Parking</span>
              </div>
              <div className="text-xs font-bold text-white">Dedicated Ground Bays</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-white">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-0.5">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold text-slate-300">Elevator</span>
              </div>
              <div className="text-xs font-bold text-white">Passenger Lift (G-6)</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-white">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold text-slate-300">Security</span>
              </div>
              <div className="text-xs font-bold text-white">24/7 Gate Watch</div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto Slider Controls (Previous / Next / Dots & Live Progress Bar) */}
      <div className="absolute right-4 sm:right-8 bottom-6 z-30 flex items-center gap-2.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all focus:outline-none cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide Indicators with Progress Bar */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setCurrentSlideIndex(i);
                setProgress(0);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === currentSlideIndex
                  ? 'w-6 bg-emerald-400'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all focus:outline-none cursor-pointer"
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
