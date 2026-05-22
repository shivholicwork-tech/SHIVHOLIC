import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OwnershipService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Verify that a user belongs to the team specified by teamId.
   * Throws ForbiddenException if not a member.
   */
  async verifyTeamMembership(userId: string, teamId: string): Promise<void> {
    const membership = await this.prisma.teamMember.findUnique({
      where: {
        userId_teamId: { userId, teamId },
      },
    });

    // Also check if user is the team owner
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      select: { ownerId: true },
    });

    if (!membership && team?.ownerId !== userId) {
      throw new ForbiddenException('You do not have access to this team');
    }
  }

  /**
   * Verify that a user has access to the specified project through team membership.
   * Throws ForbiddenException if not authorized.
   */
  async verifyProjectAccess(userId: string, projectId: string): Promise<void> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { teamId: true },
    });

    if (!project) {
      return; // Let the service handle the not found case
    }

    await this.verifyTeamMembership(userId, project.teamId);
  }
}
