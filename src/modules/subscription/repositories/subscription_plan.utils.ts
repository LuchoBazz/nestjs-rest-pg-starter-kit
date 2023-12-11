import { format } from '@scaleleap/pg-format';

import { ExtendedSubscriptionPlan } from '../dto/subscription_plan.dto';

export const buildSubscriptionPlanFilter = (filter?: ExtendedSubscriptionPlan): string => {
  if (filter?.slug && filter?.product_id) {
    return format(
      `
        AND subscription_plans.subscription_plan_slug = %1$L
        AND subscription_plans.subscription_plan_product_id = %2$L
      `,
      filter.slug,
      filter.product_id,
    );
  }
  if (filter?.slug) {
    return format(`AND subscription_plans.subscription_plan_slug = %1$L`, filter.slug);
  }

  if (filter?.product_id) {
    return format(`AND subscription_plans.subscription_plan_product_id = %1$L`, filter.product_id);
  }
  return '';
};
