import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

interface Order {
  id: string;
  intent: string;
  status: string;
  purchase_units: PurchaseUnit[];
  payer: Payer;
  links: Link[];
}

interface PurchaseUnit {
  amount: Amount;
  description: string;
  items: Item[];
}

interface Amount {
  currency_code: string;
  total: number;
}

interface Item {
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

interface Payer {
  name: string;
  email: string;
}

interface Link {
  rel: string;
  href: string;
}

// ----
interface OrderCreateRequest {
  intent: 'CAPTURE';
  purchase_units: PurchaseUnit[];
}

interface PurchaseUnit {
  amount: Amount;
  description: string;
  items: Item[];
}

interface Amount {
  currency_code: string;
  total: number;
}

interface Item {
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

// ---
interface AccessToken {
  access_token: string;
}

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
