import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { getPaginationParams, createPaginatedResult } from '../common/utils/pagination';
import { OwnershipService } from '../common/guards/ownership.guard';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ownership: OwnershipService,
  ) {}

  async create(dto: CreateProjectDto, userId: string) {
    await this.ownership.verifyTeamMembership(userId, dto.teamId);

    return this.prisma.project.create({
      data: {
        name: dto.name,
        domain: dto.domain,
        teamId: dto.teamId,
      },
    });
  }

  async findAll(teamId: string, userId: string, page?: number, limit?: number) {
    await this.ownership.verifyTeamMembership(userId, teamId);

    const { skip, page: p, limit: l } = getPaginationParams({ page, limit });

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where: { teamId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: l,
      }),
      this.prisma.project.count({ where: { teamId } }),
    ]);

    return createPaginatedResult(projects, total, p, l);
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.ownership.verifyTeamMembership(userId, project.teamId);

    return project;
  }

  async update(id: string, dto: UpdateProjectDto, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.ownership.verifyTeamMembership(userId, project.teamId);

    return this.prisma.project.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.domain && { domain: dto.domain }),
        ...(dto.status && { status: dto.status as 'ACTIVE' | 'PAUSED' | 'ARCHIVED' }),
      },
    });
  }

  async remove(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.ownership.verifyTeamMembership(userId, project.teamId);

    await this.prisma.project.delete({ where: { id } });
    return { deleted: true };
  }
}
