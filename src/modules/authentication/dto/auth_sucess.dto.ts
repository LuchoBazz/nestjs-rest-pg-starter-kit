import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@ObjectType()
export class AuthSuccessResponse {
  @IsBoolean()
  @Field()
  success: boolean;
}
