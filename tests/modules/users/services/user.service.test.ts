import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { UserRepository } from '../../../../src/modules/users/repositories';
import { UserService } from '../../../../src/modules/users/services';
import { generateRandomUserEntity } from '../../../mocks/user.mock';

describe('Given an UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: () => ({
            findOneByEmail: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call userRepository findOneByEmail method with correct parameters', async () => {
    const sessionMock = {} as any;
    const clientId = faker.string.alpha({ length: 5, casing: 'upper' });
    const email = faker.internet.email();
    const userEntityMock = generateRandomUserEntity();

    repository.findOneByEmail.mockResolvedValueOnce(userEntityMock);

    const result = await service.findOneByEmail(sessionMock, { clientId, email });

    expect(result).toBe(userEntityMock);
    expect(repository.findOneByEmail).toHaveBeenCalledWith(sessionMock, { clientId, email });
  });
});
