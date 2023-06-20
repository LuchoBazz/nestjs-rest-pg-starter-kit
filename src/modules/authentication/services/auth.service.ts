import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

// import { FirebaseAuth } from '../../../common/auth/service/firebase.auth.service';
import { JwtPayload } from '../../../entities/jwt-payload.entity';
import { UserEntity } from '../../../entities/users.entity';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => JwtService))
    private _jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async validateFirebaseToken(params: {
    clientId: string;
    accessToken: string;
    email?: string;
  }): Promise<DecodedIdToken> {
    const { clientId, accessToken, email } = params;
    const decodedIdToken = await this.authService.validateToken(clientId, accessToken);
    if (!decodedIdToken || !decodedIdToken.uid || (email && decodedIdToken?.email !== email)) {
      return undefined;
    }
    return decodedIdToken;
  }

  /**
   * Verifies that the JWT payload associated with a JWT is valid by making sure the user exists and is enabled
   *
   * @param {JwtPayload} payload
   * @returns {(Promise<UserEntity | undefined>)} returns undefined if there is no user or the account is not enabled
   * @memberof {(AuthService JwtStrategy)}
   */
  async validateJwtPayload(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.usersService.findOne(payload.client, payload.email);
    if (user && payload.id === user.id && user.is_active) {
      return user;
    }
    return undefined;
  }

  public createJwt(user: UserEntity): { data: JwtPayload; token: string } {
    const expiresIn = 60 * 60 * 24 * 7;
    const { id, uid, email, username, first_name, last_name, role, auth_provider, auth_type, organization_client_id } =
      user;

    const data: JwtPayload = {
      id,
      uid,
      email,
      username,
      first_name,
      last_name,
      client: organization_client_id,
      role,
      auth_provider,
      auth_type,
      iat: Math.floor(new Date().getTime() / 1000),
      iss: 'https://example.com',
      aud: ['https://example.com'],
    };
    const jwt = this._jwtService.sign(data, { expiresIn });
    return {
      data,
      token: jwt,
    };
  }
}
