import { Injectable } from '@nestjs/common';

import { SuscriptionPlanEntity, SuscriptionPlanObject } from '../../../entities/suscription/suscription_plan.entity';

@Injectable()
export class SuscriptionPlanPresenter {
  public presentSuscriptionPlan(suscriptionPlan: SuscriptionPlanEntity): SuscriptionPlanObject {
    return {
      id: suscriptionPlan.id,
      name: suscriptionPlan.name,
      product_id: suscriptionPlan.product_id,
      variants: suscriptionPlan.variants,
      slug: suscriptionPlan.slug,
      description: suscriptionPlan.description,
      node_quota: suscriptionPlan.node_quota,
      features: suscriptionPlan.features,
      most_popular: suscriptionPlan.most_popular,
      tier: suscriptionPlan.tier,
      is_active: suscriptionPlan.is_active,
      organization_client_id: suscriptionPlan.organization_client_id,
    };
  }
}
