import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

interface CreateProjectInput {
  name: string;
  url: string;
}

interface Project {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => apiClient.get<Project[]>("/projects"),
    enabled: false,
  });
}

export function useCreateProject() {
  return useMutation({
    mutationFn: (data: CreateProjectInput) =>
      apiClient.post<Project>("/projects", data),
  });
}
