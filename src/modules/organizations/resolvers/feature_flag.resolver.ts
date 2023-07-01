import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { FeatureFlagInput, FeatureFlagResponse } from '../dto/feature_flag.dto';
import { FeatureFlagInteractor } from '../interactors/feature_flag.interactor';

@Resolver('FeatureFlag')
export class FeatureFlagResolver {
  constructor(private featureFlagInteractor: FeatureFlagInteractor) {}

  @Query(() => String)
  public hello(): string {
    return 'Hello, World!';
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => FeatureFlagResponse, { nullable: false })
  public async deleteMyAccount(@Args('input') input: FeatureFlagInput, @Context() ctx): Promise<FeatureFlagResponse> {
    const { user } = ctx.req;
    console.log({ user, input });
    const success = await this.featureFlagInteractor.foo();
    return { success };
  }
}
