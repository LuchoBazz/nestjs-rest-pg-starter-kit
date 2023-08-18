export interface StripePaymentIntentRequest {
  line_items: StripeLineItem[];
  mode: 'payment';
  success_url: string;
  cancel_url: string;
}

export interface StripePaymentIntentResponse {
  url: string;
}

interface StripePriceData {
  product_data: {
    name: string;
  };
  currency: string;
  unit_amount: number;
}

interface StripeLineItem {
  price_data: StripePriceData;
  quantity: number;
}
