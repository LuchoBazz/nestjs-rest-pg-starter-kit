import { registerAs } from '@nestjs/config';

export interface FirebaseConfigEnv {
  type: string;
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderX509CertUrl: string;
  clientC509CertUrl: string;
}

export type FirebaseConfig = Record<string, FirebaseConfigEnv>;

export default registerAs('firebase', () => {
  const firebase_credentials = process.env.FIREBASE_CREDENTIALS || '{}';
  const firebase: FirebaseConfig = JSON.parse(firebase_credentials);
  return firebase;
});
