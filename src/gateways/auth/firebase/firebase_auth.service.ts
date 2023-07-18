import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthGatewayUser, BaseAuthService, DeleteUserPayload, ValidateTokenPayload } from '../base.auth';
import { FirebaseConfigService } from '.';

@Injectable()
export class FirebaseAuthService extends BaseAuthService {
  constructor(private readonly firebaseConfig: FirebaseConfigService) {
    super();
  }

  public async validateToken({ clientId, accessToken }: ValidateTokenPayload): Promise<AuthGatewayUser> {
    try {
      const admin = await this.firebaseConfig.getFirebaseApp(clientId);
      const firebaseResponse = await admin.auth().verifyIdToken(accessToken);
      return {
        uid: firebaseResponse.uid,
        email: firebaseResponse.email,
      };
    } catch (error) {
      throw new UnauthorizedException('INVALID_JWT_TOKEN');
    }
  }

  public async deleteUser({ clientId, uid }: DeleteUserPayload): Promise<boolean> {
    try {
      const admin = await this.firebaseConfig.getFirebaseApp(clientId);
      await admin.auth().deleteUser(uid);
      return true;
    } catch (error) {
      throw new UnauthorizedException('DELETING_USER_ERROR');
    }
  }
}
