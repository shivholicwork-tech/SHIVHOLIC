import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateContentDto {
  @ApiProperty({ description: 'Project ID' })
  @IsString()
  projectId: string;

  @ApiProperty({ description: 'Target keyword for content' })
  @IsString()
  targetKeyword: string;

  @ApiProperty({ description: 'Content brief/instructions' })
  @IsString()
  contentBrief: string;

  @ApiProperty({ description: 'Writing tone', required: false })
  @IsString()
  @IsOptional()
  tone?: string;

  @ApiProperty({ description: 'Desired word count', required: false })
  @IsNumber()
  @IsOptional()
  wordCount?: number;
}

export class OptimizeContentDto {
  @ApiProperty({ description: 'Content ID to optimize' })
  @IsString()
  contentId: string;

  @ApiProperty({ description: 'Target keywords for optimization', type: [String] })
  @IsString({ each: true })
  targetKeywords: string[];
}

export class UpdateContentDto {
  @ApiProperty({ description: 'Content title', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Content body', required: false })
  @IsString()
  @IsOptional()
  body?: string;

  @ApiProperty({ description: 'Content status', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}
