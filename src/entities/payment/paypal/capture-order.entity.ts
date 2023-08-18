import { PaypalAmount } from './order.entity';

export interface PaypalCaptureOrder {
  amount: PaypalAmount;
}
