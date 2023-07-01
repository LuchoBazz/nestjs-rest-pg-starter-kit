import { Field, InputType, InterfaceType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class PaginationInput {
  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  page?: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  limit?: number;
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class OrderByInput {
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: false })
  sortField: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: true })
  asc: boolean;
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class PaginationWithOrderByInput {
  @Field({ nullable: true })
  orderBy: OrderByInput;

  @Field({ nullable: true })
  pagination: PaginationInput;
}

@ObjectType({ isAbstract: true })
export class PageInfoResponse {
  @Field()
  hasNextPage: boolean;
}
