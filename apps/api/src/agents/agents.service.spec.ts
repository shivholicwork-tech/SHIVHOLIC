import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AgentType } from '@ai-seo/shared';
import { AgentsService } from './agents.service';
import { AgentRegistry } from './agent-registry';
import { PrismaService } from '../prisma/prisma.service';
import { BaseAgent, AgentExecutionContext } from './base-agent';

class MockAgent extends BaseAgent<{ input: string }, { output: string }> {
  constructor() {
    super(AgentType.TECHNICAL_AUDITOR, 'Mock Agent');
  }

  validate(input: { input: string }): void {
    if (!input.input) throw new Error('input required');
  }

  async execute(): Promise<{ output: string }> {
    return { output: 'mock-result' };
  }
}

describe('AgentsService', () => {
  let service: AgentsService;
  let registry: AgentRegistry;
  let prisma: { aiTask: { update: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      aiTask: {
        update: jest.fn().mockResolvedValue({}),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentsService,
        AgentRegistry,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<AgentsService>(AgentsService);
    registry = module.get<AgentRegistry>(AgentRegistry);
  });

  describe('AgentRegistry', () => {
    it('should register and retrieve agents', () => {
      const agent = new MockAgent();
      registry.register(agent);

      expect(registry.has(AgentType.TECHNICAL_AUDITOR)).toBe(true);
      expect(registry.get(AgentType.TECHNICAL_AUDITOR)).toBe(agent);
    });

    it('should return undefined for unregistered agents', () => {
      expect(registry.get(AgentType.KEYWORD_RESEARCHER)).toBeUndefined();
      expect(registry.has(AgentType.KEYWORD_RESEARCHER)).toBe(false);
    });
  });

  describe('runSingleAgent', () => {
    const context: AgentExecutionContext = {
      projectId: 'project-1',
      userId: 'user-1',
      taskId: 'task-1',
    };

    it('should execute a registered agent', async () => {
      const agent = new MockAgent();
      registry.register(agent);

      const result = await service.runSingleAgent(
        AgentType.TECHNICAL_AUDITOR,
        { input: 'test' },
        context,
      );

      expect(result).toEqual({ output: 'mock-result' });
      expect(prisma.aiTask.update).toHaveBeenCalledWith({
        where: { id: 'task-1' },
        data: expect.objectContaining({ status: 'RUNNING' }),
      });
      expect(prisma.aiTask.update).toHaveBeenCalledWith({
        where: { id: 'task-1' },
        data: expect.objectContaining({ status: 'COMPLETED' }),
      });
    });

    it('should throw NotFoundException for unregistered agent', async () => {
      await expect(
        service.runSingleAgent(AgentType.KEYWORD_RESEARCHER, {}, context),
      ).rejects.toThrow(NotFoundException);
    });

    it('should mark task as FAILED on error', async () => {
      const agent = new MockAgent();
      registry.register(agent);

      await expect(
        service.runSingleAgent(
          AgentType.TECHNICAL_AUDITOR,
          { input: '' }, // Will fail validation
          context,
        ),
      ).rejects.toThrow('input required');

      expect(prisma.aiTask.update).toHaveBeenCalledWith({
        where: { id: 'task-1' },
        data: expect.objectContaining({ status: 'FAILED' }),
      });
    });
  });

  describe('runAgentChain', () => {
    const context: AgentExecutionContext = {
      projectId: 'project-1',
      userId: 'user-1',
      taskId: 'task-1',
    };

    it('should run a chain of agents sequentially', async () => {
      const agent = new MockAgent();
      registry.register(agent);

      const steps = [
        {
          agentType: AgentType.TECHNICAL_AUDITOR,
          inputTransform: () => ({ input: 'step1' }),
        },
        {
          agentType: AgentType.TECHNICAL_AUDITOR,
          inputTransform: () => ({ input: 'step2' }),
        },
      ];

      const result = await service.runAgentChain(steps, {}, context);
      expect(result).toEqual({ output: 'mock-result' });
    });
  });
});
