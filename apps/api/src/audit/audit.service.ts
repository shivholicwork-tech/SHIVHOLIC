import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditDto } from './dto/audit.dto';
import { getPaginationParams, createPaginatedResult } from '../common/utils/pagination';
import { OwnershipService } from '../common/guards/ownership.guard';

@Injectable()
export class AuditService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ownership: OwnershipService,
  ) {}

  async createAudit(dto: CreateAuditDto, userId: string) {
    // Verify project exists and user has access
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.ownership.verifyTeamMembership(userId, project.teamId);

    const audit = await this.prisma.audit.create({
      data: {
        projectId: dto.projectId,
        status: 'PENDING',
      },
    });

    return audit;
  }

  async getAudits(projectId: string, userId: string, page?: number, limit?: number) {
    await this.ownership.verifyProjectAccess(userId, projectId);

    const { skip, page: p, limit: l } = getPaginationParams({ page, limit });

    const [audits, total] = await Promise.all([
      this.prisma.audit.findMany({
        where: { projectId },
        orderBy: { startedAt: 'desc' },
        skip,
        take: l,
      }),
      this.prisma.audit.count({ where: { projectId } }),
    ]);

    return createPaginatedResult(audits, total, p, l);
  }

  async getAuditById(id: string, userId: string) {
    const audit = await this.prisma.audit.findUnique({
      where: { id },
      include: { issues: true },
    });

    if (!audit) {
      throw new NotFoundException('Audit not found');
    }

    await this.ownership.verifyProjectAccess(userId, audit.projectId);

    return audit;
  }

  async getAuditIssues(auditId: string, userId: string) {
    const audit = await this.prisma.audit.findUnique({
      where: { id: auditId },
    });

    if (!audit) {
      throw new NotFoundException('Audit not found');
    }

    await this.ownership.verifyProjectAccess(userId, audit.projectId);

    return this.prisma.auditIssue.findMany({
      where: { auditId },
      orderBy: { severity: 'asc' },
    });
  }
}
