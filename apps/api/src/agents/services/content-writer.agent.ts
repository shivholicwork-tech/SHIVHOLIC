import { Injectable, OnModuleInit } from '@nestjs/common';
import { AgentType } from '@ai-seo/shared';
import { BaseAgent, AgentExecutionContext } from '../base-agent';
import { AgentRegistry } from '../agent-registry';

export interface ContentWriterInput {
  targetKeyword: string;
  contentBrief: string;
  tone?: string;
  wordCount?: number;
}

export interface ContentWriterOutput {
  title: string;
  content: string;
  metaDescription: string;
  headings: string[];
  wordCount: number;
  seoScore: number;
}

@Injectable()
export class ContentWriterAgent extends BaseAgent<
  ContentWriterInput,
  ContentWriterOutput
> implements OnModuleInit {
  constructor(private readonly registry: AgentRegistry) {
    super(AgentType.CONTENT_WRITER, 'Content Writer Agent');
  }

  onModuleInit() {
    this.registry.register(this);
  }

  validate(input: ContentWriterInput): void {
    if (!input.targetKeyword) {
      throw new Error('targetKeyword is required');
    }
    if (!input.contentBrief) {
      throw new Error('contentBrief is required');
    }
  }

  async execute(
    input: ContentWriterInput,
    _context: AgentExecutionContext,
  ): Promise<ContentWriterOutput> {
    this.logger.log(`Writing content for keyword: ${input.targetKeyword}`);

    const wordCount = input.wordCount || 1500;

    return {
      title: `Complete Guide to ${input.targetKeyword}`,
      content: `This is a generated article about ${input.targetKeyword}. ${input.contentBrief}`,
      metaDescription: `Learn everything about ${input.targetKeyword} in this comprehensive guide.`,
      headings: [
        `What is ${input.targetKeyword}?`,
        `Benefits of ${input.targetKeyword}`,
        `How to get started with ${input.targetKeyword}`,
        'Conclusion',
      ],
      wordCount,
      seoScore: 85,
    };
  }
}
