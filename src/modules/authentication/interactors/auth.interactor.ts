import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { ErrorValidator } from '../../../common/errors';
import { UserEntity, UserRole } from '../../../entities/users';
import { AuthGatewayService } from '../../../gateways/auth';
import { PgGateway } from '../../../gateways/database/postgresql';
import { FeatureFlagService } from '../../organizations/services';
import { UserService } from '../../users/services';
import { AuthResponse, AuthSuccessResponse, SignInInput, SignUpInput } from '../dto';
import { AuthPresenter } from '../presenters';
import { AuthTokenStatusesRepository } from '../repositories';

@Injectable()
export class AuthInteractor {
  constructor(
    private readonly pgGateway: PgGateway,
    private readonly featFlagService: FeatureFlagService,
    private readonly authTokenStatusesRepository: AuthTokenStatusesRepository,
    private readonly userService: UserService,
    private readonly authPresenter: AuthPresenter,
    private readonly authGatewayService: AuthGatewayService,
  ) {}

  public async signUp(input: SignUpInput): Promise<AuthResponse> {
    const { clientId, accessToken, userInfo } = input;
    const [result, authProvider] = await this.pgGateway.onSession(async (manager: PoolClient) => {
      return Promise.all([
        this.authGatewayService.validateToken(manager, {
          clientId,
          accessToken,
          email: userInfo.email,
        }),
        this.featFlagService.findAuthProvider(manager, { clientId }),
      ]);
    });

    console.log(authProvider);

    ErrorValidator.orThrowBadRequestError(result, 'INVALID_AUTH_TOKEN');

    const user: UserEntity = UserEntity.load({
      username: userInfo.username,
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
      email: userInfo.email,
      identification_number: null,
      phone_number: null,
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

    const userCreated = await this.pgGateway.onTransaction(async (manager: PoolClient) => {
      return this.userService.create(manager, { user });
    });

    ErrorValidator.orThrowInternalServerError(userCreated, 'USER_COULD_NOT_BE_CREATED');

    return this.authPresenter.presentToken(userCreated);
  }

  public async signIn(input: SignInInput): Promise<AuthResponse> {
    const { clientId, accessToken } = input;

    const user = await this.pgGateway.onSession(async (manager: PoolClient) => {
      const result = await this.authGatewayService.validateToken(manager, {
        clientId,
        accessToken,
      });
      ErrorValidator.orThrowBadRequestError(result, 'INVALID_AUTH_TOKEN');
      return this.userService.findOne(manager, { clientId, email: result.email });
    });

    ErrorValidator.orThrowNotFoundError(user, 'USER_NOT_FOUND');

    ErrorValidator.orThrowUnauthorizedError(user.is_active, 'USER_TEMPORARILY_INACTIVE');

    return this.authPresenter.presentToken(user);
  }

  public async revokeAndRefreshToken(userFromToken: UserEntity): Promise<AuthResponse> {
    const { organization_client_id: clientId, email } = userFromToken;
    const [user] = await this.pgGateway.onTransaction(async (manager: PoolClient) => {
      return Promise.all([
        this.userService.findOne(manager, { clientId, email }),
        this.authTokenStatusesRepository.revoke(manager, { user_id: userFromToken.id }),
      ]);
    });
    ErrorValidator.orThrowUnauthorizedError(user.is_active, 'USER_TEMPORARILY_INACTIVE');
    return this.authPresenter.presentToken(user);
  }

  public async deleteMyAccount(user: UserEntity): Promise<AuthSuccessResponse> {
    const { organization_client_id: clientId, uid } = user;
    const success = await this.pgGateway.onTransaction(async (manager: PoolClient) => {
      await this.authGatewayService.deleteUser(manager, { clientId, uid });
      return this.userService.delete(manager, { user });
    });
    return { success };
  }
}
