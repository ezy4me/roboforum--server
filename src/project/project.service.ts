import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { ProjectAndFiles, ProjectDto } from './dto/project.dto';

import * as fs from 'fs/promises';
import * as path from 'path';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserProjects(userId: number): Promise<Project[]> {
    return this.databaseService.project.findMany({
      where: { userId },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getOneUserProject(projectId: number): Promise<Project> {
    return this.databaseService.project.findUnique({
      where: { id: projectId },
      include: {
        projectFiles: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return this.databaseService.project.findMany({
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async deleteUserProject(projectId: number): Promise<Project> {
    return this.databaseService.project.delete({
      where: { id: projectId },
    });
  }

  async createUserProject(
    dto: ProjectDto,
    files: any,
  ): Promise<ProjectAndFiles> {
    const _userId: string = dto.userId.toString();
    const _projectTypeId: string = dto.projectTypeId.toString();
    const project = await this.databaseService.project.create({
      data: {
        title: dto.title,
        description: dto.description,
        date: new Date(),
        userId: parseInt(_userId),
        projectTypeId: parseInt(_projectTypeId),
      },
    });

    let filePaths: string[] = [];

    filePaths = await Promise.all(
      files.map(async (file: any) => {
        const fileName = await this.saveFile(file);

        await this.databaseService.projectFiles.create({
          data: {
            projectId: project.id,
            file: fileName,
            name: fileName,
          },
        });

        return fileName;
      }),
    );

    return { project, projectFiles: filePaths };
  }

  async searchProjects(searchTerm: string): Promise<Project[]> {
    return this.databaseService.project.findMany({
      where: {
        title: { contains: searchTerm, mode: 'insensitive' },
      },
    });
  }
  async saveFile(file: any): Promise<string> {
    const uploadDir = path.join(__dirname, '../../../src', '/uploads');

    try {
      await fs.access(uploadDir);
    } catch (error) {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const fileName = uuidv4() + path.extname(file.originalname);
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, file.buffer);
    return fileName;
  }
}
