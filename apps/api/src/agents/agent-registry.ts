import { Injectable } from '@nestjs/common';
import { AgentType } from '@ai-seo/shared';
import { BaseAgent } from './base-agent';

@Injectable()
export class AgentRegistry {
  private agents = new Map<AgentType, BaseAgent<unknown, unknown>>();

  register(agent: BaseAgent<unknown, unknown>) {
    this.agents.set(agent.type, agent);
  }

  get(type: AgentType): BaseAgent<unknown, unknown> | undefined {
    return this.agents.get(type);
  }

  getAll(): Map<AgentType, BaseAgent<unknown, unknown>> {
    return this.agents;
  }

  has(type: AgentType): boolean {
    return this.agents.has(type);
  }
}
