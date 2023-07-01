import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '../../authentication/guards/jwt_auth.guard';
import { FeatureFlagInput, FeatureFlagResponse } from '../dto/feature_flag.dto';
import { FeatureFlagInteractor } from '../interactors/feature_flag.interactor';

@Resolver('FeatureFlag')
export class FeatureFlagResolver {
  constructor(private featureFlagInteractor: FeatureFlagInteractor) {}

  @Query(() => String)
  public featureFlags(): string {
    return 'Hello, World!';
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
