import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';
import { v4 as uuid } from 'uuid';

import { CacheSearcher, CacheService } from '../../../common/cache/cache.service';
import { parseEnum } from '../../../common/enum.util';
import { mapPagination } from '../../../common/mappers/pagination.mapper';
import { OrganizationCacheParameters } from '../../../entities/cache/organization_parameters_cache.entity';
import {
  FeatureFlagEntity,
  FeatureFlagKey,
  FeatureFlagPaginationResponse,
  FeatureFlagType,
} from '../../../entities/organizations/feature_flag.entity';
import { OrderBy, Pagination } from '../../../entities/pagination.entity';
import { AuthProvider } from '../../../entities/users/user.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { OrderByFeatureFlag } from '../dto/feature_flag.dto';

interface InternalParams {
  clientId: string;
  key: string;
}

interface Params {
  clientId: string;
}

interface FindFFWithPagination {
  clientId: string;
  orderBy?: OrderBy;
  pagination?: Pagination;
}

interface CreateFeatureFlag {
  key: string;
  value: string | null;
  type: FeatureFlagType;
  is_experimental: boolean;
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

  public async findFeatureFlagsByOrganization(
    manager: PSQLSession,
    { clientId, pagination, orderBy }: FindFFWithPagination,
  ): Promise<FeatureFlagPaginationResponse> {
    try {
      const { page = 1, limit = 10 } = pagination ?? {};
      const { sortField = OrderByFeatureFlag.CREATED_AT, asc = true } = orderBy ?? {};

      const mapSortField: Record<OrderByFeatureFlag, string> = {
        [OrderByFeatureFlag.ID]: 'feature_flag_id',
        [OrderByFeatureFlag.CREATED_AT]: 'feature_flag_created_at',
      };

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
            feature_flag_is_experimental,
            COUNT(*) OVER () AS total_count
          FROM core.feature_flags feature_flags
          WHERE feature_flags.feature_flag_organization = %1$L
          ORDER BY feature_flags.%2$s %3$s
          LIMIT %4$L OFFSET %5$L
        `,
        clientId,
        mapSortField[sortField],
        asc ? 'ASC' : 'DESC',
        limit,
        (page - 1) * limit,
      );
      const { rows } = await manager.query(query);
      return mapPagination(rows, pagination, FeatureFlagEntity.loadFromRow);
    } catch (error) {
      throw new NotFoundException('FEATURE_FLAGS_NOT_FOUND');
    }
  }

  public async createFeatureFlag(
    manager: PSQLSession,
    { key, value, type, is_experimental, clientId }: CreateFeatureFlag,
  ): Promise<FeatureFlagEntity> {
    try {
      const query = format(
        `
          INSERT INTO core.feature_flags(
            feature_flag_id,
            feature_flag_key,
            feature_flag_value,
            feature_flag_is_active,
            feature_flag_type,
            feature_flag_organization,
            feature_flag_is_experimental
          ) VALUES(%1$L, %2$L, %3$L, true, %4$L, %5$L, %6$L)
          RETURNING *
        `,
        uuid(),
        key,
        value,
        type.toString(),
        clientId,
        String(is_experimental),
      );
      const { rows } = await manager.query(query);
      return FeatureFlagEntity.loadFromRow(rows[0]);
    } catch (error) {
      throw new NotFoundException('FEATURE_FLAG_COULD_NOT_BE_CREATED');
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
