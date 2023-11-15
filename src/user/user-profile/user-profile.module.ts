import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [UserProfileService, DatabaseService],
  controllers: [UserProfileController],
  exports: [UserProfileService],
})
export class UserProfileModule {}
