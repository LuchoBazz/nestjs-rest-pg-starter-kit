import { Module } from '@nestjs/common';

import { PostgresqlModule } from '../../gateways/database/postgresql/postgresql.module';
import { FeatureFlagRepository } from './repositories/feature_flag.repository';

@Module({
  imports: [PostgresqlModule],
  providers: [FeatureFlagRepository],
  exports: [FeatureFlagRepository],
})
export class OrganizationsModule {}
