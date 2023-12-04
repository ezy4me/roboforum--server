import { Module } from '@nestjs/common';
import { ProjectTagsService } from './project-tags.service';
import { ProjectTagsController } from './project-tags.controller';

@Module({
  providers: [ProjectTagsService],
  controllers: [ProjectTagsController]
})
export class ProjectTagsModule {}
