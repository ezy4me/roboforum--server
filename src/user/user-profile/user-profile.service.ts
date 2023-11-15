import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { User, UserProfile } from '@prisma/client';
import { UpdateUserProfileDto } from '@user/dto/user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserProfile(userId: number): Promise<UserProfile> {
    return this.databaseService.userProfile.findUnique({
      where: { userId },
    });
  }

  async createUserProfile(user: User): Promise<UserProfile> {
    const userProfile = await this.databaseService.userProfile.create({
      data: {
        userId: user.id,
        name: '',
        bio: '',
        company: '',
        location: '',
      },
    });

    return userProfile;
  }

  async updateUserProfile(
    userId: number,
    dto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.databaseService.userProfile.update({
      where: { userId },
      data: dto,
    });
  }
}
