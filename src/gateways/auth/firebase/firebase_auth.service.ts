import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { FirebaseConfigService } from './firebase.service';

@Injectable()
export class FirebaseAuth {
  constructor(private readonly firebaseConfig: FirebaseConfigService) {}

  public async validateToken(clientId: string, accessToken: string): Promise<DecodedIdToken> {
    try {
      const admin = await this.firebaseConfig.getFirebaseApp(clientId);
      const firebaseResponse = await admin.auth().verifyIdToken(accessToken);
      return firebaseResponse;
    } catch (error) {
      throw new UnauthorizedException('INVALID_JWT_TOKEN');
    }
  }

  public async deleteUser(clientId: string, uid: string): Promise<boolean> {
    try {
      const admin = await this.firebaseConfig.getFirebaseApp(clientId);
      await admin.auth().deleteUser(uid);
      return true;
    } catch (error) {
      throw new UnauthorizedException('DELETING_USER_ERROR');
    }
  }
}
