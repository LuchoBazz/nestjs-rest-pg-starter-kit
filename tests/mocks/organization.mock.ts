import { faker } from '@faker-js/faker';

export const generateRandomClientId = ({
  clientId = faker.string.alpha({ length: 5, casing: 'upper' }),
} = {}): string => {
  return clientId;
};
