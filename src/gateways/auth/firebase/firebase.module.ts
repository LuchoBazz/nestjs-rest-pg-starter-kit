import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import firebaseConfig from '../../../common/configuration/firebase.config';
import { FirebaseAuth } from './firebase.auth.service';
import { FirebaseConfigService } from './firebase.service';

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
