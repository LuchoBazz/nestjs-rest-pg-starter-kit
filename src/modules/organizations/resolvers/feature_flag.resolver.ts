import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PermissionsValues } from '../../../entities/authentication/permission.enum';
import { FeatureFlagObject } from '../../../entities/organizations/feature_flag.entity';
import { UserEntity } from '../../../entities/users/user.entity';
import { Permissions } from '../../authentication/decorators/permission.decorator';
import { JwtUser } from '../../authentication/decorators/user.decorator';
import { JwtAuthGuard } from '../../authentication/guards/jwt_auth.guard';
import { PermissionsGuard } from '../../authentication/guards/permission.guard';
import {
  CreateFeatureFlagInput,
  FeatureFlagInput,
  FeatureFlagPaginationInput,
  FeatureFlagResponse,
  FeatureFlagsResponse,
} from '../dto/feature_flag.dto';
import { FeatureFlagInteractor } from '../interactors/feature_flag.interactor';

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

  // TODO: Add updateFeatureFlag mutation
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
