import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(dto: SendMessageDto, userId: string) {
    const conversationId = dto.conversationId || this.generateId();

    // Store as an AiTask record for persistence
    const task = await this.prisma.aiTask.create({
      data: {
        projectId: dto.projectId || 'chat-default',
        agentType: 'CONTENT_PLANNER',
        status: 'COMPLETED',
        input: {
          conversationId,
          userId,
          message: dto.message,
          role: 'user',
        },
        output: {
          conversationId,
          response: this.routeToAgent(dto.message),
          intent: this.detectIntent(dto.message),
        },
        startedAt: new Date(),
        completedAt: new Date(),
      },
    });

    const response = this.routeToAgent(dto.message);

    return {
      conversationId,
      messageId: task.id,
      response,
      intent: this.detectIntent(dto.message),
    };
  }

  async getConversations(userId: string) {
    // Retrieve conversations grouped by conversationId from AiTask records
    const tasks = await this.prisma.aiTask.findMany({
      where: {
        agentType: 'CONTENT_PLANNER',
        input: {
          path: ['userId'],
          equals: userId,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    // Group by conversationId
    const conversationMap = new Map<string, Conversation>();
    for (const task of tasks) {
      const input = task.input as { conversationId?: string; message?: string; userId?: string } | null;
      const output = task.output as { response?: string } | null;
      const convId = input?.conversationId || task.id;

      if (!conversationMap.has(convId)) {
        conversationMap.set(convId, {
          id: convId,
          userId,
          messages: [],
          createdAt: task.createdAt,
          updatedAt: task.createdAt,
        });
      }

      const conv = conversationMap.get(convId)!;
      if (input?.message) {
        conv.messages.push({
          id: `${task.id}-user`,
          role: 'user',
          content: input.message,
          timestamp: task.createdAt,
        });
      }
      if (output?.response) {
        conv.messages.push({
          id: `${task.id}-assistant`,
          role: 'assistant',
          content: output.response,
          timestamp: task.createdAt,
        });
      }
      conv.updatedAt = task.createdAt;
    }

    return Array.from(conversationMap.values());
  }

  async getConversation(id: string, userId: string) {
    const tasks = await this.prisma.aiTask.findMany({
      where: {
        agentType: 'CONTENT_PLANNER',
        input: {
          path: ['conversationId'],
          equals: id,
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    if (tasks.length === 0) {
      return null;
    }

    // Verify ownership - check that the conversation belongs to this user
    const firstInput = tasks[0].input as { userId?: string } | null;
    if (firstInput?.userId !== userId) {
      return null;
    }

    const messages: ChatMessage[] = [];
    for (const task of tasks) {
      const input = task.input as { message?: string } | null;
      const output = task.output as { response?: string } | null;

      if (input?.message) {
        messages.push({
          id: `${task.id}-user`,
          role: 'user',
          content: input.message,
          timestamp: task.createdAt,
        });
      }
      if (output?.response) {
        messages.push({
          id: `${task.id}-assistant`,
          role: 'assistant',
          content: output.response,
          timestamp: task.createdAt,
        });
      }
    }

    return {
      id,
      userId,
      messages,
      createdAt: tasks[0].createdAt,
      updatedAt: tasks[tasks.length - 1].createdAt,
    };
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
