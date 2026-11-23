import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  asLink = false,
  href,
  target,
  rel,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-98 disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-900/10 hover:shadow-lg hover:shadow-emerald-900/20',
    secondary:
      'bg-slate-800 hover:bg-slate-900 text-white shadow-md shadow-slate-900/10',
    outline:
      'border-2 border-slate-300 hover:border-slate-800 text-slate-800 hover:bg-slate-100/60 bg-transparent',
    ghost:
      'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 bg-transparent',
    white:
      'bg-white text-slate-900 hover:bg-slate-50 shadow-md shadow-black/10 hover:shadow-lg',
  };

  const combinedClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (asLink && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={combinedClass}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
