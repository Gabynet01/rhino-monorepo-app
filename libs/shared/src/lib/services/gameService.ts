'use client';

import { Game, GameReview, GameFilterOptions } from '@rhino-portal/types';
import { useBrand } from '../hooks/useBrand';

const useApiUrl = () => {
  const { brandConfig } = useBrand();
  // For development, use our mock API. In production, use the brand's API
  return process.env.NODE_ENV === 'development' ? '' : brandConfig.api.baseUrl;
};

export const useGameService = () => {
  const baseUrl = useApiUrl();

  const fetchWithBrand = async (endpoint: string, options?: RequestInit) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  return {
    getAllGames: async (): Promise<Game[]> => {
      return fetchWithBrand('/api/games');
    },

    getGameById: async (id: Game['id']): Promise<Game> => {
      return fetchWithBrand(`/api/games/${id}`);
    },

    getFeaturedGames: async (): Promise<Game[]> => {
      return fetchWithBrand('/api/games/featured');
    },

    getPopularGames: async (): Promise<Game[]> => {
      return fetchWithBrand('/api/games/popular');
    },

    getNewReleases: async (): Promise<Game[]> => {
      return fetchWithBrand('/api/games/new');
    },

    getGameReviews: async (gameId: Game['id']): Promise<GameReview[]> => {
      return fetchWithBrand(`/api/games/${gameId}/reviews`);
    },

    submitGameReview: async (
      gameId: Game['id'],
      data: Omit<GameReview, 'id' | 'gameId' | 'createdAt'>
    ): Promise<GameReview> => {
      return fetchWithBrand(`/api/games/${gameId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    },

    filterGames: async (options: GameFilterOptions): Promise<Game[]> => {
      // In a real API, you'd pass these as query parameters
      // For our mock API, we'll just fetch all and filter client-side
      const allGames = await fetchWithBrand('/api/games');

      return allGames
        .filter((game: Game) => {
          // Apply filters
          if (
            options.genres &&
            options.genres.length > 0 &&
            !options.genres.some((genre) => game.genres.includes(genre))
          ) {
            return false;
          }

          if (
            options.platforms &&
            options.platforms.length > 0 &&
            !options.platforms.some((platform) =>
              game.platforms.includes(platform)
            )
          ) {
            return false;
          }

          if (options.minRating && game.rating < options.minRating) {
            return false;
          }

          if (options.searchQuery) {
            const query = options.searchQuery.toLowerCase();
            return (
              game.title.toLowerCase().includes(query) ||
              game.description.toLowerCase().includes(query)
            );
          }

          return true;
        })
        .sort((a: Game, b: Game) => {
          // Apply sorting
          if (options.sortBy === 'title') {
            return options.sortOrder === 'asc'
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          }

          if (options.sortBy === 'rating') {
            return options.sortOrder === 'asc'
              ? a.rating - b.rating
              : b.rating - a.rating;
          }

          if (options.sortBy === 'releaseDate') {
            return options.sortOrder === 'asc'
              ? new Date(a.releaseDate).getTime() -
                  new Date(b.releaseDate).getTime()
              : new Date(b.releaseDate).getTime() -
                  new Date(a.releaseDate).getTime();
          }

          return 0;
        });
    },
  };
};
