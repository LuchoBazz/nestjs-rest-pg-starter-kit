import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

import { AuthProvider } from '../../../entities/users.entity';

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

  @IsBoolean()
  @Field()
  terms: boolean;

  @IsBoolean()
  @Field()
  notifications: boolean;

  @IsEnum(AuthProvider)
  @Field()
  authProvider: AuthProvider;

  @IsOptional()
  @IsJSON()
  @Field(() => GraphQLJSON)
  dynamicInfo: JSON;
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class UpdateUser extends PartialType(CreateUser) {
  @IsBoolean()
  @Field()
  notifications: boolean;
}
