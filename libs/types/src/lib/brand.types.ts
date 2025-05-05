// Define the feature flags interface for market-based toggles
export interface FeatureFlags {
  enableAdvancedSearch: boolean;
  enableWishlist: boolean;
  enableReviews: boolean;
  enableLiveChat: boolean;
  enableGamePreview: boolean;
}

// Define sound effects configuration
export interface SoundEffects {
  buttonClick?: string;
  gameCardClick?: string;
  modalOpen?: string;
  modalClose?: string;
  success?: string;
  error?: string;
  pageLoad?: string;
  addToCart?: string;
}

// Define the brand configuration interface
export interface BrandConfig {
  id: string;
  name: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  soundEffects?: SoundEffects;
  featureFlags: {
    global: FeatureFlags;
    en: FeatureFlags;
    ca: FeatureFlags;
  };
  menuPosition: 'left' | 'right' | 'top' | 'bottom';
  api: {
    baseUrl: string;
  };
  buttonVariants: {
    primary: string;
    secondary: string;
  };
}
