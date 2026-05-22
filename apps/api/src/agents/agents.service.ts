import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AgentType } from '@ai-seo/shared';
import { AgentRegistry } from './agent-registry';
import { AgentExecutionContext } from './base-agent';
import { PrismaService } from '../prisma/prisma.service';

export interface AgentChainStep {
  agentType: AgentType;
  inputTransform?: (previousOutput: unknown) => unknown;
}

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);

  constructor(
    private readonly registry: AgentRegistry,
    private readonly prisma: PrismaService,
  ) {}

  async runSingleAgent(
    agentType: AgentType,
    input: unknown,
    context: AgentExecutionContext,
  ): Promise<unknown> {
    const agent = this.registry.get(agentType);
    if (!agent) {
      throw new NotFoundException(`Agent ${agentType} not found`);
    }

    await this.prisma.aiTask.update({
      where: { id: context.taskId },
      data: { status: 'RUNNING', startedAt: new Date() },
    });

    try {
      const result = await agent.run(input, context);

      await this.prisma.aiTask.update({
        where: { id: context.taskId },
        data: {
          status: 'COMPLETED',
          output: result as object,
          completedAt: new Date(),
        },
      });

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      await this.prisma.aiTask.update({
        where: { id: context.taskId },
        data: {
          status: 'FAILED',
          error: errorMessage,
          completedAt: new Date(),
        },
      });

      throw error;
    }
  }

  async runAgentChain(
    steps: AgentChainStep[],
    initialInput: unknown,
    context: AgentExecutionContext,
  ): Promise<unknown> {
    this.logger.log(`Running agent chain with ${steps.length} steps`);

    let currentOutput = initialInput;

    for (const step of steps) {
      const input = step.inputTransform
        ? step.inputTransform(currentOutput)
        : currentOutput;

      currentOutput = await this.runSingleAgent(step.agentType, input, context);
    }

    return currentOutput;
  }
}
