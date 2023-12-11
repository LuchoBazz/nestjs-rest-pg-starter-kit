import { Module } from '@nestjs/common';

import { PaypalModule } from '../../gateways/payment/paypal/paypal.module';
import { PaypalService } from './services/paypal.service';

@Module({
  imports: [PaypalModule],
  providers: [PaypalService],
  exports: [PaypalService],
})
export class PaymentModule {}
