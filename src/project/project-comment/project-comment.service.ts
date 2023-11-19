import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectCommentService {
  constructor(private readonly databaseService: DatabaseService) {}
}
