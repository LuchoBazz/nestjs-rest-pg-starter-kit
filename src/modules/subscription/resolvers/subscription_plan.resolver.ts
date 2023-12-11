import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { PermissionsValues } from '../../../entities/authentication';
import { SubscriptionPlanObject } from '../../../entities/subscription/subscription_plan.entity';
import { UserEntity } from '../../../entities/users';
import { JwtUser, Permissions } from '../../authentication/decorators';
import { JwtAuthGuard, PermissionsGuard } from '../../authentication/guards';
import { SubscriptionPlanInput } from '../dto/subscription_plan.dto';
import { SubscriptionPlanInteractor } from '../interactors/subscription_plan.interactor';

@Resolver('SubscriptionPlan')
export class SubscriptionPlanResolver {
  constructor(private subscriptionPlanInteractor: SubscriptionPlanInteractor) {}

  @Permissions(PermissionsValues.READ_SUBSCRIPTION_PLAN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Query(() => [SubscriptionPlanObject])
  public async subscriptionPlans(
    @Args('input') input: SubscriptionPlanInput,
    @JwtUser() user: UserEntity,
  ): Promise<SubscriptionPlanObject[]> {
    return this.subscriptionPlanInteractor.getSubscriptionPlans(user.organization_client_id, input);
  }
}
