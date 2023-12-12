import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { AuthType } from '../../../entities/users';

export class CreateUser {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  identificationNumber: string | null;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string | null;

  @IsBoolean()
  terms: boolean;

  @IsBoolean()
  notifications: boolean;

  @IsEnum(AuthType)
  authType: AuthType;
}

export class UpdateUser extends PartialType(CreateUser) {
  @IsBoolean()
  notifications: boolean;
}
