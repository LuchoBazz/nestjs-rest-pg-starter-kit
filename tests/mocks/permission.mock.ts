import { faker } from '@faker-js/faker';

import { PermissionEntity } from '../../src/entities/authentication';

export const generateRandomPermissionEntity = ({
  name = faker.string.alpha({ length: 5, casing: 'upper' }),
} = {}): PermissionEntity => {
  return new PermissionEntity(name);
};
