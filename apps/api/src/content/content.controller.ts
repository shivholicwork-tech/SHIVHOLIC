import { Controller, Post, Get, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { GenerateContentDto, OptimizeContentDto, UpdateContentDto } from './dto/content.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('Content')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate new content using AI' })
  async generate(@Body() dto: GenerateContentDto) {
    return this.contentService.generate(dto);
  }

  @Post('optimize')
  @ApiOperation({ summary: 'Optimize existing content' })
  async optimize(@Body() dto: OptimizeContentDto) {
    return this.contentService.optimize(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get content by ID' })
  async findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update content' })
  async update(@Param('id') id: string, @Body() dto: UpdateContentDto) {
    return this.contentService.update(id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List content for a project' })
  async findAll(
    @Query('projectId') projectId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.contentService.findAll(
      projectId,
      page ? parseInt(page) : undefined,
      limit ? parseInt(limit) : undefined,
    );
  }
}
