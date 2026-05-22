import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ description: 'The message to send' })
  @IsString()
  message: string;

  @ApiProperty({ description: 'Conversation ID for context', required: false })
  @IsString()
  @IsOptional()
  conversationId?: string;

  @ApiProperty({ description: 'Project ID for context', required: false })
  @IsString()
  @IsOptional()
  projectId?: string;
}
