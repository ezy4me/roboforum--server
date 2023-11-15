import { Module } from '@nestjs/common';
import { ProjectTypeService } from './project-type.service';
import { ProjectTypeController } from './project-type.controller';

@Module({
  providers: [ProjectTypeService],
  controllers: [ProjectTypeController]
})
export class ProjectTypeModule {}
