import React, { useState, useEffect } from 'react';
import { Menu, X, Navigation } from 'lucide-react';

interface NavbarProps {
  shortName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ shortName }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Few essential options as requested: Home, About, Amenities, Photos, Directions
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Photos', href: '#photos' },
    { label: 'Directions', href: '#location' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/90 py-2.5'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with SG Monogram & Short Name */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            {/* Custom Sober Geometric SG Emblem */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white flex items-center justify-center font-serif font-bold text-sm sm:text-base tracking-tighter shadow-sm border border-emerald-700/50 group-hover:scale-102 transition-transform">
              <span>SG</span>
            </div>
            <div>
              <span className="block font-serif font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
                {shortName}
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-emerald-700 -mt-0.5">
                Residential G+6 Tower
              </span>
            </div>
          </a>

          {/* Clean, Simple Desktop Nav Links (Few options only) */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-emerald-800 hover:bg-slate-100/70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Quick Direct Google Directions Action Button */}
          <div className="hidden sm:flex items-center">
            <a
              href="https://share.google/fc4tVuIdwMKMJBVt9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-white border-b border-slate-200 shadow-xl px-4 py-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 hover:text-emerald-800 transition-colors"
              >
                <span>{link.label}</span>
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <a
                href="https://share.google/fc4tVuIdwMKMJBVt9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-emerald-700 text-white"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
