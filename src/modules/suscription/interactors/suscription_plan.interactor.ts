import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { SuscriptionPlanObject } from '../../../entities/suscription/suscription_plan.entity';
import { PgGateway } from '../../../gateways/database/postgresql';
import { SuscriptionPlanInput } from '../dto/suscription_plan.dto';
import { SuscriptionPlanPresenter } from '../presenters/suscription_plan.presenter';
import { SuscriptionPlanService } from '../services/suscription_plan.service';

@Injectable()
export class SuscriptionPlanInteractor {
  constructor(
    private readonly pgGateway: PgGateway,
    private readonly suscriptionPlanService: SuscriptionPlanService,
    private readonly suscriptionPlanPresenter: SuscriptionPlanPresenter,
  ) {}

  public async getSuscriptionPlans(clientId: string, input: SuscriptionPlanInput): Promise<SuscriptionPlanObject[]> {
    return this.pgGateway.onSession(async (manager: PoolClient) => {
      const suscriptionPlans = await this.suscriptionPlanService.findMany(manager, { ...input, clientId });
      return suscriptionPlans.map(this.suscriptionPlanPresenter.presentSuscriptionPlan);
    });
  }
}
