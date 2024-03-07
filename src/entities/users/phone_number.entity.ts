import { ValidationResult } from '@open-syk/common/utils/phone-number';

export interface PhoneNumberParsed {
  phoneNumber: string | null;
  state: ValidationResult;
}

export const INVALID_PHONE_NUMBER: PhoneNumberParsed = {
  state: ValidationResult.INPUT_IS_NOT_A_PHONE_NUMBER,
  phoneNumber: null,
};

export class FormatPhoneNumberResponse {
  e164: string;
  national: string;
  international: string;
}

export class PhoneResponse {
  format: FormatPhoneNumberResponse | null;
  region_code: string;
  country_code: number;
  phone_number_type: number;
}
