import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CacheManagerModule.register({
      ttl: 3600,
      max: 1000,
      isGlobal: true,
      isCacheableValue: (value: any) => {
        console.log({ value });
        return true;
      },
    }),
  ],
  exports: [CacheManagerModule],
})
export class CacheModule {}
