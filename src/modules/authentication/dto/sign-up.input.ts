import { Field, InputType, InterfaceType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateUser } from '../../users/dto/user.dto';

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class SignUpInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  accessToken: string;

  @IsNotEmpty()
  @Field()
  userInfo: CreateUser;
}

@ObjectType()
export class SignUpResponse {
  @IsNotEmpty()
  @IsString()
  @Field()
  token: string;
}
