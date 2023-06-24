import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateRequest } from 'firebase-admin/lib/auth/auth-config';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { FirebaseConfigService } from './firebase.service';

@Injectable()
export class FirebaseAuth {
  constructor(private readonly firebaseConfig: FirebaseConfigService) {}

  public async signUp(clientId: string, uid: string, user: any) {
    try {
      const admin = await this.firebaseConfig.getFirebaseApp(clientId);
      const { firstName, lastName, email, password } = user;
      const firebaseUser = await admin.auth().updateUser(uid, {
        email,
        password,
        displayName: firstName + lastName,
        photoURL: 'http://www.example.com/12345678/photo.png',
        emailVerified: true,
        disabled: false,
      });
      return firebaseUser.toJSON();
    } catch (error) {
      throw new UnauthorizedException('SIGN_UP_ERROR');
    }
  }

  public async validateToken(clientId: string, accessToken: string): Promise<DecodedIdToken> {
    try {
      const admin = await this.firebaseConfig.getFirebaseApp(clientId);
      const firebaseResponse = await admin.auth().verifyIdToken(accessToken);
      return firebaseResponse;
    } catch (error) {
      throw new UnauthorizedException('INVALID_JWT_TOKEN');
    }
  }

  public async updateUser(clientId: string, uid: string, user: UpdateRequest) {
    try {
      const admin = await this.firebaseConfig.getFirebaseApp(clientId);
      const firebaseUser = await admin.auth().updateUser(uid, { ...user });
      return firebaseUser.toJSON();
    } catch (error) {
      throw new UnauthorizedException('UPDATING_USER_ERROR');
    }
  }

  public async deleteUser(clientId: string, uid: string) {
    try {
      const admin = await this.firebaseConfig.getFirebaseApp(clientId);
      return admin.auth().deleteUser(uid);
    } catch (error) {
      throw new UnauthorizedException('DELETING_USER_ERROR');
    }
  }
}
