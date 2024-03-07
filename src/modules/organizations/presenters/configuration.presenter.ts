import { Injectable } from '@nestjs/common';

import { ConfigurationEntity, ConfigurationResponse } from '../../../entities/organizations/configuration.entity';

@Injectable()
export class ConfigurationPresenter {
  public present(config: ConfigurationEntity): ConfigurationResponse {
    return {
      id: config.id,
      key: config.key,
      value: config.value,
      type: config.type,
      is_active: config.is_active,
      organization_client_id: config.organization_client_id,
      is_experimental: config.is_experimental,
    };
  }
}
