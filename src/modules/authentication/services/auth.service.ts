import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

// import { FirebaseAuth } from '../../../common/auth/service/firebase.auth.service';
import { JwtPayload } from '../../../entities/jwt-payload.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => JwtService))
    private _jwtService: JwtService,
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
    // const user = await onSession(this.dataSource, async (manager) => {
    //   return this.usersService.findOne(manager, payload.client, payload.email);
    // });
    const user = { id: 12, isActive: true };
    if (user && payload.id === user.id && user.isActive) {
      return user;
    }
    return undefined;
  }

  public createJwt(user: UserEntity): { data: JwtPayload; token: string } {
    const expiresIn = 60 * 60 * 24 * 7;
    const { id, uid, email, username, firstName, lastName, role, provider, organization } = user;

    const data: JwtPayload = {
      id,
      uid,
      email,
      username,
      firstName,
      lastName,
      client: organization.clientId,
      role,
      provider,
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
