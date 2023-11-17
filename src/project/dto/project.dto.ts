import { Project } from '@prisma/client';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class ProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: any;

  @IsNumber()
  userId: number;

  @IsNumber()
  projectTypeId: number;
}

export interface ProjectAndFiles {
  project: Project;
  projectFiles: string[];
}
