import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateContentDto, OptimizeContentDto, UpdateContentDto } from './dto/content.dto';
import { getPaginationParams, createPaginatedResult } from '../common/utils/pagination';
import { OwnershipService } from '../common/guards/ownership.guard';

@Injectable()
export class ContentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ownership: OwnershipService,
  ) {}

  async generate(dto: GenerateContentDto, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.ownership.verifyTeamMembership(userId, project.teamId);

    const content = await this.prisma.content.create({
      data: {
        projectId: dto.projectId,
        title: `Draft: ${dto.targetKeyword}`,
        body: '',
        status: 'GENERATING',
      },
    });

    return {
      id: content.id,
      status: 'generating',
      message: 'Content generation has been started',
    };
  }

  async optimize(dto: OptimizeContentDto, userId: string) {
    const content = await this.prisma.content.findUnique({
      where: { id: dto.contentId },
      include: { project: { select: { teamId: true } } },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    await this.ownership.verifyTeamMembership(userId, content.project.teamId);

    return {
      contentId: dto.contentId,
      status: 'processing',
      message: 'Content optimization has been queued',
    };
  }

  async findOne(id: string, userId: string) {
    const content = await this.prisma.content.findUnique({
      where: { id },
      include: { keywords: true, project: { select: { teamId: true } } },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    await this.ownership.verifyTeamMembership(userId, content.project.teamId);

    return content;
  }

  async update(id: string, dto: UpdateContentDto, userId: string) {
    const content = await this.prisma.content.findUnique({
      where: { id },
      include: { project: { select: { teamId: true } } },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    await this.ownership.verifyTeamMembership(userId, content.project.teamId);

    return this.prisma.content.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.body && { body: dto.body }),
        ...(dto.status && { status: dto.status as 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED' }),
      },
    });
  }

  async findAll(projectId: string, userId: string, page?: number, limit?: number) {
    await this.ownership.verifyProjectAccess(userId, projectId);

    const { skip, page: p, limit: l } = getPaginationParams({ page, limit });

    const [contents, total] = await Promise.all([
      this.prisma.content.findMany({
        where: { projectId },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: l,
      }),
      this.prisma.content.count({ where: { projectId } }),
    ]);

    return createPaginatedResult(contents, total, p, l);
  }
}
