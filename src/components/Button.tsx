import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  to,
  type = 'button',
  disabled = false,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-sage disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-brand-sage text-brand-cream hover:bg-brand-sage-dark shadow-xs hover:shadow-md border border-transparent',
    secondary: 'bg-brand-linen text-brand-charcoal hover:bg-brand-stone border border-brand-stone/30',
    outline: 'border border-brand-charcoal/30 text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-cream',
    text: 'text-brand-charcoal hover:text-brand-sage px-0 py-0',
  };

  const sizes = {
    sm: 'px-5 py-2 text-xs font-semibold uppercase',
    md: 'px-7 py-3 text-sm',
    lg: 'px-9 py-4 text-base',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${size === 'md' && variant === 'text' ? '' : sizes[size]} ${className}`;

  const hoverAnimation = disabled ? {} : {
    scale: variant === 'text' ? 1.02 : 1.015,
    y: variant === 'text' ? 0 : -1,
  };

  const tapAnimation = disabled ? {} : {
    scale: 0.985,
    y: 0,
  };

  if (to) {
    return (
      <motion.div
        className="inline-block"
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Link to={to} className={combinedStyles}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};
