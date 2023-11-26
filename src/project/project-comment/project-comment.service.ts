import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { ProjectComment } from '@prisma/client';
import { ProjectCommentDto } from '@project/dto';

@Injectable()
export class ProjectCommentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getProjectComments(projectId: number): Promise<ProjectComment[]> {
    return this.databaseService.projectComment.findMany({
      where: { projectId },
    });
  }

  async postUserProjectComment(
    projectId: number,
    dto: ProjectCommentDto,
  ): Promise<ProjectComment> {
    return this.databaseService.projectComment.create({
      data: {
        projectId,
        userCommentId: dto.userCommentId,
      },
    });
  }
}
