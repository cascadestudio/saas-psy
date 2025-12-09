"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCurrentUser, mockLogin, mockLogout, type DemoUser } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";

// Type compatible with both old User and new DemoUser
type User = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string;
  role?: string;
  profile?: {
    id?: string;
    favoriteQuestionnaires: string[];
  };
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateFavorites: (questionnaireIds: string[]) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        // Transform DemoUser to User format
        setUser({
          id: currentUser.id,
          email: currentUser.email,
          fullName: currentUser.fullName,
          profile: currentUser.profile,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const result = mockLogin(email, password);
    if (result.success && result.user) {
      // Transform DemoUser to User format
      setUser({
        id: result.user.id,
        email: result.user.email,
        fullName: result.user.fullName,
        profile: result.user.profile,
      });
    }
    return result;
  };

  const logout = () => {
    mockLogout();
    setUser(null);
    router.push("/sign-in");
  };

  const updateFavorites = (questionnaireIds: string[]) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        favoriteQuestionnaires: questionnaireIds,
      },
    };
    setUser(updatedUser);

    // Also update in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("melya-demo-user", JSON.stringify(updatedUser));
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, refreshUser, login, logout, updateFavorites }}>
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
