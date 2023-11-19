import { Module } from '@nestjs/common';
import { ProjectCommentService } from './project-comment.service';
import { ProjectCommentController } from './project-comment.controller';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [ProjectCommentService, DatabaseService],
  controllers: [ProjectCommentController],
  exports: [ProjectCommentService],
})
export class ProjectCommentModule {}
