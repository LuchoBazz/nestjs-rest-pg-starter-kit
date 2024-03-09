import { forwardRef, Module } from '@nestjs/common';

import { CacheModule } from '../../common/cache/cache.module';
import { PostgresqlModule } from '../../gateways/database/postgresql/postgresql.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersModule } from '../users/users.module';
import { ConfigurationController } from './controllers/configuration.controller';
import { FeatureFlagController } from './controllers/feature_flag.controller';
import { ConfigurationInteractor } from './interactors/configuration.interactor';
import { FeatureFlagInteractor } from './interactors/feature_flag.interactor';
import { ConfigurationPresenter } from './presenters/configuration.presenter';
import { ConfigurationRepository } from './repositories/configuration.repository';
import { FeatureFlagRepository } from './repositories/feature_flag.repository';
import { CachedConfigurationService } from './services/cached_configuration.service';
import { CachedFeatureFlagService } from './services/cached_feature_flag.service';
import { ConfigurationService } from './services/configuration.service';
import { FeatureFlagService } from './services/feature_flag.service';
import { FeatureFlagManagerService } from './services/flag_manager.service';

@Module({
  imports: [CacheModule, PostgresqlModule, forwardRef(() => AuthenticationModule), UsersModule],
  controllers: [FeatureFlagController, ConfigurationController],
  providers: [
    FeatureFlagRepository,
    FeatureFlagService,
    FeatureFlagInteractor,
    CachedFeatureFlagService,
    FeatureFlagController,
    ConfigurationRepository,
    ConfigurationService,
    CachedConfigurationService,
    ConfigurationInteractor,
    ConfigurationPresenter,
    FeatureFlagManagerService,
  ],
  exports: [
    FeatureFlagRepository,
    FeatureFlagService,
    FeatureFlagInteractor,
    CachedFeatureFlagService,
    FeatureFlagController,
    ConfigurationRepository,
    ConfigurationService,
    CachedConfigurationService,
    ConfigurationInteractor,
    ConfigurationPresenter,
    FeatureFlagManagerService,
  ],
})
export class OrganizationsModule {}
