import { IsOptional, IsString } from 'class-validator';

export class SubscriptionPlanQueryParams {
  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  product_id?: string;
}

export class ExtendedSubscriptionPlan extends SubscriptionPlanQueryParams {
  @IsString()
  clientId: string;
}
