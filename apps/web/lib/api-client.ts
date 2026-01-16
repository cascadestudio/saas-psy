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
 * Patients API methods
 */
export const patientsApi = {
  getAll: async () => {
    return apiRequest<{ patients: Patient[] }>("/patients");
  },

  getById: async (id: string) => {
    return apiRequest<{ patient: Patient }>(`/patients/${id}`);
  },

  create: async (data: CreatePatientDto) => {
    return apiRequest<{ patient: Patient }>("/patients", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: UpdatePatientDto) => {
    return apiRequest<{ patient: Patient }>(`/patients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest<{ success: boolean }>(`/patients/${id}`, {
      method: "DELETE",
    });
  },

  search: async (query: string) => {
    return apiRequest<{ patients: Patient[] }>(`/patients/search?q=${encodeURIComponent(query)}`);
  },
};

/**
 * Sessions API methods
 */
export const sessionsApi = {
  getAll: async () => {
    return apiRequest<{ sessions: Session[] }>("/sessions");
  },

  getById: async (id: string) => {
    return apiRequest<{ session: Session }>(`/sessions/${id}`);
  },

  getByPatientId: async (patientId: string) => {
    return apiRequest<{ sessions: Session[] }>(`/sessions/patient/${patientId}`);
  },

  getRecent: async (limit: number = 10) => {
    return apiRequest<{ sessions: Session[] }>(`/sessions/recent?limit=${limit}`);
  },

  create: async (data: CreateSessionDto) => {
    return apiRequest<{ session: Session }>("/sessions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateStatus: async (id: string, status: string) => {
    return apiRequest<{ session: Session }>(`/sessions/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  submit: async (id: string, responses: Record<string, number>) => {
    return apiRequest<{ session: Session; score: number; interpretation: string }>(
      `/sessions/${id}/submit`,
      {
        method: "POST",
        body: JSON.stringify({ responses }),
      }
    );
  },

  getStats: async () => {
    return apiRequest<SessionStats>("/sessions/stats");
  },
};

/**
 * Questionnaires API methods
 */
export const questionnairesApi = {
  getAll: async () => {
    return apiRequest<{ questionnaires: Questionnaire[] }>("/questionnaires");
  },

  getById: async (id: string) => {
    return apiRequest<{ questionnaire: Questionnaire }>(`/questionnaires/${id}`);
  },

  getByCategory: async (category: string) => {
    return apiRequest<{ questionnaires: Questionnaire[] }>(`/questionnaires/category/${category}`);
  },
};

/**
 * Types
 */
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientDto {
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: string;
  notes?: string;
}

export interface UpdatePatientDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: string;
  notes?: string;
}

export interface Session {
  id: string;
  patientId: string;
  questionnaireId: string;
  status: "created" | "sent" | "started" | "completed" | "expired" | "cancelled";
  score?: number;
  interpretation?: string;
  responses?: Record<string, number>;
  sentAt?: string;
  startedAt?: string;
  completedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  patient?: Patient;
  questionnaire?: Questionnaire;
}

export interface CreateSessionDto {
  patientId: string;
  questionnaireIds: string[];
  message?: string;
}

export interface SessionStats {
  total: number;
  completed: number;
  inProgress: number;
  sent: number;
  expired: number;
}

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  estimatedTime: number;
  questionsCount: number;
  isPublished: boolean;
}

/**
 * Generic export
 */
export const api = {
  auth: authApi,
  profiles: profilesApi,
  favorites: favoritesApi,
  patients: patientsApi,
  sessions: sessionsApi,
  questionnaires: questionnairesApi,
};

export default api;
