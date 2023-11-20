import { Project } from '@prisma/client';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

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

export class ProjectSearchDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: any;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  projectTypeId?: number;
}

export class ProjectCommentDto {
  @IsNumber()
  userId: number;

  @IsString()
  comment: string;
}
