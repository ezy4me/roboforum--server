import { IsNumber, IsString } from 'class-validator';

export class UserSocialsDto {
  @IsString()
  link: string;

  @IsNumber()
  userProfileId: number;

  @IsNumber()
  socialsTypeId: number;
}

export class CreateUserSocialsDto {
  @IsString()
  link: Array<string>;

  @IsNumber()
  socialsTypeId: Array<number>;
}
