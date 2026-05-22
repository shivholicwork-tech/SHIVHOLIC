import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AgentRegistry } from './agent-registry';
import { AgentsService } from './agents.service';
import { AgentTaskProcessor } from './agent-task.processor';
import { SeoAuditAgent } from './services/seo-audit.agent';
import { KeywordResearchAgent } from './services/keyword-research.agent';
import { ContentWriterAgent } from './services/content-writer.agent';
import { AiChatAgent } from './services/ai-chat.agent';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'agent-tasks',
    }),
  ],
  providers: [
    AgentRegistry,
    AgentsService,
    AgentTaskProcessor,
    SeoAuditAgent,
    KeywordResearchAgent,
    ContentWriterAgent,
    AiChatAgent,
  ],
  exports: [AgentsService, AgentRegistry],
})
export class AgentsModule {}
