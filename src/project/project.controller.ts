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
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  async getUserProjects(@Param('userId', ParseIntPipe) userId: number) {
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
}
