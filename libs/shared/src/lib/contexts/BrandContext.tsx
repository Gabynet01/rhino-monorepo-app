'use client';

import React, { createContext, useEffect, useState } from 'react';

import { BrandConfig, PROJECTS, FeatureFlags } from '@rhino-portal/types';
import { BRAND_CONFIGS } from '@rhino-portal/constants';

interface BrandContextType {
  brandId: PROJECTS;
  brandConfig: BrandConfig;
  market: string | null;
  setMarket: (market: string) => void;
  getFeatureFlag: (flagName: keyof FeatureFlags) => boolean;
}

export const BrandContext = createContext<BrandContextType | undefined>(
  undefined
);

interface BrandProviderProps {
  brandId: BrandContextType['brandId'];
  children: React.ReactNode;
}

export const BrandProvider: React.FC<BrandProviderProps> = ({
  brandId,
  children,
}) => {
  const [market, setMarket] = useState<string | null>(null);

  // Get brand configuration
  const brandConfig = BRAND_CONFIGS[brandId] || BRAND_CONFIGS['project-a'];

  // Function to check if a feature flag is enabled based on current market
  const getFeatureFlag = (flagName: keyof FeatureFlags): boolean => {
    if (!market) {
      return brandConfig.featureFlags.global[flagName];
    }

    // Only use supported markets
    const validMarket = market === 'en' || market === 'ca' ? market : 'en';

    return brandConfig.featureFlags[validMarket][flagName];
  };

  // Detect market from URL on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const pathParts = path.split('/').filter(Boolean);

      // If first path segment is a market, set it
      if (
        pathParts.length > 0 &&
        (pathParts[0] === 'en' || pathParts[0] === 'ca')
      ) {
        setMarket(pathParts[0]);
      } else {
        // Default to English if no market in path
        setMarket('en');
      }
    }
  }, []);

  return (
    <BrandContext.Provider
      value={{
        brandId,
        brandConfig,
        market,
        setMarket,
        getFeatureFlag,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};
