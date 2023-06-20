import { Global, Module } from '@nestjs/common';

import { FirebaseAuth } from './firebase.auth.service';
import { FirebaseConfigService } from './firebase.service';

@Global()
@Module({
  providers: [FirebaseConfigService, FirebaseAuth],
  exports: [FirebaseConfigService, FirebaseAuth],
})
export class FirebaseModule {}
