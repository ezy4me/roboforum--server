import {
  Controller,
  Post,
  Get,
  UploadedFiles,
  UseInterceptors,
  Param,
  Body,
  ParseIntPipe,
  ClassSerializerInterceptor,
  Delete,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Project } from '@prisma/client';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  async getUserProjects(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Project[]> {
    const projects = await this.projectService.getUserProjects(userId);
    return projects;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseInterceptors(FilesInterceptor('projectFiles'))
  async createProject(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() projectDto: ProjectDto,
  ) {
    const projectAndFiles = await this.projectService.createUserProject(
      projectDto,
      files,
    );
    return projectAndFiles;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  @UseInterceptors(FilesInterceptor('projectFiles'))
  async updateProject(
    @UploadedFiles() files?: Array<Express.Multer.File>,
    @Body() projectDto?: ProjectDto,
  ) {
    const projectAndFiles = await this.projectService.createUserProject(
      projectDto,
      files,
    );
    return projectAndFiles;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':projectId')
  async deleteUserProject(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<Project> {
    const project = await this.projectService.deleteUserProject(projectId);
    return project;
  }
}
