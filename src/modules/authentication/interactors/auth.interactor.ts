import { Injectable } from '@nestjs/common';

import { ErrorValidator } from '../../../common/errors/error.validator';
import { UserEntity, UserRole } from '../../../entities/users.entity';
import { PgGateway, PSQLSession } from '../../../gateways/database/postgresql';
import { AuthTokenStatuses } from '../../../gateways/database/postgresql/auth_token_statuses.repository';
import { FeatureFlagRepository } from '../../../gateways/database/postgresql/feature-flag.repository';
import { UserService } from '../../users/services/users.service';
import { AuthSucessResponse } from '../dto/auth_sucess.dto';
import { AuthResponse, SignInInput, SignUpInput } from '../dto/sign-up.input';
import { AuthPresenter } from '../presenters/auth.presenter';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInteractor {
  constructor(
    private readonly pgGateway: PgGateway,
    private readonly featFlagRepository: FeatureFlagRepository,
    private readonly authTokenStatuses: AuthTokenStatuses,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly authPresenter: AuthPresenter,
  ) {}

  public async signUp(input: SignUpInput): Promise<AuthResponse> {
    const { clientId, accessToken, userInfo } = input;
    const [result, authProvider] = await Promise.all([
      this.authService.validateToken({
        clientId,
        accessToken,
        email: userInfo.email,
      }),
      this.pgGateway.onSession(async (manager: PSQLSession) => {
        return this.featFlagRepository.findAuthProvider(manager, { clientId });
      }),
    ]);

    console.log(authProvider);

    ErrorValidator.orThrowBadRequestError(result, 'INVALID_AUTH_TOKEN');

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
      auth_provider: authProvider,
      auth_type: userInfo.authType,
      dynamic_info: {},
      organization_client_id: clientId,
    });

    const userCreated = await this.pgGateway.onTransaction(async (manager: PSQLSession) => {
      return this.userService.create(manager, { clientId, user });
    });

    ErrorValidator.orThrowInternalServerError(userCreated, 'USER_COULD_NOT_BE_CREATED');

    const jwt = this.authService.createJwt(userCreated);
    return this.authPresenter.presentToken(jwt);
  }

  public async signIn(input: SignInInput): Promise<AuthResponse> {
    const { clientId, accessToken } = input;
    const result = await this.authService.validateToken({
      clientId,
      accessToken,
    });

    ErrorValidator.orThrowBadRequestError(result, 'INVALID_AUTH_TOKEN');

    const user = await this.pgGateway.onSession(async (manager: PSQLSession) => {
      return this.userService.findOne(manager, { clientId, email: result.email });
    });

    ErrorValidator.orThrowNotFoundError(user, 'USER_NOT_FOUND');

    ErrorValidator.orThrowUnauthorizedError(user.is_active, 'USER_TEMPORARILY_INACTIVE');

    const jwt = this.authService.createJwt(user);
    return this.authPresenter.presentToken(jwt);
  }

  public async revokeAndRefreshToken(userFromToken: UserEntity): Promise<AuthResponse> {
    const { organization_client_id: clientId, email } = userFromToken;
    const [user] = await this.pgGateway.onTransaction(async (manager: PSQLSession) => {
      return Promise.all([
        this.userService.findOne(manager, { clientId, email }),
        this.authTokenStatuses.revoke(manager, { user_id: userFromToken.id }),
      ]);
    });
    ErrorValidator.orThrowUnauthorizedError(user.is_active, 'USER_TEMPORARILY_INACTIVE');
    const jwt = this.authService.createJwt(user);
    return this.authPresenter.presentToken(jwt);
  }

  public async deleteMyAccount(user: UserEntity): Promise<AuthSucessResponse> {
    const success = await this.pgGateway.onTransaction(async (manager: PSQLSession) => {
      return this.userService.delete(manager, { clientId: user.organization_client_id, user });
    });
    return { success };
  }
}
