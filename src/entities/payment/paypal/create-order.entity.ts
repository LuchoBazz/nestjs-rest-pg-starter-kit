export interface OrderCreateRequest {
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
