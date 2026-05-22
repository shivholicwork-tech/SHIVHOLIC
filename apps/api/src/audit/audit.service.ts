import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditDto } from './dto/audit.dto';
import { getPaginationParams, createPaginatedResult } from '../common/utils/pagination';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async createAudit(dto: CreateAuditDto, _userId: string) {
    // Verify project exists
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const audit = await this.prisma.audit.create({
      data: {
        projectId: dto.projectId,
        status: 'PENDING',
      },
    });

    // In production, this would dispatch to the agent task queue
    return audit;
  }

  async getAudits(projectId: string, page?: number, limit?: number) {
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

  async getAuditById(id: string) {
    const audit = await this.prisma.audit.findUnique({
      where: { id },
      include: { issues: true },
    });

    if (!audit) {
      throw new NotFoundException('Audit not found');
    }

    return audit;
  }

  async getAuditIssues(auditId: string) {
    const audit = await this.prisma.audit.findUnique({
      where: { id: auditId },
    });

    if (!audit) {
      throw new NotFoundException('Audit not found');
    }

    return this.prisma.auditIssue.findMany({
      where: { auditId },
      orderBy: { severity: 'asc' },
    });
  }
}
