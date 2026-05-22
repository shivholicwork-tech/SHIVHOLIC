import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser, JwtPayload } from '../common/decorators/current-user.decorator';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  async create(@Body() dto: CreateProjectDto, @CurrentUser() user: JwtPayload) {
    return this.projectsService.create(dto, user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'List all projects for a team' })
  async findAll(
    @Query('teamId') teamId: string,
    @Query('page') page: string | undefined,
    @Query('limit') limit: string | undefined,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.projectsService.findAll(
      teamId,
      user.sub,
      page ? parseInt(page) : undefined,
      limit ? parseInt(limit) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  async findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.projectsService.findOne(id, user.sub);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project' })
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto, @CurrentUser() user: JwtPayload) {
    return this.projectsService.update(id, dto, user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  async remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.projectsService.remove(id, user.sub);
  }
}
