import { Global, Module } from '@nestjs/common';

import { FirebaseConfigService } from './firebase.service';

@Global()
@Module({
  providers: [FirebaseConfigService],
  exports: [FirebaseConfigService],
})
export class FirebaseModule {}
