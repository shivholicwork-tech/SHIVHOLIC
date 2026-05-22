import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { getPaginationParams, createPaginatedResult } from '../common/utils/pagination';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        domain: dto.domain,
        teamId: dto.teamId,
      },
    });
  }

  async findAll(teamId: string, page?: number, limit?: number) {
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

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.prisma.project.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.domain && { domain: dto.domain }),
        ...(dto.status && { status: dto.status as 'ACTIVE' | 'PAUSED' | 'ARCHIVED' }),
      },
    });
  }

  async remove(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.prisma.project.delete({ where: { id } });
    return { deleted: true };
  }
}
