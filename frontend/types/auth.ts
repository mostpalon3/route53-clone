export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}
