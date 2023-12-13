import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { PageInfoResponse, PaginationInput } from '../../../common/dto';
import { FeatureFlagObject } from '../../../entities/organizations';

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

  @IsBoolean()
  value: boolean;

  @IsNumber()
  percentage: number;

  @IsBoolean()
  is_experimental: boolean;
}

export class UpdateFeatureFlagInput extends PartialType(CreateFeatureFlagInput) {
  @IsNotEmpty()
  @IsString()
  value: boolean;
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
