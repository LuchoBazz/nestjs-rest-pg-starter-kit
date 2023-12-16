import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import {
  ConfigurationObject,
  ConfigurationPaginationResponse,
} from '../../../entities/organizations/configuration.entity';
import { PgGateway } from '../../../gateways/database/postgresql';
import {
  ConfigurationPaginationInput,
  CreateConfigurationInput,
  FilterConfigurationInput,
  UpdateConfigurationInput,
} from '../dto/configuration.dto';
import { ConfigurationPresenter } from '../presenters/configuration.presenter';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class ConfigurationInteractor {
  constructor(
    private readonly pgGateway: PgGateway,
    private readonly configurationService: ConfigurationService,
    private readonly configurationPresenter: ConfigurationPresenter,
  ) {}

  public async getConfigurations(
    clientId: string,
    input: ConfigurationPaginationInput,
  ): Promise<ConfigurationPaginationResponse> {
    return this.pgGateway.onSession((manager: PoolClient) => {
      return this.configurationService.findManyWithPagination(manager, { ...input, clientId });
    });
  }

  public async getConfiguration(clientId: string, input: FilterConfigurationInput): Promise<ConfigurationObject> {
    return this.pgGateway.onSession(async (manager: PoolClient) => {
      const config = await this.configurationService.findOne(manager, { ...input, clientId });
      return this.configurationPresenter.present(config);
    });
  }

  public async createConfiguration(clientId: string, input: CreateConfigurationInput): Promise<ConfigurationObject> {
    return this.pgGateway.onSession(async (manager: PoolClient) => {
      const config = await this.configurationService.createOne(manager, { ...input, clientId });
      return this.configurationPresenter.present(config);
    });
  }

  public async updateConfiguration(clientId: string, input: UpdateConfigurationInput): Promise<ConfigurationObject> {
    return this.pgGateway.onTransaction(async (manager: PoolClient) => {
      const config = await this.configurationService.updateOne(manager, { ...input, clientId });
      return this.configurationPresenter.present(config);
    });
  }

  public async deleteConfiguration(clientId: string, input: FilterConfigurationInput): Promise<boolean> {
    return this.pgGateway.onTransaction((manager: PoolClient) => {
      return this.configurationService.deleteOne(manager, { ...input, clientId });
    });
  }
}
