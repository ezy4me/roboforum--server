import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { UserSocials } from '@prisma/client';
import { CreateUserSocialsDto } from '@user/dto';

@Injectable()
export class UserSocialsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserSocials(id: number): Promise<UserSocials[]> {
    return this.databaseService.userSocials.findMany({
      where: { userProfileId: id },
      include: { socialsType: true },
    });
  }

  async createUserSocials(
    id: number,
    dto: CreateUserSocialsDto,
  ): Promise<UserSocials[]> {
    const userSocials = [];
    for (let i = 0; i < dto.link.length; i++) {
      const us: any = await this.databaseService.userSocials.create({
        data: {
          userProfileId: id,
          link: dto.link[i],
          socialsTypeId: dto.socialsTypeId[i],
        },
      });

      userSocials.push(us);
    }
    return userSocials;
  }

  async deleteUserSocialLink(
    profileId: number,
    linkId: number,
  ): Promise<UserSocials> {
    return this.databaseService.userSocials.delete({
      where: {
        userProfileId: profileId,
        id: linkId,
      },
    });
  }
}
