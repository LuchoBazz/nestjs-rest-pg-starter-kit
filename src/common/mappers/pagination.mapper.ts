import { PageInfoResponse, Pagination, PaginationResponse } from '../../entities';

export const mapPagination = <T>(
  rows: any[],
  pagination: Pagination,
  callback: (item: any) => T,
): PaginationResponse<T> => {
  const totalCount = parseInt(rows?.[0]?.total_count ?? 0);
  return {
    totalCount,
    items: rows.map(callback),
    pageInfo: mapPageInfo(totalCount, pagination),
  };
};

export const mapPageInfo = (totalCount: number, pagination: Pagination): PageInfoResponse => {
  const { page = 1, limit = 10 } = pagination ?? {};
  const hasNextPage = page * limit < totalCount;
  return { hasNextPage };
};
