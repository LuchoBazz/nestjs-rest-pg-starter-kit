import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { UserObject } from '../../../entities/users';
import { PgGateway } from '../../../gateways/database/postgresql';
import { UserPresenter } from '../presenters/user.presenter';
import { UserService } from '../services';

@Injectable()
export class UserInteractor {
  constructor(
    private readonly pgGateway: PgGateway,
    private readonly userService: UserService,
    private readonly userPresenter: UserPresenter,
  ) {}

  public async findOne(params: { clientId: string; email: string }): Promise<UserObject> {
    return this.pgGateway.onSession(async (manager: PoolClient) => {
      const user = await this.userService.findOneByEmail(manager, params);
      return this.userPresenter.present(user);
    });
  }
}
