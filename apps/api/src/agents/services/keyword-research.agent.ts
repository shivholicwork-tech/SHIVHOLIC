import { Injectable, OnModuleInit } from '@nestjs/common';
import { AgentType } from '@ai-seo/shared';
import { BaseAgent, AgentExecutionContext } from '../base-agent';
import { AgentRegistry } from '../agent-registry';

export interface KeywordResearchInput {
  seedKeywords: string[];
  targetMarket: string;
  language?: string;
}

export interface KeywordResearchOutput {
  keywords: Array<{
    keyword: string;
    searchVolume: number;
    difficulty: number;
    cpc: number;
    intent: string;
  }>;
  clusters: Array<{
    name: string;
    keywords: string[];
  }>;
}

@Injectable()
export class KeywordResearchAgent extends BaseAgent<
  KeywordResearchInput,
  KeywordResearchOutput
> implements OnModuleInit {
  constructor(private readonly registry: AgentRegistry) {
    super(AgentType.KEYWORD_RESEARCHER, 'Keyword Research Agent');
  }

  onModuleInit() {
    this.registry.register(this);
  }

  validate(input: KeywordResearchInput): void {
    if (!input.seedKeywords || input.seedKeywords.length === 0) {
      throw new Error('At least one seed keyword is required');
    }
    if (!input.targetMarket) {
      throw new Error('targetMarket is required');
    }
  }

  async execute(
    input: KeywordResearchInput,
    _context: AgentExecutionContext,
  ): Promise<KeywordResearchOutput> {
    this.logger.log(
      `Researching keywords for: ${input.seedKeywords.join(', ')}`,
    );

    return {
      keywords: input.seedKeywords.map((kw) => ({
        keyword: kw,
        searchVolume: Math.floor(Math.random() * 10000),
        difficulty: Math.floor(Math.random() * 100),
        cpc: parseFloat((Math.random() * 5).toFixed(2)),
        intent: 'informational',
      })),
      clusters: [
        {
          name: `${input.seedKeywords[0]} cluster`,
          keywords: input.seedKeywords,
        },
      ],
    };
  }
}
