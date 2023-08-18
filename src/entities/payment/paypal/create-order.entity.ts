import { PaypalPurchaseUnit } from './order.entity';

export interface PaypalOrderCreateRequest {
  intent: PaypalIntent.CAPTURE;
  purchase_units: PaypalPurchaseUnit[];
  payment_source: PaypalPaymentSource;
}

enum PaypalIntent {
  CAPTURE = 'CAPTURE',
  AUTHORIZE = 'AUTHORIZE',
}

interface PaypalPaymentSource {
  paypal: PaypalPaymentSource;
}

interface PaypalPaymentSource {
  experience_context: PaypalExperienceContext;
  email_address: string;
  name: PaypalName;
}

interface PaypalExperienceContext {
  payment_method_preference: string;
  brand_name: string;
  locale: string;
  landing_page: string;
  shipping_preference: string;
  user_action: string;
  return_url: string;
  cancel_url: string;
}

interface PaypalName {
  given_name: string;
  surname: string;
}
