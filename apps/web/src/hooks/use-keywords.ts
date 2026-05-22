import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

interface KeywordResearchInput {
  keyword: string;
  country?: string;
  language?: string;
}

interface KeywordResult {
  keyword: string;
  volume: number;
  kd: number;
  cpc: number;
  intent: string;
  trend: string;
}

interface KeywordCluster {
  name: string;
  keywords: KeywordResult[];
}

export function useKeywordResearch() {
  return useMutation({
    mutationFn: (data: KeywordResearchInput) =>
      apiClient.post<KeywordResult[]>("/keywords/research", data),
  });
}

export function useKeywordClusters(projectId?: string) {
  return useQuery({
    queryKey: ["keywords", "clusters", projectId],
    queryFn: () =>
      apiClient.get<KeywordCluster[]>(
        `/keywords/clusters${projectId ? `?projectId=${projectId}` : ""}`
      ),
    enabled: false,
  });
}

export function useKeywordSuggestions(seed?: string) {
  return useQuery({
    queryKey: ["keywords", "suggestions", seed],
    queryFn: () =>
      apiClient.get<KeywordResult[]>(`/keywords/suggestions?seed=${seed}`),
    enabled: !!seed,
  });
}
