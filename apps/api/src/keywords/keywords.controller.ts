import { Controller, Post, Get, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { KeywordsService } from './keywords.service';
import { KeywordResearchDto } from './dto/keywords.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('Keywords')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Post('research')
  @ApiOperation({ summary: 'Start keyword research' })
  async research(@Body() dto: KeywordResearchDto) {
    return this.keywordsService.research(dto);
  }

  @Get('clusters')
  @ApiOperation({ summary: 'Get keyword clusters for a project' })
  async getClusters(@Query('projectId') projectId: string) {
    return this.keywordsService.getClusters(projectId);
  }

  @Get('suggestions/:projectId')
  @ApiOperation({ summary: 'Get keyword suggestions for a project' })
  async getSuggestions(@Param('projectId') projectId: string) {
    return this.keywordsService.getSuggestions(projectId);
  }
}
