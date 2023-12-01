import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from '@prisma/client';
import { TagDto } from './dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAllTags(): Promise<Tag[]> {
    return this.tagService.getAllTags();
  }

  @Get(':tagId')
  async getOneTagById(
    @Param('tagId', ParseIntPipe) tagId: number,
  ): Promise<Tag | null> {
    return this.tagService.getOneTagById(tagId);
  }

  @Post()
  async createTag(@Body() tagDto: TagDto): Promise<Tag> {
    return this.tagService.createTag(tagDto);
  }

  @Put(':tagId')
  async updateTag(
    @Param('tagId', ParseIntPipe) tagId: number,
    @Body() tagDto: TagDto,
  ): Promise<Tag> {
    return this.tagService.updateTag(tagId, tagDto);
  }

  @Delete(':tagId')
  async deleteTag(
    @Param('tagId', ParseIntPipe) tagId: number,
  ): Promise<Tag | null> {
    return this.tagService.deleteTag(tagId);
  }
}
