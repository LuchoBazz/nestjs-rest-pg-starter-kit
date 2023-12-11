import { Module } from '@nestjs/common';

import { PostgresqlModule } from '../../gateways/database/postgresql/postgresql.module';
import { AdminModule } from '../admin/admin.module';
import { SubscriptionPlanInteractor } from './interactors/subscription_plan.interactor';
import { SubscriptionPlanPresenter } from './presenters/subscription_plan.presenter';
import { SubscriptionPlanRepository } from './repositories/subscription_plan.repository';
import { SubscriptionPlanResolver } from './resolvers/subscription_plan.resolver';
import { SubscriptionPlanService } from './services/subscription_plan.service';

@Module({
  imports: [PostgresqlModule, AdminModule],
  providers: [
    SubscriptionPlanInteractor,
    SubscriptionPlanRepository,
    SubscriptionPlanService,
    SubscriptionPlanPresenter,
    SubscriptionPlanResolver,
  ],
  exports: [
    SubscriptionPlanInteractor,
    SubscriptionPlanRepository,
    SubscriptionPlanService,
    SubscriptionPlanPresenter,
    SubscriptionPlanResolver,
  ],
})
export class SubscriptionModule {}
