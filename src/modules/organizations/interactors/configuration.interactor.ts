import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import {
  ConfigurationObject,
  ConfigurationPaginationResponse,
} from '../../../entities/organizations/configuration.entity';
import { PgGateway } from '../../../gateways/database/postgresql';
import {
  ConfigurationInput,
  ConfigurationPaginationInput,
  CreateConfigurationInput,
  UpdateConfigurationInput,
} from '../dto/configuration.dto';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class ConfigurationInteractor {
  constructor(private readonly pgGateway: PgGateway, private readonly configurationService: ConfigurationService) {}

  public async getConfigurations(
    clientId: string,
    input: ConfigurationPaginationInput,
  ): Promise<ConfigurationPaginationResponse> {
    return this.pgGateway.onSession((manager: PoolClient) => {
      return this.configurationService.findManyWithPagination(manager, { ...input, clientId });
    });
  }

  public async getConfiguration(clientId: string, input: ConfigurationInput): Promise<ConfigurationObject> {
    return this.pgGateway.onSession((manager: PoolClient) => {
      return this.configurationService.findOne(manager, { ...input, clientId });
    });
  }

  public async createConfiguration(clientId: string, input: CreateConfigurationInput): Promise<ConfigurationObject> {
    return this.pgGateway.onSession((manager: PoolClient) => {
      return this.configurationService.createOne(manager, { ...input, clientId });
    });
  }

  public async updateConfiguration(clientId: string, input: UpdateConfigurationInput): Promise<ConfigurationObject> {
    return this.pgGateway.onTransaction((manager: PoolClient) => {
      return this.configurationService.updateOne(manager, { clientId, key: input.key, config: input });
    });
  }

  public async deleteConfiguration(clientId: string, input: ConfigurationInput): Promise<boolean> {
    return this.pgGateway.onTransaction((manager: PoolClient) => {
      return this.configurationService.deleteOne(manager, { ...input, clientId });
    });
  }
}
