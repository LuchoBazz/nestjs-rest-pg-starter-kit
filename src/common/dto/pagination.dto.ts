import { IsNumber, IsOptional } from 'class-validator';

export class PaginationInput {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}

export class PageInfoResponse {
  hasNextPage: boolean;
}
