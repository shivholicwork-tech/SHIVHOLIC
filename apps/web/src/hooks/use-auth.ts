import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  access_token: string;
}

export function useLogin() {
  const { setUser, setToken } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginInput) =>
      apiClient.post<AuthResponse>("/auth/login", data),
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.access_token);
    },
  });
}

export function useRegister() {
  const { setUser, setToken } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterInput) =>
      apiClient.post<AuthResponse>("/auth/register", data),
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.access_token);
    },
  });
}

export function useUser() {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => apiClient.get<AuthResponse["user"]>("/auth/me"),
    enabled: !!token,
  });
}
