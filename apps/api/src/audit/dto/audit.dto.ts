import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuditDto {
  @ApiProperty({ description: 'Project ID to audit' })
  @IsString()
  projectId: string;

  @ApiProperty({ description: 'Optional specific URL to audit', required: false })
  @IsString()
  @IsOptional()
  url?: string;
}
