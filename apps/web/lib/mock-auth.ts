/**
 * Mock Authentication System for Demo Prototype
 * Replaces NextAuth/Supabase for demo purposes
 */

export interface DemoUser {
  id: string;
  email: string;
  fullName: string;
  profile: {
    favoriteQuestionnaires: string[];
  };
}

export const DEMO_USER: DemoUser = {
  id: "demo-user-1",
  email: "demo@psychologue.fr",
  fullName: "Dr. Sophie Martin",
  profile: {
    favoriteQuestionnaires: [
      "inventaire-de-depression-de-beck",
      "stai-anxiete-generalisee",
    ],
  },
};

const DEMO_CREDENTIALS = {
  email: "demo@psychologue.fr",
  password: "demo2025",
};

const USER_STORAGE_KEY = "saas-psy-demo-user";

/**
 * Mock login function
 */
export function mockLogin(
  email: string,
  password: string
): { success: boolean; user?: DemoUser; error?: string } {
  if (
    email === DEMO_CREDENTIALS.email &&
    password === DEMO_CREDENTIALS.password
  ) {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(DEMO_USER));
    }
    return { success: true, user: DEMO_USER };
  }
  return { success: false, error: "Email ou mot de passe incorrect" };
}

/**
 * Mock logout function
 */
export function mockLogout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): DemoUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as DemoUser;
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Update user favorites
 */
export function updateUserFavorites(
  questionnaireIds: string[]
): DemoUser | null {
  const user = getCurrentUser();
  if (!user) return null;

  const updatedUser: DemoUser = {
    ...user,
    profile: {
      ...user.profile,
      favoriteQuestionnaires: questionnaireIds,
    },
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
  }

  return updatedUser;
}
