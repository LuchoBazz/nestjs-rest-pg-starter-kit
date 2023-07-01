import { Field, InputType, InterfaceType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
@InterfaceType()
export class FeatureFlagInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  clientId: string;
}

@ObjectType()
export class FeatureFlagResponse {
  @IsBoolean()
  @Field()
  success: boolean;
}
