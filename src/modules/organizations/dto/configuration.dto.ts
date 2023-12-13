import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { PageInfoResponse, PaginationInput } from '../../../common/dto';
import { FeatureFlagObject } from '../../../entities/organizations';

export enum ConfigurationOrderBy {
  CREATED_AT = 'CREATED_AT',
}

export class ConfigInput {
  @IsNotEmpty()
  @IsString()
  key: string;
}

export class ConfigurationOrderByInput {
  @IsEnum(ConfigurationOrderBy)
  sortField?: ConfigurationOrderBy;

  @IsOptional()
  @IsBoolean()
  asc?: boolean;
}

export class ConfigurationPaginationInput {
  orderBy: ConfigurationOrderByInput;

  pagination: PaginationInput;
}

export class CreateConfigurationInput {
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

export class UpdateConfigurationInput extends PartialType(CreateConfigurationInput) {
  @IsNotEmpty()
  @IsString()
  value: boolean;
}

export class ConfigurationResponse {
  totalCount: number;

  items: FeatureFlagObject[];

  pageInfo: PageInfoResponse;
}

export class FeatureFlagResponse {
  @IsBoolean()
  success: boolean;
}
