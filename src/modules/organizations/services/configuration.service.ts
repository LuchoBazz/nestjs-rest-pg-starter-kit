import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { OrderBy, Pagination } from '../../../entities';
import {
  ConfigurationEntity,
  ConfigurationPaginationResponse,
  ConfigurationType,
} from '../../../entities/organizations/configuration.entity';
import { UpdateConfigurationInput } from '../dto/configuration.dto';
import { ConfigurationRepository } from '../repositories/configuration.repository';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configurationRepository: ConfigurationRepository) {}

  public async findOne(manager: PoolClient, params: { clientId: string; key: string }): Promise<ConfigurationEntity> {
    return this.configurationRepository.findOne(manager, params);
  }

  public async findManyWithPagination(
    manager: PoolClient,
    params: { clientId: string; orderBy?: OrderBy; pagination?: Pagination },
  ): Promise<ConfigurationPaginationResponse> {
    return this.configurationRepository.findManyWithPagination(manager, params);
  }

  public async createOne(
    manager: PoolClient,
    params: { key: string; value: string; type: ConfigurationType; clientId: string },
  ): Promise<ConfigurationEntity> {
    return this.configurationRepository.createOne(manager, params);
  }

  public async updateOne(
    manager: PoolClient,
    params: { clientId: string; key: string; config: UpdateConfigurationInput },
  ): Promise<ConfigurationEntity> {
    return this.configurationRepository.updateOne(manager, params);
  }

  public async deleteOne(manager: PoolClient, params: { clientId: string; key: string }): Promise<boolean> {
    return this.configurationRepository.deleteOne(manager, params);
  }
}
