import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/80 rounded-full border border-emerald-200">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-4.5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-5 flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
        <div className="h-1 w-12 bg-emerald-600 rounded-full"></div>
        <div className="h-1 w-2 bg-amber-500 rounded-full"></div>
        <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
      </div>
    </div>
  );
};
