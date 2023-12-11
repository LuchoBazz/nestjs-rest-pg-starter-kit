import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

export class SubscriptionPlanQueryParams {
  @IsString()
  @IsOptional()
  @Field()
  slug?: string;

  @IsString()
  @IsOptional()
  @Field()
  product_id?: string;
}

@InputType({ isAbstract: true })
export class ExtendedSubscriptionPlan extends SubscriptionPlanQueryParams {
  @IsString()
  @Field({ nullable: true })
  clientId: string;
}
