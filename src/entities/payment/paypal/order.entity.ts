export interface PaypalOrder {
  id: string;
  intent: string;
  status: string;
  purchase_units: PaypalPurchaseUnit[];
  payer: PaypalPayer;
  links: PaypalLink[];
}

export interface PaypalPurchaseUnit {
  amount: PaypalAmount;
  description: string;
  items: PaypalItem[];
}

export interface PaypalAmount {
  currency_code: string;
  total: number;
}

export interface PaypalItem {
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

interface PaypalPayer {
  name: string;
  email: string;
}

interface PaypalLink {
  rel: string;
  href: string;
}
