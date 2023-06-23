import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateUser } from '../../users/dto/user.dto';

@InputType()
@InterfaceType()
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
