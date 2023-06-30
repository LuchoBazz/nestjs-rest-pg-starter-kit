import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@ObjectType()
export class AuthSucessResponse {
  @IsBoolean()
  @Field()
  success: boolean;
}
