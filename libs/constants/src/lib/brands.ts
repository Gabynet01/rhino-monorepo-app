import { BrandConfig, PROJECTS } from '@rhino-portal/types';

export const BRAND_CONFIGS: Record<PROJECTS, BrandConfig> = {
  [PROJECTS.PROJECT_A]: {
    id: PROJECTS.PROJECT_A,
    name: 'Green Project',
    logoUrl: '/assets/logos/green-project-logo.svg',
    primaryColor: '#10B981',
    secondaryColor: '#064E3B',
    accentColor: '#064E3B',
    fontFamily: 'Inter, system-ui, sans-serif',
    featureFlags: {
      global: {
        enableAdvancedSearch: true,
        enableWishlist: true,
        enableReviews: true,
        enableLiveChat: true,
        enableGamePreview: true,
      },
      en: {
        enableAdvancedSearch: true,
        enableWishlist: true,
        enableReviews: true,
        enableLiveChat: true,
        enableGamePreview: true,
      },
      ca: {
        enableAdvancedSearch: true,
        enableWishlist: false, // Disabled for Canadian market
        enableReviews: true,
        enableLiveChat: false, // Disabled for Canadian market
        enableGamePreview: true,
      },
    },
    menuPosition: 'left',
    api: {
      baseUrl: 'https://api.project-a.com',
    },
    buttonVariants: {
      primary: 'bg-green-500 hover:bg-green-600',
      secondary: 'bg-green-100 hover:bg-green-200',
    },
  },
  [PROJECTS.PROJECT_B]: {
    id: PROJECTS.PROJECT_B,
    name: 'Red Project',
    logoUrl: '/assets/logos/red-project-logo.svg',
    primaryColor: '#EF4444',
    secondaryColor: '#7F1D1D',
    accentColor: '#7F1D1D',
    fontFamily: 'Poppins, system-ui, sans-serif',
    featureFlags: {
      global: {
        enableAdvancedSearch: true,
        enableWishlist: true,
        enableReviews: true,
        enableLiveChat: false, // Disabled globally for Project B
        enableGamePreview: true,
      },
      en: {
        enableAdvancedSearch: true,
        enableWishlist: true,
        enableReviews: true,
        enableLiveChat: false,
        enableGamePreview: true,
      },
      ca: {
        enableAdvancedSearch: false, // Disabled for Canadian market
        enableWishlist: true,
        enableReviews: false, // Disabled for Canadian market
        enableLiveChat: false,
        enableGamePreview: false, // Disabled for Canadian market
      },
    },
    menuPosition: 'left',
    api: {
      baseUrl: 'https://api.project-a.com',
    },
    buttonVariants: {
      primary: 'bg-green-500 hover:bg-green-600',
      secondary: 'bg-green-100 hover:bg-green-200',
    },
  },
};

export const getBrandConfig = (brandId: PROJECTS): BrandConfig => {
  return BRAND_CONFIGS[brandId] || BRAND_CONFIGS[PROJECTS.PROJECT_A];
};
