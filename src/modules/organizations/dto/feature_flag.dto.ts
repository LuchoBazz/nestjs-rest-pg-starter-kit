import { Field, InputType, InterfaceType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { FeatureFlagObject } from '../../../entities/organizations/feature_flag.entity';

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class PaginationInput {
  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  page?: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  limit?: number;
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class OrderByInput {
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true, defaultValue: '' })
  sortField: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: true })
  asc: boolean;
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class FeatureFlagsInput {
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  clientId: string;

  @Field({ nullable: true })
  orderBy: OrderByInput;

  @Field({ nullable: true })
  pagination: PaginationInput;
}

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
export class PageInfoResponse {
  @Field()
  hasNextPage: boolean;
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
