import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import admin, { AppOptions } from 'firebase-admin';

import firebaseConfig, { FirebaseConfig as FirebaseConfigEnv } from '../../../common/configuration/firebase.config';

export type AdminApp = admin.app.App;

@Injectable()
export class FirebaseConfigService {
  private config: Record<string, AdminApp> = {};

  constructor(@Inject(firebaseConfig.KEY) config: ConfigType<typeof firebaseConfig>) {
    const firebaseConfigEnv: FirebaseConfigEnv = config;
    const organizations: string[] = Object.keys(firebaseConfigEnv);

    for (const client_id of organizations) {
      const credential = admin.credential.cert(firebaseConfigEnv[client_id]);
      const credentials: AppOptions = { credential };
      this.config[client_id] = admin.initializeApp(credentials, client_id);
    }
  }

  public getFirebaseApp(clientId: string): AdminApp {
    return this.config[clientId];
  }
}
