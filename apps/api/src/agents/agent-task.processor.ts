import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { AgentType } from '@ai-seo/shared';
import { AgentsService } from './agents.service';

export interface AgentTaskPayload {
  taskId: string;
  projectId: string;
  userId: string;
  agentType: AgentType;
  input: unknown;
}

@Processor('agent-tasks')
export class AgentTaskProcessor extends WorkerHost {
  private readonly logger = new Logger(AgentTaskProcessor.name);

  constructor(private readonly agentsService: AgentsService) {
    super();
  }

  async process(job: Job<AgentTaskPayload>): Promise<unknown> {
    const { taskId, projectId, userId, agentType, input } = job.data;

    this.logger.log(
      `Processing agent task ${taskId} with agent ${agentType}`,
    );

    const context = { taskId, projectId, userId };
    return this.agentsService.runSingleAgent(agentType, input, context);
  }
}
