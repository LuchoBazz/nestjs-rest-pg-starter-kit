import { Field, InputType, InterfaceType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PageInfoResponse, PaginationInput } from '../../../common/dto/pagination.dto';
import { FeatureFlagObject } from '../../../entities/organizations/feature_flag.entity';

export enum OrderByFeatureFlag {
  ID = 'ID',
  CREATED_AT = 'CREATED_AT',
}

registerEnumType(OrderByFeatureFlag, { name: 'OrderByFeatureFlag' });

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

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class FeatureFlagOrderByInput {
  @IsEnum(OrderByFeatureFlag)
  @Field(() => OrderByFeatureFlag, { nullable: true, defaultValue: OrderByFeatureFlag.ID })
  sortField?: OrderByFeatureFlag;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: true })
  asc?: boolean;
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class FeatureFlagPaginationInput {
  @Field({ nullable: true })
  orderBy: FeatureFlagOrderByInput;

  @Field({ nullable: true })
  pagination: PaginationInput;
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
