'use client';

import { useContext } from 'react';
import { BrandContext } from '../contexts/BrandContext';

/**
 * Custom hook for accessing brand-specific configuration and theming
 * @returns The brand context containing brand-specific configuration
 */
export const useBrand = () => {
  const context = useContext(BrandContext);

  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }

  return context;
};
