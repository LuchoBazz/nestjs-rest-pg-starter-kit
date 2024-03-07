import { Injectable } from '@nestjs/common';

import {
  SubscriptionPlanEntity,
  SubscriptionPlanResponse,
} from '../../../entities/subscription/subscription_plan.entity';

@Injectable()
export class SubscriptionPlanPresenter {
  public presentSubscriptionPlan(subscriptionPlan: SubscriptionPlanEntity): SubscriptionPlanResponse {
    return {
      id: subscriptionPlan.id,
      name: subscriptionPlan.name,
      product_id: subscriptionPlan.product_id,
      variants: subscriptionPlan.variants,
      slug: subscriptionPlan.slug,
      description: subscriptionPlan.description,
      node_quota: subscriptionPlan.node_quota,
      features: subscriptionPlan.features,
      most_popular: subscriptionPlan.most_popular,
      tier: subscriptionPlan.tier,
      is_active: subscriptionPlan.is_active,
      client_id: subscriptionPlan.organization_client_id,
    };
  }
}
