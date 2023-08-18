import { PaypalAmount } from './order.entity';

export interface PaypalCaptureOrderRequest {
  amount: PaypalAmount;
}
