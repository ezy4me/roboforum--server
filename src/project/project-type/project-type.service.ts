import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { ProjectType } from '@prisma/client';

@Injectable()
export class ProjectTypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getProjectType(projectId: number): Promise<ProjectType> {
    const project = await this.databaseService.project.findUnique({
      where: { id: projectId },
    });

    console.log(project);

    return this.databaseService.projectType.findUnique({
      where: { id: project.projectTypeId },
    });
  }
}
