export interface Pagination {
  page?: number | null;
  limit?: number | null;
}

export interface OrderBy {
  sortField: string;
  asc?: boolean;
}

export interface PageInfoResponse {
  hasNextPage: boolean;
}

export interface PaginationResponse<T> {
  totalCount: number;
  items: T[];
  pageInfo: PageInfoResponse;
}
