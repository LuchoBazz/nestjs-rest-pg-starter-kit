import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import {
  ConfigurationEntity,
  ConfigurationPaginationResponse,
} from '../../../entities/organizations/configuration.entity';
import {
  ConfigurationPaginationInput,
  CreateConfigurationInput,
  FilterConfigurationInput,
  UpdateConfigurationInput,
} from '../dto/configuration.dto';
import { ConfigurationRepository } from '../repositories/configuration.repository';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configurationRepository: ConfigurationRepository) {}

  public async findOne(
    manager: PoolClient,
    params: FilterConfigurationInput & { clientId: string },
  ): Promise<ConfigurationEntity> {
    return this.configurationRepository.findOne(manager, params);
  }

  public async findManyWithPagination(
    manager: PoolClient,
    params: ConfigurationPaginationInput & { clientId: string },
  ): Promise<ConfigurationPaginationResponse> {
    return this.configurationRepository.findManyWithPagination(manager, params);
  }

  public async createOne(
    manager: PoolClient,
    params: CreateConfigurationInput & { clientId: string },
  ): Promise<ConfigurationEntity> {
    return this.configurationRepository.createOne(manager, params);
  }

  public async updateOne(
    manager: PoolClient,
    params: UpdateConfigurationInput & { clientId: string },
  ): Promise<ConfigurationEntity> {
    return this.configurationRepository.updateOne(manager, params);
  }

  public async deleteOne(
    manager: PoolClient,
    params: FilterConfigurationInput & { clientId: string },
  ): Promise<boolean> {
    return this.configurationRepository.deleteOne(manager, params);
  }
}
