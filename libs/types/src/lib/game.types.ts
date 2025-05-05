export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  coverImageUrl: string;
  genres: GameGenre[];
  rating: number;
  releaseDate: string;
  developer: string;
  publisher: string;
  platforms: GamePlatform[];
  minSystemRequirements?: SystemRequirements;
  isFeatured: boolean;
  isNewRelease: boolean;
  isPopular: boolean;
}

export type GameGenre = 
  | 'action' 
  | 'adventure' 
  | 'rpg' 
  | 'strategy' 
  | 'simulation' 
  | 'sports' 
  | 'racing' 
  | 'puzzle' 
  | 'shooter' 
  | 'casual';

export type GamePlatform = 
  | 'pc' 
  | 'browser' 
  | 'mobile' 
  | 'console';

export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface GameReview {
  id: string;
  gameId: Game['id'];
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface GameFilterOptions {
  genres?: GameGenre[];
  platforms?: GamePlatform[];
  minRating?: number;
  searchQuery?: string;
  sortBy?: 'rating' | 'releaseDate' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface GameState {
  games: Game[];
  featuredGames: Game[];
  popularGames: Game[];
  newReleases: Game[];
  isLoading: boolean;
  error: string | null;
  filterOptions: GameFilterOptions;
}
