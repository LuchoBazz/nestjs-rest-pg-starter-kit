import { Field, InputType, InterfaceType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

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

@ObjectType({ isAbstract: true })
export class PageInfoResponse {
  @Field()
  hasNextPage: boolean;
}
