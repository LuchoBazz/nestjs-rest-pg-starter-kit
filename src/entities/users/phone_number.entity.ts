import { ValidationResult } from '@open-syk/common/utils/phone-number';

export interface PhoneNumberParsed {
  phoneNumber: string | null;
  state: ValidationResult;
}

export const INVALID_PHONE_NUMBER: PhoneNumberParsed = {
  state: ValidationResult.INPUT_IS_NOT_A_PHONE_NUMBER,
  phoneNumber: null,
};
