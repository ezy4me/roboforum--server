import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserProfileService } from '../user-profile/user-profile.service';
import { UpdateUserProfileDto } from '../dto/user-profile.dto';
import { UserProfile } from '@prisma/client';
@Controller('user/profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  async get(@Param('userId', ParseIntPipe) userId: number) {
    return this.userProfileService.getUserProfile(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.updateUserProfile(userId, dto);
  }
}
