import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { JwtPayload } from '../../../entities/jwt_payload.entity';
import { UserEntity } from '../../../entities/user.entity';
import { FirebaseAuth } from '../../../gateways/auth/firebase/firebase.auth.service';
import { PgGateway, PSQLSession } from '../../../gateways/database/postgresql';
import { UserService } from '../../users/services/user.service';

interface ValidateTokenParams {
  clientId: string;
  accessToken: string;
  email?: string;
}

export interface CreateJWTOutput {
  data: JwtPayload;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => JwtService))
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(forwardRef(() => FirebaseAuth))
    private firebaseAuth: FirebaseAuth,
    private readonly pgGateway: PgGateway,
  ) {}

  public async validateToken({ clientId, accessToken, email }: ValidateTokenParams): Promise<DecodedIdToken> {
    const decodedIdToken = await this.firebaseAuth.validateToken(clientId, accessToken);
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
  public async validateJwtPayload(payload: JwtPayload): Promise<UserEntity | undefined> {
    const user = await this.pgGateway.onSession(async (manager: PSQLSession) => {
      return this.userService.findOne(manager, { clientId: payload.client, email: payload.email });
    });
    const isValidUser = user && payload.id === user.id && user.is_active;
    return isValidUser ? user : undefined;
  }

  public createJwt(user: UserEntity): CreateJWTOutput {
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
    const jwt = this.jwtService.sign(data, { expiresIn });
    return {
      data,
      token: jwt,
    };
  }
}
