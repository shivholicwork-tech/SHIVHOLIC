import { Logger } from '@nestjs/common';
import { AgentType } from '@ai-seo/shared';

export interface AgentExecutionContext {
  projectId: string;
  userId: string;
  taskId: string;
}

export abstract class BaseAgent<TInput, TOutput> {
  protected readonly logger: Logger;

  constructor(
    public readonly type: AgentType,
    public readonly name: string,
  ) {
    this.logger = new Logger(`Agent:${name}`);
  }

  async run(input: TInput, context: AgentExecutionContext): Promise<TOutput> {
    this.logger.log(`Starting execution for task ${context.taskId}`);

    this.validate(input);
    const result = await this.execute(input, context);
    const formatted = this.formatOutput(result);

    this.logger.log(`Completed execution for task ${context.taskId}`);
    return formatted;
  }

  abstract validate(input: TInput): void;
  abstract execute(input: TInput, context: AgentExecutionContext): Promise<TOutput>;

  formatOutput(output: TOutput): TOutput {
    return output;
  }
}
