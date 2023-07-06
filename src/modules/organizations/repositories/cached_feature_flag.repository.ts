import { Injectable } from '@nestjs/common';

import { CacheService } from '../../../common/cache/cache.service';
import { parseEnum } from '../../../common/utils/enum.util';
import { OrganizationCacheParameters } from '../../../entities/cache/organization_parameters_cache.entity';
import { FeatureFlagEntity, FeatureFlagKey } from '../../../entities/organizations/feature_flag.entity';
import { AuthProvider } from '../../../entities/users/user.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { FeatureFlagRepository } from './feature_flag.repository';

@Injectable()
export class CachedFeatureFlagRepository {
  constructor(
    private readonly cacheService: CacheService,
    private readonly featureFlagRepository: FeatureFlagRepository,
  ) {}

  public async findAuthProvider(manager: PSQLSession, { clientId }: { clientId: string }): Promise<AuthProvider> {
    const parameter = new OrganizationCacheParameters(clientId, FeatureFlagKey.AUTH_PROVIDER);
    try {
      const searcher = (session: PSQLSession, params: string[]): Promise<FeatureFlagEntity | null> => {
        return this.featureFlagRepository.findFeatureFlag(session, { clientId: params[0], key: params[1] });
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
