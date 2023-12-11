import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { SubscriptionPlanObject } from '../../../entities/subscription/subscription_plan.entity';
import { PgGateway } from '../../../gateways/database/postgresql';
import { SubscriptionPlanInput } from '../dto/subscription_plan.dto';
import { SubscriptionPlanPresenter } from '../presenters/subscription_plan.presenter';
import { SubscriptionPlanService } from '../services/subscription_plan.service';

@Injectable()
export class SubscriptionPlanInteractor {
  constructor(
    private readonly pgGateway: PgGateway,
    private readonly subscriptionPlanService: SubscriptionPlanService,
    private readonly subscriptionPlanPresenter: SubscriptionPlanPresenter,
  ) {}

  public async getSubscriptionPlans(clientId: string, input: SubscriptionPlanInput): Promise<SubscriptionPlanObject[]> {
    return this.pgGateway.onSession(async (manager: PoolClient) => {
      const subscriptionPlans = await this.subscriptionPlanService.findMany(manager, { ...input, clientId });
      return subscriptionPlans.map(this.subscriptionPlanPresenter.presentSubscriptionPlan);
    });
  }
}
