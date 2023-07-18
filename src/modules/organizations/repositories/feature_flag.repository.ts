import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';
import { PoolClient } from 'pg';
import { v4 as uuid } from 'uuid';

import { mapPagination } from '../../../common/mappers';
import { OrderBy, Pagination } from '../../../entities';
import { FeatureFlagEntity, FeatureFlagPaginationResponse, FeatureFlagType } from '../../../entities/organizations';
import { OrderByFeatureFlag } from '../dto';

@Injectable()
export class FeatureFlagRepository {
  public async findOne(
    manager: PoolClient,
    { key, clientId }: { clientId: string; key: string },
  ): Promise<FeatureFlagEntity> {
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

  public async findManyWithPagination(
    manager: PoolClient,
    { clientId, pagination, orderBy }: { clientId: string; orderBy?: OrderBy; pagination?: Pagination },
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

  public async createOne(
    manager: PoolClient,
    {
      key,
      value,
      type,
      is_experimental,
      clientId,
    }: { key: string; value: string | null; type: FeatureFlagType; is_experimental: boolean; clientId: string },
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

  public async deleteOne(manager: PoolClient, { key, clientId }: { clientId: string; key: string }): Promise<boolean> {
    try {
      const query = format(
        `
          DELETE FROM core.feature_flags
          WHERE feature_flags.feature_flag_organization = %1$L
          AND feature_flags.feature_flag_key = %2$L
        `,
        clientId,
        key.toString(),
      );
      await manager.query(query);
      return true;
    } catch (error) {
      throw new NotFoundException('FEATURE_FLAG_COULD_NOT_BE_DELETED');
    }
  }
}
