import { Injectable, NotFoundException } from '@nestjs/common';
import { format } from '@scaleleap/pg-format';
import { PoolClient } from 'pg';
import { v4 as uuid } from 'uuid';

import { mapPagination } from '../../../common/mappers';
import { formatFields } from '../../../common/utils';
import { OrderBy, Pagination } from '../../../entities';
import {
  ConfigurationEntity,
  ConfigurationPaginationResponse,
} from '../../../entities/organizations/configuration.entity';
import { ConfigurationOrderBy, UpdateConfigurationInput } from '../dto/configuration.dto';

@Injectable()
export class ConfigurationRepository {
  public async findOne(
    manager: PoolClient,
    { key, clientId }: { clientId: string; key: string },
  ): Promise<ConfigurationEntity> {
    try {
      const query = format(
        `
          SELECT
            configuration_id,
            configuration_key,
            configuration_value,
            configuration_type,
            configuration_organization,
            configuration_created_at,
            configuration_updated_at
          FROM core.configurations configurations
          WHERE configurations.configuration_organization = %1$L
          AND configurations.configuration_key = %2$L
        `,
        clientId,
        key.toString(),
      );
      const { rows } = await manager.query(query);
      return ConfigurationEntity.loadFromRow(rows[0]);
    } catch (error) {
      throw new NotFoundException('CONFIGURATION_NOT_FOUND');
    }
  }

  public async findManyWithPagination(
    manager: PoolClient,
    { clientId, pagination, orderBy }: { clientId: string; orderBy?: OrderBy; pagination?: Pagination },
  ): Promise<ConfigurationPaginationResponse> {
    try {
      const { page = 1, limit = 10 } = pagination ?? {};
      const { sortField = ConfigurationOrderBy.CREATED_AT, asc = true } = orderBy ?? {};

      const mapSortField: Record<ConfigurationOrderBy, string> = {
        [ConfigurationOrderBy.CREATED_AT]: 'configuration_created_at',
      };

      const query = format(
        `
          SELECT
            configuration_id,
            configuration_key,
            configuration_value,
            configuration_type,
            configuration_organization,
            configuration_created_at,
            configuration_updated_at,
            COUNT(*) OVER () AS total_count
          FROM core.configurations configurations
          WHERE configurations.configuration_organization = %1$L
          ORDER BY configurations.%2$s %3$s
          LIMIT %4$L OFFSET %5$L
        `,
        clientId,
        mapSortField[sortField],
        asc ? 'ASC' : 'DESC',
        limit,
        (page - 1) * limit,
      );
      const { rows } = await manager.query(query);
      return mapPagination(rows, pagination, ConfigurationEntity.loadFromRow);
    } catch (error) {
      throw new NotFoundException('CONFIGURATION_NOT_FOUND');
    }
  }

  public async createOne(
    manager: PoolClient,
    { key, value, type, clientId }: { key: string; value: boolean; type: number; clientId: string },
  ): Promise<ConfigurationEntity> {
    try {
      const query = format(
        `
          INSERT INTO core.configurations(
            configuration_id,
            configuration_key,
            configuration_value,
            configuration_type,
            configuration_organization
          ) VALUES(%1$L, %2$L, %3$L, true, %4$L, %5$L, %6$L)
          RETURNING *
        `,
        uuid(),
        key,
        value,
        type,
        clientId,
      );
      const { rows } = await manager.query(query);
      return ConfigurationEntity.loadFromRow(rows[0]);
    } catch (error) {
      throw new NotFoundException('CONFIGURATION_COULD_NOT_BE_CREATED');
    }
  }

  public async updateOne(
    manager: PoolClient,
    { clientId, key, config }: { clientId: string; key: string; config: UpdateConfigurationInput },
  ): Promise<ConfigurationEntity> {
    try {
      const fields = formatFields({
        updateData: config,
        columnName: {
          key: 'configuration_key',
          value: 'configuration_value',
          type: 'configuration_type',
        },
      });

      const query = format(
        `
          UPDATE core.configurations
          SET ${fields}
          WHERE configurations.configuration_organization = %1$L
          AND configurations.configuration_key = %2$L
        `,
        clientId,
        key.toString(),
      );
      const { rows } = await manager.query(query);
      return ConfigurationEntity.loadFromRow(rows[0]);
    } catch (error) {
      throw new NotFoundException('CONFIGURATION_NOT_BE_UPDATED');
    }
  }

  public async deleteOne(manager: PoolClient, { key, clientId }: { clientId: string; key: string }): Promise<boolean> {
    try {
      const query = format(
        `
          DELETE FROM core.configurations
          WHERE configurations.configuration_organization = %1$L
          AND configurations.configuration_key = %2$L
        `,
        clientId,
        key.toString(),
      );
      await manager.query(query);
      return true;
    } catch (error) {
      throw new NotFoundException('CONFIGURATION_COULD_NOT_BE_DELETED');
    }
  }
}
