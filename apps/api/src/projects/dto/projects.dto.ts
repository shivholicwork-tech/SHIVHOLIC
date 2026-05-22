import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Project domain/URL' })
  @IsString()
  domain: string;

  @ApiProperty({ description: 'Team ID' })
  @IsString()
  teamId: string;
}

export class UpdateProjectDto {
  @ApiProperty({ description: 'Project name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Project domain', required: false })
  @IsString()
  @IsOptional()
  domain?: string;

  @ApiProperty({ description: 'Project status', required: false, enum: ['ACTIVE', 'PAUSED', 'ARCHIVED'] })
  @IsString()
  @IsOptional()
  @IsEnum(['ACTIVE', 'PAUSED', 'ARCHIVED'])
  status?: string;
}
