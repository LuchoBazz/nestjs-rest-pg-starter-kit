import { Injectable } from '@nestjs/common';

import { PaypalCaptureOrder } from '../../../entities/payment/paypal/capture-order.entity';
import { PaypalOrderCreateRequest } from '../../../entities/payment/paypal/create-order.entity';
import { PaypalOrder } from '../../../entities/payment/paypal/order.entity';
import { PaypalGateway } from '../../../gateways/payment/paypal/services/paypal.service';

@Injectable()
export class PaypalService {
  constructor(private readonly paypalGateway: PaypalGateway) {}

  public async createOrder(params: { request: PaypalOrderCreateRequest }): Promise<PaypalOrder> {
    return this.paypalGateway.createOrder(params);
  }

  public async captureOrder(params: { paypalCaptureOrder: PaypalCaptureOrder; token: string }): Promise<PaypalOrder> {
    return this.paypalGateway.captureOrder(params);
  }

  public async cancelPayment(): Promise<null> {
    return null;
  }
}
