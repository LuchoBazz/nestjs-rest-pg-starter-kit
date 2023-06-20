import admin, { AppOptions } from 'firebase-admin';

export type AdminApp = admin.app.App;

class FirebaseConfig {
  private static instance: FirebaseConfig;
  private config: Record<string, AdminApp> = {};

  private constructor() {
    const firebaseConfigEnv: Record<string, FirebaseConfigEnv> = ConfigurationEnv().firebase;

    const clientIds = Object.keys(firebaseConfigEnv) as Array<string>;

    for (const clientId of clientIds) {
      const credentials: AppOptions = {
        credential: admin.credential.cert(firebaseConfigEnv[clientId]),
      };
      this.config[clientId] = admin.initializeApp(credentials, clientId);
    }
  }

  public static getInstance(): FirebaseConfig {
    if (!FirebaseConfig.instance) {
      FirebaseConfig.instance = new FirebaseConfig();
    }
    return FirebaseConfig.instance;
  }

  public getFirebaseApp(clientId: string): AdminApp {
    return this.config[clientId];
  }
}

export const getFirebaseApp = (clientId: string): AdminApp => {
  return FirebaseConfig.getInstance().getFirebaseApp(clientId);
};
