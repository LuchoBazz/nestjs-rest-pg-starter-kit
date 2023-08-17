import { Injectable } from '@nestjs/common';

@Injectable()
export class PaypalService {
  public async createOrder(): Promise<null> {
    return null;
  }

  public async captureOrder(): Promise<null> {
    return null;
  }

  public async cancelPayment(): Promise<null> {
    return null;
  }
}
