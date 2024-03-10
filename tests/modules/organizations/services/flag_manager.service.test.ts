import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { FeatureFlagType } from '../../../../src/entities/organizations';
import { PgGateway } from '../../../../src/gateways/database/postgresql';
import { CachedFeatureFlagService } from '../../../../src/modules/organizations/repositories';
import { FeatureFlagManagerService } from '../../../../src/modules/organizations/services/flag_manager.service';
import { generateRandomFeatureFlagEntity } from '../../../mocks/feature_flag.mock';
import { generateRandomClientId } from '../../../mocks/organization.mock';

describe.each([
  [{ percentage: 50, clientId: generateRandomClientId(), key: faker.string.alpha(10), expected: false }],
  [{ percentage: 80, clientId: generateRandomClientId(), key: faker.string.alpha(10), expected: true }],
])('Given an FeatureFlagManagerService', ({ percentage, clientId, key, expected }: any) => {
  const userId = 'd571c7b6-60f2-44c3-bc7a-67f720f18e63';

  let service: FeatureFlagManagerService;
  let repositoryPgGateway: jest.Mocked<PgGateway>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeatureFlagManagerService,
        {
          provide: PgGateway,
          useFactory: () => ({
            onSession: jest.fn(),
          }),
        },
        {
          provide: CachedFeatureFlagService,
          useFactory: () => ({
            findOne: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<FeatureFlagManagerService>(FeatureFlagManagerService);
    repositoryPgGateway = module.get(PgGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should satisfactorily solve the service.findFeatureFlag method', async () => {
    const featureFlagMock = generateRandomFeatureFlagEntity({ percentage });

    repositoryPgGateway.onSession.mockResolvedValueOnce(featureFlagMock);

    const hash = service.getHashCyrb53(userId);
    const userPercentage = hash % 100;

    const result = await service.findFeatureFlag({ clientId, key, userId, type: FeatureFlagType.PERCENTAGE });
    expect(result).toEqual(expected);
    expect(repositoryPgGateway.onSession).toHaveBeenCalledTimes(1);
    expect(hash).toEqual(198641970791380);
    expect(userPercentage).toEqual(80);
  });
});
