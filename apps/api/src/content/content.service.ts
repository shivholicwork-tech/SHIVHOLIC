import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateContentDto, OptimizeContentDto, UpdateContentDto } from './dto/content.dto';
import { getPaginationParams, createPaginatedResult } from '../common/utils/pagination';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(dto: GenerateContentDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Create content record in GENERATING status
    const content = await this.prisma.content.create({
      data: {
        projectId: dto.projectId,
        title: `Draft: ${dto.targetKeyword}`,
        body: '',
        status: 'GENERATING',
      },
    });

    // In production, dispatch to AI agent for actual generation
    return {
      id: content.id,
      status: 'generating',
      message: 'Content generation has been started',
    };
  }

  async optimize(dto: OptimizeContentDto) {
    const content = await this.prisma.content.findUnique({
      where: { id: dto.contentId },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    // In production, dispatch to content optimizer agent
    return {
      contentId: dto.contentId,
      status: 'processing',
      message: 'Content optimization has been queued',
    };
  }

  async findOne(id: string) {
    const content = await this.prisma.content.findUnique({
      where: { id },
      include: { keywords: true },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return content;
  }

  async update(id: string, dto: UpdateContentDto) {
    const content = await this.prisma.content.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return this.prisma.content.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.body && { body: dto.body }),
        ...(dto.status && { status: dto.status as 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED' }),
      },
    });
  }

  async findAll(projectId: string, page?: number, limit?: number) {
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
