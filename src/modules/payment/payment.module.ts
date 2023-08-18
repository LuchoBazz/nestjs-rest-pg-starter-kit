import { Module } from '@nestjs/common';

import { PaypalModule } from '../../gateways/payment/paypal/paypal.module';
import { StripeModule } from '../../gateways/payment/stripe/stripe.module';
import { PaypalService } from './services/paypal.service';
import { StripeService } from './services/stripe.service';

@Module({
  imports: [PaypalModule, StripeModule],
  providers: [PaypalService, StripeService],
  exports: [PaypalService, StripeService],
})
export class PaymentModule {}
