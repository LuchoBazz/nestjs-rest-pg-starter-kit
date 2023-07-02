import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PermissionsValues } from '../../../entities/authentication/permission.enum';
import { FeatureFlagObject } from '../../../entities/organizations/feature_flag.entity';
import { UserEntity } from '../../../entities/users/user.entity';
import { Permissions } from '../../authentication/decorators/permission.decorator';
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
    @Context() ctx,
  ): Promise<FeatureFlagsResponse> {
    const user = ctx.req.user as UserEntity;
    return this.featureFlagInteractor.getFeatureFlags(user.organization_client_id, input);
  }

  @Permissions(PermissionsValues.READ_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Query(() => FeatureFlagObject)
  public async featureFlag(@Args('input') input: FeatureFlagInput, @Context() ctx): Promise<FeatureFlagObject> {
    const user = ctx.req.user as UserEntity;
    return this.featureFlagInteractor.getFeatureFlag(user.organization_client_id, input);
  }

  @Permissions(PermissionsValues.CREATE_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Mutation(() => FeatureFlagResponse, { nullable: false })
  public async addFeatureFlag(
    @Args('input') input: CreateFeatureFlagInput,
    @Context() ctx,
  ): Promise<FeatureFlagObject> {
    const user = ctx.req.user as UserEntity;
    return await this.featureFlagInteractor.createFeatureFlag(user.organization_client_id, input);
  }

  // TODO: Add updateFeatureFlag mutation
  @Permissions(PermissionsValues.REMOVE_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Mutation(() => FeatureFlagResponse, { nullable: false })
  public async deleteFeatureFlag(@Args('input') input: FeatureFlagInput, @Context() ctx): Promise<FeatureFlagResponse> {
    const user = ctx.req.user as UserEntity;
    const success = await this.featureFlagInteractor.deleteFeatureFlag(user.organization_client_id, input);
    return { success };
  }
}
