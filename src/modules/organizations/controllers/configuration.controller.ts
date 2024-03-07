import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { PermissionsValues } from '../../../entities/authentication';
import {
  ConfigurationPaginationResponse,
  ConfigurationResponse,
} from '../../../entities/organizations/configuration.entity';
import { UserEntity } from '../../../entities/users';
import { JwtUser, Permissions } from '../../authentication/decorators';
import { JwtAuthGuard, PermissionsGuard } from '../../authentication/guards';
import {
  ConfigurationOrderBy,
  ConfigurationSuccessResponse,
  CreateConfigurationInput,
  FilterConfigurationInput,
  UpdateConfigurationInput,
} from '../dto/configuration.dto';
import { ConfigurationInteractor } from '../interactors/configuration.interactor';

@Controller('configuration')
export class ConfigurationController {
  constructor(private configurationInteractor: ConfigurationInteractor) {}

  @Permissions(PermissionsValues.READ_CONFIGURATIONS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get()
  public async getConfigurations(
    @JwtUser() user: UserEntity,
    @Query('sort_field') sortField?: ConfigurationOrderBy,
    @Query('asc') asc?: boolean,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ConfigurationPaginationResponse> {
    return this.configurationInteractor.getConfigurations(user.organization_client_id, {
      orderBy: { sortField, asc },
      pagination: { page, limit },
    });
  }

  @Permissions(PermissionsValues.READ_CONFIGURATIONS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get(':key')
  public async getConfiguration(@JwtUser() user: UserEntity, @Param('key') key): Promise<ConfigurationResponse> {
    return this.configurationInteractor.getConfiguration(user.organization_client_id, { key });
  }

  @Permissions(PermissionsValues.CREATE_CONFIGURATIONS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  public async addConfiguration(
    @Body() input: CreateConfigurationInput,
    @JwtUser() user: UserEntity,
  ): Promise<ConfigurationResponse> {
    return await this.configurationInteractor.createConfiguration(user.organization_client_id, input);
  }

  @Permissions(PermissionsValues.UPDATE_CONFIGURATIONS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put()
  public async updateConfiguration(
    @Body() input: UpdateConfigurationInput,
    @JwtUser() user: UserEntity,
  ): Promise<ConfigurationResponse> {
    return this.configurationInteractor.updateConfiguration(user.organization_client_id, input);
  }

  @Permissions(PermissionsValues.REMOVE_CONFIGURATIONS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete()
  public async deleteConfiguration(
    @Body() input: FilterConfigurationInput,
    @JwtUser() user: UserEntity,
  ): Promise<ConfigurationSuccessResponse> {
    const success = await this.configurationInteractor.deleteConfiguration(user.organization_client_id, input);
    return { success };
  }
}
