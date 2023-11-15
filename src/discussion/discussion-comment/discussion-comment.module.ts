import { Module } from '@nestjs/common';
import { DiscussionCommentService } from './discussion-comment.service';
import { DiscussionCommentController } from './discussion-comment.controller';

@Module({
  providers: [DiscussionCommentService],
  controllers: [DiscussionCommentController]
})
export class DiscussionCommentModule {}
