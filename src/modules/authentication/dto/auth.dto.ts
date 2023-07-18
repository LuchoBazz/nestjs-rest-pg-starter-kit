import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

import { JwtPayload } from '../../../entities/authentication';

export interface CreateJWTOutput {
  data: JwtPayload;
  token: string;
}

@ObjectType()
export class AuthSuccessResponse {
  @IsBoolean()
  @Field()
  success: boolean;
}
