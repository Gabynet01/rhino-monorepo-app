import { http, HttpResponse, delay, DefaultBodyType } from 'msw';
import {
  Game,
  GameReview,
  LoginCredentials,
  RegistrationData,
  User,
} from '@rhino-portal/types';

// Sample mock data
const mockGames: Game[] = [
  {
    id: '1',
    title: 'Cosmic Adventure',
    description: 'Explore the universe in this exciting space adventure game',
    thumbnailUrl: '/assets/games/cosmic-adventure-thumb.jpg',
    coverImageUrl: '/assets/games/cosmic-adventure-cover.jpg',
    genres: ['action', 'adventure'],
    rating: 4.8,
    releaseDate: '2024-01-15',
    developer: 'Stellar Studios',
    publisher: 'Galactic Games',
    platforms: ['pc', 'console'],
    minSystemRequirements: {
      os: 'Windows 10 / macOS 11',
      processor: 'Intel i5-6600 / AMD Ryzen 5 1600',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GTX 1060 / AMD RX 580',
      storage: '20 GB available space',
    },
    isFeatured: true,
    isNewRelease: true,
    isPopular: true,
  },
  {
    id: '2',
    title: 'Fantasy Kingdom',
    description: 'Build your own fantasy kingdom and defend it from invaders',
    thumbnailUrl: '/assets/games/fantasy-kingdom-thumb.jpg',
    coverImageUrl: '/assets/games/fantasy-kingdom-cover.jpg',
    genres: ['strategy', 'simulation'],
    rating: 4.5,
    releaseDate: '2023-09-20',
    developer: 'Epic Realms',
    publisher: 'Kingdom Games',
    platforms: ['pc', 'browser'],
    minSystemRequirements: {
      os: 'Windows 8.1 / macOS 10.15',
      processor: 'Intel i3-8100 / AMD Ryzen 3 3200G',
      memory: '4 GB RAM',
      graphics: 'NVIDIA GTX 750 / AMD R7 360',
      storage: '15 GB available space',
    },
    isFeatured: false,
    isNewRelease: false,
    isPopular: true,
  },
  {
    id: '3',
    title: 'Speed Racers',
    description: 'Feel the adrenaline in this high-octane racing game',
    thumbnailUrl: '/assets/games/speed-racers-thumb.jpg',
    coverImageUrl: '/assets/games/speed-racers-cover.jpg',
    genres: ['racing', 'sports'],
    rating: 4.2,
    releaseDate: '2024-03-10',
    developer: 'Turbo Games',
    publisher: 'Fast Lane Entertainment',
    platforms: ['pc', 'console', 'mobile'],
    minSystemRequirements: {
      os: 'Windows 10 / macOS 11',
      processor: 'Intel i5-8400 / AMD Ryzen 5 2600',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GTX 1050 Ti / AMD RX 570',
      storage: '25 GB available space',
    },
    isFeatured: true,
    isNewRelease: true,
    isPopular: false,
  },
  {
    id: '4',
    title: 'Puzzle Master',
    description: 'Challenge your mind with intricate puzzles and brain teasers',
    thumbnailUrl: '/assets/games/puzzle-master-thumb.jpg',
    coverImageUrl: '/assets/games/puzzle-master-cover.jpg',
    genres: ['puzzle', 'casual'],
    rating: 4.6,
    releaseDate: '2023-11-05',
    developer: 'Mind Games Studio',
    publisher: 'Puzzle Works',
    platforms: ['pc', 'browser', 'mobile'],
    isFeatured: false,
    isNewRelease: false,
    isPopular: true,
  },
];

const mockReviews: GameReview[] = [
  {
    id: '101',
    gameId: '1',
    userId: '201',
    username: 'SpaceExplorer',
    rating: 5,
    comment: 'Absolutely stunning game! The visuals are breathtaking.',
    createdAt: '2024-02-10T14:30:00Z',
  },
  {
    id: '102',
    gameId: '1',
    userId: '202',
    username: 'GamerPro',
    rating: 4,
    comment: 'Great gameplay but some minor bugs need fixing.',
    createdAt: '2024-02-15T09:45:00Z',
  },
  {
    id: '103',
    gameId: '2',
    userId: '203',
    username: 'StrategyKing',
    rating: 5,
    comment: "Best strategy game I've played this year!",
    createdAt: '2023-10-05T18:20:00Z',
  },
];

