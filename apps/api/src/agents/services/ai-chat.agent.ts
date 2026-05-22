import { Injectable } from '@nestjs/common';
import { AgentType } from '@ai-seo/shared';
import { BaseAgent, AgentExecutionContext } from '../base-agent';

export interface AiChatInput {
  message: string;
  conversationHistory?: Array<{ role: string; content: string }>;
  intent?: string;
}

export interface AiChatOutput {
  response: string;
  suggestedActions?: Array<{ type: string; label: string; payload: unknown }>;
  intent: string;
}

@Injectable()
export class AiChatAgent extends BaseAgent<AiChatInput, AiChatOutput> {
  constructor() {
    super(AgentType.CONTENT_PLANNER, 'AI Chat Agent');
  }

  validate(input: AiChatInput): void {
    if (!input.message || input.message.trim().length === 0) {
      throw new Error('Message is required');
    }
  }

  async execute(
    input: AiChatInput,
    _context: AgentExecutionContext,
  ): Promise<AiChatOutput> {
    // Mock AI call - will be replaced with actual OpenAI integration
    this.logger.log(`Processing chat message: ${input.message.substring(0, 50)}`);

    return {
      response: `I can help you with SEO optimization. You asked: "${input.message}". Here are some suggestions based on your query.`,
      suggestedActions: [
        {
          type: 'run_audit',
          label: 'Run SEO Audit',
          payload: {},
        },
        {
          type: 'keyword_research',
          label: 'Start Keyword Research',
          payload: {},
        },
      ],
      intent: input.intent || 'general',
    };
  }
}
