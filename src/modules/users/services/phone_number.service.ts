import { Injectable } from '@nestjs/common';
import {
  GooglePhoneNumber,
  PhoneNumberFormat,
  PhoneNumberUtil,
  ValidationResult,
} from '@open-syk/common/utils/phone-number';

import { INVALID_PHONE_NUMBER, PhoneNumberParsed } from '../../../entities/users/phone_number.entity';

// Reference: https://github.com/ruimarinho/google-libphonenumber

@Injectable()
export class PhoneNumberService {
  public format({
    phoneNumber,
    formatType,
    shouldBePossible = false,
    shouldBeValid = false,
  }: {
    phoneNumber: string | null;
    formatType: PhoneNumberFormat;
    shouldBePossible?: boolean;
    shouldBeValid?: boolean;
  }): PhoneNumberParsed {
    const response = GooglePhoneNumber.parse(phoneNumber ?? '');
    if (response.state === ValidationResult.INPUT_IS_NOT_A_PHONE_NUMBER) {
      return INVALID_PHONE_NUMBER;
    }
    const phoneUtil = PhoneNumberUtil.getInstance();
    const phoneNumberParsed = phoneUtil.format(response.phoneNumber, formatType);

    if (shouldBePossible && !phoneUtil.isPossibleNumber(response.phoneNumber)) {
      return INVALID_PHONE_NUMBER;
    }

    if (shouldBeValid && !phoneUtil.isValidNumber(response.phoneNumber)) {
      return INVALID_PHONE_NUMBER;
    }
    return { state: response.state, phoneNumber: phoneNumberParsed };
  }
}
