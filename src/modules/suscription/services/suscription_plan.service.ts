import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { SuscriptionPlanEntity } from '../../../entities/suscription/suscription_plan.entity';
import { ExtendedSuscriptionPlanInput } from '../dto/suscription_plan.dto';
import { SuscriptionPlanRepository } from '../repositories/suscription_plan.repository';

@Injectable()
export class SuscriptionPlanService {
  constructor(private readonly suscriptionPlanRepository: SuscriptionPlanRepository) {}

  public async findMany(manager: PoolClient, params: ExtendedSuscriptionPlanInput): Promise<SuscriptionPlanEntity[]> {
    return this.suscriptionPlanRepository.findMany(manager, params);
  }
}
