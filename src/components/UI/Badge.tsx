import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'amber' | 'slate' | 'rose';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  className = '',
  icon
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    blue: 'bg-sky-50 text-sky-800 border-sky-200/80',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/80',
    slate: 'bg-slate-100 text-slate-800 border-slate-200',
    rose: 'bg-rose-50 text-rose-800 border-rose-200/80',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-xs ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="w-3.5 h-3.5 shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
