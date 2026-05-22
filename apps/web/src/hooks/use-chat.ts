import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

interface SendMessageInput {
  conversationId?: string;
  message: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messages: ChatMessage[];
}

export function useSendMessage() {
  return useMutation({
    mutationFn: (data: SendMessageInput) =>
      apiClient.post<ChatMessage>("/chat/message", data),
  });
}

export function useConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => apiClient.get<Conversation[]>("/chat/conversations"),
    enabled: false,
  });
}

export function useConversation(id: string | undefined) {
  return useQuery({
    queryKey: ["conversation", id],
    queryFn: () => apiClient.get<Conversation>(`/chat/conversations/${id}`),
    enabled: !!id,
  });
}
