import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectTypeService } from './project-type.service';
import { ProjectType } from '@prisma/client';

@Controller('project/type')
export class ProjectTypeController {
  constructor(private readonly projectTypeService: ProjectTypeService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':projectId')
  async getProjectType(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<ProjectType> {
    return this.projectTypeService.getProjectType(projectId);
  }
}
