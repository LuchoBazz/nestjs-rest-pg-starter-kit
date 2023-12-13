import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { CacheService } from '../../../common/cache/cache.service';
import { parseEnum } from '../../../common/utils';
import { OrganizationCacheParameters } from '../../../entities/cache';
import { ConfigurationEntity, ConfigurationKey } from '../../../entities/organizations/configuration.entity';
import { AuthProvider } from '../../../entities/users/user.entity';
import { ConfigurationRepository } from '../repositories/configuration.repository';

@Injectable()
export class CachedConfigurationService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  public async findOne(
    manager: PoolClient,
    { clientId, key }: { clientId: string; key: string },
  ): Promise<ConfigurationEntity | null> {
    const parameter = new OrganizationCacheParameters(clientId, key);
    const searcher = async (manager: PoolClient, params: string[]): Promise<ConfigurationEntity | null> => {
      return this.configurationRepository.findOne(manager, { clientId: params[0], key: params[1] });
    };
    return this.cacheService.get(parameter, manager, searcher);
  }

  public async findAuthProvider(manager: PoolClient, { clientId }: { clientId: string }): Promise<AuthProvider> {
    const DEFAULT_VALUE = AuthProvider.FIREBASE;
    try {
      const flag = await this.findOne(manager, { clientId, key: ConfigurationKey.AUTH_PROVIDER });
      const parsed = parseEnum(AuthProvider, flag.value);
      const isEnabled = flag.is_active && !!flag.value;
      return isEnabled && parsed ? parsed : DEFAULT_VALUE;
    } catch (error) {
      return DEFAULT_VALUE;
    }
  }
}
