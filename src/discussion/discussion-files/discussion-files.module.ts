import { Module } from '@nestjs/common';
import { DiscussionFilesService } from './discussion-files.service';
import { DiscussionFilesController } from './discussion-files.controller';

@Module({
  providers: [DiscussionFilesService],
  controllers: [DiscussionFilesController]
})
export class DiscussionFilesModule {}
