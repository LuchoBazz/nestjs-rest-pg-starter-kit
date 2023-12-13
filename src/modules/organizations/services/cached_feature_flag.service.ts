import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { CacheService } from '../../../common/cache/cache.service';
import { OrganizationCacheParameters } from '../../../entities/cache';
import { FeatureFlagEntity } from '../../../entities/organizations';
import { AuthProvider } from '../../../entities/users/user.entity';
import { FeatureFlagRepository } from '../repositories/feature_flag.repository';

@Injectable()
export class CachedFeatureFlagService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly featFlagRepository: FeatureFlagRepository,
  ) {}

  public async findAuthProvider(manager: PoolClient, { clientId }: { clientId: string }): Promise<AuthProvider> {
    /*const parameter = new OrganizationCacheParameters(clientId, FeatureFlagKey.AUTH_PROVIDER);
    try {
      const searcher = (manager: PoolClient, params: string[]): Promise<FeatureFlagEntity | null> => {
        return this.featFlagRepository.findOne(manager, { clientId: params[0], key: params[1] });
      };
      const flag = await this.cacheService.get(parameter, manager, searcher);
      const parsed = parseEnum(AuthProvider, flag.value);
      const isEnabled = flag.is_active && !!flag.value;
      return isEnabled && parsed ? parsed : AuthProvider.FIREBASE;
    } catch (error) {
      return AuthProvider.FIREBASE;
    }*/
    console.log({ manager, clientId });
    return AuthProvider.FIREBASE;
  }

  public async findOne(
    manager: PoolClient,
    { clientId, key }: { clientId: string; key: string },
  ): Promise<FeatureFlagEntity | null> {
    const parameter = new OrganizationCacheParameters(clientId, key);
    const searcher = async (manager: PoolClient, params: string[]): Promise<FeatureFlagEntity | null> => {
      return this.featFlagRepository.findOne(manager, { clientId: params[0], key: params[1] });
    };
    return this.cacheService.get(parameter, manager, searcher);
  }
}
