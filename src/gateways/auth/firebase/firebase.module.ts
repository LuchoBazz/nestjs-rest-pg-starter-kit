import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import firebaseConfig from '../../../common/configuration/firebase.config';
import { FirebaseConfigService } from './firebase.service';
import { FirebaseAuth } from './firebase_auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [firebaseConfig],
    }),
  ],
  providers: [FirebaseConfigService, FirebaseAuth],
  exports: [FirebaseConfigService, FirebaseAuth],
})
export class FirebaseModule {}
