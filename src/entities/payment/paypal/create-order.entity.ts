import { PaypalPurchaseUnit } from './order.entity';

export interface PaypalOrderCreateRequest {
  intent: 'CAPTURE';
  purchase_units: PaypalPurchaseUnit[];
}
