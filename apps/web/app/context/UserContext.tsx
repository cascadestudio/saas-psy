"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authApi, ApiError } from "@/lib/api-client";
import { useRouter } from "next/navigation";

export type User = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role?: string;
  isPremium?: boolean;
  profile?: {
    id?: string;
    favoriteScales: string[];
  };
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      // Check if we have a token
      if (!authApi.isAuthenticated()) {
        setUser(null);
        return;
      }

      // Fetch current user from API
      const { user: currentUser } = await authApi.getMe();
      setUser(currentUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      // If token is invalid, clear it
      authApi.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { user: loggedInUser } = await authApi.login(email, password);
      setUser(loggedInUser);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof ApiError) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Une erreur est survenue" };
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, refreshUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
