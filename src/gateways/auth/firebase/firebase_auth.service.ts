import { Injectable, UnauthorizedException } from '@nestjs/common';

import { BaseAuthService, DeleteUserPayload, ValidateTokenPayload } from '../base.auth';
import { FirebaseConfigService } from './firebase.service';

@Injectable()
export class FirebaseAuthService extends BaseAuthService {
  constructor(private readonly firebaseConfig: FirebaseConfigService) {
    super();
  }

  public async validateToken({ clientId, accessToken }: ValidateTokenPayload): Promise<any> {
    try {
      const admin = await this.firebaseConfig.getFirebaseApp(clientId);
      const firebaseResponse = await admin.auth().verifyIdToken(accessToken);
      return firebaseResponse;
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
