import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { convertToSecondsUtil } from '@common/utils';
import { genSaltSync, hashSync } from 'bcrypt';
import { UserProfileService } from './user-profile/user-profile.service';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userProfileService: UserProfileService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(2));
  }

  async save(user: Partial<User>): Promise<User> {
    const hashedPassword = this.hashPassword(user.password);
    const _user: User = await this.databaseService.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: hashedPassword,
        roleId: user.roleId,
      },
    });

    await this.userProfileService.createUserProfile(_user);

    return _user;
  }

  async findOne(email: string, isReset = false): Promise<User | null> {
    if (isReset) {
      await this.cacheManager.del(email);
    }

    const user = await this.cacheManager.get<User>(email);
    if (!user) {
      const user = await this.databaseService.user.findUnique({
        where: { email },
      });
      if (!user) {
        return null;
      }

      await this.cacheManager.set(
        email,
        user,
        convertToSecondsUtil(this.configService.get('JWT_EXP')),
      );
      return user;
    }
    return user;
  }
}
