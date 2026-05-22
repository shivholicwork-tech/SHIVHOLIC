import { Controller, Post, Get, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { GenerateContentDto, OptimizeContentDto, UpdateContentDto } from './dto/content.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser, JwtPayload } from '../common/decorators/current-user.decorator';

@ApiTags('Content')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate new content using AI' })
  async generate(@Body() dto: GenerateContentDto, @CurrentUser() user: JwtPayload) {
    return this.contentService.generate(dto, user.sub);
  }

  @Post('optimize')
  @ApiOperation({ summary: 'Optimize existing content' })
  async optimize(@Body() dto: OptimizeContentDto, @CurrentUser() user: JwtPayload) {
    return this.contentService.optimize(dto, user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get content by ID' })
  async findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.contentService.findOne(id, user.sub);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update content' })
  async update(@Param('id') id: string, @Body() dto: UpdateContentDto, @CurrentUser() user: JwtPayload) {
    return this.contentService.update(id, dto, user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'List content for a project' })
  async findAll(
    @Query('projectId') projectId: string,
    @Query('page') page: string | undefined,
    @Query('limit') limit: string | undefined,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.contentService.findAll(
      projectId,
      user.sub,
      page ? parseInt(page) : undefined,
      limit ? parseInt(limit) : undefined,
    );
  }
}
