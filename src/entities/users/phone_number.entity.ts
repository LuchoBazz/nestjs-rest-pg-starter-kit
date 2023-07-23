import { Field, ObjectType } from '@nestjs/graphql';
import { ValidationResult } from '@open-syk/common/utils/phone-number';

export interface PhoneNumberParsed {
  phoneNumber: string | null;
  state: ValidationResult;
}

export const INVALID_PHONE_NUMBER: PhoneNumberParsed = {
  state: ValidationResult.INPUT_IS_NOT_A_PHONE_NUMBER,
  phoneNumber: null,
};

@ObjectType({ isAbstract: true })
export class FormatPhoneNumberObject {
  @Field()
  e164: string;
  @Field()
  national: string;
  @Field()
  international: string;
}

@ObjectType({ isAbstract: true })
export class PhoneObject {
  @Field(() => FormatPhoneNumberObject, { nullable: true })
  format: FormatPhoneNumberObject | null;
  @Field()
  region_code: string;
  @Field()
  country_code: number;
  @Field()
  phone_number_type: number;
}
