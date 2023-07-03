import { Injectable } from '@nestjs/common';

import { ErrorValidator } from '../../../common/errors/error.validator';
import { UserEntity, UserRole } from '../../../entities/users/user.entity';
import { PgGateway, PSQLSession } from '../../../gateways/database/postgresql';
import { FeatureFlagService } from '../../organizations/services/feature_flag.service';
import { UserService } from '../../users/services/user.service';
import { AuthSuccessResponse } from '../dto/auth_sucess.dto';
import { AuthResponse, SignInInput, SignUpInput } from '../dto/sign_up.input';
import { AuthPresenter } from '../presenters/auth.presenter';
import { AuthTokenStatusesRepository } from '../repositories/auth_token_statuses.repository';
import { JwtService } from '../services/auth.service';

@Injectable()
export class AuthInteractor {
  constructor(
    private readonly pgGateway: PgGateway,
    private readonly featFlagService: FeatureFlagService,
    private readonly authTokenStatusesRepository: AuthTokenStatusesRepository,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly authPresenter: AuthPresenter,
  ) {}

  public async signUp(input: SignUpInput): Promise<AuthResponse> {
    const { clientId, accessToken, userInfo } = input;
    const [result, authProvider] = await Promise.all([
      this.jwtService.validateToken({
        clientId,
        accessToken,
        email: userInfo.email,
      }),
      this.pgGateway.onSession(async (manager: PSQLSession) => {
        return this.featFlagService.findAuthProvider(manager, { clientId });
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
      return this.userService.create(manager, { user });
    });

    ErrorValidator.orThrowInternalServerError(userCreated, 'USER_COULD_NOT_BE_CREATED');

    return this.authPresenter.presentToken(userCreated);
  }

  public async signIn(input: SignInInput): Promise<AuthResponse> {
    const { clientId, accessToken } = input;
    const result = await this.jwtService.validateToken({
      clientId,
      accessToken,
    });

    ErrorValidator.orThrowBadRequestError(result, 'INVALID_AUTH_TOKEN');

    const user = await this.pgGateway.onSession(async (manager: PSQLSession) => {
      return this.userService.findOne(manager, { clientId, email: result.email });
    });

    ErrorValidator.orThrowNotFoundError(user, 'USER_NOT_FOUND');

    ErrorValidator.orThrowUnauthorizedError(user.is_active, 'USER_TEMPORARILY_INACTIVE');

    return this.authPresenter.presentToken(user);
  }

  public async revokeAndRefreshToken(userFromToken: UserEntity): Promise<AuthResponse> {
    const { organization_client_id: clientId, email } = userFromToken;
    const [user] = await this.pgGateway.onTransaction(async (manager: PSQLSession) => {
      return Promise.all([
        this.userService.findOne(manager, { clientId, email }),
        this.authTokenStatusesRepository.revoke(manager, { user_id: userFromToken.id }),
      ]);
    });
    ErrorValidator.orThrowUnauthorizedError(user.is_active, 'USER_TEMPORARILY_INACTIVE');
    return this.authPresenter.presentToken(user);
  }

  public async deleteMyAccount(user: UserEntity): Promise<AuthSuccessResponse> {
    // TODO: Remove in Firebase or Supabase
    const success = await this.pgGateway.onTransaction(async (manager: PSQLSession) => {
      return this.userService.delete(manager, { user });
    });
    return { success };
  }
}
