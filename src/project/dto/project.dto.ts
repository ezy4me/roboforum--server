import { Project } from '@prisma/client';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class ProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date?: any;

  @IsNumber()
  userId: number;

  @IsNumber()
  projectTypeId: number;

  projectFiles: Array<any>;
}

export interface ProjectAndFiles {
  project: Project;
  projectFiles?: string[];
}
