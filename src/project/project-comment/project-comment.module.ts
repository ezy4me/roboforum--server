import { Module } from '@nestjs/common';
import { ProjectCommentService } from './project-comment.service';
import { ProjectCommentController } from './project-comment.controller';

@Module({
  providers: [ProjectCommentService],
  controllers: [ProjectCommentController]
})
export class ProjectCommentModule {}
