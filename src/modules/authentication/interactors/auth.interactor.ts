import { Injectable } from '@nestjs/common';

import { ErrorValidator } from '../../../common/errors/error.validator';
import { AuthType, UserEntity, UserRole } from '../../../entities/users.entity';
import { PgGateway, PSQLSession } from '../../../gateways/database/postgresql';
import { UserService } from '../../users/services/users.service';
import { SignUpInput } from '../dto/sign-up.input';
import { AuthPresenter } from '../presenters/auth.presenter';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInteractor {
  constructor(
    private readonly pgGateway: PgGateway,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly authPresenter: AuthPresenter,
  ) {}

  public async signUp(input: SignUpInput): Promise<any> {
    const { clientId, accessToken, userInfo } = input;
    const result = await this.authService.validateToken({
      clientId,
      accessToken,
      email: userInfo.email,
    });

    ErrorValidator.orThrowBadRequestError(result, 'Could not log-in with the provided credentials');

    const user: UserEntity = UserEntity.load({
      username: userInfo.username,
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
      email: userInfo.email,
      terms: userInfo.terms,
      notifications: userInfo.notifications,
      is_active: true,
      uid: result.uid,
      role: UserRole.USER,
      auth_provider: userInfo.authProvider,
      auth_type: AuthType.FIREBASE,
      dynamic_info: userInfo.dynamicInfo,
      organization_client_id: clientId,
    });

    const userCreated = await this.pgGateway.onTransaction(async (manager: PSQLSession) => {
      return this.userService.create(manager, clientId, user);
    });
    const jwt = this.authService.createJwt(userCreated);
    return this.authPresenter.signUp(jwt);
  }
}
