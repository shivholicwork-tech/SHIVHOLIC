// Typed API client with auth token injection and error handling

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export class ApiClientError extends Error {
  statusCode: number;
  error?: string;

  constructor(data: ApiError) {
    super(data.message);
    this.name = "ApiClientError";
    this.statusCode = data.statusCode;
    this.error = data.error;
  }
}

// Backend wraps responses in this envelope via TransformInterceptor
interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error: string | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("auth-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed?.state?.token || null;
    }
  } catch {
    // ignore parse errors
  }
  return null;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options?: { headers?: Record<string, string> }
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, config);

  if (!response.ok) {
    let errorData: ApiError;
    try {
      errorData = await response.json();
    } catch {
      errorData = {
        message: response.statusText || "An error occurred",
        statusCode: response.status,
      };
    }
    throw new ApiClientError(errorData);
  }

  // Handle empty responses
  const text = await response.text();
  if (!text) return {} as T;

  const parsed = JSON.parse(text);

  // Unwrap the { success, data, error } envelope from the backend
  if (parsed && typeof parsed === "object" && "success" in parsed && "data" in parsed) {
    return (parsed as ApiEnvelope<T>).data;
  }

  return parsed as T;
}

export const apiClient = {
  get: <T>(path: string, options?: { headers?: Record<string, string> }) =>
    request<T>("GET", path, undefined, options),

  post: <T>(path: string, body?: unknown, options?: { headers?: Record<string, string> }) =>
    request<T>("POST", path, body, options),

  put: <T>(path: string, body?: unknown, options?: { headers?: Record<string, string> }) =>
    request<T>("PUT", path, body, options),

  delete: <T>(path: string, options?: { headers?: Record<string, string> }) =>
    request<T>("DELETE", path, undefined, options),
};
