import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { responseWithoutPagination, RestResponseWithoutPagination } from '../../../common/mappers/response';
import { PermissionsValues } from '../../../entities/authentication';
import { SubscriptionPlanResponse } from '../../../entities/subscription/subscription_plan.entity';
import { UserEntity } from '../../../entities/users';
import { JwtUser, Permissions } from '../../authentication/decorators';
import { JwtAuthGuard, PermissionsGuard } from '../../authentication/guards';
import { SubscriptionPlanQueryParams } from '../dto/subscription_plan.dto';
import { SubscriptionPlanInteractor } from '../interactors/subscription_plan.interactor';

@Controller('subscription-plan')
export class SubscriptionPlanController {
  constructor(private subscriptionPlanInteractor: SubscriptionPlanInteractor) {}

  @Get()
  @Permissions(PermissionsValues.GUEST_USER)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  public async getSubscriptionPlans(
    @JwtUser() user: UserEntity,
    @Query() params: SubscriptionPlanQueryParams,
  ): Promise<RestResponseWithoutPagination<SubscriptionPlanResponse[]>> {
    const response = await this.subscriptionPlanInteractor.getSubscriptionPlans({
      ...params,
      clientId: user.organization_client_id,
    });
    return responseWithoutPagination(response);
  }
}
