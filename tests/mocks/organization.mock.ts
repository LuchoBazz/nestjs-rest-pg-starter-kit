import { faker } from '@faker-js/faker';

import { OrganizationEntity } from '../../src/entities/organizations';
import { generateRandomUserEntity } from './user.mock';

export const generateRandomClientId = ({
  clientId = faker.string.alpha({ length: 5, casing: 'upper' }),
} = {}): string => {
  return clientId;
};

export const generateRandomOrganizationEntity = ({
  name = faker.string.alpha(),
  clientId = generateRandomClientId(),
  alphaUser = generateRandomUserEntity(),
} = {}): OrganizationEntity => {
  return new OrganizationEntity(name, clientId, alphaUser.id);
};
