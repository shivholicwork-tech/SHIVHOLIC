import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class KeywordResearchDto {
  @ApiProperty({ description: 'Project ID' })
  @IsString()
  projectId: string;

  @ApiProperty({ description: 'Seed keywords to research', type: [String] })
  @IsArray()
  @IsString({ each: true })
  seedKeywords: string[];

  @ApiProperty({ description: 'Target market/locale' })
  @IsString()
  targetMarket: string;

  @ApiProperty({ description: 'Language', required: false })
  @IsString()
  @IsOptional()
  language?: string;
}
