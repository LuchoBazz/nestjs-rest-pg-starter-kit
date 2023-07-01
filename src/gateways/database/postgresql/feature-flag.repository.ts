import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';
import { parseEnum } from 'src/common/enum';

import { OrganizationCacheParameters } from '../../../entities/cache/organization-parameters-cache.entity';
import { FeatureFlagEntity, FeatureFlagKey } from '../../../entities/feature-flag.entity';
import { AuthProvider } from '../../../entities/users.entity';
import { PSQLSession } from '.';
import { CacheSearcher, CacheService } from './cache.service';

interface InternalParams {
  clientId: string;
  key: string;
}

interface Params {
  clientId: string;
}

@Injectable()
export class FeatureFlagRepository implements CacheSearcher<FeatureFlagEntity> {
  constructor(private readonly cacheService: CacheService) {}

  public async findFeatureFlag(manager: PSQLSession, { key, clientId }: InternalParams): Promise<FeatureFlagEntity> {
    try {
      const query = format(
        `
          SELECT
            feature_flag_id,
            feature_flag_key,
            feature_flag_value,
            feature_flag_is_active,
            feature_flag_type,
            feature_flag_organization,
            feature_flag_created_at,
            feature_flag_updated_at,
            feature_flag_is_experimental
          FROM core.feature_flags feature_flags
          WHERE feature_flags.feature_flag_organization = %1$L
          AND feature_flags.feature_flag_key = %2$L
        `,
        clientId,
        key.toString(),
      );
      const { rows } = await manager.query(query);
      return FeatureFlagEntity.loadFromRow(rows[0]);
    } catch (error) {
      throw new NotFoundException('FEATURE_FLAG_NOT_FOUND');
    }
  }

  public async search(session: PSQLSession, params: string[]): Promise<FeatureFlagEntity | undefined> {
    try {
      const response = await this.findFeatureFlag(session, { clientId: params[0], key: params[1] });
      return response;
    } catch (error) {
      return undefined;
    }
  }

  public async findAuthProvider(manager: PSQLSession, { clientId }: Params): Promise<AuthProvider> {
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
