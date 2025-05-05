export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  lastLogin?: string;
  favoriteGames: string[]; // Game IDs
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
  };
  gameplay: {
    autoSave: boolean;
    quality: 'low' | 'medium' | 'high' | 'ultra';
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData extends LoginCredentials {
  username: string;
  firstName?: string;
  lastName?: string;
}
