import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { PermissionsValues } from '../../../entities/authentication';
import { UserEntity } from '../../../entities/users';
import { JwtUser, Permissions } from '../../authentication/decorators';
import { JwtAuthGuard, PermissionsGuard } from '../../authentication/guards';
import { GetSuscriptionPlanInput, SuscriptionPlanResponse } from '../dto/suscription_plan.dto';
import { SuscriptionPlanInteractor } from '../interactors/suscription_plan.interactor';

@Resolver('SuscriptionPlan')
export class SuscriptionPlanResolver {
  constructor(private suscriptionPlanInteractor: SuscriptionPlanInteractor) {}

  @Permissions(PermissionsValues.READ_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Query(() => SuscriptionPlanResponse)
  public async suscriptionPlans(
    @Args('input') input: GetSuscriptionPlanInput,
    @JwtUser() user: UserEntity,
  ): Promise<SuscriptionPlanResponse> {
    return this.suscriptionPlanInteractor.getSuscriptionPlans(user.organization_client_id, input);
  }
}
