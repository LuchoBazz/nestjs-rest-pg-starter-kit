// user.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { responseWithoutPagination, RestResponseWithoutPagination } from '../../../common/mappers/response';
import { PermissionsValues } from '../../../entities/authentication';
import { SubscriptionPlanObject } from '../../../entities/subscription/subscription_plan.entity';
import { UserEntity } from '../../../entities/users';
import { JwtUser, Permissions } from '../../authentication/decorators';
import { JwtAuthGuard, PermissionsGuard } from '../../authentication/guards';
import { SubscriptionPlanInput, SubscriptionPlanQueryParamsDto } from '../dto/subscription_plan.dto';
import { SubscriptionPlanInteractor } from '../interactors/subscription_plan.interactor';

@Controller('subscription-plan')
export class SubscriptionPlanController {
  constructor(private subscriptionPlanInteractor: SubscriptionPlanInteractor) {}

  @Get()
  @Permissions(PermissionsValues.READ_SUBSCRIPTION_PLANS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  public async getSubscriptionPlans(
    @JwtUser() user: UserEntity,
    @Query() params: SubscriptionPlanQueryParamsDto,
  ): Promise<RestResponseWithoutPagination<SubscriptionPlanObject[]>> {
    console.log({ user });
    const { searchCriteria, keyword } = params;
    const filter = { filter: { searchCriteria, keyword } };
    const input: SubscriptionPlanInput = { ...filter };
    const response = await this.subscriptionPlanInteractor.getSubscriptionPlans(user.organization_client_id, input);
    return responseWithoutPagination(response);
  }
}
