import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';
import { PoolClient } from 'pg';

import { SuscriptionPlanEntity } from '../../../entities/suscription/suscription_plan.entity';

@Injectable()
export class SuscriptionPlanRepository {
  public async findMany(manager: PoolClient, { clientId }: { clientId: string }): Promise<SuscriptionPlanEntity[]> {
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
        `,
        clientId,
      );
      const { rows } = await manager.query(query);
      return rows.map(SuscriptionPlanEntity.loadFromRow);
    } catch (error) {
      throw new NotFoundException('SUSCRIPTION_PLAN_NOT_FOUND');
    }
  }
}
