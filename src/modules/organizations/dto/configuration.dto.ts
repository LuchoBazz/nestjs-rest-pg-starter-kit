import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PageInfoResponse, PaginationInput } from '../../../common/dto';
import { FeatureFlagObject } from '../../../entities/organizations';
import { ConfigurationType } from '../../../entities/organizations/configuration.entity';

export enum ConfigurationOrderBy {
  CREATED_AT = 'CREATED_AT',
}

export class ConfigurationInput {
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
  value: string;

  @IsEnum(ConfigurationType)
  type: ConfigurationType;
}

export class UpdateConfigurationInput extends PartialType(CreateConfigurationInput) {}

export class ConfigurationResponse {
  totalCount: number;

  items: FeatureFlagObject[];

  pageInfo: PageInfoResponse;
}

export class FeatureFlagResponse {
  @IsBoolean()
  success: boolean;
}
