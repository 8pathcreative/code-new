import { User, Session } from '@supabase/supabase-js';

// User-related types
export type AuthUser = User;
export type AuthSession = Session;

// Authentication state
export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
}

// Auth context types
export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { [key: string]: any }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (attributes: { [key: string]: any }) => Promise<void>;
}

// Auth store actions (for Zustand)
export interface AuthActions {
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

// Combined auth store type
export type AuthStore = AuthState & AuthActions;

// Auth provider props
export interface AuthProviderProps {
  children: React.ReactNode;
}

// Auth modal props
export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'signIn' | 'signUp' | 'resetPassword';
}

// Auth form submission data
export interface AuthCredentials {
  email: string;
  password: string;
}

// Auth response status
export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';