import { Injectable, OnModuleInit } from '@nestjs/common';
import { AgentType } from '@ai-seo/shared';
import { BaseAgent, AgentExecutionContext } from '../base-agent';
import { AgentRegistry } from '../agent-registry';

export interface SeoAuditInput {
  projectId: string;
  url?: string;
}

export interface SeoAuditOutput {
  score: number;
  issues: Array<{
    type: string;
    severity: string;
    message: string;
    recommendation: string;
  }>;
  summary: string;
}

@Injectable()
export class SeoAuditAgent extends BaseAgent<SeoAuditInput, SeoAuditOutput> implements OnModuleInit {
  constructor(private readonly registry: AgentRegistry) {
    super(AgentType.TECHNICAL_AUDITOR, 'SEO Audit Agent');
  }

  onModuleInit() {
    this.registry.register(this);
  }

  validate(input: SeoAuditInput): void {
    if (!input.projectId) {
      throw new Error('projectId is required');
    }
  }

  async execute(
    input: SeoAuditInput,
    _context: AgentExecutionContext,
  ): Promise<SeoAuditOutput> {
    this.logger.log(`Running SEO audit for project ${input.projectId}`);

    return {
      score: 75,
      issues: [
        {
          type: 'meta_description',
          severity: 'MEDIUM',
          message: 'Missing meta descriptions on 5 pages',
          recommendation: 'Add unique meta descriptions to all pages',
        },
        {
          type: 'page_speed',
          severity: 'HIGH',
          message: 'Page load time exceeds 3 seconds',
          recommendation: 'Optimize images and enable caching',
        },
      ],
      summary: 'Site has moderate SEO health with room for improvement',
    };
  }
}
