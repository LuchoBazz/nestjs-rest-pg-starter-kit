import { faker } from '@faker-js/faker';

import { FeatureFlagEntity } from '../../src/entities/organizations';
import { generateRandomClientId } from './organization.mock';

export const generateRandomFeatureFlagEntity = ({
  id = faker.string.uuid(),
  key = faker.string.alpha(),
  value = true,
  percentage = faker.number.int({ min: 0, max: 100 }),
  isActive = true,
  clientId = generateRandomClientId(),
  isExperimental = false,
} = {}): FeatureFlagEntity => {
  return new FeatureFlagEntity(id, key, value, percentage, isActive, clientId, isExperimental);
};
