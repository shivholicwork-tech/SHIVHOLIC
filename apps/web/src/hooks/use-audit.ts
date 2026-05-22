import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

interface StartAuditInput {
  url: string;
  projectId?: string;
}

interface AuditResult {
  id: string;
  url: string;
  score: number;
  status: string;
  createdAt: string;
}

interface AuditIssue {
  id: string;
  title: string;
  severity: string;
  description: string;
  affectedUrl: string;
  recommendation: string;
}

export function useStartAudit() {
  return useMutation({
    mutationFn: (data: StartAuditInput) =>
      apiClient.post<AuditResult>("/audit/start", data),
  });
}

export function useAudits(projectId?: string) {
  return useQuery({
    queryKey: ["audits", projectId],
    queryFn: () =>
      apiClient.get<AuditResult[]>(
        `/audit${projectId ? `?projectId=${projectId}` : ""}`
      ),
    enabled: false, // disabled by default, uses mock data
  });
}

export function useAuditDetail(auditId: string | undefined) {
  return useQuery({
    queryKey: ["audit", auditId],
    queryFn: () => apiClient.get<AuditResult>(`/audit/${auditId}`),
    enabled: !!auditId,
  });
}

export function useAuditIssues(auditId: string | undefined) {
  return useQuery({
    queryKey: ["audit", auditId, "issues"],
    queryFn: () => apiClient.get<AuditIssue[]>(`/audit/${auditId}/issues`),
    enabled: !!auditId,
  });
}
