import { Module } from '@nestjs/common';

import { StripeGateway } from './services/stripe.service';

@Module({
  imports: [],
  providers: [StripeGateway],
  exports: [StripeGateway],
})
export class StripeModule {}
