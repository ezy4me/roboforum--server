import { Module } from '@nestjs/common';
import { FavoriteProjectService } from './favorite-project.service';
import { FavoriteProjectController } from './favorite-project.controller';

@Module({
  providers: [FavoriteProjectService],
  controllers: [FavoriteProjectController]
})
export class FavoriteProjectModule {}
