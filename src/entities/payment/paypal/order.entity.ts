export interface Order {
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
