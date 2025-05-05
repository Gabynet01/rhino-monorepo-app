'use client';

import React, { ButtonHTMLAttributes, useRef } from 'react';
import { useBrand } from '../../hooks/useBrand';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  customMessage?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  customMessage,
  className = '',
  onClick,
  ...props
}) => {
  const { brandConfig } = useBrand();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Get variant classes from brand config
  const variantClasses = brandConfig.buttonVariants[variant] || '';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Display brand-specific alert if customMessage is provided
    if (customMessage) {
      alert(customMessage || `Hello from ${brandConfig.name}`);
    }

    // Call original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`
        ${sizeClasses[size]}
        ${variantClasses}
        ${fullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-all duration-200 focus:outline-none 
        focus:ring-2 focus:ring-opacity-50 focus:ring-offset-2
        ${className}
      `}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
