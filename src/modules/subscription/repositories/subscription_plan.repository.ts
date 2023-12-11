import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';
import { PoolClient } from 'pg';

import { SubscriptionPlanEntity } from '../../../entities/subscription/subscription_plan.entity';
import { ExtendedSubscriptionPlanInput as ExtendedSubscriptionPlanInput } from '../dto/subscription_plan.dto';
import { buildSubscriptionPlanFilter } from './subscription_plan.utils';

@Injectable()
export class SubscriptionPlanRepository {
  public async findMany(
    manager: PoolClient,
    { filter, clientId }: ExtendedSubscriptionPlanInput,
  ): Promise<SubscriptionPlanEntity[]> {
    try {
      const query = format(
        `
          SELECT
            subscription_plan_id,
            subscription_plan_name,
            subscription_plan_product_id,
            subscription_plan_variants,
            subscription_plan_slug,
            subscription_plan_description,
            subscription_plan_node_quota,
            subscription_plan_features,
            subscription_plan_most_popular,
            subscription_plan_tier,
            subscription_plan_is_active,
            subscription_plan_created_at,
            subscription_plan_updated_at,
            subscription_plan_organization
          FROM core.subscription_plans subscription_plans
          WHERE subscription_plans.subscription_plan_organization = %1$L
          ${buildSubscriptionPlanFilter(filter)}
        `,
        clientId,
      );
      const { rows } = await manager.query(query);
      return rows.map(SubscriptionPlanEntity.loadFromRow);
    } catch (error) {
      throw new NotFoundException('SUBSCRIPTION_PLAN_NOT_FOUND');
    }
  }
}
