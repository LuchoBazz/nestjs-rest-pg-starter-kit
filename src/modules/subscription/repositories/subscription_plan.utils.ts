import { format } from '@scaleleap/pg-format';

import { SubscriptionPlanFilter, SubscriptionPlanSearchCriteriaEnum } from '../dto/subscription_plan.dto';

export const buildSubscriptionPlanFilter = (filter?: SubscriptionPlanFilter): string => {
  if (filter?.searchCriteria === SubscriptionPlanSearchCriteriaEnum.SLUG && filter.keyword) {
    return format(`AND subscription_plans.subscription_plan_slug = %1$L`, filter.keyword);
  }

  if (filter?.searchCriteria === SubscriptionPlanSearchCriteriaEnum.PRODUCT_ID && filter.keyword) {
    return format(`AND subscription_plans.subscription_plan_product_id = %1$L`, filter.keyword);
  }
  return '';
};
