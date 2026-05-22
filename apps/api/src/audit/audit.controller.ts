import { Controller, Post, Get, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { CreateAuditDto } from './dto/audit.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser, JwtPayload } from '../common/decorators/current-user.decorator';

@ApiTags('Audits')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('audits')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post()
  @ApiOperation({ summary: 'Start a new SEO audit' })
  async create(@Body() dto: CreateAuditDto, @CurrentUser() user: JwtPayload) {
    return this.auditService.createAudit(dto, user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'List audits for a project' })
  async list(
    @Query('projectId') projectId: string,
    @Query('page') page: string | undefined,
    @Query('limit') limit: string | undefined,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.auditService.getAudits(
      projectId,
      user.sub,
      page ? parseInt(page) : undefined,
      limit ? parseInt(limit) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get audit by ID' })
  async findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.auditService.getAuditById(id, user.sub);
  }

  @Get(':id/issues')
  @ApiOperation({ summary: 'Get issues for an audit' })
  async getIssues(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.auditService.getAuditIssues(id, user.sub);
  }
}
