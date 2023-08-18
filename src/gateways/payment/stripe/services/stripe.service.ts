import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import {
  StripePaymentIntentRequest,
  StripePaymentIntentResponse,
} from '../../../../entities/payment/stripe/create-session.entity';

const stripe = new Stripe('STRIPE_PRIVATE_KEY', { apiVersion: '2023-08-16' });

@Injectable()
export class StripeGateway {
  /**
   * Creates a payment session on Stripe.
   *
   * {@link https://github.com/fazt/nodejs-stripe-checkout/blob/master/src/controllers/payment.controller.js}
   *
   * @returns {Promise<StripePaymentIntentResponse>} Object containing the URL of the payment session.
   * @throws {StripeError} If an error occurs while interacting with the Stripe API.
   */
  public async createSession(): Promise<StripePaymentIntentResponse> {
    const params: StripePaymentIntentRequest = {
      line_items: [
        {
          price_data: {
            product_data: {
              name: 'Laptop',
            },
            currency: 'usd',
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    };

    const session = await stripe.checkout.sessions.create(params);
    return { url: session.url };
  }
}
