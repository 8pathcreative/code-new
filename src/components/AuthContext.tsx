import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import axios from "axios";

// Define types for auth state and context
type User = {
  id: string;
  name: string;
  email: string;
  // Add any other user properties your app needs
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  error: string | null;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Props for the AuthProvider component
type AuthProviderProps = {
  children: ReactNode;
};

// Create the AuthProvider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on component mount
  useEffect(() => {
    async function loadUserFromLocalStorage() {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem("auth_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Failed to restore authentication state:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserFromLocalStorage();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Uncomment when API is ready
      // const response = await axios.post("/auth/login", { email, password });
      // const userData = response.data.user;
      
      // Mock successful login for now
      const mockUser = {
        id: "user_123",
        name: "Test User",
        email: email,
      };
      
      // Save user to state and localStorage
      setUser(mockUser);
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login failed:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Uncomment this section when your API is ready
      // const response = await axios.post("/auth/signup", { email, password, name });
      // const userData = response.data.user;
      
      // Mock successful signup for now
      const mockUser = {
        id: "user_" + Math.floor(Math.random() * 1000),
        name: name,
        email: email,
      };
      
      // Save user to state and localStorage
      setUser(mockUser);
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error("Signup failed:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  // Calculate authentication status
  const isAuthenticated = !!user;

  // Create the context value object
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}