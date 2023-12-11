import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { PermissionsValues } from '../../../entities/authentication';
import { SuscriptionPlanObject } from '../../../entities/suscription/suscription_plan.entity';
import { UserEntity } from '../../../entities/users';
import { JwtUser, Permissions } from '../../authentication/decorators';
import { JwtAuthGuard, PermissionsGuard } from '../../authentication/guards';
import { SuscriptionPlanInput } from '../dto/suscription_plan.dto';
import { SuscriptionPlanInteractor } from '../interactors/suscription_plan.interactor';

@Resolver('SuscriptionPlan')
export class SuscriptionPlanResolver {
  constructor(private suscriptionPlanInteractor: SuscriptionPlanInteractor) {}

  @Permissions(PermissionsValues.READ_FEATURE_FLAGS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Query(() => [SuscriptionPlanObject])
  public async suscriptionPlans(
    @Args('input') input: SuscriptionPlanInput,
    @JwtUser() user: UserEntity,
  ): Promise<SuscriptionPlanObject[]> {
    return this.suscriptionPlanInteractor.getSuscriptionPlans(user.organization_client_id, input);
  }
}
