import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CacheManagerModule.register({
      ttl: 100,
      isGlobal: true,
    }),
  ],
  exports: [CacheManagerModule],
})
export class CacheModule {}
