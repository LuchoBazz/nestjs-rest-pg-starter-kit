import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { CacheService } from '../../../common/cache/cache.service';
import { parseEnum } from '../../../common/utils/enum.util';
import { OrganizationCacheParameters } from '../../../entities/cache/organization_parameters_cache.entity';
import { FeatureFlagEntity, FeatureFlagKey } from '../../../entities/organizations/feature_flag.entity';
import { AuthProvider } from '../../../entities/users/user.entity';
import { FeatureFlagRepository } from '../repositories/feature_flag.repository';

@Injectable()
export class CachedFeatureFlagService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly featureFlagRepository: FeatureFlagRepository,
  ) {}

  public async findAuthProvider(manager: PoolClient, { clientId }: { clientId: string }): Promise<AuthProvider> {
    const parameter = new OrganizationCacheParameters(clientId, FeatureFlagKey.AUTH_PROVIDER);
    try {
      const searcher = (manager: PoolClient, params: string[]): Promise<FeatureFlagEntity | null> => {
        return this.featureFlagRepository.findOne(manager, { clientId: params[0], key: params[1] });
      };
      const flag = await this.cacheService.get(parameter, manager, searcher);
      const parsed = parseEnum(AuthProvider, flag.value);
      const isEnabled = flag.is_active && !!flag.value;
      return isEnabled && parsed ? parsed : AuthProvider.FIREBASE;
    } catch (error) {
      return AuthProvider.FIREBASE;
    }
  }
}