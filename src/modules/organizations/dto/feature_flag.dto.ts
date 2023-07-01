import { Field, InputType, InterfaceType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { PageInfoResponse } from '../../../common/dto/pagination.dto';
import { FeatureFlagObject } from '../../../entities/organizations/feature_flag.entity';

@InputType()
@InterfaceType()
export class FeatureFlagInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  key: string;
}

@ObjectType({ isAbstract: true })
export class FeatureFlagsResponse {
  @Field()
  totalCount: number;

  @Field(() => [FeatureFlagObject])
  items: FeatureFlagObject[];

  @Field()
  pageInfo: PageInfoResponse;
}

@ObjectType()
export class FeatureFlagResponse {
  @IsBoolean()
  @Field()
  success: boolean;
}
