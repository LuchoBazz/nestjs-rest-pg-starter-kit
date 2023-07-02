export interface Pagination {
  page?: number;
  limit?: number;
}

export interface OrderBy {
  sortField?: string;
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
