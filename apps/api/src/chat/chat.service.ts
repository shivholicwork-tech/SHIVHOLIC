import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/chat.dto';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ChatService {
  // In-memory store for now - would be persisted in production
  private conversations: Map<string, Conversation> = new Map();

  async sendMessage(dto: SendMessageDto, userId: string) {
    const conversationId = dto.conversationId || this.generateId();

    let conversation = this.conversations.get(conversationId);
    if (!conversation) {
      conversation = {
        id: conversationId,
        userId,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.conversations.set(conversationId, conversation);
    }

    // Add user message
    conversation.messages.push({
      id: this.generateId(),
      role: 'user',
      content: dto.message,
      timestamp: new Date(),
    });

    // Generate AI response (mock)
    const response = this.routeToAgent(dto.message);
    conversation.messages.push({
      id: this.generateId(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    });

    conversation.updatedAt = new Date();

    return {
      conversationId: conversation.id,
      response,
      intent: this.detectIntent(dto.message),
    };
  }

  async getConversations(userId: string) {
    const userConversations: Conversation[] = [];
    this.conversations.forEach((conv) => {
      if (conv.userId === userId) {
        userConversations.push(conv);
      }
    });
    return userConversations;
  }

  async getConversation(id: string) {
    return this.conversations.get(id) || null;
  }

  private routeToAgent(message: string): string {
    const intent = this.detectIntent(message);

    switch (intent) {
      case 'seo_audit':
        return 'I can help you run an SEO audit. Would you like me to start one for your project?';
      case 'keyword_research':
        return 'I can help with keyword research. What seed keywords would you like to explore?';
      case 'content_writing':
        return 'I can generate SEO-optimized content. What topic would you like to write about?';
      default:
        return 'I can help with SEO optimization. Try asking about audits, keyword research, or content writing.';
    }
  }

  private detectIntent(message: string): string {
    const lower = message.toLowerCase();
    if (lower.includes('audit') || lower.includes('technical')) return 'seo_audit';
    if (lower.includes('keyword') || lower.includes('search volume')) return 'keyword_research';
    if (lower.includes('content') || lower.includes('write') || lower.includes('article')) return 'content_writing';
    return 'general';
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}
