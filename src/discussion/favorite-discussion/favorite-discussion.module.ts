import { Module } from '@nestjs/common';
import { FavoriteDiscussionService } from './favorite-discussion.service';
import { FavoriteDiscussionController } from './favorite-discussion.controller';

@Module({
  providers: [FavoriteDiscussionService],
  controllers: [FavoriteDiscussionController]
})
export class FavoriteDiscussionModule {}
