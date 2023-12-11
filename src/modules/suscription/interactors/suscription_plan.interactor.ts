import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { PgGateway } from '../../../gateways/database/postgresql';
import { GetSuscriptionPlanInput, SuscriptionPlanResponse } from '../dto/suscription_plan.dto';

@Injectable()
export class SuscriptionPlanInteractor {
  constructor(private readonly pgGateway: PgGateway /*, private readonly featFlagService: FeatureFlagService*/) {}

  public async getSuscriptionPlans(clientId: string, input: GetSuscriptionPlanInput): Promise<SuscriptionPlanResponse> {
    return this.pgGateway.onSession((manager: PoolClient) => {
      // return this.featFlagService.findManyWithPagination(manager, { ...input, clientId });
      console.log({ clientId, input, manager });
      return Promise.resolve({ counter: 0 });
    });
  }
}
