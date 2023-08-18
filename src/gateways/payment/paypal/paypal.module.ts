import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PaypalGateway } from './services/paypal.service';

@Module({
  imports: [HttpModule],
  providers: [PaypalGateway],
  exports: [PaypalGateway],
})
export class PaypalModule {}
