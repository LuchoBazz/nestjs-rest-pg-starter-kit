import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { PermissionsValues } from '../../../entities/authentication';
import { FeatureFlagObject } from '../../../entities/organizations';
import { UserEntity } from '../../../entities/users';
import { JwtUser, Permissions } from '../../authentication/decorators';
import { JwtAuthGuard, PermissionsGuard } from '../../authentication/guards';
import {
  CreateFeatureFlagInput,
  FeatureFlagInput,
  FeatureFlagResponse,
  FeatureFlagsResponse,
  OrderByFeatureFlag,
  UpdateFeatureFlagInput,
} from '../dto';
import { FeatureFlagInteractor } from '../interactors';

@Controller('feature-flags')
export class FeatureFlagController {
  constructor(private featureFlagInteractor: FeatureFlagInteractor) {}

  @Permissions(PermissionsValues.READ_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get()
  public async featureFlags(
    @JwtUser() user: UserEntity,
    @Query('sort_field') sortField?: OrderByFeatureFlag,
    @Query('asc') asc?: boolean,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<FeatureFlagsResponse> {
    return this.featureFlagInteractor.getFeatureFlags(user.organization_client_id, {
      orderBy: { sortField, asc },
      pagination: { page, limit },
    });
  }

  @Permissions(PermissionsValues.READ_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get(':key')
  public async featureFlag(@JwtUser() user: UserEntity, @Param('key') key): Promise<FeatureFlagObject> {
    return this.featureFlagInteractor.getFeatureFlag(user.organization_client_id, { key });
  }

  @Permissions(PermissionsValues.CREATE_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  public async addFeatureFlag(
    @Body() input: CreateFeatureFlagInput,
    @JwtUser() user: UserEntity,
  ): Promise<FeatureFlagObject> {
    return await this.featureFlagInteractor.createFeatureFlag(user.organization_client_id, input);
  }

  @Permissions(PermissionsValues.UPDATE_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put()
  public async updateFeatureFlag(
    @Body() input: UpdateFeatureFlagInput,
    @JwtUser() user: UserEntity,
  ): Promise<FeatureFlagObject> {
    return this.featureFlagInteractor.updateFeatureFlag(user.organization_client_id, input);
  }

  @Permissions(PermissionsValues.REMOVE_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete()
  public async deleteFeatureFlag(
    @Body() input: FeatureFlagInput,
    @JwtUser() user: UserEntity,
  ): Promise<FeatureFlagResponse> {
    const success = await this.featureFlagInteractor.deleteFeatureFlag(user.organization_client_id, input);
    return { success };
  }
}
