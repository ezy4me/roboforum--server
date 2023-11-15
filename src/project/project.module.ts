import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectFilesModule } from './project-files/project-files.module';
import { ProjectCommentModule } from './project-comment/project-comment.module';
import { FavoriteProjectModule } from './favorite-project/favorite-project.module';
import { ProjectTypeModule } from './project-type/project-type.module';
import { ProjectController } from './project.controller';

@Module({
  providers: [ProjectService],
  imports: [
    ProjectFilesModule,
    ProjectCommentModule,
    FavoriteProjectModule,
    ProjectTypeModule,
  ],
  controllers: [ProjectController],
})
export class ProjectModule {}
