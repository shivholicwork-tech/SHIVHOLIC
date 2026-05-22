import { Controller, Post, Get, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { KeywordsService } from './keywords.service';
import { KeywordResearchDto } from './dto/keywords.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser, JwtPayload } from '../common/decorators/current-user.decorator';

@ApiTags('Keywords')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Post('research')
  @ApiOperation({ summary: 'Start keyword research' })
  async research(@Body() dto: KeywordResearchDto, @CurrentUser() user: JwtPayload) {
    return this.keywordsService.research(dto, user.sub);
  }

  @Get('clusters')
  @ApiOperation({ summary: 'Get keyword clusters for a project' })
  async getClusters(@Query('projectId') projectId: string, @CurrentUser() user: JwtPayload) {
    return this.keywordsService.getClusters(projectId, user.sub);
  }

  @Get('suggestions/:projectId')
  @ApiOperation({ summary: 'Get keyword suggestions for a project' })
  async getSuggestions(@Param('projectId') projectId: string, @CurrentUser() user: JwtPayload) {
    return this.keywordsService.getSuggestions(projectId, user.sub);
  }
}
