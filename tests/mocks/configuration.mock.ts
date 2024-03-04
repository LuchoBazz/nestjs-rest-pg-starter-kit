import { faker } from '@faker-js/faker';

import { ConfigurationEntity, ConfigurationType } from '../../src/entities/organizations/configuration.entity';
import { generateRandomClientId } from './organization.mock';

export const generateRandomConfigurationEntity = ({
  id = faker.string.uuid(),
  key = faker.string.alpha(),
  value = '{}',
  type = ConfigurationType.JSON,
  isActive = true,
  clientId = generateRandomClientId(),
  isExperimental = false,
} = {}): ConfigurationEntity => {
  return new ConfigurationEntity(id, key, value, type, isActive, clientId, isExperimental);
};
