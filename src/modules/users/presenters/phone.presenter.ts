import { Injectable } from '@nestjs/common';
import { PhoneNumberFormat } from '@open-syk/common/utils/phone-number';

import { FormatPhoneNumberObject, PhoneObject } from '../../../entities/users/phone_number.entity';
import { PhoneNumberService } from '../services';

@Injectable()
export class PhonePresenter {
  constructor(private readonly phoneNumberService: PhoneNumberService) {}

  public async phoneNumber(phoneNumber: string | null): Promise<PhoneObject> {
    const format = this.formatPhoneNumber(phoneNumber);
    return { format, country_code: 1, phone_number_type: '', region_code: '' };
  }

  public formatPhoneNumber(phoneNumber: string | null): FormatPhoneNumberObject | null {
    const e164 = this.phoneNumberService.format({ phoneNumber, formatType: PhoneNumberFormat.E164 }).phoneNumber;
    const international = this.phoneNumberService.format({
      phoneNumber,
      formatType: PhoneNumberFormat.INTERNATIONAL,
    }).phoneNumber;
    const national = this.phoneNumberService.format({
      phoneNumber,
      formatType: PhoneNumberFormat.NATIONAL,
    }).phoneNumber;
    return { e164, international, national };
  }
}
