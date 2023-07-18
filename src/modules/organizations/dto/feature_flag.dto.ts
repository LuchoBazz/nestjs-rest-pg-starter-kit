import { Field, InputType, InterfaceType, ObjectType, PartialType, registerEnumType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PageInfoResponse, PaginationInput } from '../../../common/dto';
import { FeatureFlagObject, FeatureFlagType } from '../../../entities/organizations';

export enum OrderByFeatureFlag {
  ID = 'ID',
  CREATED_AT = 'CREATED_AT',
}

registerEnumType(OrderByFeatureFlag, { name: 'OrderByFeatureFlag' });
registerEnumType(FeatureFlagType, { name: 'FeatureFlagType' });

@InputType()
@InterfaceType()
export class FeatureFlagInput {
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

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class CreateFeatureFlagInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  key: string;

  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  value: string | null;

  @IsEnum(FeatureFlagType)
  @Field(() => FeatureFlagType)
  type: FeatureFlagType;

  @IsBoolean()
  @Field()
  is_experimental: boolean;
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class UpdateFeatureFlagInput extends PartialType(CreateFeatureFlagInput) {
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  value: string | null;
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
