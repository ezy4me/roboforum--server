import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionFilesModule } from './discussion-files/discussion-files.module';
import { DiscussionCommentModule } from './discussion-comment/discussion-comment.module';
import { FavoriteDiscussionModule } from './favorite-discussion/favorite-discussion.module';
import { DiscussionController } from './discussion.controller';

@Module({
  providers: [DiscussionService],
  imports: [
    DiscussionFilesModule,
    DiscussionCommentModule,
    FavoriteDiscussionModule,
  ],
  controllers: [DiscussionController],
})
export class DiscussionModule {}
