import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class UpdateUser extends PartialType(CreateUser) {
  @IsBoolean()
  @Field()
  notifications: boolean;
}
