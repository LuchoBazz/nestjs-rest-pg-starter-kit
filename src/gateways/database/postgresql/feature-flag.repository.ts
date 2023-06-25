import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';
import { parseEnum } from 'src/common/enum';

import { FeatureFlagEntity, FeatureFlagKey } from '../../../entities/feature-flag.entity';
import { AuthProvider } from '../../../entities/users.entity';
import { PSQLSession } from '.';

interface InternalParams {
  clientId: string;
  key: FeatureFlagKey;
}

interface Params {
  clientId: string;
}

@Injectable()
export class FeatureFlagRepository {
  private async findFeatureFlag(manager: PSQLSession, { key, clientId }: InternalParams): Promise<FeatureFlagEntity> {
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
      return FeatureFlagEntity.load(rows[0]);
    } catch (error) {
      throw new NotFoundException('FEATURE_FLAG_NOT_FOUND');
    }
  }

  public async findAuthProvider(manager: PSQLSession, { clientId }: Params): Promise<AuthProvider> {
    const authProviderDefault = AuthProvider.FIREBASE;
    try {
      const flag = await this.findFeatureFlag(manager, { clientId, key: FeatureFlagKey.AUTH_PROVIDER });
      const isEnabled = !(!flag.is_active || flag.is_experimental || !flag.value);
      const parsed = parseEnum(AuthProvider, flag.value);
      return isEnabled && parsed ? parsed : authProviderDefault;
    } catch (error) {
      return authProviderDefault;
    }
  }
}
