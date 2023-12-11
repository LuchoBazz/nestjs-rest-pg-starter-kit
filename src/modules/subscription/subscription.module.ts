import { Module } from '@nestjs/common';

import { PgGateway } from '../../gateways/database/postgresql';
import { SubscriptionPlanPresenter } from './presenters/subscription_plan.presenter';
import { SubscriptionPlanRepository } from './repositories/subscription_plan.repository';
import { SubscriptionPlanResolver } from './resolvers/subscription_plan.resolver';
import { SubscriptionPlanService } from './services/subscription_plan.service';

@Module({
  imports: [PgGateway],
  providers: [SubscriptionPlanRepository, SubscriptionPlanService, SubscriptionPlanPresenter, SubscriptionPlanResolver],
  exports: [SubscriptionPlanRepository, SubscriptionPlanService, SubscriptionPlanPresenter, SubscriptionPlanResolver],
})
export class SubscriptionModule {}
