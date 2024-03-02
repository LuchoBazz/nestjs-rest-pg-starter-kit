import { faker } from '@faker-js/faker';

import { AuthProvider, AuthType, UserEntity, UserRole } from '../../src/entities/users';
import { generateRandomClientId } from './organization.mock';

export const generateRandomUserEntity = ({
  username = faker.internet.userName(),
  firstName = faker.person.firstName(),
  lastName = faker.person.lastName(),
  email = faker.internet.email(),
  identificationNumber = faker.string.alphanumeric(),
  phoneNumber = faker.phone.number(),
  terms = true,
  notifications = true,
  isActive = true,
  uid = faker.string.uuid(),
  role = UserRole.USER,
  authProvider = AuthProvider.FIREBASE,
  authType = AuthType.EMAIL_AND_PASSWORD,
  dynamicInfo = {},
  organization = generateRandomClientId(),
} = {}): UserEntity => {
  return new UserEntity(
    username,
    firstName,
    lastName,
    email,
    identificationNumber,
    phoneNumber,
    terms,
    notifications,
    isActive,
    uid,
    role,
    authProvider,
    authType,
    dynamicInfo,
    organization,
  );
};
