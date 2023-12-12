import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PageInfoResponse, PaginationInput } from '../../../common/dto';
import { FeatureFlagObject, FeatureFlagType } from '../../../entities/organizations';

export enum OrderByFeatureFlag {
  ID = 'ID',
  CREATED_AT = 'CREATED_AT',
}

export class FeatureFlagInput {
  @IsNotEmpty()
  @IsString()
  key: string;
}

export class FeatureFlagOrderByInput {
  @IsEnum(OrderByFeatureFlag)
  sortField?: OrderByFeatureFlag;

  @IsOptional()
  @IsBoolean()
  asc?: boolean;
}

export class FeatureFlagPaginationInput {
  orderBy: FeatureFlagOrderByInput;

  pagination: PaginationInput;
}

export class CreateFeatureFlagInput {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  value: string | null;

  @IsEnum(FeatureFlagType)
  type: FeatureFlagType;

  @IsBoolean()
  is_experimental: boolean;
}

export class UpdateFeatureFlagInput extends PartialType(CreateFeatureFlagInput) {
  @IsNotEmpty()
  @IsString()
  value: string | null;
}

export class FeatureFlagsResponse {
  totalCount: number;

  items: FeatureFlagObject[];

  pageInfo: PageInfoResponse;
}

export class FeatureFlagResponse {
  @IsBoolean()
  success: boolean;
}