const mockUsers: User[] = [
  {
    id: '201',
    username: 'SpaceExplorer',
    email: 'space@example.com',
    avatarUrl: '/assets/avatars/avatar1.png',
    firstName: 'Alex',
    lastName: 'Johnson',
    createdAt: '2023-08-15T10:30:00Z',
    lastLogin: '2024-04-28T09:15:00Z',
    favoriteGames: ['1', '3'],
    preferences: {
      notifications: {
        email: true,
        push: true,
      },
      gameplay: {
        autoSave: true,
        quality: 'high',
      },
    },
  },
  {
    id: '202',
    username: 'GamerPro',
    email: 'gamer@example.com',
    avatarUrl: '/assets/avatars/avatar2.png',
    firstName: 'Sam',
    lastName: 'Wilson',
    createdAt: '2023-09-20T14:45:00Z',
    lastLogin: '2024-04-29T16:30:00Z',
    favoriteGames: ['2', '4'],
    preferences: {
      notifications: {
        email: false,
        push: true,
      },
      gameplay: {
        autoSave: true,
        quality: 'ultra',
      },
    },
  },
];

// API handlers
export const handlers = [
  http.get('*', async ({ request }) => {
    console.log('Received request to:', request.url);
    return HttpResponse.json(null, { status: 404 });
  }),
  // Game endpoints
  http.get('*/api/games', async () => {
    console.log('here');
    await delay();
    return HttpResponse.json(mockGames);
  }),

  http.get('/api/games/featured', async () => {
    await delay();
    return HttpResponse.json(mockGames.filter((game) => game.isFeatured));
  }),

  http.get('/api/games/popular', async () => {
    await delay();
    return HttpResponse.json(mockGames.filter((game) => game.isPopular));
  }),

  http.get('/api/games/new', async () => {
    await delay();
    return HttpResponse.json(mockGames.filter((game) => game.isNewRelease));
  }),

  http.get('/api/games/:id', async ({ params }) => {
    await delay();
    const { id } = params;
    const game = mockGames.find((g) => g.id === id);

    if (!game) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Game not found',
      });
    }

    return HttpResponse.json(game);
  }),

  // Reviews endpoints
  http.get('/api/games/:id/reviews', async ({ params }) => {
    await delay();
    const { id } = params;
    const gameReviews = mockReviews.filter((review) => review.gameId === id);

    return HttpResponse.json(gameReviews);
  }),

  http.post('/api/games/:id/reviews', async ({ params, request }) => {
    await delay();
    const { id } = params;
    const data = await request.json();

    if (!data) {
      return HttpResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const body = data as GameReview;
    const newReview: GameReview = {
      id: `rev-${Date.now()}`,
      gameId: id as string,
      userId: body.userId || '201',
      username: body.username || 'Anonymous',
      rating: body.rating,
      comment: body.comment,
      createdAt: new Date().toISOString(),
    };

    return HttpResponse.json(newReview, { status: 201 });
  }),

  // User endpoints
  http.get('/api/users/me', async ({ request }) => {
    await delay();
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, {
        status: 401,
        statusText: 'Unauthorized',
      });
    }

    return HttpResponse.json(mockUsers[0]);
  }),

  http.post('/api/auth/login', async ({ request }) => {
    await delay();
    const body = (await request.json()) as LoginCredentials;

    if (!body.email || !body.email.includes('@') || !body.password) {
      return new HttpResponse(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    return HttpResponse.json({
      token: 'mock-jwt-token',
      user: mockUsers[0],
    });
  }),

  http.post('/api/auth/register', async ({ request }) => {
    await delay();
    const body = (await request.json()) as RegistrationData;

    if (
      !body.email ||
      !body.email.includes('@') ||
      !body.password ||
      !body.username
    ) {
      return new HttpResponse(
        JSON.stringify({ error: 'Invalid registration data' }),
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        message: 'Registration successful',
        token: 'mock-jwt-token',
        user: {
          id: `user-${Date.now()}`,
          username: body.username,
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          createdAt: new Date().toISOString(),
          favoriteGames: [],
          preferences: {
            notifications: {
              email: true,
              push: true,
            },
            gameplay: {
              autoSave: true,
              quality: 'high',
            },
          },
        },
      },
      { status: 201 }
    );
  }),
];
