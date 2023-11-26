import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { User, UserProfile } from '@prisma/client';
import { UpdateUserProfileDto } from '@user/dto/user-profile.dto';

import * as fs from 'fs/promises';
import * as path from 'path';

import { v4 as uuidv4 } from 'uuid';

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
        image: '',
      },
    });

    return userProfile;
  }

  async updateUserProfile(
    userId: number,
    dto: UpdateUserProfileDto,
    image: any,
  ): Promise<UserProfile> {
    console.log(image);

    const fileName = await this.saveFile(image[0]);

    return this.databaseService.userProfile.update({
      where: { userId },
      data: {
        bio: dto.bio,
        company: dto.company,
        location: dto.location,
        name: dto.name,
        image: fileName,
      },
    });
  }

  async saveFile(file: any): Promise<string> {
    const uploadDir = path.join(__dirname, '../../../uploads');
    const _uploadDir = path.join(__dirname, '../../../../src', '/uploads');

    try {
      await fs.access(uploadDir);
    } catch (error) {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const fileName = uuidv4() + path.extname(file.originalname);
    const filePath = path.join(uploadDir, fileName);

    const _filePath = path.join(_uploadDir, fileName);

    await fs.writeFile(filePath, file.buffer);
    await fs.writeFile(_filePath, file.buffer);

    return fileName;
  }
}
