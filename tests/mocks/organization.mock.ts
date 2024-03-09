import { faker } from '@faker-js/faker';

import { OrganizationEntity } from '../../src/entities/organizations';

export const generateRandomClientId = ({
  clientId = faker.string.alpha({ length: 5, casing: 'upper' }),
} = {}): string => {
  return clientId;
};

export const generateRandomOrganizationEntity = ({
  name = faker.string.alpha(),
  clientId = generateRandomClientId(),
} = {}): OrganizationEntity => {
  return new OrganizationEntity(name, clientId);
};
