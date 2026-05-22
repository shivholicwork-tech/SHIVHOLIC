import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KeywordResearchDto } from './dto/keywords.dto';
import { OwnershipService } from '../common/guards/ownership.guard';

@Injectable()
export class KeywordsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ownership: OwnershipService,
  ) {}

  async research(dto: KeywordResearchDto, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.ownership.verifyTeamMembership(userId, project.teamId);

    return {
      projectId: dto.projectId,
      seedKeywords: dto.seedKeywords,
      status: 'processing',
      message: 'Keyword research has been queued',
    };
  }

  async getClusters(projectId: string, userId: string) {
    await this.ownership.verifyProjectAccess(userId, projectId);

    const clusters = await this.prisma.keywordCluster.findMany({
      where: { projectId },
      include: {
        keywords: true,
      },
    });

    return clusters;
  }

  async getSuggestions(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.ownership.verifyTeamMembership(userId, project.teamId);

    return {
      projectId,
      suggestions: [],
      message: 'Run keyword research first to get suggestions',
    };
  }
}
