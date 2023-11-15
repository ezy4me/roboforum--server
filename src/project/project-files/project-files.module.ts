import { Module } from '@nestjs/common';
import { ProjectFilesService } from './project-files.service';
import { ProjectFilesController } from './project-files.controller';

@Module({
  providers: [ProjectFilesService],
  controllers: [ProjectFilesController]
})
export class ProjectFilesModule {}
