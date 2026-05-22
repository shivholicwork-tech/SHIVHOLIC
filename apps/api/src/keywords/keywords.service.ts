import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KeywordResearchDto } from './dto/keywords.dto';

@Injectable()
export class KeywordsService {
  constructor(private readonly prisma: PrismaService) {}

  async research(dto: KeywordResearchDto) {
    // Verify project exists
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // In production, this dispatches to the keyword research agent
    // For now, return mock data structure
    return {
      projectId: dto.projectId,
      seedKeywords: dto.seedKeywords,
      status: 'processing',
      message: 'Keyword research has been queued',
    };
  }

  async getClusters(projectId: string) {
    const clusters = await this.prisma.keywordCluster.findMany({
      where: { projectId },
      include: {
        keywords: true,
      },
    });

    return clusters;
  }

  async getSuggestions(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // In production, this would use the AI agent to generate suggestions
    return {
      projectId,
      suggestions: [],
      message: 'Run keyword research first to get suggestions',
    };
  }
}
