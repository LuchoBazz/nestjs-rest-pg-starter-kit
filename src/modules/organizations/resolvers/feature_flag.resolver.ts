import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PermissionsValues } from '../../../entities/authentication';
import { FeatureFlagObject } from '../../../entities/organizations';
import { UserEntity } from '../../../entities/users';
import { JwtUser, Permissions } from '../../authentication/decorators';
import { JwtAuthGuard, PermissionsGuard } from '../../authentication/guards';
import {
  CreateFeatureFlagInput,
  FeatureFlagInput,
  FeatureFlagPaginationInput,
  FeatureFlagResponse,
  FeatureFlagsResponse,
  UpdateFeatureFlagInput,
} from '../dto';
import { FeatureFlagInteractor } from '../interactors';

@Resolver('FeatureFlag')
export class FeatureFlagResolver {
  constructor(private featureFlagInteractor: FeatureFlagInteractor) {}

  @Permissions(PermissionsValues.READ_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Query(() => FeatureFlagsResponse)
  public async featureFlags(
    @Args('input') input: FeatureFlagPaginationInput,
    @JwtUser() user: UserEntity,
  ): Promise<FeatureFlagsResponse> {
    return this.featureFlagInteractor.getFeatureFlags(user.organization_client_id, input);
  }

  @Permissions(PermissionsValues.READ_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Query(() => FeatureFlagObject)
  public async featureFlag(
    @Args('input') input: FeatureFlagInput,
    @JwtUser() user: UserEntity,
  ): Promise<FeatureFlagObject> {
    return this.featureFlagInteractor.getFeatureFlag(user.organization_client_id, input);
  }

  @Permissions(PermissionsValues.CREATE_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Mutation(() => FeatureFlagResponse, { nullable: false })
  public async addFeatureFlag(
    @Args('input') input: CreateFeatureFlagInput,
    @JwtUser() user: UserEntity,
  ): Promise<FeatureFlagObject> {
    return await this.featureFlagInteractor.createFeatureFlag(user.organization_client_id, input);
  }

  @Permissions(PermissionsValues.UPDATE_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Mutation(() => FeatureFlagObject, { nullable: false })
  public async updateFeatureFlag(
    @Args('input') input: UpdateFeatureFlagInput,
    @JwtUser() user: UserEntity,
  ): Promise<FeatureFlagObject> {
    return this.featureFlagInteractor.updateFeatureFlag(user.organization_client_id, input);
  }

  @Permissions(PermissionsValues.REMOVE_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Mutation(() => FeatureFlagResponse, { nullable: false })
  public async deleteFeatureFlag(
    @Args('input') input: FeatureFlagInput,
    @JwtUser() user: UserEntity,
  ): Promise<FeatureFlagResponse> {
    const success = await this.featureFlagInteractor.deleteFeatureFlag(user.organization_client_id, input);
    return { success };
  }
}
