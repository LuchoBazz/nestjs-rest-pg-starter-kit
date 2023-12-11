import { Field, InputType, InterfaceType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';

// subscription plan search criteria
export enum SubscriptionPlanSearchCriteriaEnum {
  SLUG = 'SLUG',
  PRODUCT_ID = 'PRODUCT_ID',
}

registerEnumType(SubscriptionPlanSearchCriteriaEnum, { name: 'SubscriptionPlanSearchCriteriaEnum' });

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class SubscriptionPlanFilter {
  @IsEnum(SubscriptionPlanSearchCriteriaEnum)
  @Field(() => SubscriptionPlanSearchCriteriaEnum)
  searchCriteria: SubscriptionPlanSearchCriteriaEnum;

  @IsString()
  @Field({ nullable: true, defaultValue: true })
  keyword: boolean;
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class SuscriptionPlanInput {
  @Field({ nullable: true })
  filter?: SubscriptionPlanFilter;
}

@InputType({ isAbstract: true })
export class ExtendedSuscriptionPlanInput extends SuscriptionPlanInput {
  @Field({ nullable: true })
  clientId: string;
}
