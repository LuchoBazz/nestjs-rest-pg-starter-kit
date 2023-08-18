import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { AccessToken } from '../../../../entities/payment/paypal/access-token.entity';
import { OrderCreateRequest } from '../../../../entities/payment/paypal/create-order.entity';
import { Order } from '../../../../entities/payment/paypal/order.entity';

@Injectable()
export class PaypalGateway {
  constructor(private readonly httpService: HttpService) {}

  protected async getToken(): Promise<string> {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const url = 'https://api.sandbox.paypal.com/v1/oauth2/token';

    const response = await this.httpService.axiosRef.post<AccessToken>(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: 'PAYPAL_API_CLIENT',
        password: 'PAYPAL_API_SECRET',
      },
    });
    return response.data.access_token;
  }

  public async createOrder(request: OrderCreateRequest): Promise<Order> {
    const access_token = await this.getToken();
    const url = 'https://api.sandbox.paypal.com/v2/checkout/orders';
    const response = await this.httpService.axiosRef.post<Order>(url, request, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  }

  public async captureOrder(token: string): Promise<Order> {
    const url = `https://api.sandbox.paypal.com/v2/checkout/orders/${token}/capture`;
    const body = {
      amount: {
        currency_code: 'USD',
        total: 100,
      },
    };
    const response = await this.httpService.axiosRef.post<Order>(url, body);
    return response.data;
  }

  public async cancelPayment(): Promise<null> {
    return null;
  }
}
