import { Module } from '@nestjs/common';

import { PgGateway } from '../../gateways/database/postgresql';
import { SuscriptionPlanPresenter } from './presenters/suscription_plan.presenter';
import { SuscriptionPlanRepository } from './repositories/suscription_plan.repository';
import { SuscriptionPlanResolver } from './resolvers/suscription_plan.resolver';
import { SuscriptionPlanService } from './services/suscription_plan.service';

@Module({
  imports: [PgGateway],
  providers: [SuscriptionPlanRepository, SuscriptionPlanService, SuscriptionPlanPresenter, SuscriptionPlanResolver],
  exports: [SuscriptionPlanRepository, SuscriptionPlanService, SuscriptionPlanPresenter, SuscriptionPlanResolver],
})
export class SuscriptionModule {}
