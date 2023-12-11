import { Field, InputType, InterfaceType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';

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
  @Field({ nullable: true })
  keyword: string;
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class SubscriptionPlanInput {
  @Field({ nullable: true })
  filter?: SubscriptionPlanFilter;
}

@InputType({ isAbstract: true })
export class ExtendedSubscriptionPlanInput extends SubscriptionPlanInput {
  @Field({ nullable: true })
  clientId: string;
}

export class SubscriptionPlanQueryParamsDto {
  @IsOptional()
  @IsEnum(SubscriptionPlanSearchCriteriaEnum)
  searchCriteria?: SubscriptionPlanSearchCriteriaEnum;

  @IsString()
  @IsOptional()
  @Field()
  keyword?: string;
}
