import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { AuthType } from '../../../entities/users/user.entity';

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class CreateUser {
  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: true })
  identificationNumber: string | null;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: true })
  phoneNumber: string | null;

  @IsBoolean()
  @Field()
  terms: boolean;

  @IsBoolean()
  @Field()
  notifications: boolean;

  @IsEnum(AuthType)
  @Field()
  authType: AuthType;
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class UpdateUser extends PartialType(CreateUser) {
  @IsBoolean()
  @Field()
  notifications: boolean;
}
