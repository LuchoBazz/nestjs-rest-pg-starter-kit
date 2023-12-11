import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { SubscriptionPlanEntity } from '../../../entities/subscription/subscription_plan.entity';
import { ExtendedSubscriptionPlan } from '../dto/subscription_plan.dto';
import { SubscriptionPlanRepository } from '../repositories/subscription_plan.repository';

@Injectable()
export class SubscriptionPlanService {
  constructor(private readonly subscriptionPlanRepository: SubscriptionPlanRepository) {}

  public async findMany(manager: PoolClient, params: ExtendedSubscriptionPlan): Promise<SubscriptionPlanEntity[]> {
    return this.subscriptionPlanRepository.findMany(manager, params);
  }
}
