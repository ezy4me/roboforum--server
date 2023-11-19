import { Controller } from '@nestjs/common';
import { ProjectCommentService } from './project-comment.service';

@Controller('project/comment')
export class ProjectCommentController {
  constructor(private readonly projectCommentService: ProjectCommentService) {}
}
