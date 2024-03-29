import { faker } from '@faker-js/faker';

import { SubscriptionPlanEntity } from '../../src/entities/subscription/subscription_plan.entity';
import { generateRandomClientId } from './organization.mock';

export const generateRandomSubscriptionPlanEntity = ({
  id = faker.string.uuid(),
  name = faker.string.alpha(),
  productId = faker.string.alpha(),
  variants = [faker.string.alpha()],
  slug = faker.lorem.slug(),
  description = faker.lorem.text(),
  nodeQuota = faker.number.int({ min: 10, max: 100 }),
  features = [],
  mostPopular = false,
  tier = faker.number.int({ min: 10, max: 100 }),
  isActive = true,
  clientId = generateRandomClientId(),
} = {}): SubscriptionPlanEntity => {
  return new SubscriptionPlanEntity(
    id,
    name,
    productId,
    variants,
    slug,
    description,
    nodeQuota,
    features,
    mostPopular,
    tier,
    isActive,
    clientId,
  );
};
