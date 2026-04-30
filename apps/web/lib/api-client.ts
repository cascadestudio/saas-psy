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

  forgotPassword: async (email: string) => {
    return apiRequest<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, newPassword: string) => {
    return apiRequest<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
    });
  },
};

/**
 * Users API methods
 */
export const usersApi = {
  getMe: async () => {
    return apiRequest<any>("/users/me");
  },

  update: async (data: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }) => {
    return apiRequest<any>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete: async () => {
    return apiRequest<{ message: string; deletedData: { patients: number; sessions: number } }>(
      "/users/me",
      { method: "DELETE" },
    );
  },
};

/**
 * Favorites API methods
 */
export const favoritesApi = {
  getFavorites: async () => {
    return apiRequest<{ favorites: string[] }>("/favorites");
  },

  toggleFavorite: async (scaleId: string) => {
    return apiRequest<{ action: "add" | "remove"; favorites: string[] }>(
      `/favorites/${scaleId}/toggle`,
      {
        method: "POST",
      }
    );
  },
};

/**
 * Patients API methods
 */
export const patientsApi = {
  getAll: async (status: 'active' | 'archived' = 'active') => {
    return apiRequest<{ patients: Patient[] }>(`/patients?status=${status}`);
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

  search: async (query: string, status: 'active' | 'archived' = 'active') => {
    return apiRequest<{ patients: Patient[] }>(`/patients/search?q=${encodeURIComponent(query)}&status=${status}`);
  },

  countActive: async () => {
    return apiRequest<{ count: number }>("/patients/count/active");
  },

  archive: async (id: string) => {
    return apiRequest<{ patient: Patient }>(`/patients/${id}/archive`, {
      method: "PATCH",
    });
  },

  restore: async (id: string) => {
    return apiRequest<{ patient: Patient }>(`/patients/${id}/restore`, {
      method: "PATCH",
    });
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
    return apiRequest<{ sessions: Session[] }>(`/sessions?patientId=${patientId}`);
  },

  getRecent: async (limit: number = 10) => {
    return apiRequest<{ sessions: Session[] }>(`/sessions/recent?limit=${limit}`);
  },

  create: async (data: CreateSessionDto) => {
    return apiRequest<{
      sessions: Session[];
      batchId: string;
      message: string;
      emailsSent: number;
      emailsFailed: number;
    }>("/sessions", {
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

  resendEmail: async (id: string) => {
    return apiRequest<{ success: boolean }>(`/sessions/${id}/resend-email`, {
      method: "POST",
    });
  },
};

/**
 * Scales API methods
 */
export const scalesApi = {
  getAll: async () => {
    return apiRequest<{ scales: Scale[] }>("/scales");
  },

  getById: async (id: string) => {
    return apiRequest<{ scale: Scale }>(`/scales/${id}`);
  },

  getByCategory: async (category: string) => {
    return apiRequest<{ scales: Scale[] }>(`/scales/category/${category}`);
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
  archivedAt?: string | null;
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
  scaleId: string;
  status: "SENT" | "STARTED" | "COMPLETED" | "EXPIRED" | "CANCELLED";
  score?: import("@melya/core").ScoreResult;
  interpretation?: string;
  patientComments?: string | null;
  responses?: Record<string, number>;
  sentAt?: string;
  lastReminderAt?: string | null;
  startedAt?: string;
  completedAt?: string;
  viewedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  patient?: Patient;
  scale?: Scale;
}

export interface CreateSessionDto {
  patientId: string;
  scaleIds: string[];
  message?: string;
}

export interface SessionStats {
  total: number;
  completed: number;
  inProgress: number;
  sent: number;
  expired: number;
}

export interface Scale {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  estimatedTime: string;
  formType?: string;
  questions: any;
  answerScales?: any;
  scoring?: any;
  isPublished: boolean;
}

/**
 * Generic export
 */
export const api = {
  auth: authApi,
  users: usersApi,
  favorites: favoritesApi,
  patients: patientsApi,
  sessions: sessionsApi,
  scales: scalesApi,
};

export default api;
