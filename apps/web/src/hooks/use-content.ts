import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

interface GenerateContentInput {
  topic: string;
  keywords: string[];
  tone?: string;
  length?: number;
}

interface OptimizeContentInput {
  content: string;
  targetKeyword: string;
}

interface ContentItem {
  id: string;
  title: string;
  content: string;
  score: number;
  status: string;
  createdAt: string;
}

interface OptimizeResult {
  content: string;
  score: number;
  suggestions: string[];
}

export function useGenerateContent() {
  return useMutation({
    mutationFn: (data: GenerateContentInput) =>
      apiClient.post<ContentItem>("/content/generate", data),
  });
}

export function useOptimizeContent() {
  return useMutation({
    mutationFn: (data: OptimizeContentInput) =>
      apiClient.post<OptimizeResult>("/content/optimize", data),
  });
}

export function useContents() {
  return useQuery({
    queryKey: ["contents"],
    queryFn: () => apiClient.get<ContentItem[]>("/content"),
    enabled: false,
  });
}

export function useContent(id: string | undefined) {
  return useQuery({
    queryKey: ["content", id],
    queryFn: () => apiClient.get<ContentItem>(`/content/${id}`),
    enabled: !!id,
  });
}
