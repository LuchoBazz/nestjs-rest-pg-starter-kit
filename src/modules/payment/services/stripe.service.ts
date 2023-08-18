import { Injectable } from '@nestjs/common';

import { StripePaymentIntentResponse } from '../../../entities/payment/stripe/create-session.entity';
import { StripeGateway } from '../../../gateways/payment/stripe/services/stripe.service';

@Injectable()
export class StripeService {
  constructor(private readonly stripeGateway: StripeGateway) {}

  public async createSession(): Promise<StripePaymentIntentResponse> {
    return this.stripeGateway.createSession();
  }
}
