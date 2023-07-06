import { Injectable } from '@nestjs/common';

import { CacheSearcher, CacheService } from '../../../common/cache/cache.service';
import { parseEnum } from '../../../common/enum.util';
import { OrganizationCacheParameters } from '../../../entities/cache/organization_parameters_cache.entity';
import { FeatureFlagEntity, FeatureFlagKey } from '../../../entities/organizations/feature_flag.entity';
import { AuthProvider } from '../../../entities/users/user.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { FeatureFlagRepository } from './feature_flag.repository';

@Injectable()
export class CachedFeatureFlagRepository implements CacheSearcher<FeatureFlagEntity> {
  constructor(
    private readonly cacheService: CacheService,
    private readonly featureFlagRepository: FeatureFlagRepository,
  ) {}

  public async search(session: PSQLSession, params: string[]): Promise<FeatureFlagEntity | undefined> {
    try {
      const response = await this.featureFlagRepository.findFeatureFlag(session, {
        clientId: params[0],
        key: params[1],
      });
      return response;
    } catch (error) {
      return undefined;
    }
  }

  public async findAuthProvider(manager: PSQLSession, { clientId }: { clientId: string }): Promise<AuthProvider> {
    const parameter = new OrganizationCacheParameters(clientId, FeatureFlagKey.AUTH_PROVIDER);
    try {
      const flag = await this.cacheService.get(parameter, manager, this);
      const parsed = parseEnum(AuthProvider, flag.value);
      const isEnabled = flag.is_active && !flag.is_experimental && !!flag.value;
      return isEnabled && parsed ? parsed : AuthProvider.FIREBASE;
    } catch (error) {
      return AuthProvider.FIREBASE;
    }
  }
}
