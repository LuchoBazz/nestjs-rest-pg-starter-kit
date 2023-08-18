import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { PaypalAccessToken } from '../../../../entities/payment/paypal/access-token.entity';
import { PaypalCaptureOrderRequest } from '../../../../entities/payment/paypal/capture-order.entity';
import { PaypalOrderCreateRequest } from '../../../../entities/payment/paypal/create-order.entity';
import { PaypalOrder } from '../../../../entities/payment/paypal/order.entity';

@Injectable()
export class PaypalGateway {
  constructor(private readonly httpService: HttpService) {}

  protected async getToken(): Promise<string> {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const url = 'https://api.sandbox.paypal.com/v1/oauth2/token';
    const response = await this.httpService.axiosRef.post<PaypalAccessToken>(url, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      auth: { username: 'PAYPAL_API_CLIENT', password: 'PAYPAL_API_SECRET' },
    });
    return response.data.access_token;
  }

  // https://developer.paypal.com/docs/api/orders/v2/
  public async createOrder({ request }: { request: PaypalOrderCreateRequest }): Promise<PaypalOrder> {
    const access_token = await this.getToken();
    const url = 'https://api.sandbox.paypal.com/v2/checkout/orders';
    const response = await this.httpService.axiosRef.post<PaypalOrder>(url, request, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  }

  // https://developer.paypal.com/docs/api/orders/v2/#orders_capture
  public async captureOrder({
    paypalCaptureOrder,
    token,
  }: {
    paypalCaptureOrder: PaypalCaptureOrderRequest;
    token: string;
  }): Promise<PaypalOrder> {
    const url = `https://api.sandbox.paypal.com/v2/checkout/orders/${token}/capture`;
    // const body: PaypalCaptureOrder = { amount: { currency_code: 'USD', total: 100 }};
    const response = await this.httpService.axiosRef.post<PaypalOrder>(url, paypalCaptureOrder);
    return response.data;
  }

  public async cancelPayment(): Promise<null> {
    return null;
  }
}
