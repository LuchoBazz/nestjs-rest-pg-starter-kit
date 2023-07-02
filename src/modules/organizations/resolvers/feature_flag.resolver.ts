import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserEntity } from '../../../entities/users/user.entity';
import { JwtAuthGuard } from '../../authentication/guards/jwt_auth.guard';
import {
  FeatureFlagInput,
  FeatureFlagPaginationInput,
  FeatureFlagResponse,
  FeatureFlagsResponse,
} from '../dto/feature_flag.dto';
import { FeatureFlagInteractor } from '../interactors/feature_flag.interactor';

@Resolver('FeatureFlag')
export class FeatureFlagResolver {
  constructor(private featureFlagInteractor: FeatureFlagInteractor) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => FeatureFlagsResponse)
  public async featureFlags(
    @Args('input') input: FeatureFlagPaginationInput,
    @Context() ctx,
  ): Promise<FeatureFlagsResponse> {
    const request = ctx.req;
    const user = request.user as UserEntity;
    return this.featureFlagInteractor.getFeatureFlags(user.organization_client_id, input);
  }

  @Query(() => String)
  public featureFlag(): string {
    return 'Hello, World!';
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => FeatureFlagResponse, { nullable: false })
  public async addFeatureFlag(@Args('input') input: FeatureFlagInput, @Context() ctx): Promise<FeatureFlagResponse> {
    const { user } = ctx.req;
    console.log({ user, input });
    const success = await this.featureFlagInteractor.foo();
    return { success };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => FeatureFlagResponse, { nullable: false })
  public async updateFeatureFlag(@Args('input') input: FeatureFlagInput, @Context() ctx): Promise<FeatureFlagResponse> {
    const { user } = ctx.req;
    console.log({ user, input });
    const success = await this.featureFlagInteractor.foo();
    return { success };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => FeatureFlagResponse, { nullable: false })
  public async deleteFeatureFlag(@Args('input') input: FeatureFlagInput, @Context() ctx): Promise<FeatureFlagResponse> {
    const { user } = ctx.req;
    console.log({ user, input });
    const success = await this.featureFlagInteractor.foo();
    return { success };
  }
}
