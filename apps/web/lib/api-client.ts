/**
 * API Client for communicating with NestJS backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Generic API request function
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || "Une erreur est survenue",
      response.status,
      data
    );
  }

  return data;
}

/**
 * Auth API methods
 */
export const authApi = {
  register: async (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => {
    const result = await apiRequest<{
      user: any;
      accessToken: string;
      tokenType: string;
    }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Store token
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", result.accessToken);
    }

    return result;
  },

  login: async (email: string, password: string) => {
    const result = await apiRequest<{
      user: any;
      accessToken: string;
      tokenType: string;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // Store token
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", result.accessToken);
    }

    return result;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  },

  getMe: async () => {
    return apiRequest<{ user: any }>("/auth/me");
  },

  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  },

  isAuthenticated: () => {
    return !!authApi.getToken();
  },
};

/**
 * Profiles API methods
 */
export const profilesApi = {
  getProfile: async () => {
    return apiRequest<any>("/profiles/me");
  },

  updateProfile: async (data: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }) => {
    return apiRequest<any>("/profiles/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

/**
 * Favorites API methods
 */
export const favoritesApi = {
  getFavorites: async () => {
    return apiRequest<{ favorites: string[] }>("/favorites");
  },

  toggleFavorite: async (questionnaireId: string) => {
    return apiRequest<{ success: boolean; action: "add" | "remove" }>(
      "/favorites",
      {
        method: "POST",
        body: JSON.stringify({ questionnaireId }),
      }
    );
  },
};

/**
 * Generic export
 */
export const api = {
  auth: authApi,
  profiles: profilesApi,
  favorites: favoritesApi,
};

export default api;
