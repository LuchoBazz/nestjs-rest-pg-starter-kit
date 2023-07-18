import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import firebaseConfig from '../../../common/configuration/firebase.config';
import { FirebaseAuthService, FirebaseConfigService } from '.';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [firebaseConfig],
    }),
  ],
  providers: [FirebaseConfigService, FirebaseAuthService],
  exports: [FirebaseConfigService, FirebaseAuthService],
})
export class FirebaseModule {}
